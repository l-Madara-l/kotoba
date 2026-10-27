import { LearningModule } from '../types';

export const LEARNING_MODULES: LearningModule[] = [
  {
    levelNumber: 0,
    id: 'module-0',
    name: 'Fundamentos del Idioma',
    nameJp: '基礎と発音',
    jlptEquivalent: 'N5 Introducción',
    description: 'Comprende la fonética japonesa, las vocales puras, el ritmo de mora, los tres sistemas de escritura y tus primeros saludos esenciales.',
    color: '#334A68',
    lessons: [
      {
        id: 'l0-phonetics',
        title: 'Las 5 vocales puras y el ritmo de mora',
        titleJp: '母音と拍（モーラ）',
        description: 'A, I, U, E, O: la base fonética sin diptongos del japonés y el compás temporal de las moras.',
        type: 'culture',
        estimatedMinutes: 8,
        unlockedByDefault: true
      },
      {
        id: 'l0-writing-system',
        title: 'Los tres sistemas de escritura',
        titleJp: 'ひらがな・カタカナ・漢字',
        description: 'Por qué el japonés combina Hiragana, Katakana y Kanji en la misma frase y cómo interactúan.',
        type: 'culture',
        estimatedMinutes: 10,
        unlockedByDefault: true
      },
      {
        id: 'l0-greetings',
        title: 'Saludos y expresiones de cortesía cotidiana',
        titleJp: '基本の挨拶',
        description: 'Ohayou gozaimasu, Konnichiwa, Arigatou, Sumimasen: pronunciación real y contextos.',
        type: 'vocab',
        estimatedMinutes: 12,
        unlockedByDefault: true
      }
    ]
  },
  {
    levelNumber: 1,
    id: 'module-1',
    name: 'Maestría de Hiragana',
    nameJp: 'ひらがなマスター',
    jlptEquivalent: 'N5 Lectura básica',
    description: 'Aprende a leer y escribir el silabario fonético nativo: las 46 letras básicas, diacríticos dakuten (ga, za, da, ba), handakuten (pa) y combinaciones yōon.',
    color: '#BC3A32',
    lessons: [
      {
        id: 'l1-vowels-k',
        title: 'Vocales (あいうえお) y serie K (かきくけこ)',
        titleJp: 'あ行・か行',
        description: 'Los primeros 10 caracteres con orden de trazo nemotécnico y palabras reales.',
        type: 'kana',
        estimatedMinutes: 15,
        unlockedByDefault: true
      },
      {
        id: 'l1-s-t',
        title: 'Serie S (さしすせそ) y serie T (たちつてと)',
        titleJp: 'さ行・た行',
        description: 'Atención especial al sonido shi (し) y tsu (つ). Distinción crítica entre さ, き y ち.',
        type: 'kana',
        estimatedMinutes: 15,
        unlockedByDefault: true
      },
      {
        id: 'l1-n-h-m',
        title: 'Series N, H y M (な行・は行・ま行)',
        titleJp: 'な・は・ま行',
        description: 'Pronunciación de Fu (ふ) y distinción de bucles en ぬ, ね, め, む.',
        type: 'kana',
        estimatedMinutes: 20,
        unlockedByDefault: false
      },
      {
        id: 'l1-y-r-w-n',
        title: 'Series Y, R, W y la consonante solitaria ん',
        titleJp: 'や・ら・わ行・ん',
        description: 'Completa los 46 caracteres del Hiragana y aprende la vibración alveolar suave de la R japonesa.',
        type: 'kana',
        estimatedMinutes: 20,
        unlockedByDefault: false
      },
      {
        id: 'l1-dakuten-yoon',
        title: 'Dakuten, Handakuten y sonidos combinados (ゃ, ゅ, ょ)',
        titleJp: '濁音・半濁音・拗音',
        description: 'Transforma k->g, s->z, t->d, h->b/p y forma kya, shu, cho con letras pequeñas.',
        type: 'kana',
        estimatedMinutes: 20,
        unlockedByDefault: false
      }
    ]
  },
  {
    levelNumber: 2,
    id: 'module-2',
    name: 'Katakana y Préstamos Lingüísticos',
    nameJp: 'カタカナと外来語',
    jlptEquivalent: 'N5 Extranjerismos',
    description: 'El silabario angular para palabras extranjeras, menús modernos, tecnología, nombres propios y anime.',
    color: '#C6A15B',
    lessons: [
      {
        id: 'l2-katakana-basics',
        title: 'Katakana esencial y palabras prestadas cotidianas',
        titleJp: 'カタカナの基本と身近な外来語',
        description: 'Pan, koohii, terebi, kamera: cómo el japonés adapta fonéticamente términos internacionales.',
        type: 'kana',
        estimatedMinutes: 15,
        unlockedByDefault: true
      },
      {
        id: 'l2-confusions',
        title: 'El cuarteto de la confusión: シ (shi), ツ (tsu), ソ (so), ン (n)',
        titleJp: '似ているカタカナの識別',
        description: 'La clave infalible para no confundirlos jamás: dirección ascendente vs descendente.',
        type: 'kana',
        estimatedMinutes: 15,
        unlockedByDefault: false
      }
    ]
  },
  {
    levelNumber: 3,
    id: 'module-3',
    name: 'Japonés Básico y Partículas',
    nameJp: '初級文法と助詞',
    jlptEquivalent: 'JLPT N5 Core',
    description: 'El corazón de la lengua: la estructura A は B です, partículas は, が, を, に, で, conjugación cortés ます y números.',
    color: '#66785F',
    lessons: [
      {
        id: 'l3-wa-desu',
        title: 'Estructura A は B です (Identidad y presentación)',
        titleJp: 'AはBです',
        description: 'Presentaciones personales, profesiones, nacionalidades y negación ではありません.',
        type: 'grammar',
        estimatedMinutes: 15,
        unlockedByDefault: true
      },
      {
        id: 'l3-wa-ga',
        title: 'El gran dilema: は (tema) vs が (sujeto enfático)',
        titleJp: '「は」と「が」の違い',
        description: 'Comprende intuitivamente cuándo el foco está en el sujeto y cuándo en el predicado.',
        type: 'grammar',
        estimatedMinutes: 20,
        unlockedByDefault: false
      },
      {
        id: 'l3-ni-de',
        title: 'Lugar de acción vs destino: に y で',
        titleJp: '場所の助詞「に」と「で」',
        description: 'Estudiar en casa (で) vs ir a la escuela (に) vs haber un gato en el parque (に).',
        type: 'grammar',
        estimatedMinutes: 20,
        unlockedByDefault: false
      },
      {
        id: 'l3-wo-masu',
        title: 'El objeto directo con を y verbos en forma ます',
        titleJp: '目的語「を」とます形',
        description: 'Comer, beber, leer, comprar: construir oraciones completas de acción cotidiana.',
        type: 'grammar',
        estimatedMinutes: 15,
        unlockedByDefault: false
      }
    ]
  },
  {
    levelNumber: 4,
    id: 'module-4',
    name: 'Conversación Cotidiana en Japón',
    nameJp: '日常会話と実践',
    jlptEquivalent: 'JLPT N5-N4 Conversación',
    description: 'Aprende a desenvolverte en restaurantes, tiendas de conveniencia (konbini), estaciones y pidiendo direcciones.',
    color: '#334A68',
    lessons: [
      {
        id: 'l4-restaurant',
        title: 'Pidiendo en el restaurante de Ramen',
        titleJp: '飲食店での注文',
        description: 'Irasshaimase, pedir la carta, porciones, agua y solicitar la cuenta formalmente.',
        type: 'vocab',
        estimatedMinutes: 15,
        unlockedByDefault: true
      },
      {
        id: 'l4-konbini',
        title: 'Supervivencia en el Konbini (7-Eleven y Lawson)',
        titleJp: 'コンビニでの買い物',
        description: 'Atatamemasu ka? (¿se lo caliento?), bolsas plásticas, cucharas y medios de pago.',
        type: 'vocab',
        estimatedMinutes: 15,
        unlockedByDefault: false
      }
    ]
  },
  {
    levelNumber: 5,
    id: 'module-5',
    name: 'Gramática Intermedia: La Forma て y Conexiones',
    nameJp: '中級文法：て形と表現',
    jlptEquivalent: 'JLPT N4',
    description: 'La forma て es el puente hacia la fluidez: conectar acciones consecutivas, peticiones con ください, permisos y estados progresivos.',
    color: '#BC3A32',
    lessons: [
      {
        id: 'l5-te-form',
        title: 'La regla de oro de la Forma て',
        titleJp: '動詞のて形の作り方',
        description: 'Grupos verbales 1, 2 e irregulares: cómo conjugar con fluidez usando ritmo mnemotécnico.',
        type: 'grammar',
        estimatedMinutes: 20,
        unlockedByDefault: false
      }
    ]
  },
  {
    levelNumber: 6,
    id: 'module-6',
    name: 'Lectura Inmersiva y Comprensión',
    nameJp: '多読と読解',
    jlptEquivalent: 'JLPT N4-N3 Lectura',
    description: 'Historias originales adaptadas con furigana desplegable y análisis de vocabulario en contexto real.',
    color: '#66785F',
    lessons: [
      {
        id: 'l6-tokyo-story',
        title: 'Historia: Un día en Tokio (浅草から秋葉原へ)',
        titleJp: '短編小説：東京の一日',
        description: 'Lectura graduada con preguntas de comprensión y diccionario instantáneo.',
        type: 'reading',
        estimatedMinutes: 15,
        unlockedByDefault: true
      }
    ]
  },
  {
    levelNumber: 7,
    id: 'module-7',
    name: 'Japonés Avanzado y Keigo',
    nameJp: '上級日本語と敬語',
    jlptEquivalent: 'JLPT N2-N1',
    description: 'Matices de honorabilidad, lenguaje formal empresarial, registro casual entre amigos y sutilezas culturales.',
    color: '#C6A15B',
    lessons: [
      {
        id: 'l7-keigo-intro',
        title: 'Sonkeigo (respetuoso) vs Kenjougo (humilde)',
        titleJp: '尊敬語と謙譲語の基本',
        description: 'Elevar al interlocutor vs colocar las propias acciones en posición humilde.',
        type: 'grammar',
        estimatedMinutes: 20,
        unlockedByDefault: false
      }
    ]
  }
];
