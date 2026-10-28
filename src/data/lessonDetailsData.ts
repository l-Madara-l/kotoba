import { LessonDetail } from '../types';

export const LESSON_DETAILS: Record<string, LessonDetail> = {
  // --- MÓDULO 0: FUNDAMENTOS ---
  'l0-phonetics': {
    id: 'l0-phonetics',
    title: 'Las 5 vocales puras y el compás de mora',
    titleJp: '母音と拍（モーラ）',
    module: 'Nivel 0: Fundamentos',
    moduleId: 'module-0',
    level: 'N5',
    objective: 'Dominar la pronunciación exacta de las cinco vocales japonesas y entender el concepto de "mora" como unidad rítmica temporal.',
    content: [
      'A diferencia del español, donde las vocales a veces se diptongan o se acortan según la entonación, en japonés las vocales son **absolutamente puras y constantes**.',
      'El orden tradicional japonés de las vocales es: **A, I, U, E, O** (あ、い、う、え、お).',
      '**La "U" japonesa (う):** Es la vocal más diferente. No redondees los labios hacia afuera como en español o francés. Los labios permanecen neutros y relajados, produciendo un sonido más suave y sordo.',
      '**El concepto de Mora (拍 - haku):** El japonés no se mide en sílabas complejas, sino en pulsos de tiempo iguales llamados moras. Por ejemplo:',
      '• *にほん (Nihon)* tiene 3 moras: Ni - ho - n. Cada una dura exactamente el mismo compás de tiempo.',
      '• *とうきょう (Toukyou)* tiene 4 moras: To - u - kyo - u. La "u" alarga el sonido de la "o", durando el doble de tiempo exacto.'
    ],
    audioSamples: [
      { text: 'あ', kana: 'あ', romaji: 'a', es: 'Vocal A (abierta y clara)' },
      { text: 'い', kana: 'い', romaji: 'i', es: 'Vocal I' },
      { text: 'う', kana: 'う', romaji: 'u', es: 'Vocal U (labios relajados)' },
      { text: 'え', kana: 'え', romaji: 'e', es: 'Vocal E' },
      { text: 'お', kana: 'お', romaji: 'o', es: 'Vocal O' },
      { text: '東京', kana: 'とうきょう', romaji: 'toukyou', es: 'Tokio (4 moras: To-u-kyo-u)' }
    ],
    quiz: {
      question: '¿Cuántas moras (unidades de compás temporal) tiene la palabra "にほん" (Nihon - Japón)?',
      options: [
        '1 sola sílaba larga',
        '2 moras (Ni - hon)',
        '3 moras (Ni - ho - n)',
        '4 moras'
      ],
      correctIndex: 2,
      explanation: 'En japonés, la "n" final (ん) cuenta como una mora de tiempo completa e independiente. Por tanto: Ni (1) + ho (2) + n (3) = 3 moras.'
    }
  },

  'l0-writing-system': {
    id: 'l0-writing-system',
    title: 'Los tres sistemas de escritura japonesa',
    titleJp: 'ひらがな・カタカナ・漢字',
    module: 'Nivel 0: Fundamentos',
    moduleId: 'module-0',
    level: 'N5',
    objective: 'Entender el propósito de combinar Hiragana, Katakana y Kanji en un solo texto natural.',
    content: [
      'Una de las primeras preguntas que surgen es: "¿Por qué el japonés usa tres sistemas a la vez?". La respuesta es que cada uno cumple un rol lingüístico insustituible:',
      '1. **Hiragana (平仮名 - 46 caracteres):** Caracteres curvos que se usan para la gramática, partículas (は, を, に), terminaciones verbales y palabras nativas.',
      '2. **Katakana (片仮名 - 46 caracteres):** Caracteres angulares para palabras importadas del extranjero (pan, koohii), nombres no japoneses, nombres científicos y onomatopeyas.',
      '3. **Kanji (漢字 - ideogramas de origen chino):** Representan conceptos, raíces de palabras, sustantivos y verbos. Permiten leer a gran velocidad sin espacios entre palabras, ya que en japonés tradicional no se usan espacios.'
    ],
    audioSamples: [
      { text: '私はパンを食べます。', kana: 'わたしは ぱんを たべます。', romaji: 'Watashi wa pan o tabemasu.', es: 'Ejemplo completo: 私 (Kanji) + は (Hiragana) + パン (Katakana) + を (Hiragana) + 食べます (Kanji + Hiragana)' }
    ],
    quiz: {
      question: 'En la frase "私はパンを食べます", ¿qué sistema de escritura se usa para la palabra "パン" (pan)?',
      options: [
        'Hiragana, por ser comida',
        'Katakana, porque es un préstamo del portugués',
        'Kanji nativo',
        'Romaji'
      ],
      correctIndex: 1,
      explanation: 'La palabra "pan" fue introducida en Japón por misioneros y comerciantes portugueses en el siglo XVI, por lo que se escribe en Katakana (パン).'
    }
  },

  'l0-greetings': {
    id: 'l0-greetings',
    title: 'Saludos y expresiones de cortesía cotidiana',
    titleJp: '基本の挨拶',
    module: 'Nivel 0: Fundamentos',
    moduleId: 'module-0',
    level: 'N5',
    objective: 'Aprender los saludos fundamentales, fórmulas de cortesía y cómo saludar según el momento del día.',
    content: [
      'El saludo en Japón no es solo un trámite social: establece el nivel de respeto mutuo y la armonía (*wa*).',
      '• **おはようございます (Ohayou gozaimasu):** Buenos días cortés. Se utiliza desde temprano hasta aproximadamente las 11:00 am.',
      '• **こんにちは (Konnichiwa):** Hola / Buenas tardes. Desde el mediodía hasta el anochecer. Se escribe con は al final porque históricamente era la partícula temática de "Hoy en día...".',
      '• **ありがとうございます (Arigatou gozaimasu):** Muchas gracias en forma cortés.',
      '• **すみません (Sumimasen):** La palabra más útil de Japón: sirve para pedir disculpas, llamar a un camarero y agradecer un favor.'
    ],
    audioSamples: [
      { text: 'おはようございます', kana: 'おはようございます', romaji: 'ohayou gozaimasu', es: 'Buenos días (cortés)' },
      { text: 'こんにちは', kana: 'こんにちは', romaji: 'konnichiwa', es: 'Hola / Buenas tardes' },
      { text: 'ありがとうございます', kana: 'ありがとうございます', romaji: 'arigatou gozaimasu', es: 'Muchas gracias' },
      { text: 'すみません', kana: 'すみません', romaji: 'sumimasen', es: 'Disculpe / Perdón / Gracias' }
    ],
    quiz: {
      question: '¿Por qué "Konnichiwa" se escribe en hiragana como こんにちは (terminado en は)?',
      options: [
        'Porque la letra は siempre suena "wa"',
        'Porque históricamente era la partícula temática は de "Hoy en día..." (今日は)',
        'Es una falta de ortografía común',
        'Porque proviene del inglés'
      ],
      correctIndex: 1,
      explanation: 'Konnichiwa era originalmente el inicio de una frase: "En cuanto al día de hoy..." (今日 [konnichi] + は [wa]), por lo que conserva la grafía histórica con は.'
    }
  },

  // --- MÓDULO 1: MAESTRÍA DE HIRAGANA ---
  'l1-vowels-k': {
    id: 'l1-vowels-k',
    title: 'Vocales (あいうえお) y serie K (かきくけこ)',
    titleJp: 'あ行・か行',
    module: 'Nivel 1: Maestría de Hiragana',
    moduleId: 'module-1',
    level: 'N5',
    objective: 'Reconocer y memorizar el trazo de los primeros 10 caracteres del silabario nativo.',
    content: [
      'Las vocales **あ・い・う・え・お** forman la columna vertebral del japonés.',
      'Al combinarse con la consonante **K**, obtenemos la serie **か (ka), き (ki), く (ku), け (ke), こ (ko)**.',
      'Nemotécnicas útiles:',
      '• **か (ka):** Parece una persona cortando una caña.',
      '• **き (ki):** Parece una llave antigua (*key* en inglés). ¡Cuidado: tiene 2 barras horizontales!',
      '• **く (ku):** El pico de un pájaro cuco abierto hacia la izquierda.',
      '• **け (ke):** Una espada samurai junto a un barril de sake.',
      '• **こ (ko):** Dos carpas koi nadando en paralelo.'
    ],
    audioSamples: [
      { text: 'あか', kana: 'あか', romaji: 'aka', es: 'Rojo' },
      { text: 'あき', kana: 'あき', romaji: 'aki', es: 'Otoño' },
      { text: 'えき', kana: 'えき', romaji: 'eki', es: 'Estación de tren' },
      { text: 'ここ', kana: 'ここ', romaji: 'koko', es: 'Aquí' }
    ],
    quiz: {
      question: '¿Cuál de estos caracteres corresponde al sonido "ki"?',
      options: ['さ', 'き', 'ち', 'こ'],
      correctIndex: 1,
      explanation: 'き (ki) tiene dos líneas horizontales cruzadas y un arco inferior. No lo confundas con さ (sa), que solo tiene una línea horizontal.'
    }
  },

  'l1-s-t': {
    id: 'l1-s-t',
    title: 'Serie S (さしすせそ) y serie T (たちつてと)',
    titleJp: 'さ行・た行',
    module: 'Nivel 1: Maestría de Hiragana',
    moduleId: 'module-1',
    level: 'N5',
    objective: 'Aprender las series S y T con especial atención a las irregularidades fonéticas: shi (し) y tsu (つ).',
    content: [
      'En japonés tradicional no existen los sonidos *si* ni *ti*. En su lugar, se pronuncian:',
      '• **し (shi):** Suave como el "sh" de show o silencio. Recuerda a un anzuelo de pescar.',
      '• **ち (chi):** Parecido al "ch" de chocolate. Una sola línea horizontal y un semicírculo.',
      '• **つ (tsu):** Como la "ts" de tsunami o pizza. Un solo trazo amplio que simula una ola.',
      '• **さ (sa):** Atención: solo 1 barra horizontal (a diferencia de き que tiene 2).'
    ],
    audioSamples: [
      { text: 'すし', kana: 'すし', romaji: 'sushi', es: 'Sushi' },
      { text: 'つき', kana: 'つき', romaji: 'tsuki', es: 'Luna' },
      { text: 'て', kana: 'て', romaji: 'te', es: 'Mano' },
      { text: 'ちず', kana: 'ちず', romaji: 'chizu', es: 'Mapa' }
    ],
    quiz: {
      question: '¿Cómo se pronuncia el carácter つ en japonés?',
      options: ['tu', 'tsu', 'su', 'chu'],
      correctIndex: 1,
      explanation: 'El carácter つ se pronuncia "tsu", con el sonido consonántico alveolar africado sordo como en "tsunami".'
    }
  },

  'l1-n-h-m': {
    id: 'l1-n-h-m',
    title: 'Series N, H y M (な行・は行・ま行)',
    titleJp: 'な・は・ま行',
    module: 'Nivel 1: Maestría de Hiragana',
    moduleId: 'module-1',
    level: 'N5',
    objective: 'Dominar la serie nasal N, la serie aspirada H (con el sonido "fu" ふ) y la serie bilabial M.',
    content: [
      '• **Serie N:** な (na), に (ni), ぬ (nu), ね (ne), の (no).',
      '• **Serie H:** は (ha), ひ (hi), ふ (fu), へ (he), ほ (ho).',
      '  *Nota sobre ふ (fu):* No muerdas el labio como con la F española. Se sopla suavemente entre ambos labios relajados, como apagando una vela.',
      '• **Serie M:** ま (ma), み (mi), む (mu), め (me), も (mo).',
      '  *Diferencia clave:* ぬ (nu) termina en un rizo cerrado, mientras que め (me) termina en trazo abierto sin rizo.'
    ],
    audioSamples: [
      { text: 'にほん', kana: 'にほん', romaji: 'nihon', es: 'Japón' },
      { text: 'ねこ', kana: 'ねこ', romaji: 'neko', es: 'Gato' },
      { text: 'みず', kana: 'みず', romaji: 'mizu', es: 'Agua' },
      { text: 'やま', kana: 'やま', romaji: 'yama', es: 'Montaña' }
    ],
    quiz: {
      question: '¿Qué diferencia visual existe entre ぬ (nu) y め (me)?',
      options: [
        'ぬ tiene una barra arriba y め no',
        'ぬ termina con un bucle o rizo final; め termina abierto sin bucle',
        'Son idénticos en hiragana',
        'め se escribe de derecha a izquierda'
      ],
      correctIndex: 1,
      explanation: 'ぬ (nu) concluye con un pequeño rizo circular en su extremo inferior derecho, mientras que め (me) corta limpiamente sin el lazo.'
    }
  },

  'l1-y-r-w-n': {
    id: 'l1-y-r-w-n',
    title: 'Series Y, R, W y la consonante solitaria ん',
    titleJp: 'や・ら・わ行・ん',
    module: 'Nivel 1: Maestría de Hiragana',
    moduleId: 'module-1',
    level: 'N5',
    objective: 'Completar los 46 caracteres del Hiragana aprendiendo la R japonesa suave y la consonante ん.',
    content: [
      '• **Serie Y:** や (ya), ゆ (yu), よ (yo). En japonés moderno no existen caracteres independientes para "yi" ni "ye".',
      '• **Serie R:** ら (ra), り (ri), る (ru), れ (re), ろ (ro).',
      '  *Pronunciación de la R:* No es una R vibrante fuerte como en "perro". Es una vibración alveolar simple muy suave (parecida a la "r" en "caro").',
      '• **Serie W:** わ (wa) y を (wo/o). を se reserva exclusivamente como partícula gramatical de objeto directo.',
      '• **ん (n):** La única consonante que puede sonar al final de una mora sin vocal.'
    ],
    audioSamples: [
      { text: 'さくら', kana: 'さくら', romaji: 'sakura', es: 'Flor de cerezo' },
      { text: 'わたし', kana: 'わたし', romaji: 'watashi', es: 'Yo' },
      { text: 'ほん', kana: 'ほん', romaji: 'hon', es: 'Libro' }
    ],
    quiz: {
      question: '¿Cuál es la función del carácter を en japonés moderno?',
      options: [
        'Se usa en cualquier palabra que contenga la sílaba "wo"',
        'Es exclusivamente una partícula gramatical de objeto directo y se pronuncia "o"',
        'Se usa para nombres de ciudades',
        'Es un signo de puntuación'
      ],
      correctIndex: 1,
      explanation: 'En japonés moderno, を nunca forma parte del vocabulario común; su uso está estrictamente restringido a funcionar como partícula marcadora del objeto directo (pronunciada "o").'
    }
  },

  'l1-dakuten-yoon': {
    id: 'l1-dakuten-yoon',
    title: 'Dakuten, Handakuten y sonidos combinados (ゃ, ゅ, ょ)',
    titleJp: '濁音・半濁音・拗音',
    module: 'Nivel 1: Maestría de Hiragana',
    moduleId: 'module-1',
    level: 'N5',
    objective: 'Aprender los diacríticos (comillas ゛ y círculos ゜) y los sonidos diptongados con letras pequeñas.',
    content: [
      '1. **Dakuten (濁音 - comillas ゛):** Sonoriza las consonantes sordas:',
      '   • K ➔ G: か (ka) ➔ が (ga)',
      '   • S ➔ Z: さ (sa) ➔ ざ (za), し (shi) ➔ じ (ji)',
      '   • T ➔ D: た (ta) ➔ だ (da)',
      '   • H ➔ B: は (ha) ➔ ば (ba)',
      '2. **Handakuten (半濁音 - círculo ゜):**',
      '   • H ➔ P: は (ha) ➔ ぱ (pa), ぴ (pi), ぷ (pu), ぺ (pe), ぽ (po)',
      '3. **Yōon (拗音 - sonidos contraídos):** Añadir や, ゆ, よ en tamaño pequeño a una consonante en "i":',
      '   • き (ki) + ゃ (ya) = きゃ (kya)',
      '   • し (shi) + ょ (yo) = しょ (sho)',
      '   • とうきょう (Toukyou) contiene きょ (kyo).'
    ],
    audioSamples: [
      { text: 'がくせい', kana: 'がくせい', romaji: 'gakusei', es: 'Estudiante' },
      { text: 'おちゃ', kana: 'おちゃ', romaji: 'ocha', es: 'Té verde (ち + ゃ)' },
      { text: 'きょう', kana: 'きょう', romaji: 'kyou', es: 'Hoy (き + ょ)' }
    ],
    quiz: {
      question: '¿Qué sonido resulta de añadir dakuten (゛) a la serie H (は、ひ、ふ、へ、ほ)?',
      options: ['Serie P (pa, pi, pu, pe, po)', 'Serie B (ba, bi, bu, be, bo)', 'Serie M (ma, mi, mu, me, mo)', 'Serie G (ga, gi, gu, ge, go)'],
      correctIndex: 1,
      explanation: 'El dakuten (comillas) convierte la serie H en la serie B sonoro (ば、び、ぶ、べ、ぼ). El círculo (handakuten) es el que genera la serie P.'
    }
  },

  // --- MÓDULO 2: KATAKANA Y PRÉSTAMOS ---
  'l2-katakana-basics': {
    id: 'l2-katakana-basics',
    title: 'Katakana esencial y palabras prestadas cotidianas',
    titleJp: 'カタカナの基本と身近な外来語',
    module: 'Nivel 2: Katakana y Préstamos',
    moduleId: 'module-2',
    level: 'N5',
    objective: 'Reconocer el silabario angular para palabras de origen extranjero (Gairaigo).',
    content: [
      'El Katakana se compone de trazos rectos y angulares. Se utiliza principalmente para:',
      '• **Palabras extranjeras:** パン (*pan* - portugués), コーヒー (*koohii* - café), カメラ (*kamera* - cámara).',
      '• **Nombres propios internacionales:** カルロス (*Karurosu* - Carlos), スペイン (*Supein* - España).',
      '• **Onomatopeyas y énfasis visual:** En manga o carteles publicitarios.',
      '• **La barra larga (ー):** Indica que la vocal anterior se alarga dos tiempos (ej. コーヒー ko-o-hi-i).'
    ],
    audioSamples: [
      { text: 'コーヒー', kana: 'こーひー', romaji: 'koohii', es: 'Café' },
      { text: 'ホテル', kana: 'ほてる', romaji: 'hoteru', es: 'Hotel' },
      { text: 'タクシー', kana: 'たくしー', romaji: 'takushii', es: 'Taxi' }
    ],
    quiz: {
      question: '¿Qué significa la barra horizontal (ー) en una palabra en Katakana como "コーヒー"?',
      options: [
        'Es un guion separador de palabras',
        'Indica alargamiento de la vocal precedente',
        'Representa una consonante muda',
        'Es el número uno (ichi)'
      ],
      correctIndex: 1,
      explanation: 'La marca de vocal larga (chōonpu ー) duplica la duración de la vocal anterior: ko-o-hi-i.'
    }
  },

  'l2-confusions': {
    id: 'l2-confusions',
    title: 'El cuarteto de la confusión: シ (shi), ツ (tsu), ソ (so), ン (n)',
    titleJp: '似ているカタカナの識別',
    module: 'Nivel 2: Katakana y Préstamos',
    moduleId: 'module-2',
    level: 'N5',
    objective: 'Dominar la regla infalible para no confundir los 4 caracteres más parecidos del katakana.',
    content: [
      'Casi todos los estudiantes confunden estos cuatro caracteres al principio. La clave radica en la **dirección del trazo final**:',
      '1. **シ (shi) y ン (n) ➔ SUBEN desde abajo:**',
      '   • Los puntos se alinean en diagonal y el trazo largo sube de izquierda a derecha ("sonríe hacia arriba").',
      '2. **ツ (tsu) y ソ (so) ➔ CAEN desde arriba:**',
      '   • Los puntos están casi verticales arriba y el trazo largo desciende de arriba hacia abajo ("gotas cayendo").'
    ],
    audioSamples: [
      { text: 'シャツ', kana: 'しゃつ', romaji: 'shatsu', es: 'Camisa (contiene シ y ツ)' },
      { text: 'パン', kana: 'ぱん', romaji: 'pan', es: 'Pan (contiene ン)' }
    ],
    quiz: {
      question: 'En el par de Katakana シ (shi) y ツ (tsu), ¿hacia dónde va el trazo final de シ (shi)?',
      options: ['Cae de arriba hacia abajo', 'Sube de abajo hacia arriba en diagonal', 'Es totalmente horizontal', 'Es un círculo'],
      correctIndex: 1,
      explanation: 'El trazo largo de シ (shi) asciende desde la parte inferior izquierda hacia arriba a la derecha, asemejando una sonrisa.'
    }
  },

  // --- MÓDULO 3: JAPONÉS BÁSICO ---
  'l3-wa-desu': {
    id: 'l3-wa-desu',
    title: 'Estructura A は B です (Identidad y presentación)',
    titleJp: 'AはBです',
    module: 'Nivel 3: Japonés Básico',
    moduleId: 'module-3',
    level: 'N5',
    objective: 'Aprender a presentarse y establecer identidades mediante la partícula は y la cópula です.',
    content: [
      'La estructura fundamental del japonés es: **A は B です** (En cuanto a A, es B).',
      '• **は (se pronuncia WA):** Partícula temática. Define el marco de la conversación.',
      '• **です (se pronuncia DES / DESU):** Cópula afirmativa de cortesía. Equivale a "soy/es/son" sin importar la persona.',
      '• **Negación:** ではありません (dewa arimasen) o じゃありません (ja arimasen).',
      '• **Pregunta:** Se añade か al final: A は B ですか (¿Es A igual a B?).'
    ],
    audioSamples: [
      { text: '私はカルロスです。', kana: 'わたしは かるろす です。', romaji: 'Watashi wa Karurosu desu.', es: 'Yo soy Carlos.' },
      { text: '田中さんは先生です。', kana: 'たなかさんは せんせい です。', romaji: 'Tanaka-san wa sensei desu.', es: 'El señor Tanaka es profesor.' }
    ],
    quiz: {
      question: '¿Cómo se dice en japonés formal: "Yo soy estudiante"?',
      options: ['私は学生です。', '私は学生ます。', '学生は私ある。', '私を学生です。'],
      correctIndex: 0,
      explanation: 'Estructura: [Tema: 私は] + [Atributo: 学生] + [Cópula: です。] (Watashi wa gakusei desu).'
    }
  },

  'l3-wa-ga': {
    id: 'l3-wa-ga',
    title: 'El gran dilema: は (tema) vs が (sujeto enfático)',
    titleJp: '「は」と「が」の違い',
    module: 'Nivel 3: Japonés Básico',
    moduleId: 'module-3',
    level: 'N5',
    objective: 'Diferenciar claramente cuándo el foco de información está en el predicado (は) o en el sujeto (が).',
    content: [
      '• **は (Tema conocido):** El foco de información nueva va **DESPUÉS** de は.',
      '  *田中さんは日本人です。* (Lo nuevo que informamos es que Tanaka *es japonés*).',
      '• **が (Sujeto enfático / Existencia):** El foco va **ANTES** de が (responde a "¿quién?").',
      '  *田中さんが来ました。* (Fue *Tanaka* quien vino).',
      '• **Usos obligatorios de が:**',
      '  1. Con adjetivos de gusto y deseo: 寿司が好きです (Me gusta el sushi).',
      '  2. Con verbos de existencia: 猫がいます (Hay un gato).'
    ],
    audioSamples: [
      { text: '猫がいます。', kana: 'ねこが います。', romaji: 'Neko ga imasu.', es: 'Hay un gato (existencia percibida con が)' },
      { text: '私は寿司が好きです。', kana: 'わたしは すしが すきです。', romaji: 'Watashi wa sushi ga suki desu.', es: 'A mí me gusta el sushi.' }
    ],
    quiz: {
      question: '¿Qué partícula marca lo que te gusta con 好き (suki)?',
      options: ['を (o)', 'が (ga)', 'に (ni)', 'で (de)'],
      correctIndex: 1,
      explanation: 'En japonés "gustar" (好き suki) es un adjetivo na; el objeto de agrado siempre se marca con が: [Cosa] が 好きです。'
    }
  },

  'l3-ni-de': {
    id: 'l3-ni-de',
    title: 'Lugar de acción vs destino: に y で',
    titleJp: '場所の助詞「に」と「で」',
    module: 'Nivel 3: Japonés Básico',
    moduleId: 'module-3',
    level: 'N5',
    objective: 'Evitar el error clásico de traducir "en" al japonés: usar で para acción dinámica y に para existencia o destino.',
    content: [
      'En español "en" es ambiguo: decimos "comer en casa" y "estar en casa". En japonés son partículas distintas:',
      '• **で (Lugar de ACCIÓN ACTIVA):** Donde se desarrolla una actividad dinámica.',
      '  *レストランでご飯を食べます。* (Como comida EN el restaurante).',
      '  *図書館で本を読みます。* (Leo un libro EN la biblioteca).',
      '• **に (Punto de LLEGADA, DESTINO o EXISTENCIA):**',
      '  *東京に行きます。* (Voy A Tokio — punto de destino).',
      '  *部屋に猫がいます。* (Hay un gato EN la habitación — existencia estática).'
    ],
    audioSamples: [
      { text: '家で日本語を勉強します。', kana: 'いえで にほんごを べんきょうします。', romaji: 'Ie de nihongo o benkyou shimasu.', es: 'Estudio japonés en casa (acción activa con で)' },
      { text: '日本に行きます。', kana: 'にほんに いきます。', romaji: 'Nihon ni ikimasu.', es: 'Voy a Japón (destino con に)' }
    ],
    quiz: {
      question: 'Completa: "図書館 ___ 勉強します。" (Estudio en la biblioteca)',
      options: ['に', 'で', 'を', 'へ'],
      correctIndex: 1,
      explanation: 'Estudiar (勉強する) es una acción activa que ocurre dentro del lugar, por lo que requiere で.'
    }
  },

  'l3-wo-masu': {
    id: 'l3-wo-masu',
    title: 'El objeto directo con を y verbos en forma ます',
    titleJp: '目的語「を」とます形',
    module: 'Nivel 3: Japonés Básico',
    moduleId: 'module-3',
    level: 'N5',
    objective: 'Construir oraciones completas Sujeto-Objeto-Verbo (SOV) con la forma cortés ます.',
    content: [
      'En japonés el verbo **SIEMPRE va al final** de la oración.',
      'Estructura: **[Objeto directo] を + [Verbo en forma ます]**.',
      '• **水 (agua) + を + 飲みます (bebo) ➔ 水を飲みます。** (Bebo agua).',
      '• **La forma ます (masu):** Es la forma presente/futura de cortesía universal.',
      '• **Pasado cortés:** ます ➔ ました (mashita). 水を飲みました (Bebí agua).',
      '• **Negativo cortés:** ます ➔ ません (masen). 飲みません (No bebo).'
    ],
    audioSamples: [
      { text: '水を飲みます。', kana: 'みずを のみます。', romaji: 'Mizu o nomimasu.', es: 'Bebo agua.' },
      { text: '本を読みました。', kana: 'ほんを よみました。', romaji: 'Hon o yomimashita.', es: 'Leí un libro (pasado).' }
    ],
    quiz: {
      question: '¿Cómo se dice en japonés cortés: "No como carne"?',
      options: ['肉を食べます。', '肉を食べません。', '肉を食べました。', '肉は食べないです。'],
      correctIndex: 1,
      explanation: 'El negativo cortés de 食べます (tabemasu) es 食べません (tabemasen): 肉を食べません (Niku o tabemasen).'
    }
  },

  // --- MÓDULO 4: CONVERSACIÓN COTIDIANA ---
  'l4-restaurant': {
    id: 'l4-restaurant',
    title: 'Pidiendo en el restaurante de Ramen',
    titleJp: '飲食店での注文',
    module: 'Nivel 4: Conversación Cotidiana',
    moduleId: 'module-4',
    level: 'N5',
    objective: 'Aprender la secuencia real de interacción al comer en un restaurante en Japón.',
    content: [
      '1. **Al entrar:** Te recibirán con "¡Irasshaimase!". Dices cuántos son: 一人です (*hitori desu* - 1 persona) o 二人です (*futari desu* - 2 personas).',
      '2. **Llamar al camarero:** Levanta suavemente la mano y di: **すみません！ (Sumimasen!)**.',
      '3. **Pedir el plato:** [Plato] を 一つ お願いします (*[Plato] o hitotsu onegaishimasu* - Un [plato] por favor).',
      '4. **Pedir agua:** お水をください (*O-mizu o kudasai*). En Japón el agua fresca es gratis.',
      '5. **La cuenta:** En Japón se paga en la caja junto a la puerta: お会計をお願いします (*O-kaikei o onegaishimasu*).'
    ],
    audioSamples: [
      { text: '豚骨ラーメンを一つお願いします。', kana: 'とんこつらーめんを ひとつ おねがいします。', romaji: 'Tonkotsu raamen o hitotsu onegaishimasu.', es: 'Un ramen de tonkotsu por favor.' },
      { text: 'お会計をお願いします。', kana: 'おかいけいを おねがいします。', romaji: 'O-kaikei o onegaishimasu.', es: 'La cuenta por favor.' }
    ],
    quiz: {
      question: '¿Qué frase utilizas para pedir la cuenta al terminar de comer en Japón?',
      options: ['お会計をお願いします。', 'ごちそうをください。', 'いくら食べますか。', 'すみません、さようなら。'],
      correctIndex: 0,
      explanation: 'Para solicitar la cuenta se dice: "お会計をお願いします" (O-kaikei o onegaishimasu).'
    }
  },

  'l4-konbini': {
    id: 'l4-konbini',
    title: 'Supervivencia en el Konbini (7-Eleven y Lawson)',
    titleJp: 'コンビニでの買い物',
    module: 'Nivel 4: Conversación Cotidiana',
    moduleId: 'module-4',
    level: 'N5',
    objective: 'Comprender las preguntas automáticas del cajero al comprar en una tienda 24 horas.',
    content: [
      'En los Konbini, los cajeros usan frases estándar en lenguaje honorífico (*keigo*):',
      '• **温めますか？ (Atatamemasu ka?):** ¿Se lo caliento en el microondas?',
      '  ➔ Sí: はい、お願いします (Hai, onegaishimasu).',
      '  ➔ No: 大丈夫です (Daijoubu desu - estoy bien así).',
      '• **レジ袋はご利用になりますか？ (Rejibukuro wa go-riyou ni narimasu ka?):** ¿Desea bolsa de plástico?',
      '  ➔ No: いいえ、要りません (Iie, irimasen) o 大丈夫です.',
      '  ➔ Sí: 一枚お願いします (Ichimai onegaishimasu - una bolsa por favor).'
    ],
    audioSamples: [
      { text: '温めますか？', kana: 'あたためますか？', romaji: 'Atatamemasu ka?', es: '¿Se lo caliento?' },
      { text: 'いいえ、大丈夫です。', kana: 'いいえ、だいじょうぶ です。', romaji: 'Iie, daijoubu desu.', es: 'No, no hace falta, gracias.' }
    ],
    quiz: {
      question: 'Si el cajero te pregunta "温めますか？" (Atatamemasu ka?), ¿qué te está preguntando?',
      options: ['Si quieres pagar con tarjeta', 'Si deseas que te caliente la comida', 'Si quieres bolsa de plástico', 'Si necesitas recibo'],
      correctIndex: 1,
      explanation: 'El verbo 温める (atatameru) significa calentar. Preguntan si deseas calentar tu bento u onigiri en el microondas.'
    }
  },

  // --- MÓDULO 5: GRAMÁTICA INTERMEDIA ---
  'l5-te-form': {
    id: 'l5-te-form',
    title: 'La regla de oro de la Forma て',
    titleJp: '動詞のて形の作り方',
    module: 'Nivel 5: Gramática Intermedia',
    moduleId: 'module-5',
    level: 'N4',
    objective: 'Aprender la conjugación de la forma て para conectar acciones consecutivas y hacer peticiones.',
    content: [
      'La **forma て (te-form)** es la navaja suiza del japonés:',
      '1. **Conectar acciones consecutivas:** 朝起きて、ご飯を食べました (Me levanté y comí).',
      '2. **Peticiones corteses:** [Verbo en forma て] + ください (Por favor, haga X).',
      '   • 食べてください (*Tabete kudasai* - Por favor, come).',
      '   • 見てください (*Mite kudasai* - Por favor, mira).',
      '3. **Acción en progreso (-ing):** [Forma て] + います. 日本語を勉強しています (Estoy estudiando japonés).'
    ],
    audioSamples: [
      { text: 'ちょっと待ってください。', kana: 'ちょっと まってください。', romaji: 'Chotto matte kudasai.', es: 'Espere un momento por favor.' },
      { text: '日本語を勉強しています。', kana: 'にほんごを べんきょうしています。', romaji: 'Nihongo o benkyou shite imasu.', es: 'Estoy estudiando japonés (progresivo).' }
    ],
    quiz: {
      question: '¿Cómo pides educadamente "Por favor, espera un poco"?',
      options: ['ちょっと待ちますください。', 'ちょっと待ってください。', 'ちょっと待つください。', 'ちょっと待たないで。'],
      correctIndex: 1,
      explanation: 'La estructura de petición cortés requiere la forma て: 待つ (esperar) ➔ 待って (matte) + ください ➔ 待ってください。'
    }
  },

  // --- MÓDULO 6: LECTURA INMERSIVA ---
  'l6-tokyo-story': {
    id: 'l6-tokyo-story',
    title: 'Historia: Un día en Tokio (浅草から秋葉原へ)',
    titleJp: '短編小説：東京の一日',
    module: 'Nivel 6: Lectura Inmersiva',
    moduleId: 'module-6',
    level: 'N4',
    objective: 'Leer un texto narrativo graduado reconociendo kanji en contexto real.',
    content: [
      'La lectura graduada (*Tadoku*) permite adquirir fluidez natural sin traducir mentalmente cada término al español.',
      'En este texto seguimos a Elena en su trayecto desde la Puerta del Trueno (*Kaminarimon*) en Asakusa hasta las tiendas de electrónica y anime de Akihabara.',
      'Observa cómo se emplean las partículas de medio de transporte (*電車で densha de*) y las formas pasadas de los verbos (*行きました ikimashita, 食べました tabemashita*).'
    ],
    audioSamples: [
      { text: '朝、浅草へ行きました。雷門がありました。', kana: 'あさ、あさくさへ いきました。かみなりもんが ありました。', romaji: 'Asa, Asakusa e ikimashita. Kaminarimon ga arimashita.', es: 'Por la mañana fue a Asakusa. Estaba la puerta Kaminarimon.' }
    ],
    quiz: {
      question: 'En la frase "電車で秋葉原へ行きました", ¿qué función cumple la partícula で?',
      options: ['Marca el lugar de la fiesta', 'Indica el medio de transporte utilizado (en tren)', 'Marca el tiempo de llegada', 'Es una pregunta'],
      correctIndex: 1,
      explanation: 'Con medios de transporte o herramientas, で marca el instrumento o vehículo con el que se realiza la acción: 電車で (en tren).'
    }
  },

  // --- MÓDULO 7: JAPONÉS AVANZADO ---
  'l7-keigo-intro': {
    id: 'l7-keigo-intro',
    title: 'Sonkeigo (respetuoso) vs Kenjougo (humilde)',
    titleJp: '尊敬語と謙譲語の基本',
    module: 'Nivel 7: Japonés Avanzado y Keigo',
    moduleId: 'module-7',
    level: 'N2-N1',
    objective: 'Comprender los dos ejes del lenguaje honorífico japonés: elevar al interlocutor o situar las propias acciones en posición humilde.',
    content: [
      'El lenguaje cortés japonés (*Keigo*) se divide en dos categorías según quién realiza la acción:',
      '1. **Sonkeigo (尊敬語 - Lenguaje Respetuoso):** Se usa **EXCLUSIVAMENTE** para las acciones del cliente, superior o interlocutor. Eleva a la otra persona.',
      '   • Ir / Venir / Estar ➔ いらっしゃる (*Irassharu*).',
      '   • Decir ➔ おっしゃる (*Ossharu*).',
      '2. **Kenjougo (謙譲語 - Lenguaje Humilde):** Se usa **EXCLUSIVAMENTE** para las acciones de uno mismo o de su propio grupo familiar/empresarial (*uchi*). Baja la propia posición para honrar al otro.',
      '   • Ir / Venir ➔ 参る (*Mairu*).',
      '   • Decir ➔ 申す (*Mousu*).'
    ],
    audioSamples: [
      { text: '先生がおっしゃいました。', kana: 'せんせいが おっしゃいました。', romaji: 'Sensei ga osshaimashita.', es: 'El profesor dijo (Sonkeigo: elevar al profesor)' },
      { text: '田中と申します。', kana: 'たなかと もうします。', romaji: 'Tanaka to moushimasu.', es: 'Me llamo Tanaka (Kenjougo: humilde para uno mismo)' }
    ],
    quiz: {
      question: 'Si tú mismo te presentas en una entrevista de trabajo en Japón, ¿qué forma es la correcta?',
      options: [
        '私はカルロスとおっしゃいます。',
        'カルロスと申します (Moushimasu)。',
        'カルロスさんです。',
        'カルロスがいらっしゃいます。'
      ],
      correctIndex: 1,
      explanation: 'Para referirte a tu propio nombre con máxima cortesía se usa el lenguaje humilde Kenjougo: [Nombre] と申します (moushimasu). Jamás uses Sonkeigo (ossharu) para ti mismo.'
    }
  }
};

/**
 * Safe accessor for lesson details: returns registered lesson detail or builds a safe one from modules
 */
export function getLessonDetail(lessonId: string): LessonDetail {
  if (LESSON_DETAILS[lessonId]) {
    return LESSON_DETAILS[lessonId];
  }

  return {
    id: lessonId,
    title: 'Lección de Estudio KOTOBA',
    titleJp: '日本語レッスン',
    module: 'Academia KOTOBA',
    moduleId: 'module-0',
    level: 'N5',
    objective: 'Avanzar en el dominio del idioma mediante comprensión comprensible y práctica activa.',
    content: [
      'Esta lección combina teoría explicativa para hispanohablantes con ejemplos naturales y ejercicios interactivos.',
      'Escucha los audios cuantas veces necesites y repite en voz alta para afianzar el ritmo de mora.'
    ],
    audioSamples: [
      { text: '日本語を勉強します。', kana: 'にほんごを べんきょうします。', romaji: 'Nihongo o benkyou shimasu.', es: 'Estudio idioma japonés.' }
    ],
    quiz: {
      question: '¿Cuál es la forma más efectiva de asimilar una nueva estructura en japonés?',
      options: [
        'Memorizar listas sin contexto',
        'Aprenderla dentro de oraciones naturales y repasarla con repetición espaciada',
        'Solo leer sin pronunciar',
        'Ignorar las partículas'
      ],
      correctIndex: 1,
      explanation: 'La adquisición lingüística se consolida cuando el vocabulario y la gramática se internalizan en contexto y se refuerzan espaciadamente.'
    }
  };
}
