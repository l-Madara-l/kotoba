# KOTOBA — 言葉
### *Aprende japonés. Piensa en japonés. Vive el idioma.*

> Plataforma educativa inmersiva, inteligente y con identidad visual japonesa para aprender japonés desde cero hasta nivel avanzado, diseñada específicamente para hispanohablantes.

---

## ⛩️ 1. Identidad Visual y Filosofía de Diseño

KOTOBA abandona por completo la estética genérica de un dashboard SaaS para ofrecer una atmósfera de **calma, disciplina y belleza editorial japonesa**:

* **Paleta tradicional de colores:**
  * **Rojo Torii (`#BC3A32`):** Inspirado en los portales sagrados shintoistas. Utilizado para acciones clave, sellos hanko y botones de avance.
  * **Tinta Sumi (`#202321`):** Color principal de los textos, tipografías kanji y contraste visual.
  * **Papel Washi (`#F5F0E6`):** Fondo principal cálido con microtextura de fibras naturales.
  * **Blanco Marfil (`#FFFCF5`):** Superficies de tarjetas, áreas de lectura y papel de caligrafía.
  * **Verde Musgo (`#66785F`):** Marcadores de progreso, estados dominados y naturaleza zen.
  * **Oro Antiguo (`#C6A15B`):** Insignias, consejos nemotécnicos y logros de constancia.
  * **Gris Piedra (`#D9D5CB`):** Cuadrículas caligráficas y divisores finos.
  * **Azul Índigo (`#334A68`):** Comprensión auditiva y estaciones de dictado.
* **Modo Oscuro («Tinta Nocturna»):** Fondo `#181B19`, superficies `#232724`, texto `#F5F0E6` y acento bermellón `#D65A50`.
* **Tipografía armónica:** Combinación de `Noto Serif JP`, `Noto Sans JP` e `Inter`.
* **Sellos Hanko (判子):** Insignias cuadradas talladas que certifican los hitos de aprendizaje.

---

## 📚 2. Metodología Pedagógica y Adquisición Lingüística

Respaldada por la investigación sobre retención mnémica y adquisición de segundas lenguas (SLA):

1. **Repetición Espaciada (SM-2):**
   * Cada kanji, palabra o estructura gramatical cuenta con métricas de intervalo, repetición y factor de facilidad (*ease factor*).
   * 4 calificaciones activas: *Otra vez (1d)*, *Difícil*, *Bien*, *Fácil*.
   * Si el usuario falla, la tarjeta reingresa a la cola de la sesión activa para consolidación inmediata.
2. **Recuperación Activa:** Ningún concepto depende solo de la lectura pasiva: el estudiante construye oraciones, completa dictados y dibuja caracteres sobre lienzo.
3. **Aprendizaje en Contexto Real:** Nunca palabras aisladas; cada término incluye oración modelo, audio y desglose de partículas (を, は, が, に, で).
4. **Diagnóstico Adaptativo de Errores:** El sistema detecta patrones recurrentes (como confundir は con が, に con で, o さ con き) y genera recomendaciones de refuerzo focalizadas.
5. **Inmersión Gradual:** Permite alternar la visualización de Romaji y Furigana con un solo clic conforme avanza la confianza del estudiante.

---

## 🏛️ 3. Módulos y Arquitectura de la Aplicación

### 1. Inicio & Evaluación Inicial (Onboarding)
* Diagnóstico de conocimientos previos (Hiragana, Katakana, Kanji).
* Selección de objetivo (Viaje, anime, manga, conversación, JLPT).
* Configuración de disponibilidad diaria (15, 30, 45, 60 minutos) y estilo de aprendizaje.

### 2. Panel Principal (Dashboard Editorial)
* Saludo contextual según la hora del día (`おはようございます`, `こんにちは`, `こんばんは`).
* Contador de racha diaria con llama de constancia.
* Tarjetas de Repetición Espaciada (SM-2) pendientes.
* Gráfico de actividad de los últimos 7 días.
* Alerta de diagnóstico adaptativo personalizado.

### 3. Ruta de Aprendizaje (8 Niveles)
* **Nivel 0:** Fundamentos, fonética de las 5 vocales puras, compás de mora y tres sistemas de escritura.
* **Nivel 1:** Hiragana completo (Gozyūon, dakuten, handakuten y combinaciones yōon).
* **Nivel 2:** Katakana y préstamos lingüísticos internacionales (gairaigo).
* **Nivel 3:** Japonés Básico (JLPT N5 Core: A は B です, partículas は, が, を, に, で, forma ます).
* **Nivel 4:** Conversación Cotidiana (pedir en restaurantes, konbini, pedir direcciones).
* **Nivel 5:** Gramática Intermedia (La fundamental forma て, peticiones y permisos).
* **Nivel 6:** Lectura Inmersiva (Historias adaptadas con glosario interactivo).
* **Nivel 7:** Japonés Avanzado (Introducción al Keigo: Sonkeigo vs Kenjougo).

### 4. Laboratorio de Escritura Japonesa (書道)
* Cuadrículas tradicionales de 4 cuadrantes.
* **Lienzo interactivo táctil y de ratón:** Simulación de trazo de pincel de tinta Sumi, orden numerado de trazos, botón de deshacer, borrador y guía semitransparente.
* Algoritmo de comprobación de cobertura y densidad de tinta.
* Mnemotecnias visuales para hispanohablantes y advertencias de confusión (ej. さ frente a き).

### 5. Entrenador de Vocabulario & Mazo SM-2
* Más de 150 términos estructurados por categorías prácticas.
* Modal de tarjetas de estudio con atajos de teclado (`Espacio`/`Enter` para voltear, `1`, `2`, `3`, `4` para calificar).
* Celebración visual mediante confeti y sonido zen al finalizar la sesión.

### 6. Academia de Gramática para Hispanohablantes
* Fórmulas visuales claras.
* Explicación de contrastes críticos: **は vs が**, **に vs で**, **です vs ます**.
* Tabla comparativa con el español y errores típicos corregidos.
* Cuestionarios interactivos guiados con retroalimentación inmediata.

### 7. Laboratorio de Audio y Dictados
* Síntesis de voz japonesa mediante Web Speech API.
* Control de velocidad: **1.0x (normal)** y **0.75x (lenta / principiante)**.
* Estación de dictado: escuchar audio, transcribir en japonés/romaji y comprobar similitud.

### 8. Simulador de Conversación Situacional
* Escenarios reales: *Pidiendo Ramen en Tokio*, *Presentación personal (Jikoshoukai)*, *Comprando en el Konbini*.
* Modo Guiado (con pistas y traducción) vs **Modo Inmersivo (solo japonés)**.
* Puntuación de nivel de cortesía y notas de etiqueta cultural.

### 9. Actividades y Minijuegos
* **⚡ Kana Sprint:** Carrera de velocidad de 30 segundos identificando caracteres kana con multiplicador de combo.
* **🧩 Construye la Frase:** Ordenar fichas desordenadas comprendiendo la sintaxis SOV japonesa.
* **🔍 Detective Gramatical:** Identificar y subsanar el error gramatical camuflado en una oración.

### 10. Biblioteca de Lectura Graduada
* Historias originales ambientadas en Tokio y Kioto.
* Furigana dinámico sobre los kanji.
* Glosario interactivo: al tocar una palabra desconocida, se despliega su lectura y significado con opción de añadirla al mazo SRS.

### 11. Cultura Japonesa y Etiqueta
* Los 3 ángulos de la reverencia *Ojigi* (15° Eshaku, 30° Keirei, 45° Saikeirei).
* Tabúes funerarios de los palillos (*hashi*).
* El umbral del *Genkan* y la cultura del calzado.

### 12. Planificador Inteligente de Estudio
* Rutinas optimizadas para **15, 30, 45 o 60 minutos**.
* Bloques temporizados: repaso de memoria, vocabulario nuevo, gramática, audio y producción activa.

### 13. Diccionario Integrado JP-ES
* Búsqueda instantánea multi-alfabeto (español, romaji, kana y kanji).
* Botón de 1-clic para agregar cualquier término a tus revisiones espaciadas diarias.

### 14. Sellos Hanko y Gamificación Discreta
* Sellos tradicionales desbloqueables (初歩, 平仮名, 片仮名, 漢字一歩, 七日連続, 言葉百, 会話達人, 墨の心).
* Registro de XP, nivel y constancia sin penalizaciones punitivas.

### 15. Privacidad y Persistencia Local Offline-First
* Modo invitado total: funciona sin crear cuenta ni conectarse a bases de datos remotas.
* Guardado automático en `LocalStorage` / `IndexedDB`.
* Opción de **Exportar copia de seguridad en JSON** y **Restaurar copia JSON** en cualquier dispositivo.

---

## 🚀 4. Instalación y Ejecución Local

### Requisitos previos
* Node.js v18 o superior.
* npm v9 o superior.

### Pasos de arranque

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre tu navegador en `http://localhost:5173`.

3. **Ejecutar pruebas unitarias (Vitest):**
   ```bash
   npm test
   ```
   Ejecuta las pruebas del algoritmo SM-2, diagnósticos adaptativos e integridad pedagógica de datos.

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🧪 5. Cobertura de Pruebas

El proyecto cuenta con una suite automatizada de pruebas unitarias (`vitest`) que valida:
* **Algoritmo SM-2:** Incremento de intervalos, reinicio de repeticiones tras fallo, límites del *ease factor*.
* **Cálculo de vencimiento:** Detección precisa de tarjetas pendientes de revisión.
* **Motor adaptativo:** Detección de patrones erróneos en partículas y confusiones entre caracteres kana.
* **Integridad de datos:** Validación de caracteres Hiragana/Katakana, kanji con radicales y lecciones de gramática contrastiva.

---

## ⛩️ KOTOBA: Aprende japonés. Piensa en japonés. Vive el idioma.
