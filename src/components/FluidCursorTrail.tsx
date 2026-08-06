import React, { useEffect, useRef } from "react";

export default function FluidCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textMaskRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      console.warn("WebGL not supported, fluid trail disabled");
      return;
    }

    // Config options (fine-tuned for luxury aesthetic)
    const config = {
      simResolution: 256,
      dyeResolution: 1024,
      curl: 20, // gentle, elegant motion
      velocityDissipation: 0.97,
      dyeDissipation: 0.95,
      splatRadius: 0.2,
      forceStrength: 4000,
    };

    // Resilient Support for Floating Point / Half Floating Point Textures
    let ext: any;
    let supportLinear: any;
    let internalFormat: number;
    let formatType: number;

    const extHalf = gl.getExtension("OES_texture_half_float");
    const extHalfLinear = gl.getExtension("OES_texture_half_float_linear");
    const extFloat = gl.getExtension("OES_texture_float");
    const extFloatLinear = gl.getExtension("OES_texture_float_linear");

    if (extHalf && extHalfLinear) {
      ext = extHalf;
      supportLinear = extHalfLinear;
      // WebGL 1 constants for half float
      internalFormat = gl.RGBA;
      formatType = extHalf.HALF_FLOAT_OES;
    } else if (extFloat && extFloatLinear) {
      ext = extFloat;
      supportLinear = extFloatLinear;
      internalFormat = gl.RGBA;
      formatType = gl.FLOAT;
    } else {
      // Fallback to unsigned byte if float textures not supported
      internalFormat = gl.RGBA;
      formatType = gl.UNSIGNED_BYTE;
    }

    // Helper to compile a shader
    function compileShader(type: number, source: string): WebGLShader | null {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    // Helper to create program
    function createProgram(vsSource: string, fsSource: string): WebGLProgram | null {
      const vs = compileShader(gl!.VERTEX_SHADER, vsSource);
      const fs = compileShader(gl!.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return null;

      const program = gl!.createProgram();
      if (!program) return null;
      gl!.attachShader(program, vs);
      gl!.attachShader(program, fs);
      gl!.linkProgram(program);

      if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
        console.error("Program link error:", gl!.getProgramInfoLog(program));
        return null;
      }
      return program;
    }

    // Shared Base Vertex Shader
    const baseVertexShader = `
      precision highp float;
      attribute vec2 a_position;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 u_texelSize;
      void main() {
          vUv = a_position * 0.5 + 0.5;
          vL = vUv - vec2(u_texelSize.x, 0.0);
          vR = vUv + vec2(u_texelSize.x, 0.0);
          vT = vUv + vec2(0.0, u_texelSize.y);
          vB = vUv - vec2(0.0, u_texelSize.y);
          gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // 1. Splat Shader
    const splatShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D u_target;
      uniform float u_aspectRatio;
      uniform vec2 u_point;
      uniform vec3 u_color;
      uniform float u_radius;
      void main() {
          vec2 p = vUv - u_point;
          p.x *= u_aspectRatio;
          vec3 splat = exp(-dot(p, p) / u_radius) * u_color;
          vec3 base = texture2D(u_target, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
    `;

    // 2. Advection Shader
    const advectionShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D u_velocity;
      uniform sampler2D u_source;
      uniform vec2 u_texelSize;
      uniform float u_dt;
      uniform float u_dissipation;
      void main() {
          vec2 coord = vUv - u_dt * texture2D(u_velocity, vUv).xy * u_texelSize;
          gl_FragColor = u_dissipation * texture2D(u_source, coord);
      }
    `;

    // 3. Divergence Shader
    const divergenceShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D u_velocity;
      void main() {
          float L = texture2D(u_velocity, vL).x;
          float R = texture2D(u_velocity, vR).x;
          float T = texture2D(u_velocity, vT).y;
          float B = texture2D(u_velocity, vB).y;
          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    // 4. Curl Shader
    const curlShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D u_velocity;
      void main() {
          float L = texture2D(u_velocity, vL).y;
          float R = texture2D(u_velocity, vR).y;
          float T = texture2D(u_velocity, vT).x;
          float B = texture2D(u_velocity, vB).x;
          float curl = R - L - T + B;
          gl_FragColor = vec4(curl, 0.0, 0.0, 1.0);
      }
    `;

    // 5. Vorticity Confinement Shader
    const vorticityShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D u_velocity;
      uniform sampler2D u_curl;
      uniform float u_curlStrength;
      uniform float u_dt;
      void main() {
          float L = texture2D(u_curl, vL).x;
          float R = texture2D(u_curl, vR).x;
          float T = texture2D(u_curl, vT).x;
          float B = texture2D(u_curl, vB).x;
          float C = texture2D(u_curl, vUv).x;
          vec2 force = vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= u_curlStrength * C;
          vec2 vel = texture2D(u_velocity, vUv).xy;
          gl_FragColor = vec4(vel + force * u_dt, 0.0, 1.0);
      }
    `;

    // 6. Jacobi Pressure Solver Shader
    const pressureShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D u_pressure;
      uniform sampler2D u_divergence;
      void main() {
          float L = texture2D(u_pressure, vL).x;
          float R = texture2D(u_pressure, vR).x;
          float T = texture2D(u_pressure, vT).x;
          float B = texture2D(u_pressure, vB).x;
          float div = texture2D(u_divergence, vUv).x;
          float pressure = (L + R + B + T - div) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;

    // 7. Gradient Subtract Shader
    const gradientSubtractShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D u_pressure;
      uniform sampler2D u_velocity;
      void main() {
          float L = texture2D(u_pressure, vL).x;
          float R = texture2D(u_pressure, vR).x;
          float T = texture2D(u_pressure, vT).x;
          float B = texture2D(u_pressure, vB).x;
          vec2 vel = texture2D(u_velocity, vUv).xy;
          gl_FragColor = vec4(vel - 0.5 * vec2(R - L, T - B), 0.0, 1.0);
      }
    `;

    // 8. Display / Render Shader
    const displayShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D u_source;
      void main() {
          vec3 color = texture2D(u_source, vUv).rgb;
          // Fluid output: solid white trails with custom brightness scaling
          gl_FragColor = vec4(color, length(color));
      }
    `;

    // Compile programs
    const splatProgram = createProgram(baseVertexShader, splatShader)!;
    const advectionProgram = createProgram(baseVertexShader, advectionShader)!;
    const divergenceProgram = createProgram(baseVertexShader, divergenceShader)!;
    const curlProgram = createProgram(baseVertexShader, curlShader)!;
    const vorticityProgram = createProgram(baseVertexShader, vorticityShader)!;
    const pressureProgram = createProgram(baseVertexShader, pressureShader)!;
    const gradSubProgram = createProgram(baseVertexShader, gradientSubtractShader)!;
    const displayProgram = createProgram(baseVertexShader, displayShader)!;

    // Set up full screen triangle
    const quadVertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    function initAttribute(program: WebGLProgram) {
      const positionLoc = gl!.getAttribLocation(program, "a_position");
      gl!.enableVertexAttribArray(positionLoc);
      gl!.vertexAttribPointer(positionLoc, 2, gl!.FLOAT, false, 0, 0);
    }

    // Framebuffer Factory
    interface FBO {
      texture: WebGLTexture;
      fbo: WebGLFramebuffer;
      width: number;
      height: number;
      texelSizeX: number;
      texelSizeY: number;
      attach: (id: number) => number;
    }

    function createFBO(w: number, h: number): FBO {
      const texture = gl!.createTexture()!;
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, supportLinear ? gl!.LINEAR : gl!.NEAREST);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, supportLinear ? gl!.LINEAR : gl!.NEAREST);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, internalFormat, w, h, 0, gl!.RGBA, formatType, null);

      const fbo = gl!.createFramebuffer()!;
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, texture, 0);

      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX: 1.0 / w,
        texelSizeY: 1.0 / h,
        attach(id: number) {
          gl!.activeTexture(gl!.TEXTURE0 + id);
          gl!.bindTexture(gl!.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    // Double Framebuffer Factory for ping-ponging values
    interface DoubleFBO {
      read: FBO;
      write: FBO;
      swap: () => void;
    }

    function createDoubleFBO(w: number, h: number): DoubleFBO {
      let fbo1 = createFBO(w, h);
      let fbo2 = createFBO(w, h);
      return {
        get read() {
          return fbo1;
        },
        get write() {
          return fbo2;
        },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    // Initialize FBO structures
    let density = createDoubleFBO(config.dyeResolution, config.dyeResolution);
    let velocity = createDoubleFBO(config.simResolution, config.simResolution);
    let divergence = createFBO(config.simResolution, config.simResolution);
    let curl = createFBO(config.simResolution, config.simResolution);
    let pressure = createDoubleFBO(config.simResolution, config.simResolution);

    // Track pointers & splat triggers
    const pointers: Array<{
      id: number;
      x: number;
      y: number;
      dx: number;
      dy: number;
      moved: boolean;
      color: [number, number, number];
    }> = [];

    // Resize canvas
    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width;
        canvas!.height = height;
        gl!.viewport(0, 0, width, height);
      }
    }
    resize();
    window.addEventListener("resize", resize);

    // Dynamic Splat function
    function splat(x: number, y: number, dx: number, dy: number, color: [number, number, number]) {
      // Velocity Splat
      gl!.useProgram(splatProgram);
      gl!.uniform2f(gl!.getUniformLocation(splatProgram, "u_texelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(splatProgram, "u_target"), velocity.read.attach(0));
      gl!.uniform1f(gl!.getUniformLocation(splatProgram, "u_aspectRatio"), canvas!.width / canvas!.height);
      gl!.uniform2f(gl!.getUniformLocation(splatProgram, "u_point"), x, y);
      gl!.uniform3f(gl!.getUniformLocation(splatProgram, "u_color"), dx, dy, 0.0);
      gl!.uniform1f(
        gl!.getUniformLocation(splatProgram, "u_radius"),
        config.splatRadius / 100.0
      );

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, velocity.write.fbo);
      gl!.viewport(0, 0, velocity.read.width, velocity.read.height);
      initAttribute(splatProgram);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      velocity.swap();

      // Dye Splat
      gl!.uniform1i(gl!.getUniformLocation(splatProgram, "u_target"), density.read.attach(0));
      gl!.uniform3f(gl!.getUniformLocation(splatProgram, "u_color"), color[0], color[1], color[2]);

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, density.write.fbo);
      gl!.viewport(0, 0, density.read.width, density.read.height);
      initAttribute(splatProgram);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      density.swap();
    }

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      let pointer = pointers[0];
      if (!pointer) {
        pointer = {
          id: -1,
          x: 0,
          y: 0,
          dx: 0,
          dy: 0,
          moved: false,
          color: [1.0, 1.0, 1.0], // Exquisite pure white ink for rich differences
        };
        pointers.push(pointer);
      }

      const x = e.clientX / window.innerWidth;
      const y = 1.0 - e.clientY / window.innerHeight;
      pointer.dx = (x - pointer.x) * config.forceStrength;
      pointer.dy = (y - pointer.y) * config.forceStrength;
      pointer.x = x;
      pointer.y = y;
      pointer.moved = true;
    };

    // Touch support for ultimate responsive feedback
    const handleTouchMove = (e: TouchEvent) => {
      if (e.targetTouches.length === 0) return;
      let pointer = pointers[0];
      if (!pointer) {
        pointer = {
          id: -1,
          x: 0,
          y: 0,
          dx: 0,
          dy: 0,
          moved: false,
          color: [1.0, 1.0, 1.0],
        };
        pointers.push(pointer);
      }

      const touch = e.targetTouches[0];
      const x = touch.clientX / window.innerWidth;
      const y = 1.0 - touch.clientY / window.innerHeight;
      pointer.dx = (x - pointer.x) * config.forceStrength;
      pointer.dy = (y - pointer.y) * config.forceStrength;
      pointer.x = x;
      pointer.y = y;
      pointer.moved = true;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Simulation Loop
    let lastTime = Date.now();
    let animId: number;

    function update() {
      const now = Date.now();
      const dt = Math.min((now - lastTime) / 1000.0, 0.016);
      lastTime = now;

      // Dynamically track and update target "Al-Hammad" text mask
      const target = document.getElementById("hero-al-hammad-text");
      const maskText = textMaskRef.current;
      const cv = canvasRef.current;
      if (target && maskText) {
        const rect = target.getBoundingClientRect();
        const style = window.getComputedStyle(target);
        
        maskText.setAttribute("x", String(rect.left + rect.width / 2));
        maskText.setAttribute("y", String(rect.top + rect.height / 2));
        
        maskText.style.fontSize = style.fontSize;
        maskText.style.fontFamily = style.fontFamily;
        maskText.style.letterSpacing = style.letterSpacing;
        maskText.style.fontWeight = style.fontWeight;
        
        if (cv) {
          cv.style.opacity = "1";
        }
      } else {
        if (cv) {
          cv.style.opacity = "0";
        }
      }

      // 1. Process Pointers & Splat forces
      pointers.forEach((pointer) => {
        if (pointer.moved) {
          pointer.moved = false;
          splat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color);
        }
      });

      // 2. Advect Velocity
      gl!.useProgram(advectionProgram);
      gl!.uniform2f(gl!.getUniformLocation(advectionProgram, "u_texelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(advectionProgram, "u_velocity"), velocity.read.attach(0));
      gl!.uniform1i(gl!.getUniformLocation(advectionProgram, "u_source"), velocity.read.attach(0));
      gl!.uniform1f(gl!.getUniformLocation(advectionProgram, "u_dt"), dt);
      gl!.uniform1f(gl!.getUniformLocation(advectionProgram, "u_dissipation"), config.velocityDissipation);

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, velocity.write.fbo);
      gl!.viewport(0, 0, velocity.read.width, velocity.read.height);
      initAttribute(advectionProgram);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      velocity.swap();

      // 3. Advect Density (Dye)
      gl!.uniform2f(gl!.getUniformLocation(advectionProgram, "u_texelSize"), density.read.texelSizeX, density.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(advectionProgram, "u_velocity"), velocity.read.attach(0));
      gl!.uniform1i(gl!.getUniformLocation(advectionProgram, "u_source"), density.read.attach(1));
      gl!.uniform1f(gl!.getUniformLocation(advectionProgram, "u_dissipation"), config.dyeDissipation);

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, density.write.fbo);
      gl!.viewport(0, 0, density.read.width, density.read.height);
      initAttribute(advectionProgram);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      density.swap();

      // 4. Calculate Curl
      gl!.useProgram(curlProgram);
      gl!.uniform2f(gl!.getUniformLocation(curlProgram, "u_texelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(curlProgram, "u_velocity"), velocity.read.attach(0));

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, curl.fbo);
      gl!.viewport(0, 0, curl.width, curl.height);
      initAttribute(curlProgram);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);

      // 5. Vorticity Confinement
      gl!.useProgram(vorticityProgram);
      gl!.uniform2f(gl!.getUniformLocation(vorticityProgram, "u_texelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(vorticityProgram, "u_velocity"), velocity.read.attach(0));
      gl!.uniform1i(gl!.getUniformLocation(vorticityProgram, "u_curl"), curl.attach(1));
      gl!.uniform1f(gl!.getUniformLocation(vorticityProgram, "u_curlStrength"), config.curl);
      gl!.uniform1f(gl!.getUniformLocation(vorticityProgram, "u_dt"), dt);

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, velocity.write.fbo);
      gl!.viewport(0, 0, velocity.read.width, velocity.read.height);
      initAttribute(vorticityProgram);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      velocity.swap();

      // 6. Calculate Divergence
      gl!.useProgram(divergenceProgram);
      gl!.uniform2f(gl!.getUniformLocation(divergenceProgram, "u_texelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(divergenceProgram, "u_velocity"), velocity.read.attach(0));

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, divergence.fbo);
      gl!.viewport(0, 0, divergence.width, divergence.height);
      initAttribute(divergenceProgram);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);

      // 7. Solve Pressure (Jacobi Iterations)
      gl!.useProgram(pressureProgram);
      gl!.uniform2f(gl!.getUniformLocation(pressureProgram, "u_texelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(pressureProgram, "u_divergence"), divergence.attach(0));

      // Clear pressure FBOs to zero
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, pressure.read.fbo);
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);

      // 20 Iterations for refined fluid realism
      for (let i = 0; i < 20; i++) {
        gl!.uniform1i(gl!.getUniformLocation(pressureProgram, "u_pressure"), pressure.read.attach(1));
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, pressure.write.fbo);
        gl!.viewport(0, 0, pressure.read.width, pressure.read.height);
        initAttribute(pressureProgram);
        gl!.drawArrays(gl!.TRIANGLES, 0, 6);
        pressure.swap();
      }

      // 8. Gradient Subtract to project divergence-free velocity
      gl!.useProgram(gradSubProgram);
      gl!.uniform2f(gl!.getUniformLocation(gradSubProgram, "u_texelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(gradSubProgram, "u_pressure"), pressure.read.attach(0));
      gl!.uniform1i(gl!.getUniformLocation(gradSubProgram, "u_velocity"), velocity.read.attach(1));

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, velocity.write.fbo);
      gl!.viewport(0, 0, velocity.read.width, velocity.read.height);
      initAttribute(gradSubProgram);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      velocity.swap();

      // 9. Display Fluid on Screen
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.clearColor(0.0, 0.0, 0.0, 0.0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);

      gl!.useProgram(displayProgram);
      gl!.uniform1i(gl!.getUniformLocation(displayProgram, "u_source"), density.read.attach(0));
      initAttribute(displayProgram);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(update);
    }

    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);

      // Clean up WebGL resources cleanly
      if (gl) {
        gl.deleteBuffer(vertexBuffer);
        gl.deleteProgram(splatProgram);
        gl.deleteProgram(advectionProgram);
        gl.deleteProgram(divergenceProgram);
        gl.deleteProgram(curlProgram);
        gl.deleteProgram(vorticityProgram);
        gl.deleteProgram(pressureProgram);
        gl.deleteProgram(gradSubProgram);
        gl.deleteProgram(displayProgram);
      }
    };
  }, []);

  return (
    <>
      {/* Invisible SVG definition for masking */}
      <svg
        className="pointer-events-none fixed inset-0 w-full h-full"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <defs>
          <mask id="fluid-text-mask" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100%" height="100%" fill="black" />
            <text
              ref={textMaskRef}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
            >
              Al-Hammad
            </text>
          </mask>
        </defs>
      </svg>

      <canvas
        ref={canvasRef}
        id="fluid-canvas"
        className="fixed inset-0 w-screen h-screen pointer-events-none z-[9999] mix-blend-mode-difference transition-opacity duration-300"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          mask: "url(#fluid-text-mask)",
          WebkitMask: "url(#fluid-text-mask)",
        }}
      />
    </>
  );
}
