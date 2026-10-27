import { VocabItem } from '../types';

export const VOCAB_DATA: VocabItem[] = [
  // Saludos & Cortesía
  {
    id: 'v-ohayou',
    word: 'おはようございます',
    reading: 'おはようございます',
    romaji: 'ohayou gozaimasu',
    meaningEs: 'Buenos días (cortés)',
    partOfSpeech: 'expresión',
    category: 'Saludos',
    jlpt: 'N5',
    priority: 'alta',
    pitchAccent: 'o-HA-you go-za-i-ma-su',
    notes: 'Abreviado "おはよう" con amigos o familia cercana.',
    exampleSentence: {
      japanese: '田中さん、おはようございます！',
      kana: 'たなかさん、おはようございます！',
      romaji: 'Tanaka-san, ohayou gozaimasu!',
      spanish: '¡Buenos días, señor Tanaka!',
      breakdown: [
        { segment: '田中さん', role: 'nombre + sufijo cortés', explanation: 'Tanaka + honorífico -san (apropiado para colegas o superiores)' },
        { segment: 'おはようございます', role: 'saludo matutino', explanation: 'Usado desde el amanecer hasta las 10:30 u 11:00 am aprox.' }
      ]
    }
  },
  {
    id: 'v-konnichiwa',
    word: 'こんにちは',
    reading: 'こんにちは',
    romaji: 'konnichiwa',
    meaningEs: 'Hola / Buenas tardes',
    partOfSpeech: 'expresión',
    category: 'Saludos',
    jlpt: 'N5',
    priority: 'alta',
    pitchAccent: 'ko-n-NI-chi-wa',
    notes: '¡Atención ortográfica! Se escribe con は al final porque históricamente era la partícula temática de "Hoy en día..." (今日は).',
    exampleSentence: {
      japanese: '皆さん、こんにちは。',
      kana: 'みなさん、こんにちは。',
      romaji: 'Mina-san, konnichiwa.',
      spanish: 'Hola a todos / Buenas tardes a todos.',
      breakdown: [
        { segment: '皆さん', role: 'sustantivo plural honorífico', explanation: 'Todo el mundo / Todos los presentes' },
        { segment: 'こんにちは', role: 'saludo', explanation: 'Utilizado desde las 11:00 am hasta el atardecer' }
      ]
    }
  },
  {
    id: 'v-arigatou',
    word: 'ありがとうございます',
    reading: 'ありがとうございます',
    romaji: 'arigatou gozaimasu',
    meaningEs: 'Muchas gracias (cortés)',
    partOfSpeech: 'expresión',
    category: 'Saludos',
    jlpt: 'N5',
    priority: 'alta',
    pitchAccent: 'a-RI-ga-tou go-za-i-ma-su',
    notes: 'Si agradeces algo que ya terminó en el pasado, se dice "ありがとうございました" (gozaimashita).',
    exampleSentence: {
      japanese: '手伝ってくれて、ありがとうございます。',
      kana: 'てつだってくれて、ありがとうございます。',
      romaji: 'Tetsudatte kurete, arigatou gozaimasu.',
      spanish: 'Muchas gracias por haberme ayudado.',
      breakdown: [
        { segment: '手伝ってくれて', role: 'verbo en forma te + kurete', explanation: 'Hacer el favor de ayudarme' },
        { segment: 'ありがとうございます', role: 'agradecimiento', explanation: 'Agradecimiento en tiempo presente/general' }
      ]
    }
  },
  {
    id: 'v-sumimasen',
    word: 'すみません',
    reading: 'すみません',
    romaji: 'sumimasen',
    meaningEs: 'Disculpe / Perdón / Gracias (por la molestia)',
    partOfSpeech: 'expresión',
    category: 'Saludos',
    jlpt: 'N5',
    priority: 'alta',
    notes: 'Es la palabra multiusos de Japón: sirve para llamar al camarero, pedir disculpas por tropezar y agradecer cuando alguien te cede el paso.',
    exampleSentence: {
      japanese: 'すみません、メニューをお願いします。',
      kana: 'すみません、めにゅーを おねがいします。',
      romaji: 'Sumimasen, menyuu o onegaishimasu.',
      spanish: 'Disculpe, la carta / menú por favor.',
      breakdown: [
        { segment: 'すみません', role: 'llamada de atención cortés', explanation: 'Para captar la atención del camarero' },
        { segment: 'メニュー', role: 'sustantivo katakana', explanation: 'Menú' },
        { segment: 'を', role: 'partícula de objeto directo', explanation: 'Marca el objeto solicitado' },
        { segment: 'お願いします', role: 'expresión de petición formal', explanation: 'Por favor, se lo ruego' }
      ]
    }
  },

  // Esenciales: Agua & Comida
  {
    id: 'v-mizu',
    word: '水',
    reading: 'みず',
    romaji: 'mizu',
    meaningEs: 'Agua (fría / del tiempo)',
    partOfSpeech: 'sustantivo',
    category: 'Comida & Bebida',
    jlpt: 'N5',
    priority: 'alta',
    notes: 'Para agua caliente se usa otra palabra: お湯 (oyu). Decir "mizu atsui" suena poco natural en japonés.',
    exampleSentence: {
      japanese: '水を飲みます。',
      kana: 'みずを のみます。',
      romaji: 'Mizu o nomimasu.',
      spanish: 'Bebo agua.',
      breakdown: [
        { segment: '水 (みず)', role: 'sustantivo', explanation: 'Agua' },
        { segment: 'を', role: 'partícula de objeto directo (wo/o)', explanation: 'Conecta el sustantivo con la acción que recae sobre él' },
        { segment: '飲みます (のみます)', role: 'verbo forma -masu', explanation: 'Forma presente/futura cortés del verbo 飲む (beber)' }
      ]
    }
  },
  {
    id: 'v-ocha',
    word: 'お茶',
    reading: 'おちゃ',
    romaji: 'ocha',
    meaningEs: 'Té verde japonés',
    partOfSpeech: 'sustantivo',
    category: 'Comida & Bebida',
    jlpt: 'N5',
    priority: 'alta',
    notes: 'El prefijo お (o-) es un embellecedor de cortesía (bikago). El té negro occidental se llama 紅茶 (koucha).',
    exampleSentence: {
      japanese: '温かいお茶をどうぞ。',
      kana: 'あたたかい おちゃを どうぞ。',
      romaji: 'Atatakai ocha o douzo.',
      spanish: 'Aquí tiene té verde caliente, adelante.',
      breakdown: [
        { segment: '温かい (あたたかい)', role: 'adjetivo-i', explanation: 'Templado / caliente agradable' },
        { segment: 'お茶', role: 'sustantivo', explanation: 'Té' },
        { segment: 'を', role: 'partícula objeto directo', explanation: 'Indica el objeto ofrecido' },
        { segment: 'どうぞ', role: 'adverbio de cortesía', explanation: 'Por favor / Adelante / Sírvase' }
      ]
    }
  },
  {
    id: 'v-taberu',
    word: '食べます',
    reading: 'たべます',
    romaji: 'tabemasu',
    meaningEs: 'Comer (forma cortés)',
    partOfSpeech: 'verbo',
    category: 'Acciones & Verbos',
    jlpt: 'N5',
    priority: 'alta',
    notes: 'Forma diccionario: 食べる (taberu, grupo 2 ichidan).',
    exampleSentence: {
      japanese: '毎朝、パンを食べます。',
      kana: 'まいあさ、ぱんを たべます。',
      romaji: 'Maiasa, pan o tabemasu.',
      spanish: 'Todas las mañanas como pan.',
      breakdown: [
        { segment: '毎朝 (まいあさ)', role: 'adverbio temporal', explanation: 'Cada mañana (no necesita partícula に)' },
        { segment: 'パン', role: 'sustantivo katakana', explanation: 'Pan (préstamo del portugués pão)' },
        { segment: 'を', role: 'partícula objeto directo', explanation: 'Lo que se come' },
        { segment: '食べます', role: 'verbo forma cortés', explanation: 'Acción habitual en presente' }
      ]
    }
  },
  {
    id: 'v-nomu',
    word: '飲みます',
    reading: 'のみます',
    romaji: 'nomimasu',
    meaningEs: 'Beber, tomar (medicina)',
    partOfSpeech: 'verbo',
    category: 'Acciones & Verbos',
    jlpt: 'N5',
    priority: 'alta',
    notes: 'En japonés también se usa "nomu" para tomar pastillas o medicamentos (薬を飲む - kusuri o nomu).',
    exampleSentence: {
      japanese: 'カフェでコーヒーを飲みます。',
      kana: 'かふぇで こーひーを のみます。',
      romaji: 'Kafe de koohii o nomimasu.',
      spanish: 'Bebo café en la cafetería.',
      breakdown: [
        { segment: 'カフェ', role: 'sustantivo de lugar', explanation: 'Cafetería' },
        { segment: 'で', role: 'partícula de lugar de acción', explanation: 'Indica el lugar donde se realiza una actividad activa' },
        { segment: 'コーヒーを', role: 'sustantivo + partícula', explanation: 'Café (objeto directo)' },
        { segment: '飲みます', role: 'verbo', explanation: 'Bebo / tomaré' }
      ]
    }
  },
  {
    id: 'v-iku',
    word: '行きます',
    reading: 'いきます',
    romaji: 'ikimasu',
    meaningEs: 'Ir (forma cortés)',
    partOfSpeech: 'verbo',
    category: 'Acciones & Verbos',
    jlpt: 'N5',
    priority: 'alta',
    notes: 'Forma diccionario: 行く (iku). Con el destino se utiliza la partícula に o へ.',
    exampleSentence: {
      japanese: '明日、東京へ行きます。',
      kana: 'あした、とうきょうへ いきます。',
      romaji: 'Ashita, Toukyou e ikimasu.',
      spanish: 'Mañana voy a Tokio.',
      breakdown: [
        { segment: '明日 (あした)', role: 'adverbio temporal', explanation: 'Mañana' },
        { segment: '東京 (とうきょう)', role: 'nombre propio de lugar', explanation: 'Tokio (capital del este)' },
        { segment: 'へ (se pronuncia e)', role: 'partícula de dirección', explanation: 'Marca el destino hacia el que se avanza' },
        { segment: '行きます', role: 'verbo de desplazamiento', explanation: 'Voy / iré' }
      ]
    }
  },
  {
    id: 'v-hon',
    word: '本',
    reading: 'ほん',
    romaji: 'hon',
    meaningEs: 'Libro',
    partOfSpeech: 'sustantivo',
    category: 'Objetos & Escuela',
    jlpt: 'N5',
    priority: 'alta',
    exampleSentence: {
      japanese: '図書館で本を借ります。',
      kana: 'としょかんで ほんを かります。',
      romaji: 'Toshokan de hon o karimasu.',
      spanish: 'Pido prestado un libro en la biblioteca.',
      breakdown: [
        { segment: '図書館で', role: 'lugar + partícula で', explanation: 'En la biblioteca' },
        { segment: '本を', role: 'objeto directo + を', explanation: 'Libro' },
        { segment: '借ります', role: 'verbo', explanation: 'Pedir prestado / tomar prestado' }
      ]
    }
  },
  {
    id: 'v-nihon',
    word: '日本',
    reading: 'にほん',
    romaji: 'nihon',
    meaningEs: 'Japón',
    partOfSpeech: 'sustantivo',
    category: 'Países & Lugares',
    jlpt: 'N5',
    priority: 'alta',
    notes: 'También se pronuncia "Nippon" en contextos oficiales o deportivos.',
    exampleSentence: {
      japanese: '日本へ旅行に行きたいです。',
      kana: 'にほんへ りょこうに いきたいです。',
      romaji: 'Nihon e ryokou ni ikitai desu.',
      spanish: 'Quiero ir de viaje a Japón.',
      breakdown: [
        { segment: '日本へ', role: 'destino + partícula へ', explanation: 'Hacia Japón' },
        { segment: '旅行に', role: 'propósito + partícula に', explanation: 'Para viajar / con motivo de viaje' },
        { segment: '行きたいです', role: 'verbo en forma deseativa -tai', explanation: 'Quiero ir' }
      ]
    }
  },
  {
    id: 'v-watashi',
    word: '私',
    reading: 'わたし',
    romaji: 'watashi',
    meaningEs: 'Yo',
    partOfSpeech: 'sustantivo',
    category: 'Personas & Pronombres',
    jlpt: 'N5',
    priority: 'alta',
    notes: 'En japonés natural se omite cuando el contexto es claro. ¡No comiences cada frase con "watashi wa"!',
    exampleSentence: {
      japanese: '私はカルロスです。メキシコから来ました。',
      kana: 'わたしは かるろす です。めきしこから きました。',
      romaji: 'Watashi wa Karurosu desu. Mekishiko kara kimashita.',
      spanish: 'Yo soy Carlos. Vine de México.',
      breakdown: [
        { segment: '私は', role: 'sujeto temático', explanation: 'En cuanto a mí' },
        { segment: 'カルロスです', role: 'nombre + cópula', explanation: 'Soy Carlos' },
        { segment: 'メキシコから', role: 'origen + kara', explanation: 'Desde México' },
        { segment: '来ました', role: 'verbo pasado', explanation: 'Vine' }
      ]
    }
  },
  {
    id: 'v-sensei',
    word: '先生',
    reading: 'せんせい',
    romaji: 'sensei',
    meaningEs: 'Profesor / Maestro / Doctor',
    partOfSpeech: 'sustantivo',
    category: 'Personas & Pronombres',
    jlpt: 'N5',
    priority: 'alta',
    notes: 'Significa literalmente "nacido antes". Nunca se usa para referirse a uno mismo ("no digas: yo soy sensei", di: 教師 kyoushi).',
    exampleSentence: {
      japanese: '日本語の先生に質問しました。',
      kana: 'にほんごの せんせいに しつもんしました。',
      romaji: 'Nihongo no sensei ni shitsumon shimashita.',
      spanish: 'Le hice una pregunta al profesor de japonés.',
      breakdown: [
        { segment: '日本語の先生に', role: 'persona destinataria + partícula に', explanation: 'Al profesor de idioma japonés' },
        { segment: '質問しました', role: 'sustantivo verbal + shimashita', explanation: 'Hice una pregunta' }
      ]
    }
  },
  {
    id: 'v-eki',
    word: '駅',
    reading: 'えき',
    romaji: 'eki',
    meaningEs: 'Estación de tren',
    partOfSpeech: 'sustantivo',
    category: 'Transporte & Ciudad',
    jlpt: 'N5',
    priority: 'alta',
    exampleSentence: {
      japanese: '駅はどこですか。',
      kana: 'えきは どこですか。',
      romaji: 'Eki wa doko desu ka.',
      spanish: '¿Dónde está la estación de tren?',
      breakdown: [
        { segment: '駅は', role: 'tema de la pregunta', explanation: 'En cuanto a la estación' },
        { segment: 'どこ', role: 'pronombre interrogativo', explanation: 'Dónde' },
        { segment: 'ですか', role: 'cópula + partícula interrogativa か', explanation: '¿Es / está?' }
      ]
    }
  },
  {
    id: 'v-shinkansen',
    word: '新幹線',
    reading: 'しんかんせん',
    romaji: 'shinkansen',
    meaningEs: 'Tren bala (Shinkansen)',
    partOfSpeech: 'sustantivo',
    category: 'Transporte & Ciudad',
    jlpt: 'N5',
    priority: 'media',
    exampleSentence: {
      japanese: '新幹線で京都へ行きます。',
      kana: 'しんかんせんで きょうとへ いきます。',
      romaji: 'Shinkansen de Kyouto e ikimasu.',
      spanish: 'Voy a Kioto en tren bala.',
      breakdown: [
        { segment: '新幹線で', role: 'medio de transporte + partícula で', explanation: 'Mediante / en tren bala' },
        { segment: '京都へ', role: 'destino + へ', explanation: 'Hacia Kioto' },
        { segment: '行きます', role: 'verbo', explanation: 'Voy' }
      ]
    }
  },
  {
    id: 'v-oishii',
    word: 'おいしい',
    reading: 'おいしい',
    romaji: 'oishii',
    meaningEs: 'Delicioso / Rico / Sabroso',
    partOfSpeech: 'adjetivo-i',
    category: 'Comida & Bebida',
    jlpt: 'N5',
    priority: 'alta',
    notes: 'Es un adjetivo de tipo -i. En pasado se transforma en おいしかった (oishikatta, estuvo delicioso).',
    exampleSentence: {
      japanese: 'このラーメンはとてもおいしいです。',
      kana: 'この らーめんは とても おいしいです。',
      romaji: 'Kono raamen wa totemo oishii desu.',
      spanish: 'Este ramen está muy delicioso.',
      breakdown: [
        { segment: 'このラーメンは', role: 'demostrativo + sustantivo + は', explanation: 'Este ramen (como tema)' },
        { segment: 'とても', role: 'adverbio de grado', explanation: 'Muy / mucho' },
        { segment: 'おいしいです', role: 'adjetivo-i + cópula cortés', explanation: 'Es delicioso' }
      ]
    }
  }
];
