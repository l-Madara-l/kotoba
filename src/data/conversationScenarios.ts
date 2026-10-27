import { ConversationScenario } from '../types';

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  {
    id: 'ramen-shop',
    title: 'Pidiendo Ramen en Tokio',
    titleJp: 'ラーメン屋での注文',
    location: 'Shinjuku, Tokio (Restaurante tradicional de ramen)',
    difficulty: 'N5',
    description: 'Entras a un acogedor local de ramen tras un largo día de caminata por Tokio. El camarero te saluda y debes elegir tu plato, bebida y pedir la cuenta.',
    objective: 'Pedir un ramen de tonkotsu, pedir agua y solicitar la cuenta educadamente.',
    characterName: 'Kenji',
    characterRole: 'Camarero del restaurante',
    characterAvatar: '🍜',
    dialogueTurns: [
      {
        speaker: 'npc',
        speakerName: 'Kenji',
        avatar: '🍜',
        japanese: 'いらっしゃいませ！何名様ですか？',
        kana: 'いらっしゃいませ！ なんめいさま ですか？',
        romaji: 'Irasshaimase! Nan-mei-sama desu ka?',
        spanish: '¡Bienvenido! ¿Cuántas personas son?',
        culturalNote: 'En restaurantes japoneses siempre te recibirán con "¡Irasshaimase!". No hace falta responder lo mismo, basta con hacer una leve inclinación de cabeza o indicar el número de personas.',
        possibleResponses: [
          {
            textJp: '一人です。',
            kana: 'ひとり です。',
            romaji: 'Hitori desu.',
            spanish: 'Una persona (para mí solo).',
            formality: 'cortés',
            isBest: true,
            feedback: '¡Perfecto y natural! "Hitori desu" es la forma exacta para una persona sola.'
          },
          {
            textJp: '二人です。',
            kana: 'ふたり です。',
            romaji: 'Futari desu.',
            spanish: 'Somos dos personas.',
            formality: 'cortés',
            isBest: false,
            feedback: 'Bien si vas acompañado ("futari" = dos personas).'
          },
          {
            textJp: '一。',
            kana: 'いち。',
            romaji: 'Ichi.',
            spanish: 'Uno.',
            formality: 'informal',
            isBest: false,
            feedback: 'No uses "ichi" para contar personas. Para personas se usa el contador hitori (1 persona) o futari (2 personas).'
          }
        ]
      },
      {
        speaker: 'npc',
        speakerName: 'Kenji',
        avatar: '🍜',
        japanese: 'こちらへどうぞ。ご注文はお決まりですか？',
        kana: 'こちらへ どうぞ。ごちゅうもんは おきまり ですか？',
        romaji: 'Kochira e douzo. Go-chuumon wa okimari desu ka?',
        spanish: 'Por aquí, por favor. ¿Tiene decidido su pedido?',
        culturalNote: 'En muchos restaurantes japoneses, para llamar la atención del camarero cuando estés listo se levanta la mano y se dice en voz clara "Sumimasen!" (すみません).',
        possibleResponses: [
          {
            textJp: '豚骨ラーメンを一つお願いします。',
            kana: 'とんこつらーめんを ひとつ おねがいします。',
            romaji: 'Tonkotsu raamen o hitotsu onegaishimasu.',
            spanish: 'Un ramen de tonkotsu, por favor.',
            formality: 'cortés',
            isBest: true,
            feedback: '¡Excelente! Usaste el contador de objetos "hitotsu" (一つ) y la fórmula de cortesía "onegaishimasu".'
          },
          {
            textJp: 'ラーメンをください。',
            kana: 'らーめんを ください。',
            romaji: 'Raamen o kudasai.',
            spanish: 'Un ramen, por favor.',
            formality: 'cortés',
            isBest: false,
            feedback: 'Correcto y entendible, aunque especificar el tipo (tonkotsu, shoyu o miso) ayuda al camarero.'
          }
        ]
      },
      {
        speaker: 'npc',
        speakerName: 'Kenji',
        avatar: '🍜',
        japanese: 'かしこまりました。お飲み物はいかがですか？',
        kana: 'かしこまりました。おのみものは いかがですか？',
        romaji: 'Kashikomarimashita. O-nomimono wa ikaga desu ka?',
        spanish: 'Entendido con gusto. ¿Desea alguna bebida?',
        culturalNote: 'En Japón el agua fresca (お冷 ohiya) y el té verde suelen ser gratuitos y se rellenan sin costo.',
        possibleResponses: [
          {
            textJp: 'お水をください。',
            kana: 'おみずを ください。',
            romaji: 'O-mizu o kudasai.',
            spanish: 'Agua, por favor.',
            formality: 'cortés',
            isBest: true,
            feedback: 'Muy cortés y natural. Añadir "o-" delante de mizu demuestra buena educación.'
          },
          {
            textJp: 'ビールをお願いします。',
            kana: 'びーるを おねがいします。',
            romaji: 'Biiru o onegaishimasu.',
            spanish: 'Una cerveza, por favor.',
            formality: 'cortés',
            isBest: false,
            feedback: '¡Gran opción si te apetece una cerveza fría con el ramen!'
          }
        ]
      },
      {
        speaker: 'npc',
        speakerName: 'Kenji',
        avatar: '🍜',
        japanese: 'はい、少々お待ちください。…どうぞ、豚骨ラーメンです！',
        kana: 'はい、しょうしょう おまちください。…どうぞ、とんこつらーめんです！',
        romaji: 'Hai, shoushou omachi kudasai. ... Douzo, tonkotsu raamen desu!',
        spanish: 'Sí, espere un momento por favor. ... ¡Aquí tiene su ramen tonkotsu!',
        culturalNote: 'Antes de comer, los japoneses juntan las manos e inclinan la cabeza diciendo "Itadakimasu" (いただきます), agradeciendo a los ingredientes y a quien preparó la comida.',
        possibleResponses: [
          {
            textJp: 'いただきます！おいしそうです。',
            kana: 'いただきます！おいしそう です。',
            romaji: 'Itadakimasu! Oishisou desu.',
            spanish: '¡Gracias por la comida! Tiene una pinta deliciosa.',
            formality: 'cortés',
            isBest: true,
            feedback: '¡Insuperable! Usar "Itadakimasu" y halagar el plato diciendo "Oishisou desu" fascinará a cualquier cocinero.'
          },
          {
            textJp: 'ありがとう。',
            kana: 'ありがとう。',
            romaji: 'Arigatou.',
            spanish: 'Gracias.',
            formality: 'informal',
            isBest: false,
            feedback: 'Es un poco informal para un restaurante. Es mejor "Arigatou gozaimasu" o "Itadakimasu".'
          }
        ]
      },
      {
        speaker: 'npc',
        speakerName: 'Kenji',
        avatar: '🍜',
        japanese: 'ごゆっくりどうぞ！',
        kana: 'ごゆっくり どうぞ！',
        romaji: 'Go-yukkuri douzo!',
        spanish: '¡Que lo disfrute con calma!',
        culturalNote: 'Al terminar de comer, dices "Gochisousama deshita" y para pedir la cuenta dices "O-kaikei onegaishimasu" (お会計お願いします). En Japón se paga en la caja junto a la puerta, no en la mesa.',
        possibleResponses: [
          {
            textJp: 'ごちそうさまでした。お会計をお願いします。',
            kana: 'ごちそうさまでした。おかいけいを おねがいします。',
            romaji: 'Gochisousama deshita. O-kaikei o onegaishimasu.',
            spanish: 'Estaba delicioso, gracias. La cuenta, por favor.',
            formality: 'muy cortés',
            isBest: true,
            feedback: '¡Misión cumplida con honores! Dominas la etiqueta de un restaurante japonés.'
          }
        ]
      }
    ]
  },
  {
    id: 'jikoshoukai',
    title: 'Presentación personal (Jikoshoukai)',
    titleJp: '自己紹介（初対面の挨拶）',
    location: 'Universidad / Evento social en Kioto',
    difficulty: 'N5',
    description: 'Conoces a Yuki, una estudiante universitaria japonesa interesada en el español. Se presentan mutuamente por primera vez.',
    objective: 'Decir tu nombre, nacionalidad, afición y cerrar con la fórmula de respeto "Yoroshiku onegaishimasu".',
    characterName: 'Yuki',
    characterRole: 'Estudiante en Kioto',
    characterAvatar: '🌸',
    dialogueTurns: [
      {
        speaker: 'npc',
        speakerName: 'Yuki',
        avatar: '🌸',
        japanese: '初めまして！私はゆきです。よろしくお願いします。',
        kana: 'はじめまして！わたしは ゆき です。よろしく おねがいします。',
        romaji: 'Hajimemashite! Watashi wa Yuki desu. Yoroshiku onegaishimasu.',
        spanish: '¡Mucho gusto! Yo soy Yuki. Encantada de conocerte.',
        culturalNote: '"Hajimemashite" (初めまして) se utiliza ÚNICAMENTE la primera vez que ves a una persona. "Yoroshiku onegaishimasu" no tiene traducción exacta al español, significa "Por favor, trátame bien / Cuento con tu favor".',
        possibleResponses: [
          {
            textJp: '初めまして！私はカルロスです。よろしくお願いします。',
            kana: 'はじめまして！わたしは かるろす です。よろしく おねがいします。',
            romaji: 'Hajimemashite! Watashi wa Karurosu desu. Yoroshiku onegaishimasu.',
            spanish: '¡Mucho gusto! Yo soy Carlos. Encantado de conocerte.',
            formality: 'cortés',
            isBest: true,
            feedback: '¡Respuesta impecable! Respondes a la cortesía con la misma estructura simétrica.'
          }
        ]
      },
      {
        speaker: 'npc',
        speakerName: 'Yuki',
        avatar: '🌸',
        japanese: 'カルロスさん、どちらから来ましたか？',
        kana: 'かるろすさん、どちらから きましたか？',
        romaji: 'Karurosu-san, dochira kara kimashita ka?',
        spanish: 'Carlos, ¿de dónde vienes / cuál es tu país de origen?',
        possibleResponses: [
          {
            textJp: 'スペインから来ました。',
            kana: 'すぺいんから きました。',
            romaji: 'Supein kara kimashita.',
            spanish: 'Vine de España.',
            formality: 'cortés',
            isBest: true,
            feedback: '¡Muy bien! "[País] kara kimashita" es la fórmula perfecta.'
          },
          {
            textJp: 'メキシコ人です。',
            kana: 'めきしこじん です。',
            romaji: 'Mekishikojin desu.',
            spanish: 'Soy mexicano.',
            formality: 'cortés',
            isBest: false,
            feedback: 'También es comprensible y correcto.'
          }
        ]
      }
    ]
  },
  {
    id: 'konbini-shopping',
    title: 'Comprando en el Konbini (7-Eleven / Lawson)',
    titleJp: 'コンビニでの買い物',
    location: 'Konbini en Akihabara',
    difficulty: 'N5',
    description: 'Vas a comprar un Onigiri y una bebida al Konbini. El dependiente te hará las preguntas estándar de caja.',
    objective: 'Comprender si necesitas bolsa, calentar la comida y pagar con tarjeta o efectivo.',
    characterName: 'Sato',
    characterRole: 'Cajero del Konbini',
    characterAvatar: '🏪',
    dialogueTurns: [
      {
        speaker: 'npc',
        speakerName: 'Sato',
        avatar: '🏪',
        japanese: 'いらっしゃいませ。温めますか？',
        kana: 'いらっしゃいませ。あたためますか？',
        romaji: 'Irasshaimase. Atatamemasu ka?',
        spanish: '¡Bienvenido! ¿Se lo caliento en el microondas?',
        culturalNote: 'Si compras un bento u onigiri, casi siempre te preguntarán "Atatamemasu ka?" (¿Se lo caliento?).',
        possibleResponses: [
          {
            textJp: 'はい、お願いします。',
            kana: 'はい、おねがいします。',
            romaji: 'Hai, onegaishimasu.',
            spanish: 'Sí, por favor.',
            formality: 'cortés',
            isBest: true,
            feedback: 'Respuesta rápida y muy natural para que te calienten la comida.'
          },
          {
            textJp: '大丈夫です。',
            kana: 'だいじょうぶ です。',
            romaji: 'Daijoubu desu.',
            spanish: 'No hace falta, estoy bien así.',
            formality: 'cortés',
            isBest: false,
            feedback: '"Daijoubu desu" es la forma polite de declinar amablemente en tiendas.'
          }
        ]
      },
      {
        speaker: 'npc',
        speakerName: 'Sato',
        avatar: '🏪',
        japanese: 'レジ袋はご利用になりますか？',
        kana: 'れじぶくろは ごりようになりますか？',
        romaji: 'Rejibukuro wa go-riyou ni narimasu ka?',
        spanish: '¿Desea bolsa de plástico?',
        culturalNote: 'En Japón las bolsas de plástico cuestan entre 3 y 5 yenes por ley ecológica.',
        possibleResponses: [
          {
            textJp: 'いいえ、要りません。',
            kana: 'いいえ、いりません。',
            romaji: 'Iie, irimasen.',
            spanish: 'No, no la necesito.',
            formality: 'cortés',
            isBest: true,
            feedback: '"Irimasen" (no lo necesito) o "Kekkou desu" (está bien sin ella) son perfectos.'
          },
          {
            textJp: '一枚お願いします。',
            kana: 'いちまい おねがいします。',
            romaji: 'Ichimai onegaishimasu.',
            spanish: 'Una bolsa, por favor.',
            formality: 'cortés',
            isBest: false,
            feedback: 'Usa el contador de cosas planas "ichimai" (一枚).'
          }
        ]
      }
    ]
  }
];
