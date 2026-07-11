# 💿 Baúl de Recuerdos — Disco de Oro Interestelar — Tasks para desarrollo

> **Nota para la IA que desarrolle esto:** este documento es la especificación completa del proyecto. Sigue las tareas en orden. No agregues cifrados, acertijos, ni pasos de "descifrar" — es una página de scroll/lectura con un disco central interactivo. Si algo no está especificado (ej. texto exacto de cada recuerdo), usa un placeholder claro marcado como `TODO:` para que el usuario lo reemplace después.

---

## 🎯 Objetivo del proyecto

Página web de una sola pantalla (single-page), estática, publicable en GitHub Pages, que presenta una carta/baúl de recuerdos con la temática del **Disco de Oro de las sondas Voyager** (1977): un objeto dorado lanzado al espacio como cápsula del tiempo, con sonidos, imágenes y mensajes de la Tierra "por si alguien lo encuentra". Aquí el disco es la relación: cada surco/track del disco es un recuerdo compartido. La experiencia central es un **disco dorado giratorio** que funciona como índice — cada "pista" que se selecciona revela una sección de recuerdo en el scroll.

**Metáfora guía:** en vez de una carta lineal, es una cápsula del tiempo. El usuario "reproduce" el disco y cada recuerdo es una pista de audio/imagen/dato que la Voyager real llevó, pero reinterpretada como un recuerdo de la pareja.

---

## 🛠️ Stack técnico (fijo, no cambiar)

- HTML5 + CSS3 + JavaScript vanilla (sin frameworks, sin build step)
- **GSAP** + plugin **ScrollTrigger**, importados vía CDN (no npm, no bundler):
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  ```
- Sin dependencias externas adicionales salvo, opcionalmente, una fuente de Google Fonts vía `<link>`
- Debe funcionar abriendo `index.html` directamente y también al desplegarse en GitHub Pages (rutas relativas, nada de rutas absolutas tipo `/assets/...`)
- Responsive: debe verse bien en móvil (viewport meta tag, media queries)

---

## 📁 Estructura de archivos (crear exactamente así)

```
/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── img/
    │   ├── disco-oro.png      (placeholder: textura/ilustración del disco dorado)
    │   ├── portada-diagrama.png  (placeholder: la "portada" con diagramas, ver Fase 1)
    │   └── foto-recuerdo-01.jpg ... foto-recuerdo-05.jpg  (placeholders de fotos de la pareja)
    └── audio/
        └── (opcional) pista-01.mp3 ... (placeholders si se decide incluir audio real)
```

---

## 📋 Fase 1 — Contenido y estructura narrativa

El disco de oro real llevaba: sonidos de la Tierra, saludos en 55 idiomas, música, y una portada grabada con instrucciones (diagrama del átomo de hidrógeno, mapa de púlsares, cómo reproducir el disco). Aquí se traduce así:

- [ ] **Sección 0 — Portada / instrucciones grabadas**: recreación visual estilo "diagrama técnico" (líneas finas, estilo grabado) que en vez de instrucciones de reproducción reales, muestra algo como "coordenadas" del inicio de la relación (fecha, lugar) dibujadas como si fueran un mapa de púlsares. Texto: `TODO: [fecha/lugar de origen de la relación estilizado como coordenadas]`
- [ ] **Sección 1 — El lanzamiento**: apertura poética, tema "esto se lanza al espacio para que dure para siempre, más allá del tiempo". `TODO: [texto de apertura]`
- [ ] **Sección 2 — El disco (interactivo)**: el disco dorado central, girando, con 5 "surcos" o pistas seleccionables (ver Fase 3). Cada pista al activarse hace scroll/despliega su recuerdo correspondiente
- [ ] **Secciones 3 a 7 — Las 5 pistas del disco**, cada una un recuerdo distinto, siguiendo el espíritu real del disco:
  1. **"Sonidos de la Tierra"** → recuerdo asociado a un sonido/canción significativa para la pareja. `TODO: [recuerdo + nombre de canción]`
  2. **"Saludos en varios idiomas"** → recuerdo de las primeras palabras/mensajes que se dijeron, quizás mostrando esa frase en 2-3 idiomas como guiño. `TODO: [primeras palabras o mensaje inicial]`
  3. **"Imágenes de la Tierra"** → una foto/recuerdo visual importante (ej. primera cita, viaje). `TODO: [foto + descripción]`
  4. **"Música"** → un recuerdo ligado a un momento especial (concierto, canción que tocaron juntos, dato de piano/bossa nova si aplica). `TODO: [recuerdo musical]`
  5. **"Mensaje del presidente / la humanidad"** → aquí el mensaje final y más directo de amor, a modo de "mensaje oficial" pero íntimo. `TODO: [mensaje final]`
- [ ] **Sección 8 — Cierre**: texto tipo "si encuentras esto dentro de mil millones de años, sabrás que existimos, y que esto es real" + firma y fecha. `TODO: [firma]`, `TODO: [fecha]`

---

## 🎨 Fase 2 — Diseño visual (specs exactas)

- [ ] **Paleta de colores** (variables CSS en `:root`):
  - `--bg-space: #05050a` (negro espacio profundo, casi sin azul)
  - `--gold: #d4af37` (dorado disco, color principal de acento)
  - `--gold-light: #f4e4a1` (reflejos/brillos del disco)
  - `--copper: #b87333` (detalles secundarios, aluminio/cobre de la carcasa real de la Voyager)
  - `--text-light: #f5f5f0`
- [ ] **Tipografía**:
  - Títulos y "mensajes oficiales": serif elegante (ej. `"Playfair Display"`)
  - Datos técnicos, "coordenadas", diagramas: monoespaciada (ej. `"JetBrains Mono"`), simulando texto grabado/técnico
- [ ] **El disco dorado**: círculo central con textura de surcos concéntricos (usar `repeating-radial-gradient` en CSS o SVG de anillos), color dorado con leve gradiente metálico, aspecto de "grabado" real
- [ ] **Portada grabada (Sección 0)**: fondo claro tipo aluminio/plata, líneas finas negras estilo diagrama técnico (se puede lograr con SVG simple: líneas, círculos, texto monoespaciado simulando el estilo real de la portada del disco Voyager, pero con los datos propios de la pareja en vez de datos científicos reales)
- [ ] **Fondo estrellado** en todas las secciones excepto la portada (que debe verse como "metal", no espacio)
- [ ] Fotos de recuerdos: bordes con efecto "placa grabada" (marco dorado fino, esquinas redondeadas sutiles, quizás un leve `sepia()` o filtro cálido para dar sensación de cápsula del tiempo)

---

## ⚙️ Fase 3 — El disco interactivo (núcleo de la experiencia)

- [ ] Construir el disco como un elemento circular (`<div class="disco">` o SVG) centrado en su propia sección, con **rotación continua lenta** vía GSAP (`gsap.to(".disco", { rotation: 360, repeat: -1, ease: "none", duration: 20 })`)
- [ ] Sobre/alrededor del disco, colocar 5 puntos o etiquetas clicables, uno por cada "pista" (las 5 de la Fase 1)
- [ ] Al hacer click/tap en una pista:
  - [ ] El disco frena su rotación suavemente (`gsap.to` bajando la velocidad, no un corte abrupto)
  - [ ] Se activa un scroll suave (`window.scrollTo` o `gsap.to(window, { scrollTo: ... })`) hacia la sección de ese recuerdo
  - [ ] Opcional: un pequeño brillo/pulso en el punto seleccionado (`gsap.to` con `scale` y `opacity` en loop breve)
- [ ] El disco vuelve a girar automáticamente al terminar la interacción (después de unos segundos sin actividad)

---

## 🌌 Fase 4 — Animaciones y comportamiento general (GSAP)

- [ ] Registrar el plugin al inicio del script: `gsap.registerPlugin(ScrollTrigger);`
- [ ] Cada `<section>` de recuerdo aparece con fade-in + leve desplazamiento vertical (`y: 40 → 0`, `opacity: 0 → 1`) usando `gsap.from()` con `scrollTrigger: { trigger: section, start: "top 80%" }`
- [ ] Estrellas de fondo generadas dinámicamente por JS (cantidad fija, ej. 120), con parpadeo vía `gsap.to()` en loop (`repeat: -1, yoyo: true`, duración y delay aleatorios por estrella)
- [ ] Parallax sutil del fondo estrellado ligado a scroll (`gsap.to()` con `scrollTrigger: { scrub: true }`)
- [ ] En la sección de cierre, sutil efecto de "alejamiento" (la nave/disco empequeñece y se aleja, simulando que se pierde en el espacio) usando `scale` decreciente ligado a scroll
- [ ] Sin botones de formulario, sin inputs de texto — la única interacción es el click en las pistas del disco y el scroll

---

## ✅ Fase 5 — Checklist de calidad antes de entregar

- [ ] La página abre correctamente con doble clic en `index.html` (sin servidor local)
- [ ] Todas las rutas de assets son relativas
- [ ] Se ve bien en una ventana de escritorio y en un viewport móvil (~375px de ancho)
- [ ] El disco es clicable/tocable también en móvil (verificar que los 5 puntos de pista tengan suficiente área de toque, mínimo 44x44px)
- [ ] No hay JavaScript roto en consola (probar abriendo devtools)
- [ ] Los CDNs de GSAP y ScrollTrigger cargan correctamente (revisar Network tab si algo no anima)
- [ ] No quedó ningún cifrado, acertijo, ni mecánica de "resolver algo" — solo lectura, scroll, y selección de pistas del disco
- [ ] Todos los `TODO:` están claramente marcados para que el usuario los complete

---

## 🚀 Fase 6 — Publicación en GitHub Pages

- [ ] Repo con `index.html` en la raíz (o en `/docs` si se prefiere esa configuración)
- [ ] Activar GitHub Pages desde Settings → Pages, apuntando a la rama y carpeta correspondiente
- [ ] Verificar que el sitio publicado carga imágenes y estilos correctamente (revisar rutas relativas una vez más, es el error más común)

---

## 💡 Opcional (solo si sobra tiempo, no es requisito)

- [ ] Si se cuenta con clips de audio reales y cortos, reproducir un snippet al seleccionar la pista "Sonidos de la Tierra" (con control de volumen visible, nunca autoplay con sonido)
- [ ] Pequeño contador estilo "distancia recorrida" (ej. "X días juntos") calculado por JS a partir de una fecha fija, mostrado como dato técnico cerca del disco
- [ ] Efecto de "aguja" o brazo lector que se mueve levemente sobre el disco al girar, como un tocadiscos real
