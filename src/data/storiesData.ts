import { GradedStory } from '../types';

export const GRADED_STORIES: GradedStory[] = [
  {
    id: 'tokyo-day',
    titleJp: '東京の一日：浅草から秋葉原へ',
    titleKana: 'とうきょうの いちにち：あさくさから あきはばらへ',
    titleEs: 'Un día en Tokio: De Asakusa a Akihabara',
    level: 'N5',
    summary: 'Acompaña a Elena en su primer día explorando el contraste entre la tradición milenaria del templo Senso-ji en Asakusa y la modernidad tecnológica de Akihabara.',
    paragraphs: [
      {
        japanese: '朝、エレナさんは浅草へ行きました。浅草には大きくて赤い雷門があります。',
        kana: 'あさ、えれなさんは あさくさへ いきました。あさくさには おおきくて あかい かみなりもんが あります。',
        spanish: 'Por la mañana, Elena fue a Asakusa. En Asakusa está la gran y roja puerta Kaminarimon.',
        glossary: [
          { word: '朝', reading: 'あさ', spanish: 'Mañana (temprano)' },
          { word: '浅草', reading: 'あさくさ', spanish: 'Asakusa (barrio histórico de Tokio)' },
          { word: '雷門', reading: 'かみなりもん', spanish: 'Puerta del Trueno (entrada al templo Senso-ji)' },
          { word: '赤い', reading: 'あかい', spanish: 'Rojo' }
        ]
      },
      {
        japanese: '仲見世通りで温かい抹茶とお団子を食べました。とてもおいしかったです。',
        kana: 'なかみせどおりで あたたかい まっちゃと おだんごを たべました。とても おいしかったです。',
        spanish: 'En la calle Nakamise comió té matcha templado y brochetas de dango. Estaban muy deliciosos.',
        glossary: [
          { word: '仲見世通り', reading: 'なかみせどおり', spanish: 'Calle comercial Nakamise' },
          { word: '抹茶', reading: 'まっちゃ', spanish: 'Té verde matcha' },
          { word: 'お団子', reading: 'おだんご', spanish: 'Dango (bolitas dulces de arroz)' },
          { word: 'おいしかった', reading: 'おいしかった', spanish: 'Estuvo rico (pasado de oishii)' }
        ]
      },
      {
        japanese: '午後、電車で秋葉原へ行きました。秋葉原にはたくさんのアニメの店や電子機器があります。',
        kana: 'ごご、でんしゃで あきはばらへ いきました。あきはばらには たくさんの あにめの みせや でんしききが あります。',
        spanish: 'Por la tarde fue en tren a Akihabara. En Akihabara hay muchísimas tiendas de anime y tecnología electrónica.',
        glossary: [
          { word: '午後', reading: 'ごご', spanish: 'Tarde (p.m.)' },
          { word: '電車', reading: 'でんしゃ', spanish: 'Tren eléctrico' },
          { word: '秋葉原', reading: 'あきはばら', spanish: 'Akihabara (barrio meca de la tecnología y otaku)' },
          { word: '店', reading: 'みせ', spanish: 'Tienda' }
        ]
      },
      {
        japanese: 'エレナさんは日本の伝統と現代の文化を両方楽しむことができました。',
        kana: 'えれなさんは にほんの でんとうと げんだいの ぶんかを りょうほう たのしむことが できました。',
        spanish: 'Elena pudo disfrutar tanto de la tradición como de la cultura moderna de Japón.',
        glossary: [
          { word: '伝統', reading: 'でんとう', spanish: 'Tradición' },
          { word: '現代', reading: 'げんだい', spanish: 'Era contemporánea / Modernidad' },
          { word: '文化', reading: 'ぶんか', spanish: 'Cultura' },
          { word: '両方', reading: 'りょうほう', spanish: 'Ambos' }
        ]
      }
    ],
    comprehensionQuiz: [
      {
        question: '¿Qué comió Elena en la calle Nakamise de Asakusa?',
        options: ['Ramen y sushi', 'Té matcha y dango', 'Pan y café', 'Hamburguesa'],
        correctIndex: 1,
        explanation: 'En el segundo párrafo se indica: "温かい抹茶とお団子を食べました" (comió té matcha caliente y dango).'
      },
      {
        question: '¿Cómo se desplazó Elena desde Asakusa hasta Akihabara?',
        options: ['En taxi (タクシー)', 'Caminando (歩いて)', 'En tren (電車で)', 'En autobús (バスで)'],
        correctIndex: 2,
        explanation: 'El texto dice: "午後、電車で秋葉原へ行きました" (por la tarde fue en tren con la partícula de medio で).'
      }
    ]
  },
  {
    id: 'kyoto-matcha',
    titleJp: '京都の静かなお寺と緑茶',
    titleKana: 'きょうとの しずかな おてらと りょくちゃ',
    titleEs: 'Un templo tranquilo y té verde en Kioto',
    level: 'N5',
    summary: 'Descubre la paz de un jardín zen en Kioto y la ceremonia milenaria del té verde.',
    paragraphs: [
      {
        japanese: '京都には古いお寺と美しい庭がたくさんあります。',
        kana: 'きょうとには ふるい おてらと うつくしい にわが たくさん あります。',
        spanish: 'En Kioto hay muchos templos antiguos y hermosos jardines.',
        glossary: [
          { word: '古い', reading: 'ふるい', spanish: 'Antiguo' },
          { word: 'お寺', reading: 'おてら', spanish: 'Templo budista' },
          { word: '美しい', reading: 'うつくしい', spanish: 'Bello / hermoso' },
          { word: '庭', reading: 'にわ', spanish: 'Jardín' }
        ]
      },
      {
        japanese: '静かな部屋で座って、雨の音を聞きながらお茶を飲みました。心が落ち着きます。',
        kana: 'しずかな へやで すわって、あめの おとを ききながら おちゃを のみました。こころが おちつきます。',
        spanish: 'Sentado en una habitación tranquila, bebí té mientras escuchaba el sonido de la lluvia. El corazón se llena de calma.',
        glossary: [
          { word: '静か', reading: 'しずか', spanish: 'Tranquilo / Silencioso' },
          { word: '座る', reading: 'すわる', spanish: 'Sentarse' },
          { word: '雨の音', reading: 'あめのおと', spanish: 'Sonido de la lluvia' },
          { word: '心', reading: 'こころ', spanish: 'Corazón / Mente / Espíritu' }
        ]
      }
    ],
    comprehensionQuiz: [
      {
        question: '¿Qué sonido se escuchaba mientras se bebía el té?',
        options: ['La música del templo', 'El sonido de los pájaros', 'El sonido de la lluvia', 'El tren'],
        correctIndex: 2,
        explanation: 'El texto dice: "雨の音を聞きながら" (mientras escuchaba el sonido de la lluvia).'
      }
    ]
  }
];
