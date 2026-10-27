import { KanjiItem } from '../types';

export const KANJI_DATA: KanjiItem[] = [
  {
    char: '日',
    meaningEs: 'Sol, día, Japón',
    onyomi: ['NICHI', 'JITSU'],
    kunyomi: ['hi', '-bi', '-ka'],
    primaryReading: 'ひ (hi) / にち (nichi)',
    radical: '日',
    radicalMeaning: 'Sol / Día',
    strokeCount: 4,
    jlpt: 'N5',
    grade: 1,
    strokeSteps: [
      '1. Trazo vertical izquierdo',
      '2. Horizontal superior que gira 90° hacia abajo',
      '3. Barra horizontal central interior',
      '4. Barra horizontal inferior que cierra la caja'
    ],
    mnemonicEs: 'Una ventana con una cortina en medio mirando hacia el disco solar saliendo.',
    vocabulary: [
      { word: '日本', reading: 'にほん', romaji: 'nihon', spanish: 'Japón (origen del sol)', jlpt: 'N5' },
      { word: '日曜日', reading: 'にちようび', romaji: 'nichiyoubi', spanish: 'Domingo', jlpt: 'N5' },
      { word: '今日', reading: 'きょう', romaji: 'kyou', spanish: 'Hoy', jlpt: 'N5' },
      { word: '毎日', reading: 'まいにち', romaji: 'mainichi', spanish: 'Todos los días', jlpt: 'N5' }
    ],
    exampleSentence: {
      japanese: '今日はいい日ですね。',
      kana: 'きょうは いい ひ です ね。',
      romaji: 'Kyou wa ii hi desu ne.',
      spanish: 'Hoy hace un buen día, ¿verdad?'
    }
  },
  {
    char: '本',
    meaningEs: 'Libro, origen, base',
    onyomi: ['HON'],
    kunyomi: ['moto'],
    primaryReading: 'ほん (hon)',
    radical: '木',
    radicalMeaning: 'Árbol / Madera',
    strokeCount: 5,
    jlpt: 'N5',
    grade: 1,
    strokeSteps: [
      '1. Trazo horizontal del árbol',
      '2. Trazo vertical central recto',
      '3. Diagonal izquierda descendente',
      '4. Diagonal derecha descendente',
      '5. Trazo horizontal inferior que marca la raíz/origen'
    ],
    mnemonicEs: 'Es el kanji de árbol (木) con una línea abajo marcando sus raíces y origen: los libros vienen de la pulpa de árbol.',
    vocabulary: [
      { word: '本', reading: 'ほん', romaji: 'hon', spanish: 'Libro', jlpt: 'N5' },
      { word: '日本', reading: 'にほん', romaji: 'nihon', spanish: 'Japón', jlpt: 'N5' },
      { word: '日本語', reading: 'にほんご', romaji: 'nihongo', spanish: 'Idioma japonés', jlpt: 'N5' },
      { word: '本屋', reading: 'ほんや', romaji: 'hon\'ya', spanish: 'Librería', jlpt: 'N5' }
    ],
    exampleSentence: {
      japanese: '日本語の本を読みます。',
      kana: 'にほんごの ほんを よみます。',
      romaji: 'Nihongo no hon o yomimasu.',
      spanish: 'Leo un libro de idioma japonés.'
    }
  },
  {
    char: '人',
    meaningEs: 'Persona, ser humano',
    onyomi: ['JIN', 'NIN'],
    kunyomi: ['hito', '-to'],
    primaryReading: 'ひと (hito) / じん (jin)',
    radical: '人',
    radicalMeaning: 'Persona',
    strokeCount: 2,
    jlpt: 'N5',
    grade: 1,
    strokeSteps: [
      '1. Trazo curvo descendente hacia la izquierda',
      '2. Trazo recto descendente hacia la derecha que se apoya en el primero'
    ],
    mnemonicEs: 'Dos piernas caminando hacia adelante, o dos seres humanos apoyándose mutuamente.',
    vocabulary: [
      { word: '人', reading: 'ひと', romaji: 'hito', spanish: 'Persona', jlpt: 'N5' },
      { word: '日本人', reading: 'にほんじん', romaji: 'nihonjin', spanish: 'Persona japonesa', jlpt: 'N5' },
      { word: '外国人', reading: 'がいこくじん', romaji: 'gaikokujin', spanish: 'Extranjero', jlpt: 'N5' },
      { word: '三人', reading: 'さんにん', romaji: 'sannin', spanish: 'Tres personas', jlpt: 'N5' }
    ],
    exampleSentence: {
      japanese: 'あの人は日本人です。',
      kana: 'あの ひとは にほんじん です。',
      romaji: 'Ano hito wa nihonjin desu.',
      spanish: 'Aquella persona es japonesa.'
    }
  },
  {
    char: '水',
    meaningEs: 'Agua',
    onyomi: ['SUI'],
    kunyomi: ['mizu'],
    primaryReading: 'みず (mizu)',
    radical: '水',
    radicalMeaning: 'Agua',
    strokeCount: 4,
    jlpt: 'N5',
    grade: 1,
    strokeSteps: [
      '1. Trazo vertical central con gancho hacia la izquierda',
      '2. Trazo diagonal superior izquierdo angular',
      '3. Diagonal inferior izquierda',
      '4. Diagonal derecha amplia'
    ],
    mnemonicEs: 'Un arroyo que fluye con gotas salpicando a los lados.',
    vocabulary: [
      { word: '水', reading: 'みず', romaji: 'mizu', spanish: 'Agua', jlpt: 'N5' },
      { word: '水曜日', reading: 'すいようび', romaji: 'suiyoubi', spanish: 'Miércoles', jlpt: 'N5' },
      { word: '水泳', reading: 'すいえい', romaji: 'suiei', spanish: 'Natación', jlpt: 'N4' }
    ],
    exampleSentence: {
      japanese: '冷たい水を飲みます。',
      kana: 'つめたい みずを のみます。',
      romaji: 'Tsumetai mizu o nomimasu.',
      spanish: 'Bebo agua fría.'
    }
  },
  {
    char: '木',
    meaningEs: 'Árbol, madera',
    onyomi: ['MOKU', 'BOKU'],
    kunyomi: ['ki', 'ko-'],
    primaryReading: 'き (ki)',
    radical: '木',
    radicalMeaning: 'Árbol',
    strokeCount: 4,
    jlpt: 'N5',
    grade: 1,
    strokeSteps: [
      '1. Trazo horizontal (ramas)',
      '2. Trazo vertical central (tronco)',
      '3. Diagonal izquierda (raíz izquierda)',
      '4. Diagonal derecha (raíz derecha)'
    ],
    mnemonicEs: 'Un árbol con su tronco, copa y raíces firmes en la tierra.',
    vocabulary: [
      { word: '木', reading: 'き', romaji: 'ki', spanish: 'Árbol / Madera', jlpt: 'N5' },
      { word: '木曜日', reading: 'もくようび', romaji: 'mokuyoubi', spanish: 'Jueves', jlpt: 'N5' }
    ],
    exampleSentence: {
      japanese: '庭に大きな木があります。',
      kana: 'にわに おおきな きが あります。',
      romaji: 'Niwa ni ookina ki ga arimasu.',
      spanish: 'Hay un árbol grande en el jardín.'
    }
  },
  {
    char: '火',
    meaningEs: 'Fuego',
    onyomi: ['KA'],
    kunyomi: ['hi', '-bi', 'ho-'],
    primaryReading: 'ひ (hi) / か (ka)',
    radical: '火',
    radicalMeaning: 'Fuego',
    strokeCount: 4,
    jlpt: 'N5',
    grade: 1,
    strokeSteps: [
      '1. Pequeño punto izquierdo',
      '2. Pequeño punto derecho',
      '3. Curva descendente central izquierda',
      '4. Curva descendente central derecha'
    ],
    mnemonicEs: 'Llamas ardientes de una hoguera que despiden chispas.',
    vocabulary: [
      { word: '火', reading: 'ひ', romaji: 'hi', spanish: 'Fuego / Llama', jlpt: 'N5' },
      { word: '火曜日', reading: 'かようび', romaji: 'kayoubi', spanish: 'Martes', jlpt: 'N5' },
      { word: '花火', reading: 'はなび', romaji: 'hanabi', spanish: 'Fuegos artificiales (flores de fuego)', jlpt: 'N4' }
    ],
    exampleSentence: {
      japanese: '火曜日に友達と会います。',
      kana: 'かようびに ともだちと あいます。',
      romaji: 'Kayoubi ni tomodachi to aimasu.',
      spanish: 'Me encuentro con mi amigo el martes.'
    }
  },
  {
    char: '食',
    meaningEs: 'Comer, alimento',
    onyomi: ['SHOKU', 'JIKI'],
    kunyomi: ['ta-beru', 'ku-u'],
    primaryReading: 'た (ta) en 食べる / しょく (shoku)',
    radical: '食',
    radicalMeaning: 'Comida',
    strokeCount: 9,
    jlpt: 'N5',
    grade: 2,
    strokeSteps: [
      '1-2. Techo tipo 𠆢',
      '3. Trazo horizontal corto',
      '4. Trazo vertical',
      '5. Caja central',
      '6-9. Base de plato de comida'
    ],
    mnemonicEs: 'Una persona bajo un techo saboreando un plato caliente servido en la mesa.',
    vocabulary: [
      { word: '食べる', reading: 'たべる', romaji: 'taberu', spanish: 'Comer', jlpt: 'N5' },
      { word: '食べ物', reading: 'たべもの', romaji: 'tabemono', spanish: 'Comida', jlpt: 'N5' },
      { word: '朝食', reading: 'ちょうしょく', romaji: 'choushoku', spanish: 'Desayuno', jlpt: 'N4' },
      { word: '食堂', reading: 'しょくどう', romaji: 'shokudou', spanish: 'Comedor / Cafetería', jlpt: 'N5' }
    ],
    exampleSentence: {
      japanese: 'おいしい寿司を食べます。',
      kana: 'おいしい すしを たべます。',
      romaji: 'Oishii sushi o tabemasu.',
      spanish: 'Como delicioso sushi.'
    }
  },
  {
    char: '飲',
    meaningEs: 'Beber',
    onyomi: ['IN'],
    kunyomi: ['no-mu'],
    primaryReading: 'の (no) en 飲む',
    radical: '食',
    radicalMeaning: 'Comida / Alimento',
    strokeCount: 12,
    jlpt: 'N5',
    grade: 3,
    strokeSteps: [
      '1-8. Radical de comida (食) a la izquierda',
      '9-12. Parte derecha: bostezo o persona abriendo la boca (欠)'
    ],
    mnemonicEs: 'Llevar comida/bebida a una boca abierta para beberla.',
    vocabulary: [
      { word: '飲む', reading: 'のむ', romaji: 'nomu', spanish: 'Beber', jlpt: 'N5' },
      { word: '飲み物', reading: 'のみもの', romaji: 'nomimono', spanish: 'Bebida', jlpt: 'N5' },
      { word: '飲食店', reading: 'いんしょくてん', romaji: 'inshokuten', spanish: 'Restaurante / Bar', jlpt: 'N3' }
    ],
    exampleSentence: {
      japanese: '温かいお茶を飲みます。',
      kana: 'あたたかい おちゃを のみます。',
      romaji: 'Atatakai ocha o nomimasu.',
      spanish: 'Bebo té verde caliente.'
    }
  },
  {
    char: '見',
    meaningEs: 'Ver, mirar, mostrar',
    onyomi: ['KEN'],
    kunyomi: ['mi-ru', 'mi-seru'],
    primaryReading: 'み (mi) en 見る',
    radical: '見',
    radicalMeaning: 'Ver',
    strokeCount: 7,
    jlpt: 'N5',
    grade: 1,
    strokeSteps: [
      '1-5. Ojo (目) en la parte superior',
      '6. Pierna izquierda (儿)',
      '7. Pierna derecha con gancho ascendente'
    ],
    mnemonicEs: 'Un gran ojo (目) sobre dos piernas que va caminando para mirar el mundo.',
    vocabulary: [
      { word: '見る', reading: 'みる', romaji: 'miru', spanish: 'Ver / Mirar', jlpt: 'N5' },
      { word: '見せる', reading: 'みせる', romaji: 'miseru', spanish: 'Mostrar / Enseñar', jlpt: 'N5' },
      { word: '花見', reading: 'はなみ', romaji: 'hanami', spanish: 'Contemplación de cerezos', jlpt: 'N4' },
      { word: '意見', reading: 'いけん', romaji: 'iken', spanish: 'Opinión', jlpt: 'N3' }
    ],
    exampleSentence: {
      japanese: '富士山を見ました。',
      kana: 'ふじさんを みました。',
      romaji: 'Fujisan o mimashita.',
      spanish: 'Vi el monte Fuji.'
    }
  },
  {
    char: '学',
    meaningEs: 'Estudiar, aprender, escuela',
    onyomi: ['GAKU'],
    kunyomi: ['mana-bu'],
    primaryReading: 'がく (gaku)',
    radical: '子',
    radicalMeaning: 'Niño / Hijo',
    strokeCount: 8,
    jlpt: 'N5',
    grade: 1,
    strokeSteps: [
      '1-3. Tres marcas superiores (conocimiento)',
      '4-5. Techo protector (escuela)',
      '6-8. Kanji de niño (子) abajo'
    ],
    mnemonicEs: 'Un niño (子) bajo el techo de la escuela recibiendo chispas de sabiduría.',
    vocabulary: [
      { word: '学生', reading: 'がくせい', romaji: 'gakusei', spanish: 'Estudiante', jlpt: 'N5' },
      { word: '学校', reading: 'がっこう', romaji: 'gakkou', spanish: 'Escuela', jlpt: 'N5' },
      { word: '大学', reading: 'だいがく', romaji: 'daigaku', spanish: 'Universidad', jlpt: 'N5' }
    ],
    exampleSentence: {
      japanese: '私は学生です。',
      kana: 'わたしは がくせい です。',
      romaji: 'Watashi wa gakusei desu.',
      spanish: 'Soy estudiante.'
    }
  }
];
