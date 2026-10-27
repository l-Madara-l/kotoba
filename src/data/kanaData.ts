import { KanaCharacter } from '../types';

export const HIRAGANA_DATA: KanaCharacter[] = [
  // Vowels
  {
    char: 'あ',
    romaji: 'a',
    type: 'hiragana',
    category: 'vowel',
    strokeCount: 3,
    strokeSteps: ['1. Trazo horizontal corto de izquierda a derecha', '2. Trazo vertical curvado que cruza al primero', '3. Bucle amplio en sentido horario terminando con trazo suave'],
    mnemonicEs: 'Parece una manzana ("A"pple en inglés) atravesada por una rama.',
    examples: [
      { word: 'ありがとう', reading: 'ありがとう', romaji: 'arigatou', spanish: 'Gracias' },
      { word: 'あさ', reading: 'あさ', romaji: 'asa', spanish: 'Mañana (temprano)' },
      { word: 'あめ', reading: 'あめ', romaji: 'ame', spanish: 'Lluvia / Caramelo' }
    ]
  },
  {
    char: 'い',
    romaji: 'i',
    type: 'hiragana',
    category: 'vowel',
    strokeCount: 2,
    strokeSteps: ['1. Trazo vertical curvo hacia la izquierda con gancho final', '2. Trazo vertical más corto a la derecha'],
    mnemonicEs: 'Dos anguilas ("Eels" o dos "I"s paralelas que se miran).',
    examples: [
      { word: 'いいえ', reading: 'いいえ', romaji: 'iie', spanish: 'No' },
      { word: 'いぬ', reading: 'いぬ', romaji: 'inu', spanish: 'Perro' },
      { word: 'いま', reading: 'いま', romaji: 'ima', spanish: 'Ahora' }
    ]
  },
  {
    char: 'う',
    romaji: 'u',
    type: 'hiragana',
    category: 'vowel',
    strokeCount: 2,
    strokeSteps: ['1. Pequeño punto diagonal arriba', '2. Gran arco curvo hacia abajo y a la izquierda'],
    mnemonicEs: 'Una persona inclinándose ("Ugh") por levantar algo pesado.',
    examples: [
      { word: 'うみ', reading: 'うみ', romaji: 'umi', spanish: 'Mar' },
      { word: 'うた', reading: 'うた', romaji: 'uta', spanish: 'Canción' },
      { word: 'うえ', reading: 'うえ', romaji: 'ue', spanish: 'Arriba' }
    ]
  },
  {
    char: 'え',
    romaji: 'e',
    type: 'hiragana',
    category: 'vowel',
    strokeCount: 2,
    strokeSteps: ['1. Punto corto horizontal/diagonal arriba', '2. Trazo en zigzag parecido a una Z con curva final'],
    mnemonicEs: 'Un atleta haciendo un "E"xceso de estiramiento.',
    examples: [
      { word: 'えき', reading: 'えき', romaji: 'eki', spanish: 'Estación de tren' },
      { word: 'えん', reading: 'えん', romaji: 'en', spanish: 'Yen (moneda)' },
      { word: 'えんぴつ', reading: 'えんぴつ', romaji: 'enpitsu', spanish: 'Lápiz' }
    ]
  },
  {
    char: 'お',
    romaji: 'o',
    type: 'hiragana',
    category: 'vowel',
    strokeCount: 3,
    strokeSteps: ['1. Trazo horizontal corto', '2. Trazo vertical que baja, forma un bucle y gira a la derecha', '3. Pequeño trazo diagonal arriba a la derecha'],
    mnemonicEs: 'Un jugador de golf golpeando una bola hacia el hoyo ("O").',
    examples: [
      { word: 'お茶', reading: 'おちゃ', romaji: 'ocha', spanish: 'Té verde' },
      { word: 'おなまえ', reading: 'おなまえ', romaji: 'onamae', spanish: 'Tu nombre' },
      { word: 'お金', reading: 'おかね', romaji: 'okane', spanish: 'Dinero' }
    ]
  },

  // K series
  {
    char: 'か',
    romaji: 'ka',
    type: 'hiragana',
    category: 'k',
    strokeCount: 3,
    strokeSteps: ['1. Trazo que va a la derecha, baja y hace un gancho', '2. Trazo vertical largo que cruza', '3. Pequeño acento a la derecha'],
    mnemonicEs: 'Parece una persona cortando una caña ("Ka"ña).',
    examples: [
      { word: 'かわ', reading: 'かわ', romaji: 'kawa', spanish: 'Río' },
      { word: 'かさ', reading: 'かさ', romaji: 'kasa', spanish: 'Paraguas' }
    ]
  },
  {
    char: 'き',
    romaji: 'ki',
    type: 'hiragana',
    category: 'k',
    strokeCount: 4,
    strokeSteps: ['1. Línea horizontal superior', '2. Línea horizontal inferior paralela', '3. Trazo diagonal que cruza', '4. Bucle semicircular abierto abajo'],
    mnemonicEs: 'Parece una llave antigua ("Key" en inglés = Ki).',
    similarConfusions: ['さ', 'ち'],
    examples: [
      { word: 'きょう', reading: 'きょう', romaji: 'kyou', spanish: 'Hoy' },
      { word: 'きって', reading: 'きって', romaji: 'kitte', spanish: 'Sello postal' }
    ]
  },
  {
    char: 'く',
    romaji: 'ku',
    type: 'hiragana',
    category: 'k',
    strokeCount: 1,
    strokeSteps: ['1. Un solo trazo angular formando una punta hacia la izquierda (<)'],
    mnemonicEs: 'El pico abierto de un pájaro cuco ("Ku-ko").',
    examples: [
      { word: 'くるま', reading: 'くるま', romaji: 'kuruma', spanish: 'Coche / Auto' },
      { word: 'くに', reading: 'くに', romaji: 'kuni', spanish: 'País' }
    ]
  },
  {
    char: 'け',
    romaji: 'ke',
    type: 'hiragana',
    category: 'k',
    strokeCount: 3,
    strokeSteps: ['1. Trazo vertical izquierdo ligeramente curvo con gancho', '2. Trazo horizontal corto a la derecha', '3. Trazo vertical derecho largo'],
    mnemonicEs: 'Una espada samurai junto a un barril de sake ("Ke").',
    examples: [
      { word: 'けさ', reading: 'けさ', romaji: 'kesa', spanish: 'Esta mañana' },
      { word: 'けいさつ', reading: 'けいさつ', romaji: 'keisatsu', spanish: 'Policía' }
    ]
  },
  {
    char: 'こ',
    romaji: 'ko',
    type: 'hiragana',
    category: 'k',
    strokeCount: 2,
    strokeSteps: ['1. Trazo horizontal superior con gancho sutil', '2. Trazo horizontal inferior ligeramente curvo'],
    mnemonicEs: 'Dos gusanos o dos carpas koi ("Ko") nadando en paralelo.',
    examples: [
      { word: 'これ', reading: 'これ', romaji: 'kore', spanish: 'Esto' },
      { word: 'ここ', reading: 'ここ', romaji: 'koko', spanish: 'Aquí' }
    ]
  },

  // S series
  {
    char: 'さ',
    romaji: 'sa',
    type: 'hiragana',
    category: 's',
    strokeCount: 3,
    strokeSteps: ['1. Trazo horizontal diagonal', '2. Trazo que cruza y baja hacia la derecha', '3. Arco abierto abajo'],
    mnemonicEs: 'Una persona bailando salsa ("Sa"). ¡Ojo con き que tiene dos barras horizontales!',
    similarConfusions: ['き', 'ち'],
    examples: [
      { word: 'さくら', reading: 'さくら', romaji: 'sakura', spanish: 'Flor de cerezo' },
      { word: 'さようなら', reading: 'さようなら', romaji: 'sayounara', spanish: 'Adiós' }
    ]
  },
  {
    char: 'し',
    romaji: 'shi',
    type: 'hiragana',
    category: 's',
    strokeCount: 1,
    strokeSteps: ['1. Trazo vertical que baja y sube en forma de gancho'],
    mnemonicEs: 'Un anzuelo para pescar o una gota de agua ("Shi").',
    examples: [
      { word: 'しんかんせん', reading: 'しんかんせん', romaji: 'shinkansen', spanish: 'Tren bala' },
      { word: 'しずか', reading: 'しずか', romaji: 'shizuka', spanish: 'Tranquilo / Silencioso' }
    ]
  },
  {
    char: 'す',
    romaji: 'su',
    type: 'hiragana',
    category: 's',
    strokeCount: 2,
    strokeSteps: ['1. Trazo horizontal recto', '2. Trazo vertical que cruza, hace un bucle cerrado y baja curvado'],
    mnemonicEs: 'Un gimnasta haciendo una pirueta en una barra ("Su").',
    examples: [
      { word: 'すし', reading: 'すし', romaji: 'sushi', spanish: 'Sushi' },
      { word: 'すき', reading: 'すき', romaji: 'suki', spanish: 'Gustar / Favorito' }
    ]
  },
  {
    char: 'せ',
    romaji: 'se',
    type: 'hiragana',
    category: 's',
    strokeCount: 3,
    strokeSteps: ['1. Trazo horizontal largo', '2. Trazo vertical derecho con gancho', '3. Trazo vertical izquierdo que baja y gira a la derecha'],
    mnemonicEs: 'Un sofá visto de lado ("Se"ttee).',
    examples: [
      { word: 'せんせい', reading: 'せんせい', romaji: 'sensei', spanish: 'Profesor / Maestro' },
      { word: 'せかい', reading: 'せかい', romaji: 'sekai', spanish: 'Mundo' }
    ]
  },
  {
    char: 'そ',
    romaji: 'so',
    type: 'hiragana',
    category: 's',
    strokeCount: 1,
    strokeSteps: ['1. Un trazo continuo: horizontal, diagonal izquierda, horizontal, curva amplia abajo'],
    mnemonicEs: 'Una aguja e hilo cociendo ("So"wing) en zigzag.',
    examples: [
      { word: 'そこ', reading: 'そこ', romaji: 'soko', spanish: 'Ahí (cerca del oyente)' },
      { word: 'そら', reading: 'そら', romaji: 'sora', spanish: 'Cielo' }
    ]
  },

  // T series
  {
    char: 'た',
    romaji: 'ta',
    type: 'hiragana',
    category: 't',
    strokeCount: 4,
    strokeSteps: ['1. Horizontal corto', '2. Diagonal que cruza', '3. Pequeño trazo curvo tipo こ a la derecha', '4. Trazo inferior complementario'],
    mnemonicEs: 'Parece las letras "t" y "a" combinadas en una sola.',
    examples: [
      { word: 'たべる', reading: 'たべる', romaji: 'taberu', spanish: 'Comer' },
      { word: 'たのしい', reading: 'たのしい', romaji: 'tanoshii', spanish: 'Divertido' }
    ]
  },
  {
    char: 'ち',
    romaji: 'chi',
    type: 'hiragana',
    category: 't',
    strokeCount: 2,
    strokeSteps: ['1. Trazo horizontal diagonal corto', '2. Trazo vertical que baja y forma un semicírculo amplio hacia la derecha'],
    mnemonicEs: 'Una animadora ("Cheerleader" = Chi) con gran energía.',
    similarConfusions: ['さ', 'き'],
    examples: [
      { word: 'ちず', reading: 'ちず', romaji: 'chizu', spanish: 'Mapa' },
      { word: 'ちかてつ', reading: 'ちかてつ', romaji: 'chikatetsu', spanish: 'Metro subterráneo' }
    ]
  },
  {
    char: 'つ',
    romaji: 'tsu',
    type: 'hiragana',
    category: 't',
    strokeCount: 1,
    strokeSteps: ['1. Curva única amplia que recuerda a una gran ola rompiendo'],
    mnemonicEs: 'Una ola gigante de un "Tsunami" (Tsu).',
    examples: [
      { word: 'つき', reading: 'つき', romaji: 'tsuki', spanish: 'Luna' },
      { word: '机', reading: 'つくえ', romaji: 'tsukue', spanish: 'Escritorio' }
    ]
  },
  {
    char: 'て',
    romaji: 'te',
    type: 'hiragana',
    category: 't',
    strokeCount: 1,
    strokeSteps: ['1. Trazo horizontal que gira con una curva suave hacia la izquierda abajo'],
    mnemonicEs: 'Una persona señalando con su mano ("Te" en japonés significa mano).',
    examples: [
      { word: 'てがみ', reading: 'てがみ', romaji: 'tegami', spanish: 'Carta' },
      { word: 'てんき', reading: 'てんき', romaji: 'tenki', spanish: 'Clima' }
    ]
  },
  {
    char: 'と',
    romaji: 'to',
    type: 'hiragana',
    category: 't',
    strokeCount: 2,
    strokeSteps: ['1. Pequeño trazo diagonal que baja a la derecha', '2. Curva tipo "C" que se apoya en el primer trazo'],
    mnemonicEs: 'Un dedo del pie ("Toe" = To) con una astilla.',
    examples: [
      { word: 'ともだち', reading: 'ともだち', romaji: 'tomodachi', spanish: 'Amigo' },
      { word: 'とうきょう', reading: 'とうきょう', romaji: 'toukyou', spanish: 'Tokio' }
    ]
  },

  // N series
  {
    char: 'な',
    romaji: 'na',
    type: 'hiragana',
    category: 'n',
    strokeCount: 4,
    strokeSteps: ['1. Horizontal corto', '2. Diagonal cruzada', '3. Pequeño punto diagonal', '4. Bucle inferior con curva'],
    mnemonicEs: 'Una monja ("Nun" = Na) rezando ante una cruz.',
    examples: [
      { word: 'なまえ', reading: 'なまえ', romaji: 'namae', spanish: 'Nombre' },
      { word: 'なつ', reading: 'なつ', romaji: 'natsu', spanish: 'Verano' }
    ]
  },
  {
    char: 'に',
    romaji: 'ni',
    type: 'hiragana',
    category: 'n',
    strokeCount: 3,
    strokeSteps: ['1. Trazo vertical curvo a la izquierda con gancho', '2. Horizontal superior derecho', '3. Horizontal inferior derecho'],
    mnemonicEs: 'Una aguja enhebrando un hilo ("Needle" = Ni).',
    examples: [
      { word: 'にほん', reading: 'にほん', romaji: 'nihon', spanish: 'Japón' },
      { word: 'にく', reading: 'にく', romaji: 'niku', spanish: 'Carne' }
    ]
  },
  {
    char: 'ぬ',
    romaji: 'nu',
    type: 'hiragana',
    category: 'n',
    strokeCount: 2,
    strokeSteps: ['1. Trazo diagonal descendente', '2. Trazo curvo que cruza, da la vuelta y termina en un pequeño rizo'],
    mnemonicEs: 'Fideos enrollados con palillos ("Noodles" = Nu).',
    examples: [
      { word: 'ぬいぐるみ', reading: 'ぬいぐるみ', romaji: 'nuigurumi', spanish: 'Peluche' }
    ]
  },
  {
    char: 'ね',
    romaji: 'ne',
    type: 'hiragana',
    category: 'n',
    strokeCount: 2,
    strokeSteps: ['1. Trazo vertical recto', '2. Trazo en zigzag con gran rizo final a la derecha'],
    mnemonicEs: 'Un gato ("Neko" = Ne) con la cola enroscada.',
    examples: [
      { word: 'ねこ', reading: 'ねこ', romaji: 'neko', spanish: 'Gato' }
    ]
  },
  {
    char: 'の',
    romaji: 'no',
    type: 'hiragana',
    category: 'n',
    strokeCount: 1,
    strokeSteps: ['1. Trazo espiral fluido en sentido horario'],
    mnemonicEs: 'Una señal de prohibido ("No").',
    examples: [
      { word: 'のみもの', reading: 'のみもの', romaji: 'nomimono', spanish: 'Bebida' }
    ]
  },

  // H series
  {
    char: 'は',
    romaji: 'ha',
    type: 'hiragana',
    category: 'h',
    strokeCount: 3,
    strokeSteps: ['1. Vertical curvo con gancho a la izquierda', '2. Horizontal corto arriba a la derecha', '3. Vertical que baja y forma un bucle cerrado'],
    mnemonicEs: 'La letra "H" con un arco inferior ("Ha"). Como partícula se pronuncia "wa".',
    examples: [
      { word: 'はい', reading: 'はい', romaji: 'hai', spanish: 'Sí' },
      { word: 'はな', reading: 'はな', romaji: 'hana', spanish: 'Flor / Nariz' }
    ]
  },
  {
    char: 'ひ',
    romaji: 'hi',
    type: 'hiragana',
    category: 'h',
    strokeCount: 1,
    strokeSteps: ['1. Trazo horizontal corto, baja en curva profunda y sube con gancho'],
    mnemonicEs: 'Una sonrisa amplia ("He-he" = Hi).',
    examples: [
      { word: 'ひと', reading: 'ひと', romaji: 'hito', spanish: 'Persona' },
      { word: 'ひる', reading: 'ひる', romaji: 'hiru', spanish: 'Mediodía' }
    ]
  },
  {
    char: 'ふ',
    romaji: 'fu',
    type: 'hiragana',
    category: 'h',
    strokeCount: 4,
    strokeSteps: ['1. Punto superior', '2. Trazo central con gancho', '3. Punto a la izquierda', '4. Punto a la derecha'],
    mnemonicEs: 'El monte Fuji ("Fu") visto de frente con nieve soplando.',
    examples: [
      { word: 'ふじさん', reading: 'ふじさん', romaji: 'fujisan', spanish: 'Monte Fuji' },
      { word: 'ふゆ', reading: 'ふゆ', romaji: 'fuyu', spanish: 'Invierno' }
    ]
  },
  {
    char: 'へ',
    romaji: 'he',
    type: 'hiragana',
    category: 'h',
    strokeCount: 1,
    strokeSteps: ['1. Sube diagonal y baja suavemente como una colina'],
    mnemonicEs: 'Una montaña o un tejado hacia el que vas ("Heading to" = He).',
    examples: [
      { word: 'へや', reading: 'へや', romaji: 'heya', spanish: 'Habitación' }
    ]
  },
  {
    char: 'ほ',
    romaji: 'ho',
    type: 'hiragana',
    category: 'h',
    strokeCount: 4,
    strokeSteps: ['1. Vertical izquierdo', '2. Horizontal superior', '3. Horizontal inferior', '4. Vertical con bucle cerrado abajo'],
    mnemonicEs: 'Un caballo con sombrero ("Horse" = Ho).',
    examples: [
      { word: 'ほん', reading: 'ほん', romaji: 'hon', spanish: 'Libro' },
      { word: 'ほし', reading: 'ほし', romaji: 'hoshi', spanish: 'Estrella' }
    ]
  },

  // M series
  {
    char: 'ま',
    romaji: 'ma',
    type: 'hiragana',
    category: 'm',
    strokeCount: 3,
    strokeSteps: ['1. Horizontal superior', '2. Horizontal inferior', '3. Vertical que cruza y forma bucle abajo'],
    mnemonicEs: 'Una máscara ("Ma") con dos cintas.',
    examples: [
      { word: 'まち', reading: 'まち', romaji: 'machi', spanish: 'Ciudad / Barrio' }
    ]
  },
  {
    char: 'み',
    romaji: 'mi',
    type: 'hiragana',
    category: 'm',
    strokeCount: 2,
    strokeSteps: ['1. Diagonal, bucle y horizontal', '2. Trazo diagonal que corta'],
    mnemonicEs: 'El número 21 estilizado para una nota musical ("Mi").',
    examples: [
      { word: 'みず', reading: 'みず', romaji: 'mizu', spanish: 'Agua' },
      { word: 'みせ', reading: 'みせ', romaji: 'mise', spanish: 'Tienda' }
    ]
  },
  {
    char: 'む',
    romaji: 'mu',
    type: 'hiragana',
    category: 'm',
    strokeCount: 3,
    strokeSteps: ['1. Horizontal corto', '2. Vertical con bucle y curva derecha', '3. Acento arriba a la derecha'],
    mnemonicEs: 'Una vaca mugiendo ("Muuu").',
    examples: [
      { word: 'むし', reading: 'むし', romaji: 'mushi', spanish: 'Insecto' }
    ]
  },
  {
    char: 'め',
    romaji: 'me',
    type: 'hiragana',
    category: 'm',
    strokeCount: 2,
    strokeSteps: ['1. Diagonal descendente', '2. Arco amplio que cruza sin bucle al final'],
    mnemonicEs: 'Un ojo ("Me" en japonés significa ojo). Diferente de ぬ porque no tiene el rizo final.',
    examples: [
      { word: 'めがね', reading: 'めがね', romaji: 'megane', spanish: 'Gafas / Lentes' }
    ]
  },
  {
    char: 'も',
    romaji: 'mo',
    type: 'hiragana',
    category: 'm',
    strokeCount: 3,
    strokeSteps: ['1. Trazo vertical que sube con gancho amplio (como un anzuelo し)', '2. Horizontal superior', '3. Horizontal inferior'],
    mnemonicEs: 'Un anzuelo con más ("More" = Mo) gusanos para pescar.',
    examples: [
      { word: 'もり', reading: 'もり', romaji: 'mori', spanish: 'Bosque' }
    ]
  },

  // Y series
  {
    char: 'や',
    romaji: 'ya',
    type: 'hiragana',
    category: 'y',
    strokeCount: 3,
    strokeSteps: ['1. Curva ascendente y descendente con gancho', '2. Pequeño trazo inclinado arriba a la izquierda', '3. Trazo vertical que cruza'],
    mnemonicEs: 'Un yate ("Ya"cht) con su mástil navegando.',
    examples: [
      { word: 'やま', reading: 'やま', romaji: 'yama', spanish: 'Montaña' },
      { word: 'やすみ', reading: 'やすみ', romaji: 'yasumi', spanish: 'Descanso / Vacaciones' }
    ]
  },
  {
    char: 'ゆ',
    romaji: 'yu',
    type: 'hiragana',
    category: 'y',
    strokeCount: 2,
    strokeSteps: ['1. Baja, sube en arco y cruza', '2. Trazo vertical que corta por el centro'],
    mnemonicEs: 'Un pez nadando en aguas termales ("Yu" en japonés es agua caliente).',
    examples: [
      { word: 'ゆき', reading: 'ゆき', romaji: 'yuki', spanish: 'Nieve' },
      { word: 'ゆめ', reading: 'ゆめ', romaji: 'yume', spanish: 'Sueño' }
    ]
  },
  {
    char: 'よ',
    romaji: 'yo',
    type: 'hiragana',
    category: 'y',
    strokeCount: 2,
    strokeSteps: ['1. Horizontal corto a la izquierda', '2. Trazo vertical que cruza y forma un lazo a la derecha'],
    mnemonicEs: 'Una persona jugando con un yoyó ("Yo-yo").',
    examples: [
      { word: 'よる', reading: 'よる', romaji: 'yoru', spanish: 'Noche' }
    ]
  },

  // R series
  {
    char: 'ら',
    romaji: 'ra',
    type: 'hiragana',
    category: 'r',
    strokeCount: 2,
    strokeSteps: ['1. Punto horizontal arriba', '2. Trazo curvo semicircular abajo'],
    mnemonicEs: 'Un conejo ("Rabbit" = Ra) sentado de espaldas.',
    examples: [
      { word: 'らいしゅう', reading: 'らいしゅう', romaji: 'raishuu', spanish: 'Próxima semana' }
    ]
  },
  {
    char: 'り',
    romaji: 'ri',
    type: 'hiragana',
    category: 'r',
    strokeCount: 2,
    strokeSteps: ['1. Trazo vertical corto izquierdo', '2. Trazo vertical largo derecho con curva'],
    mnemonicEs: 'Dos cintas de seda flotando ("Ribbons" = Ri).',
    examples: [
      { word: 'りんご', reading: 'りんご', romaji: 'ringo', spanish: 'Manzana' },
      { word: 'りょこう', reading: 'りょこう', romaji: 'ryokou', spanish: 'Viaje' }
    ]
  },
  {
    char: 'る',
    romaji: 'ru',
    type: 'hiragana',
    category: 'r',
    strokeCount: 1,
    strokeSteps: ['1. Horizontal, diagonal izquierda, arco amplio y un pequeño rizo circular final'],
    mnemonicEs: 'El número 3 sosteniendo una perla de rubí ("Ru").',
    examples: [
      { word: 'るす', reading: 'るす', romaji: 'rusu', spanish: 'Ausente de casa' }
    ]
  },
  {
    char: 'れ',
    romaji: 're',
    type: 'hiragana',
    category: 'r',
    strokeCount: 2,
    strokeSteps: ['1. Vertical recto', '2. Zigzag que sube y se abre hacia afuera con gancho'],
    mnemonicEs: 'Una persona descansando con las piernas estiradas ("Relax" = Re).',
    examples: [
      { word: 'れきし', reading: 'れきし', romaji: 'rekishi', spanish: 'Historia' }
    ]
  },
  {
    char: 'ろ',
    romaji: 'ro',
    type: 'hiragana',
    category: 'r',
    strokeCount: 1,
    strokeSteps: ['1. Similar a る pero termina abierto sin el rizo circular'],
    mnemonicEs: 'Una carretera ("Road" = Ro) curva sin fin.',
    examples: [
      { word: 'ろうそく', reading: 'ろうそく', romaji: 'rousoku', spanish: 'Vela' }
    ]
  },

  // W series & N
  {
    char: 'わ',
    romaji: 'wa',
    type: 'hiragana',
    category: 'w',
    strokeCount: 2,
    strokeSteps: ['1. Vertical izquierdo recto', '2. Zigzag suave con gran barriga redondeada'],
    mnemonicEs: 'Una avispa ("Wasp" = Wa) volando.',
    examples: [
      { word: 'わたし', reading: 'わたし', romaji: 'watashi', spanish: 'Yo' }
    ]
  },
  {
    char: 'を',
    romaji: 'wo',
    type: 'hiragana',
    category: 'w',
    strokeCount: 3,
    strokeSteps: ['1. Horizontal corto', '2. Trazo que cruza en ángulo agudo', '3. Arco semicircular inferior tipo C'],
    mnemonicEs: 'Partícula gramatical de objeto directo. Se pronuncia "o".',
    examples: [
      { word: '水を飲む', reading: 'みずをのむ', romaji: 'mizu o nomu', spanish: 'Beber agua' }
    ]
  },
  {
    char: 'ん',
    romaji: 'n',
    type: 'hiragana',
    category: 'n_single',
    strokeCount: 1,
    strokeSteps: ['1. Un solo trazo fluido que parece la letra "n" manuscrita cursiva'],
    mnemonicEs: 'La única consonante que puede sonar sola al final de sílaba.',
    examples: [
      { word: 'にほん', reading: 'にほん', romaji: 'nihon', spanish: 'Japón' },
      { word: 'おんがく', reading: 'おんがく', romaji: 'ongaku', spanish: 'Música' }
    ]
  }
];

export const KATAKANA_DATA: KanaCharacter[] = [
  {
    char: 'ア',
    romaji: 'a',
    type: 'katakana',
    category: 'vowel',
    strokeCount: 2,
    strokeSteps: ['1. Horizontal con caída oblicua', '2. Trazo curvo descendente a la izquierda'],
    mnemonicEs: 'Un hacha ("A"xe) cortando madera.',
    examples: [
      { word: 'アイス', reading: 'アイス', romaji: 'aisu', spanish: 'Helado' },
      { word: 'アニメ', reading: 'アニメ', romaji: 'anime', spanish: 'Anime' }
    ]
  },
  {
    char: 'イ',
    romaji: 'i',
    type: 'katakana',
    category: 'vowel',
    strokeCount: 2,
    strokeSteps: ['1. Diagonal izquierda', '2. Vertical recto hacia abajo'],
    mnemonicEs: 'Un caballete de pintura ("Easel" = I).',
    examples: [
      { word: 'イギリス', reading: 'イギリス', romaji: 'igirisu', spanish: 'Reino Unido' }
    ]
  },
  {
    char: 'ウ',
    romaji: 'u',
    type: 'katakana',
    category: 'vowel',
    strokeCount: 3,
    strokeSteps: ['1. Punto superior vertical', '2. Punto lateral izquierdo', '3. Techo horizontal con caída en gancho'],
    mnemonicEs: 'Un paraguas ("Umbrella" = U).',
    examples: [
      { word: 'ウェブ', reading: 'ウェブ', romaji: 'webu', spanish: 'Web' }
    ]
  },
  {
    char: 'エ',
    romaji: 'e',
    type: 'katakana',
    category: 'vowel',
    strokeCount: 3,
    strokeSteps: ['1. Horizontal superior', '2. Vertical central', '3. Horizontal inferior más largo'],
    mnemonicEs: 'Una viga de acero para un elevador ("Elevator" = E).',
    examples: [
      { word: 'エレベーター', reading: 'エレベーター', romaji: 'erebeetaa', spanish: 'Ascensor' }
    ]
  },
  {
    char: 'オ',
    romaji: 'o',
    type: 'katakana',
    category: 'vowel',
    strokeCount: 3,
    strokeSteps: ['1. Horizontal', '2. Vertical con gancho a la izquierda', '3. Diagonal derecha descendente'],
    mnemonicEs: 'Un cantante de ópera ("O"pera) con los brazos abiertos.',
    examples: [
      { word: 'オレンジ', reading: 'オレンジ', romaji: 'orenji', spanish: 'Naranja' }
    ]
  },
  {
    char: 'カ',
    romaji: 'ka',
    type: 'katakana',
    category: 'k',
    strokeCount: 2,
    strokeSteps: ['1. Horizontal con caída y gancho', '2. Trazo diagonal curvo que cruza'],
    mnemonicEs: 'Casi idéntico a か en Hiragana, pero sin el tercer punto y más anguloso.',
    examples: [
      { word: 'カメラ', reading: 'カメラ', romaji: 'kamera', spanish: 'Cámara' },
      { word: 'カフェ', reading: 'カフェ', romaji: 'kafe', spanish: 'Cafetería' }
    ]
  },
  {
    char: 'シ',
    romaji: 'shi',
    type: 'katakana',
    category: 's',
    strokeCount: 3,
    strokeSteps: ['1. Punto superior', '2. Punto intermedio', '3. Trazo que sube de abajo hacia arriba en diagonal'],
    mnemonicEs: 'Una cara sonriente mirando hacia arriba ("She smiles"). Ojo: los trazos van de abajo hacia arriba.',
    similarConfusions: ['ツ', 'ソ', 'ン'],
    examples: [
      { word: 'シャツ', reading: 'シャツ', romaji: 'shatsu', spanish: 'Camisa' }
    ]
  },
  {
    char: 'ツ',
    romaji: 'tsu',
    type: 'katakana',
    category: 't',
    strokeCount: 3,
    strokeSteps: ['1. Punto superior izquierdo vertical', '2. Punto superior derecho vertical', '3. Trazo que cae desde arriba hacia abajo'],
    mnemonicEs: 'Dos agujas cayendo con un hilo ("Tsunami de agujas"). Ojo: cae de arriba hacia abajo.',
    similarConfusions: ['シ', 'ソ', 'ン'],
    examples: [
      { word: 'ツアー', reading: 'ツアー', romaji: 'tsuaa', spanish: 'Tour / Excursión' }
    ]
  },
  {
    char: 'コ',
    romaji: 'ko',
    type: 'katakana',
    category: 'k',
    strokeCount: 2,
    strokeSteps: ['1. Horizontal con esquina recta hacia abajo', '2. Horizontal inferior'],
    mnemonicEs: 'Una caja abierta o esquina ("Corner" = Ko).',
    examples: [
      { word: 'コーヒー', reading: 'コーヒー', romaji: 'koohii', spanish: 'Café' },
      { word: 'コンビニ', reading: 'コンビニ', romaji: 'konbini', spanish: 'Tienda 24h (Konbini)' }
    ]
  },
  {
    char: 'サ',
    romaji: 'sa',
    type: 'katakana',
    category: 's',
    strokeCount: 3,
    strokeSteps: ['1. Horizontal largo', '2. Vertical izquierdo corto', '3. Vertical derecho más largo'],
    mnemonicEs: 'Tres sardinas ("Sa"rdines).',
    examples: [
      { word: 'サラダ', reading: 'サラダ', romaji: 'sarada', spanish: 'Ensalada' }
    ]
  },
  {
    char: 'タ',
    romaji: 'ta',
    type: 'katakana',
    category: 't',
    strokeCount: 3,
    strokeSteps: ['1. Diagonal descendente izquierda', '2. Horizontal con caída oblicua', '3. Trazo diagonal interior'],
    mnemonicEs: 'Un taco de comida mexicana ("Ta"co).',
    examples: [
      { word: 'タクシー', reading: 'タクシー', romaji: 'takushii', spanish: 'Taxi' }
    ]
  },
  {
    char: 'テ',
    romaji: 'te',
    type: 'katakana',
    category: 't',
    strokeCount: 3,
    strokeSteps: ['1. Horizontal superior corto', '2. Horizontal medio más largo', '3. Curva descendente hacia la izquierda'],
    mnemonicEs: 'Una antena de televisión ("Te"levisión).',
    examples: [
      { word: 'テレビ', reading: 'テレビ', romaji: 'terebi', spanish: 'Televisión' },
      { word: 'ホテル', reading: 'ホテル', romaji: 'hoteru', spanish: 'Hotel' }
    ]
  },
  {
    char: 'ト',
    romaji: 'to',
    type: 'katakana',
    category: 't',
    strokeCount: 2,
    strokeSteps: ['1. Vertical largo', '2. Diagonal corta hacia la derecha'],
    mnemonicEs: 'Un tótem indio ("To"tem).',
    examples: [
      { word: 'トイレ', reading: 'トイレ', romaji: 'toire', spanish: 'Baño / Servicio' },
      { word: 'トマト', reading: 'トマト', romaji: 'tomato', spanish: 'Tomate' }
    ]
  },
  {
    char: 'ナ',
    romaji: 'na',
    type: 'katakana',
    category: 'n',
    strokeCount: 2,
    strokeSteps: ['1. Horizontal recto', '2. Diagonal izquierda cruzada'],
    mnemonicEs: 'Una navaja ("Na"vaja) abierta.',
    examples: [
      { word: 'ナイフ', reading: 'ナイフ', romaji: 'naifu', spanish: 'Cuchillo' }
    ]
  },
  {
    char: 'ハ',
    romaji: 'ha',
    type: 'katakana',
    category: 'h',
    strokeCount: 2,
    strokeSteps: ['1. Trazo oblicuo izquierdo', '2. Trazo oblicuo derecho opuesto'],
    mnemonicEs: 'Las patas de una choza hawaiana ("Ha"waiian).',
    examples: [
      { word: 'ハンバーガー', reading: 'ハンバーガー', romaji: 'hanbaagaa', spanish: 'Hamburguesa' }
    ]
  },
  {
    char: 'マ',
    romaji: 'ma',
    type: 'katakana',
    category: 'm',
    strokeCount: 2,
    strokeSteps: ['1. Trazo que va a la derecha y baja en diagonal izquierda', '2. Trazo diagonal corto a la derecha'],
    mnemonicEs: 'El pico de una máscara de martín pescador ("Ma").',
    examples: [
      { word: 'マンガ', reading: 'マンガ', romaji: 'manga', spanish: 'Manga' }
    ]
  },
  {
    char: 'ラ',
    romaji: 'ra',
    type: 'katakana',
    category: 'r',
    strokeCount: 2,
    strokeSteps: ['1. Horizontal superior corto', '2. Trazo que baja y gira en ángulo recto'],
    mnemonicEs: 'Un plato de ramen ("Ra"men) humeante.',
    examples: [
      { word: 'ラーメン', reading: 'ラーメン', romaji: 'raamen', spanish: 'Ramen' },
      { word: 'ラジオ', reading: 'ラジオ', romaji: 'rajio', spanish: 'Radio' }
    ]
  },
  {
    char: 'ル',
    romaji: 'ru',
    type: 'katakana',
    category: 'r',
    strokeCount: 2,
    strokeSteps: ['1. Vertical curvo izquierdo', '2. Trazo derecho con curva y gancho hacia arriba'],
    mnemonicEs: 'Dos raíces de árbol ("Roots" = Ru).',
    examples: [
      { word: 'ルール', reading: 'ルール', romaji: 'ruuru', spanish: 'Regla / Norma' }
    ]
  },
  {
    char: 'ン',
    romaji: 'n',
    type: 'katakana',
    category: 'n_single',
    strokeCount: 2,
    strokeSteps: ['1. Punto diagonal superior', '2. Trazo que sube de abajo hacia arriba a la derecha'],
    mnemonicEs: 'Un ojo guiñando ("N"). Similar a ソ, pero el segundo trazo sube de abajo hacia arriba.',
    similarConfusions: ['ソ', 'シ', 'ツ'],
    examples: [
      { word: 'パン', reading: 'パン', romaji: 'pan', spanish: 'Pan' },
      { word: 'ペン', reading: 'ペン', romaji: 'pen', spanish: 'Bolígrafo' }
    ]
  }
];
