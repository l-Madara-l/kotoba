import { GrammarLesson } from '../types';

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 'grammar-wa-desu',
    title: 'La estructura fundamental: A は B です',
    structure: 'A [Sustantivo 1] は B [Sustantivo 2] です',
    level: 'N5',
    order: 1,
    learningObjective: 'Aprender a presentarse, identificar objetos y establecer equivalencias "A es B" usando la partícula temática は y la cópula です.',
    summaryEs: 'En japonés no existe un verbo "ser" idéntico al español. Se usa la partícula は (pronunciada wa) para establecer el "tema" de la conversación y です (desu) como afirmación cortés al final.',
    formula: '[Tema] は + [Identidad / Atributo] です',
    detailedExplanation: `En español decimos "Yo soy Carlos" o "Esta es María". 
En japonés, la estructura de la oración se organiza desde el "marco" general hacia el detalle.

1. **La partícula は (se lee WA):** 
Aunque se escribe con el carácter de hiragana は (ha), cuando funciona como partícula gramatical siempre se pronuncia "wa". Su función es poner un cartel luminoso: "En lo que respecta a A...", "Hablando de A...".

2. **La cópula です (se pronuncia DES / DESU):**
Equivale aproximadamente a "es", "son", "soy", pero no cambia según la persona (no se conjuga para yo, tú, él). La 'u' final es casi muda en el habla de Tokio.`,
    spanishComparison: 'A diferencia del español ("Yo soy", "Tú eres", "Ellos son"), en japonés です nunca cambia según la persona gramatical. Si el tema se sobreentiende por la situación, los japoneses simplemente dicen "B です" sin mencionar a "A".',
    commonMistakes: [
      {
        incorrect: 'わたし は かるろす ある。',
        correct: 'わたしは カルロスです。',
        explanation: 'No utilices el verbo ある (existir objetos inanimados) para decir "yo soy". La afirmación de identidad se hace con です.'
      },
      {
        incorrect: 'Pronunciar は como "ha" cuando es partícula.',
        correct: 'Pronunciar は siempre como "wa".',
        explanation: 'Solo se pronuncia "ha" dentro de palabras como 花 (hana = flor) o はい (hai = sí).'
      }
    ],
    examples: [
      {
        japanese: '私は学生です。',
        kana: 'わたしは がくせい です。',
        romaji: 'Watashi wa gakusei desu.',
        spanish: 'Yo soy estudiante.',
        breakdown: [
          { term: '私 (わたし)', reading: 'watashi', meaning: 'Yo', function: 'Pronombre personal' },
          { term: 'は', reading: 'wa', meaning: 'en cuanto a', function: 'Partícula marcadora del tema' },
          { term: '学生 (がくせい)', reading: 'gakusei', meaning: 'estudiante', function: 'Sustantivo' },
          { term: 'です', reading: 'desu', meaning: 'es / soy', function: 'Cópula afirmativa cortés' }
        ]
      },
      {
        japanese: '田中さんは日本人です。',
        kana: 'たなかさんは にほんじん です。',
        romaji: 'Tanaka-san wa nihonjin desu.',
        spanish: 'El señor Tanaka es japonés.',
        breakdown: [
          { term: '田中さん', reading: 'tanaka-san', meaning: 'Sr. Tanaka', function: 'Nombre + sufijo cortés' },
          { term: 'は', reading: 'wa', meaning: 'en cuanto a', function: 'Partícula de tema' },
          { term: '日本人', reading: 'nihonjin', meaning: 'persona japonesa', function: 'Nacionalidad' },
          { term: 'です', reading: 'desu', meaning: 'es', function: 'Cópula' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        prompt: '¿Cómo se dice en japonés: "María es profesora"?',
        options: [
          'マリアさんは 先生です。',
          'マリアさんは 先生ます。',
          '先生は マリアさんある。',
          'マリアさんが 先生を。'
        ],
        correctAnswer: 'マリアさんは 先生です。',
        explanation: 'Estructura [Tema] は [Profesión] です. マリアさんは 先生です (Maria-san wa sensei desu).'
      },
      {
        id: 'q2',
        type: 'fill-blank',
        prompt: 'Completa la partícula que marca el tema: 私 ___ 学生です。',
        correctAnswer: 'は',
        explanation: 'La partícula que marca el tema de la frase es は (pronunciada "wa").'
      }
    ]
  },
  {
    id: 'grammar-wa-ga',
    title: 'El gran contraste: は (wa) frente a が (ga)',
    structure: 'は (Tema conocido / Contraste) vs が (Sujeto nuevo / Enfoque específico / Existencia)',
    level: 'N5',
    order: 2,
    learningObjective: 'Dominar la distinción más importante y confusa del japonés para hispanohablantes: cuándo usar は y cuándo usar が.',
    summaryEs: 'は presenta el tema del que vamos a hablar ("En cuanto a X..."), mientras que が señala quién realiza la acción o destaca un elemento nuevo e identificativo.',
    formula: 'Tema conocido + は ... / Sujeto que responde "¿Quién?" + が ...',
    detailedExplanation: `### La regla de oro:
- **は (Tema):** El foco de información está en lo que viene **DESPUÉS**.
  - *田中さんは先生です。* (La información nueva e importante es que Tanaka *es profesor*).
- **が (Sujeto específico):** El foco de información está en lo que va **ANTES**.
  - *誰が来ましたか？ — 田中さんが来ました。* (¿Quién vino? — *Fue Tanaka* quien vino).

### Situaciones obligatorias de が:
1. Con preguntas de ¿quién? o ¿qué? (*誰が、何が*).
2. Con adjetivos de gusto, deseo y habilidad: *〜が好きです (me gusta)*, *〜が上手です (se me da bien)*.
3. Con verbos de existencia: *猫がいます (hay un gato)*, *本があります (hay un libro)*.`,
    spanishComparison: 'En español cambiamos la entonación de la voz ("TANAKA vino" vs "Tanaka VINO"). En japonés se usan partículas distintas: が resalta quién fue (Tanaka), mientras que は narra qué hizo.',
    commonMistakes: [
      {
        incorrect: '何はありますか。',
        correct: '何がありますか。',
        explanation: 'Las palabras interrogativas (何 nani, 誰 dare, どこ doko) nunca pueden llevar は como sujeto porque son información desconocida; siempre llevan が.'
      },
      {
        incorrect: '日本料理を好きです。',
        correct: '日本料理が好きです。',
        explanation: 'En japonés, "gustar" (好き suki) no es un verbo transitivo sino un adjetivo na. Lo que gusta se marca con が, no con を.'
      }
    ],
    examples: [
      {
        japanese: '猫がいます。',
        kana: 'ねこが います。',
        romaji: 'Neko ga imasu.',
        spanish: 'Hay un gato.',
        breakdown: [
          { term: '猫 (ねこ)', meaning: 'Gato', function: 'Sujeto existente' },
          { term: 'が', meaning: 'partícula de sujeto', function: 'Marca el elemento percibido en el entorno' },
          { term: 'います', meaning: 'haber/estar seres vivos', function: 'Verbo de existencia animada' }
        ]
      },
      {
        japanese: '私は寿司が好きです。',
        kana: 'わたしは すしが すきです。',
        romaji: 'Watashi wa sushi ga suki desu.',
        spanish: 'A mí me gusta el sushi.',
        breakdown: [
          { term: '私は', meaning: 'en cuanto a mí', function: 'Tema general' },
          { term: '寿司が', meaning: 'el sushi', function: 'Objeto de gusto con が' },
          { term: '好きです', meaning: 'es agradable / gustar', function: 'Adjetivo-na predicativo' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'q3',
        type: 'multiple-choice',
        prompt: '¿Cómo dices correctamente: "Me gusta el té verde"?',
        options: [
          'お茶が好きです。',
          'お茶を好きです。',
          'お茶は好きます。',
          'お茶ですきです。'
        ],
        correctAnswer: 'お茶が好きです。',
        explanation: 'Lo que gusta con 好き (suki) siempre se acompaña de la partícula が: お茶が好きです。'
      }
    ]
  },
  {
    id: 'grammar-ni-de',
    title: 'Lugar y destino: に (ni) frente a で (de)',
    structure: 'Lugar + に [Destino o Existencia] vs Lugar + で [Acción activa o Medio]',
    level: 'N5',
    order: 3,
    learningObjective: 'Aprender la diferencia exacta entre に y で al hablar de lugares, evitando el error habitual de traducir ambos como "en".',
    summaryEs: 'En español decimos "en la cafetería" tanto para "estudiar en la cafetería" como para "estar en la cafetería". En japonés se usan partículas completamente diferentes.',
    formula: 'Acción activa en el lugar: [Lugar] で + Verbo / Existencia o llegada: [Lugar] に + います・あります・行きます',
    detailedExplanation: `### La diferencia visual:
- **で (Lugar de ACCIÓN):** Imagina un escenario donde ocurre movimiento o actividad.
  - *図書館で本を読みます。* (Leo un libro EN la biblioteca — acción activa).
  - *レストランでご飯を食べます。* (Como comida EN el restaurante).

- **に (Punto de LLEGADA, CONTACTO o EXISTENCIA):** Imagina una chincheta clavada en un mapa.
  - *東京に行きます。* (Voy A Tokio — punto de destino).
  - *部屋に猫がいます。* (Hay un gato EN la habitación — existencia estática).
  - *7時に起きます。* (Me despierto A las 7 — momento temporal exacto).`,
    spanishComparison: 'El español "en" es ambiguo. Pregúntate: ¿se realiza una acción activa en ese sitio? Usa で. ¿Es solo el lugar donde algo simplemente está quieto o al que te diriges? Usa に.',
    commonMistakes: [
      {
        incorrect: '学校に行きますで。',
        correct: '学校に行きます (o 学校へ行きます)。',
        explanation: 'No se usa で para el destino de verbos de movimiento como 行く (ir) o 来る (venir); se usa に o へ.'
      },
      {
        incorrect: 'カフェに勉強します。',
        correct: 'カフェで勉強します。',
        explanation: 'Estudiar (勉強する) es una acción dinámica, por lo que el lugar donde ocurre requiere で.'
      }
    ],
    examples: [
      {
        japanese: '家で日本語を勉強します。',
        kana: 'いえで にほんごを べんきょうします。',
        romaji: 'Ie de nihongo o benkyou shimasu.',
        spanish: 'Estudio japonés en casa.',
        breakdown: [
          { term: '家 (いえ)', meaning: 'Casa', function: 'Lugar' },
          { term: 'で', meaning: 'en (lugar de acción)', function: 'Partícula' },
          { term: '日本語を', meaning: 'japonés (objeto)', function: 'Partícula を' },
          { term: '勉強します', meaning: 'estudio', function: 'Verbo acción' }
        ]
      },
      {
        japanese: '公園に犬がいます。',
        kana: 'こうえんに いぬが います。',
        romaji: 'Kouen ni inu ga imasu.',
        spanish: 'Hay un perro en el parque.',
        breakdown: [
          { term: '公園に', meaning: 'en el parque (estático)', function: 'Lugar de existencia con に' },
          { term: '犬が', meaning: 'el perro', function: 'Sujeto animado con が' },
          { term: 'います', meaning: 'está / hay', function: 'Verbo de existencia' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'q4',
        type: 'multiple-choice',
        prompt: 'Elige la partícula correcta: "レストラン ___ 寿司を食べました。" (Comí sushi en el restaurante)',
        options: ['で', 'に', 'を', 'へ'],
        correctAnswer: 'で',
        explanation: 'Comer es una acción activa que se desarrolla dentro del restaurante, por lo que se requiere で.'
      }
    ]
  },
  {
    id: 'grammar-wo-masu',
    title: 'El objeto directo: Partícula を (o) y la forma ます',
    structure: '[Objeto] を + [Verbo en forma ます]',
    level: 'N5',
    order: 4,
    learningObjective: 'Conectar lo que comes, bebes, lees o compras con el verbo correspondiente en presente cortés.',
    summaryEs: 'La partícula を marca sobre qué recae la acción del verbo transitivo. Se escribe を pero se pronuncia simplemente "o".',
    formula: '[Sustantivo Objeto] を + [Verbo-masu]',
    detailedExplanation: `En japonés el orden básico de la frase es **SOV (Sujeto - Objeto - Verbo)**. El verbo SIEMPRE se coloca al final de la oración.
Por tanto, no decimos "Bebo agua" sino "Agua + [lo que bebo] + bebo":
*水 (agua) + を (marca objeto) + 飲みます (bebo)*.

La forma **ます (-masu)** es la conjugación cortés estándar, ideal para hablar con cualquier persona con respeto y naturalidad.`,
    commonMistakes: [
      {
        incorrect: '飲みます 水を。',
        correct: '水を 飲みます。',
        explanation: 'En japonés el verbo jamás va antes del objeto. El verbo corona el final de la oración.'
      }
    ],
    examples: [
      {
        japanese: '毎日、水を飲みます。',
        kana: 'まいにち、みずを のみます。',
        romaji: 'Mainichi, mizu o nomimasu.',
        spanish: 'Todos los días bebo agua.',
        breakdown: [
          { term: '毎日', meaning: 'todos los días', function: 'Frecuencia' },
          { term: '水を', meaning: 'agua (objeto)', function: 'Objeto directo con を' },
          { term: '飲みます', meaning: 'bebo', function: 'Verbo al final' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'q5',
        type: 'reorder',
        prompt: 'Ordena la frase: "Leo un libro"',
        options: ['本を', '読みます。'],
        correctAnswer: '本を 読みます。',
        explanation: 'Primero el objeto con を (本を) y al final el verbo (読みます).'
      }
    ]
  }
];
