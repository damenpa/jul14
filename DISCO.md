# Instrucciones: Recrear la portada del Voyager Golden Record con HTML + CSS + JS

## 0. Objetivo

Construir una réplica visual e interactiva de la **cubierta grabada del Voyager Golden Record**
(el disco de oro anodizado con instrucciones de reproducción, enviado en las sondas Voyager 1 y 2 en 1977).
Es una imagen circular, dorada, sobre fondo negro, con varios diagramas grabados en líneas finas
color crema/blanco. Es una obra del gobierno de EE.UU. (NASA/JPL), de dominio público, así que no
hay restricción de derechos de autor para recrearla.

Stack sugerido: **HTML + SVG inline + CSS + JS** (SVG es ideal porque todo el arte es líneas,
círculos y formas geométricas vectoriales). Alternativa: `<canvas>` con dibujo procedural en JS.

---

## 1. Estructura general del lienzo

- Contenedor cuadrado, ej. `viewBox="0 0 850 850"`.
- Fondo: **negro puro** (`#000`), con opción de textura de "estrellas" (puntos blancos aleatorios,
  muy tenues, generados con JS: `for` loop creando `<circle r="0.5-1.5" opacity="0.1-0.6">` en
  posiciones aleatorias fuera del disco).
- Disco central: un **círculo dorado** que ocupa ~90% del lienzo.
  - Color: gradiente radial/diagonal que simule metal grabado y con reflejos:
    tonos de `#8a6d1f`, `#c9a227`, `#e8c96a`, `#4a3a10`, con algunas zonas más oscuras
    (manchas irregulares tipo "nube", simulando el desgaste/pátina real de la foto).
  - Sugerencia CSS/SVG: usar un `<radialGradient>` o `<linearGradient>` con 4-6 `stop` en tonos
    dorados, más un filtro de ruido (`feTurbulence` + `feColorMatrix`) para dar textura metálica,
    y un pequeño destello (`highlight`) puntual arriba a la derecha (brillo especular, círculo blanco
    difuminado con `feGaussianBlur`).
  - Un pequeño agujero circular en el centro (el orificio real del disco de vinilo), color negro,
    ligeramente desplazado del centro geométrico hacia la izquierda-abajo del centro del lienzo.

- Todos los diagramas grabados van en color **crema/blanco muy pálido** (`#f5efe0` o similar),
  trazo fino (`stroke-width: 1-2`), sin relleno (`fill: none`), como si estuvieran grabados con láser.

---

## 2. Elementos gráficos (de arriba-izquierda a abajo-derecha)

Usa coordenadas relativas al disco (que ocupa aprox. de x=60 a x=790, y=60 a y=790, con centro en ~(425,425)).

### 2.1 Diagrama de reproducción del disco (arriba-izquierda)
- Un círculo grande punteado con líneas radiales cortas (como marcas de "pista" de un tocadiscos).
- Dentro, un puntito central pequeño con un anillo (representa el eje del tocadiscos).
- Sobre el borde del círculo, un pequeño ícono rectangular (representa el **brazo/cartucho con aguja**
  del tocadiscos, mostrando desde dónde empezar a reproducir — desde afuera hacia adentro).
- Construcción sugerida:
  ```js
  // círculo punteado con guiones radiales
  const cx = 210, cy = 250, r = 90;
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * 2 * Math.PI;
    // dibuja un segmento corto tangente al círculo en cada ángulo
  }
  ```

### 2.2 Forma de onda de audio (arriba-derecha)
- Una espiral/resorte (representando una onda sinusoidal comprimida, símbolo de "esto es una onda de audio")
  seguida de una **forma de onda compleja** (picos irregulares, como un oscilograma real de música).
- Encima de esta forma de onda: pequeñas marcas verticales agrupadas en secuencias con etiquetas "I", "I", "II"
  (números binarios/unarios que indican tiempos de reproducción en unidades de referencia — ver sección 2.7).
- Debajo, una fila de rectángulos verticales delgados tipo "código de barras" (representa el código
  binario que indica la velocidad correcta de rotación, 16⅔ rpm).
- Construcción sugerida con SVG `<path>`:
  ```html
  <path d="M x0 y0 C ... " stroke="#f5efe0" fill="none" stroke-width="1.5"/>
  ```
  Generar los puntos del oscilograma con una función JS que combine varias senoidales de distinta
  frecuencia/amplitud + ruido controlado, para simular una forma de onda musical real.

### 2.3 Diagrama de imagen de calibración (dientes de sierra) — medio-derecha
- Dos o tres formas de "diente de sierra" (zigzag ascendente-caída abrupta) con pequeños círculos
  marcando puntos sobre cada rampa. Representa cómo convertir la señal de audio en líneas de una imagen
  (barrido horizontal tipo TV).
- Encima, etiquetas "I", "I", "II" igual que en 2.2 (referencian el mismo sistema de tiempo binario).

### 2.4 Primera imagen de calibración (rectángulo con líneas verticales)
- Un cuadrado/rectángulo con líneas verticales paralelas dentro (como un patrón de barras),
  representa la **primera imagen de prueba** que se vería si el disco se reproduce y decodifica
  correctamente como imagen (una especie de "test pattern").

### 2.5 Segunda imagen de calibración (rectángulo con círculo)
- Debajo del anterior: un rectángulo con un **círculo perfecto centrado** dentro. Representa la imagen
  de calibración #2: si el círculo sale perfectamente redondo, la imagen se decodificó bien
  (si sale ovalado, algo está mal calibrado).

### 2.6 Mapa de púlsares (abajo-izquierda)
- Una línea horizontal larga con múltiples líneas radiales delgadas de distintas longitudes y ángulos
  que emergen de un punto (parecen un "sol" o asterisco irregular). Representa el **mapa de púlsares**:
  la posición del Sol respecto a 14 púlsares conocidos, usado para que una civilización futura pueda
  ubicar el origen de la nave en el espacio-tiempo (las longitudes de las líneas codifican, en binario,
  los periodos de los púlsares).
- Construcción: elegir 14-15 ángulos distintos desde un punto de origen (~x=260,y=650) y trazar líneas
  de distinto largo (25 a 220 px) en cada ángulo, más una línea horizontal larga y recta que actúa
  como eje de referencia (marca el centro galáctico).
- Encima de este mapa, hacia la izquierda, un pequeño diagrama binario horizontal (línea con marcas
  tipo código de barras + el ícono del cartucho/aguja) que indica el **tiempo que dura un lado del
  disco** en el sistema de referencia temporal universal (ver 2.7).

### 2.7 Referencia de tiempo/unidad binaria (abajo-derecha)
- Dos círculos pequeños unidos por una línea horizontal, con un par de marcas verticales cortas
  encima de la línea entre ambos círculos.
- Representa la **transición hiperfina del átomo de hidrógeno** (1,420 MHz, periodo ~0.7 nanosegundos):
  la unidad fundamental de tiempo y longitud usada para "traducir" todos los códigos binarios del disco
  (por qué duran las cosas, qué tan grande es una pulgada, etc.), asumiendo que cualquier civilización
  avanzada conoce esta constante física universal.

---

## 3. Paleta de colores sugerida

| Elemento | Color |
|---|---|
| Fondo | `#000000` |
| Disco (base) | gradiente `#3d2f0d → #caa53a → #f0d878 → #3a2a08` |
| Grabados/líneas | `#f5eeda` (blanco cálido, opacidad 0.85-1) |
| Brillo especular | `#fff8e0` con blur, opacidad baja |
| Agujero central | `#000000` |

---

## 4. Estructura de archivos sugerida

```
/voyager-record
  index.html      -> contenedor + <svg> o <canvas>, carga styles.css y main.js
  styles.css      -> fondo, centrado, tamaño responsivo del lienzo
  main.js         -> funciones separadas por diagrama:
                       drawDisc(), drawPlaybackDiagram(), drawWaveform(),
                       drawSawtooth(), drawCalibrationImages(),
                       drawPulsarMap(), drawHydrogenReference(), drawStars()
```

## 5. Recomendaciones técnicas

1. **Usa SVG**, no imágenes rasterizadas: todo el arte original son trazos vectoriales grabados,
   así que un `<svg>` con `<path>`, `<circle>`, `<line>` reproduce fielmente el estilo y escala sin pérdida.
2. Genera las formas de onda y el mapa de púlsares **proceduralmente en JS** (arrays de puntos con algo
   de aleatoriedad controlada/seed fija), no las calques a mano — así el resultado es editable y escalable.
3. Aplica un filtro SVG (`feTurbulence` + `feDisplacementMap` o `feColorMatrix`) sobre el disco dorado
   para simular el efecto de metal grabado con textura granulada, como en la foto real.
4. Mantén proporciones relativas (usa `viewBox`, no píxeles fijos) para que sea responsivo.
5. Opcional: anima sutilmente el brillo especular (un `<circle>` con blur que se desplaza lentamente)
   para dar sensación de "objeto físico" real bajo luz.
6. Opcional (interactividad): al hacer clic sobre cada diagrama, mostrar un tooltip/panel explicando
   su significado real (basado en las descripciones de la sección 2), a modo de mini-experiencia educativa.

---

## 6. Contexto histórico (para tooltips o texto explicativo, si se desea)

El Voyager Golden Record es un disco de fonógrafo de cobre bañado en oro, incluido en las sondas
Voyager 1 y 2 (lanzadas en 1977), que contiene sonidos e imágenes seleccionados para representar
la vida y la cultura humanas ante una posible civilización extraterrestre que lo encuentre. La cubierta
metálica (lo que se debe recrear aquí) incluye instrucciones pictóricas de cómo reproducirlo, decodificar
audio e imágenes, un mapa de púlsares para ubicar el origen de la nave, y la referencia de tiempo basada
en la transición hiperfina del hidrógeno.