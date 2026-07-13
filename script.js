gsap.registerPlugin(ScrollTrigger);

function rand(min, max) { return Math.random() * (max - min) + min; }
function randInt(min, max) { return Math.floor(rand(min, max)); }
function pick(arr) { return arr[randInt(0, arr.length)]; }

function initCohete() {
  const intro = document.getElementById("intro-cohete");
  const cohete = document.getElementById("cohete");
  const pantalla = document.getElementById("pantalla-disco");
  const llama = cohete.querySelector(".cohete-llama");
  const llamaInner = cohete.querySelector(".cohete-llama-inner");
  const llamaCore = cohete.querySelector(".cohete-llama-core");
  const llamaGlow = cohete.querySelector(".cohete-llama-glow");

  
  initEspacio("stars-intro");

  const tl = gsap.timeline({
    onComplete: () => {
      intro.style.display = "none";
    }
  });

  
  tl.from("#stars-intro .star", { opacity: 0, duration: 0.5, stagger: { amount: 0.8, from: "random" } }, 0);
  tl.from(".intro-cohete .nebula", { opacity: 0, scale: 0.8, duration: 1.2, stagger: 0.15, ease: "power2.out" }, 0);
  tl.from(".intro-cohete .galaxia", { opacity: 0, scale: 0, rotation: -90, duration: 1.0, stagger: 0.1, ease: "power2.out" }, 0.2);
  tl.from(".intro-cohete .galaxia-espiral", { opacity: 0, scale: 0, duration: 1.0, stagger: 0.1, ease: "power2.out" }, 0.3);
  tl.from(".intro-cohete .agujero-negro", { opacity: 0, scale: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" }, 0.4);

  
  tl.fromTo(".intro-grid", { opacity: 0 }, { opacity: 0.12, duration: 0.8 }, 0);

  
  tl.from(cohete, { scale: 0.3, opacity: 0, duration: 0.6, ease: "back.out(1.5)" }, 0.3);

  
  tl.to([llama, llamaInner, llamaCore, llamaGlow], {
    scaleY: 1.8, scaleX: 1.3, duration: 0.12,
    repeat: 10, yoyo: true, ease: "steps(1)",
  }, 0.9);

  
  tl.to([llama, llamaGlow], {
    filter: "drop-shadow(0 0 30px #ff6b35) drop-shadow(0 0 60px #ff3b00)",
    duration: 0.4, repeat: 5, yoyo: true,
  }, 0.9);

  
  tl.to(".intro-cohete .nebula", {
    opacity: 0.08, scale: 1.2, duration: 0.6, stagger: 0.05,
  }, 1.5);

  
  tl.to(cohete, {
    y: -900, duration: 1.0, ease: "power3.in",
    onStart: () => {
      
      gsap.to(document.body, {
        x: () => rand(-6, 6), y: () => rand(-5, 5),
        duration: 0.03, repeat: 30, yoyo: true,
        ease: "none",
        onComplete: () => gsap.set(document.body, { x: 0, y: 0 }),
      });
      
      gsap.to(intro, {
        backgroundColor: "#1a1020",
        duration: 0.08, repeat: 6, yoyo: true,
        ease: "none",
        onComplete: () => gsap.set(intro, { backgroundColor: "#050608" }),
      });
    },
  }, 2.1);

  
  tl.to([".intro-cohete .nebula", ".intro-cohete .galaxia", ".intro-cohete .galaxia-espiral", ".intro-cohete .agujero-negro", "#stars-intro"], {
    opacity: 0, duration: 0.4, stagger: 0.03,
  }, "-=0.8");
  tl.to(".intro-grid", { opacity: 0, duration: 0.3 }, "-=0.6");

  
  tl.to(intro, { opacity: 0, duration: 0.3, ease: "none" }, "-=0.2");

  
  tl.call(() => {
    pantalla.classList.remove("oculto");
    intro.style.display = "none";
    initEspacio("stars-container");
    initDisco();
    initHUDS();
  });

  
  tl.from("#disco-principal", {
    scale: 0, opacity: 0, rotation: -180,
    duration: 1.0, ease: "back.out(1.4)",
  });

  
  tl.from([".disco-ring-outer", ".disco-ring-mid"], {
    scale: 0, opacity: 0, duration: 0.7,
    stagger: 0.12, ease: "power2.out",
  }, "-=0.5");

  
  tl.from(".disco-glow", { opacity: 0, scale: 0.5, duration: 0.5 }, "-=0.3");

  
  tl.from([".galaxia", ".galaxia-espiral", ".agujero-negro"], {
    scale: 0, opacity: 0, duration: 0.8,
    stagger: 0.08, ease: "power2.out",
  }, "-=0.4");

  
  tl.from(".hud-superior", { y: -40, opacity: 0, duration: 0.4, ease: "power2.out" }, "-=0.3");
  tl.from(".hud-inferior", { y: 40, opacity: 0, duration: 0.4, ease: "power2.out" }, "-=0.3");
  tl.from(".hud-izquierdo", { x: -40, opacity: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");
  tl.from(".hud-derecho", { x: 40, opacity: 0, duration: 0.4, ease: "power2.out" }, "-=0.3");

  
  tl.from("#disco-instruccion", { opacity: 0, y: 10, duration: 0.3 });

  
  tl.from(".deco-corner", { scale: 0, opacity: 0, duration: 0.3, stagger: 0.05 }, "-=0.3");

  
  tl.call(() => {
    gsap.to("#disco-wrapper", {
      y: -8, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
    gsap.to(".disco-glow", {
      scale: 1.08, opacity: 0.8, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
  });
}

function initEspacio(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  
  for (let i = 0; i < 120; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = rand(0.5, 2);
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = rand(0, 100) + "%";
    star.style.top = rand(0, 100) + "%";
    container.appendChild(star);

    gsap.to(star, {
      opacity: rand(0.03, 0.25),
      duration: rand(3, 7),
      repeat: -1, yoyo: true, ease: "sine.inOut",
      delay: rand(0, 5),
    });
  }

  
  for (let i = 0; i < 5; i++) {
    const el = document.createElement("div");
    el.classList.add("evento-espacial", "ev-asteroide");
    el.style.left = rand(5, 95) + "%";
    el.style.top = rand(5, 95) + "%";
    container.appendChild(el);
    gsap.to(el, {
      x: "+=" + rand(-80, 80), y: "+=" + rand(-60, 60),
      rotation: rand(0, 360), duration: rand(30, 60),
      repeat: -1, yoyo: true, ease: "sine.inOut",
    });
  }

  
  for (let i = 0; i < 3; i++) {
    const el = document.createElement("div");
    el.classList.add("evento-espacial", "ev-senal");
    el.style.left = rand(10, 90) + "%";
    el.style.top = rand(10, 90) + "%";
    container.appendChild(el);
    gsap.to(el, {
      opacity: 0.5, scale: rand(1, 2), duration: rand(2, 5),
      repeat: -1, yoyo: true, ease: "sine.inOut",
      delay: rand(0, 4),
    });
  }

  
  for (let i = 0; i < 8; i++) {
    const el = document.createElement("div");
    el.classList.add("evento-espacial", "ev-polvo");
    el.style.left = rand(0, 100) + "%";
    el.style.top = rand(-10, 100) + "%";
    container.appendChild(el);
    gsap.to(el, {
      y: "+=120", opacity: 0, duration: rand(6, 12),
      repeat: -1, ease: "none", delay: rand(0, 6),
    });
  }

  
  for (let i = 0; i < 3; i++) {
    const el = document.createElement("div");
    el.classList.add("evento-espacial", "ev-cometa");
    el.style.top = rand(10, 80) + "%";
    el.style.left = "-50px";
    container.appendChild(el);
    gsap.to(el, {
      x: window.innerWidth + 100,
      y: "+=" + rand(-100, 100),
      opacity: 0.4, duration: rand(4, 8),
      repeat: -1, ease: "none",
      delay: rand(3, 12),
      onRepeat: () => {
        gsap.set(el, { left: "-50px", top: rand(10, 80) + "%", y: 0 });
      },
    });
  }

  
  for (let i = 0; i < 2; i++) {
    const el = document.createElement("div");
    el.classList.add("evento-espacial", "ev-cometa-grande");
    el.style.top = rand(15, 75) + "%";
    el.style.left = "-100px";
    container.appendChild(el);
    gsap.to(el, {
      x: window.innerWidth + 150,
      y: "+=" + rand(-150, 150),
      opacity: 0.5, duration: rand(6, 12),
      repeat: -1, ease: "none",
      delay: rand(8, 20),
      onRepeat: () => {
        gsap.set(el, { left: "-100px", top: rand(15, 75) + "%", y: 0 });
      },
    });
  }

  
  for (let i = 0; i < 3; i++) {
    const el = document.createElement("div");
    el.classList.add("evento-espacial", "ev-ovni");
    el.style.top = rand(10, 85) + "%";
    el.style.left = "-30px";
    const luz = document.createElement("div");
    luz.classList.add("ev-ovni-luz");
    el.appendChild(luz);
    container.appendChild(el);
    gsap.to(el, {
      x: window.innerWidth + 50,
      y: "+=" + rand(-80, 80),
      opacity: 0.25, duration: rand(10, 18),
      repeat: -1, ease: "none",
      delay: rand(5, 15),
      onRepeat: () => {
        gsap.set(el, { left: "-30px", top: rand(10, 85) + "%", y: 0 });
      },
    });
  }

  
  for (let i = 0; i < 4; i++) {
    const el = document.createElement("div");
    el.classList.add("evento-espacial", "ev-marcianito");
    el.style.left = rand(5, 95) + "%";
    el.style.top = rand(5, 95) + "%";
    container.appendChild(el);
    gsap.to(el, {
      opacity: rand(0.08, 0.2),
      y: "+=" + rand(-15, 15),
      rotation: rand(-10, 10),
      duration: rand(4, 8),
      repeat: -1, yoyo: true, ease: "sine.inOut",
      delay: rand(0, 5),
    });
  }
}

function initHUDS() {
  const signalBar = document.getElementById("signal-bar");
  const decodeStatus = document.getElementById("decode-status");
  const hudCoords = document.getElementById("hud-coords");
  const hudDec = document.getElementById("hud-dec");
  const hudTrk = document.getElementById("hud-trk");
  const hudBpm = document.getElementById("hud-bpm");
  const hudTime = document.getElementById("hud-time");
  const hudLatency = document.getElementById("hud-latency");

  
  gsap.to(signalBar, {
    width: () => rand(60, 95) + "%", duration: 2,
    repeat: -1, yoyo: true, ease: "sine.inOut",
  });

  
  setInterval(() => {
    const h = randInt(0, 24);
    const m = randInt(0, 60);
    const s = randInt(0, 60);
    hudCoords.textContent = `RA ${h}h ${m}m ${s}.0s`;
  }, 3000);

  setInterval(() => {
    const deg = randInt(-90, 0);
    const min = randInt(0, 60);
    const sec = randInt(0, 60);
    hudDec.textContent = `${deg}° ${min}' ${sec}.1"`;
  }, 4000);

  
  setInterval(() => {
    hudLatency.textContent = `${rand(1, 8).toFixed(1)}ms`;
  }, 2000);

  
  setInterval(() => {
    hudBpm.textContent = randInt(60, 140);
  }, 2500);

  
  setInterval(() => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    const ms = String(now.getMilliseconds()).padStart(3, "0");
    hudTime.textContent = `${h}:${m}:${s}.${ms}`;
  }, 50);

  
  const statuses = ["EN ESPERA", "ADQUISICIÓN", "BLOQUEADO", "DECOFRADO", "COMPLETADO", "ERROR", "REINICIO"];
  setInterval(() => {
    decodeStatus.textContent = pick(statuses);
    decodeStatus.style.color = pick(["var(--amber)", "var(--green)", "var(--cyan)", "var(--red)"]);
  }, 3000);
}

let discoTween = null;
let clickCount = 0;
let transitioning = false;
const CLICKS_MAX = 7;

const MENSAJES = [
  "un poco más...",
  "ya casi...",
  "casi lo tienes...",
  "sigue ahí...",
  "tan cerca...",
  "uno más...",
  "¡ahí va!",
];

function initDisco() {
  const disco = document.getElementById("disco-principal");
  const wrapper = document.getElementById("disco-wrapper");
  const instruccion = document.getElementById("disco-instruccion");
  const counterDisplay = document.getElementById("click-count-display");

  if (!disco || !wrapper) return;

  drawVoyagerDisc("disco-principal");

  
  discoTween = gsap.to(disco, {
    rotation: 360, repeat: -1, ease: "none", duration: 30,
  });

  
  createDiscParticles();

  
  wrapper.addEventListener("click", () => {
    if (transitioning) return;
    clickCount++;
    counterDisplay.textContent = clickCount;

    

    
    gsap.fromTo(wrapper,
      { scale: 0.92 },
      { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }
    );

    
    const flash = document.createElement("div");
    flash.style.cssText = `
      position: absolute; inset: -20px; border-radius: 50%;
      border: 2px solid var(--green);
      pointer-events: none; z-index: 100;
    `;
    wrapper.appendChild(flash);
    gsap.fromTo(flash,
      { opacity: 0.8, scale: 0.8 },
      { opacity: 0, scale: 1.5, duration: 0.5, ease: "power2.out", onComplete: () => flash.remove() }
    );

    
    gsap.to(document.body, {
      x: () => rand(-4, 4), y: () => rand(-3, 3),
      duration: 0.04, repeat: 6, yoyo: true, ease: "none",
      onComplete: () => gsap.set(document.body, { x: 0, y: 0 }),
    });

    
    emitParticles(wrapper);

    
    gsap.to(discoTween, {
      timeScale: 3 + clickCount, duration: 0.3, ease: "power2.out",
      onComplete: () => {
        gsap.to(discoTween, {
          timeScale: 1, duration: 1, ease: "power2.inOut",
        });
      },
    });

    
    gsap.to(".disco-glow", {
      scale: 1.2 + clickCount * 0.05, opacity: 1,
      duration: 0.2, yoyo: true, repeat: 1,
    });

    
    gsap.to(".disco-ring-outer", {
      borderColor: "var(--green)", duration: 0.2,
      yoyo: true, repeat: 1,
    });

    
    const decodeStatus = document.getElementById("decode-status");
    if (decodeStatus) {
      decodeStatus.textContent = `CLICK #${clickCount}`;
      decodeStatus.style.color = "var(--green)";
    }

    
    if (instruccion && clickCount < CLICKS_MAX) {
      instruccion.textContent = MENSAJES[clickCount - 1] || "...";
      gsap.fromTo(instruccion,
        { opacity: 0, y: 5 },
        { opacity: 0.6, y: 0, duration: 0.3 }
      );
    }

    
    if (clickCount >= CLICKS_MAX) {
      transitioning = true;
      if (instruccion) {
        instruccion.textContent = ">>> DECODIFICANDO TRANSMISIÓN <<<";
        gsap.fromTo(instruccion,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, repeat: -1, yoyo: true }
        );
      }
      setTimeout(() => transicionAPantallaFinal(), 800);
    }
  });
}

function createDiscParticles() {
  const container = document.getElementById("disco-particles");
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const p = document.createElement("div");
    p.classList.add("disco-particle");
    p.style.left = "50%";
    p.style.top = "50%";
    container.appendChild(p);

    const angle = rand(0, Math.PI * 2);
    const dist = rand(130, 170);
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;

    gsap.to(p, {
      x: tx, y: ty, opacity: rand(0.1, 0.4),
      duration: rand(3, 6), repeat: -1, yoyo: true,
      ease: "sine.inOut", delay: rand(0, 4),
    });
  }
}

function emitParticles(wrapper) {
  for (let i = 0; i < 12; i++) {
    const p = document.createElement("div");
    p.style.cssText = `
      position: absolute; left: 50%; top: 50%;
      width: 3px; height: 3px; border-radius: 50%;
      background: ${pick(["var(--green)", "var(--amber)", "var(--cyan)", "#fff"])};
      pointer-events: none; z-index: 50;
      box-shadow: 0 0 6px currentColor;
    `;
    wrapper.appendChild(p);

    const angle = rand(0, Math.PI * 2);
    const dist = rand(80, 200);

    gsap.to(p, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      opacity: 0,
      scale: rand(0.5, 2),
      duration: rand(0.4, 0.8),
      ease: "power2.out",
      onComplete: () => p.remove(),
    });
  }
}

function transicionAPantallaFinal() {
  const pantallaDisco = document.getElementById("pantalla-disco");
  const pantallaFinal = document.getElementById("pantalla-final");

  gsap.to(discoTween, { timeScale: 0, duration: 0.5, ease: "power2.out" });

  
  const tl = gsap.timeline();

  tl.to(pantallaDisco, {
    filter: "hue-rotate(90deg) saturate(3)", duration: 0.1,
  });
  tl.to(pantallaDisco, {
    filter: "hue-rotate(-45deg) saturate(2) brightness(1.5)", duration: 0.1,
  });
  tl.to(pantallaDisco, {
    filter: "none", opacity: 0, duration: 0.4,
  });

  tl.call(() => {
    pantallaDisco.classList.add("oculto");
    pantallaFinal.classList.remove("oculto");
    initEspacio("stars-container-2");
  });

  tl.from(".hud-superior", { y: -40, opacity: 0, duration: 0.3, ease: "power2.out" });
  tl.from(".final-deco-top", { opacity: 0, scaleX: 0, duration: 0.4, ease: "power2.out" }, "-=0.1");
  tl.from(".final-columna", {
    y: 30, opacity: 0, duration: 0.5,
    stagger: 0.2, ease: "power2.out",
  }, "-=0.2");
  tl.from(".final-deco-bottom", { opacity: 0, y: 10, duration: 0.4, ease: "power2.out" }, "-=0.2");
  tl.from(".pantalla-final .deco-corner", {
    scale: 0, opacity: 0, duration: 0.3, stagger: 0.05, ease: "power2.out",
  }, "-=0.3");
}

document.addEventListener("DOMContentLoaded", () => {
  initCohete();
});
