import { CultureArticle } from '../types';

export const CULTURE_ARTICLES: CultureArticle[] = [
  {
    id: 'culture-ojigi',
    title: 'El arte de la reverencia (Ojigi)',
    japaneseTitle: 'お辞儀の作法',
    category: 'etiqueta',
    summary: 'Aprende cuándo inclinarse, los tres ángulos tradicionales y por qué nunca debes juntar las manos como en Tailandia o rezando.',
    content: [
      'En Japón la reverencia (ojigi, お辞儀) es mucho más que un saludo: es un barómetro de respeto, gratitud y humildad.',
      'Existen tres tipos principales según el ángulo y la situación:',
      '1. **Eshaku (会釈 - 15°):** Saludo informal entre conocidos, vecinos o al pasar junto a un compañero de oficina.',
      '2. **Keirei (敬礼 - 30°):** Reverencia cortés estándar. Se utiliza ante clientes, superiores, profesores o al entrar a un templo o reunión de negocios.',
      '3. **Saikeirei (最敬礼 - 45°):** Reverencia profunda de máximo respeto. Reservada para disculpas solemnes (shazai) o ante figuras de la más alta jerarquía.',
      '**Dato esencial:** A diferencia de otros países asiáticos, en el saludo japonés habitual NO se juntan las manos frente al pecho. Los hombres mantienen los brazos estirados a los costados y las mujeres cruzan suavemente las manos al frente.'
    ],
    keyVocabulary: [
      { word: 'お辞儀', reading: 'おじぎ', romaji: 'ojigi', spanish: 'Reverencia japonesa' },
      { word: '会釈', reading: 'えしゃく', romaji: 'eshaku', spanish: 'Saludo leve (15°)' },
      { word: '礼儀', reading: 'れいぎ', romaji: 'reigi', spanish: 'Etiqueta / Buenos modales' }
    ],
    proTip: 'Mantén la espalda recta e inclínate desde la cintura, no bajando solo la cabeza. Mantén la reverencia durante una respiración antes de erguirte con calma.'
  },
  {
    id: 'culture-chopsticks',
    title: 'Etiqueta en la mesa y los palillos (Hashi)',
    japaneseTitle: '箸のタブーと「いただきます」',
    category: 'gastronomia',
    summary: 'Descubre los tabúes funerarios de los palillos que debes evitar a toda costa y el profundo significado de Itadakimasu.',
    content: [
      'Comer en Japón es un ritual de gratitud cósmica. Antes del primer bocado se dice **いただきます** (Itadakimasu), que literalmente significa "recibo humildemente la vida de los seres que nutren mi cuerpo".',
      'Al terminar, se honra el esfuerzo de quien cocinó diciendo **ごちそうさまでした** (Gochisousama deshita).',
      'Existen tabúes estrictos con los palillos (hashi) debido a su relación con los ritos funerarios budistas:',
      '- **Tsukitate-bashi (突き立て箸):** Clavar los palillos verticalmente en un cuenco de arroz. Esto solo se hace en las ofrendas funerarias para los difuntos.',
      '- **Hashi-watashi (箸渡し):** Pasarse comida de palillo a palillo. Recuerda al ritual de trasladar restos cremados tras la incineración.',
      '- **Neburi-bashi (舐め箸):** Chupar los extremos de los palillos.'
    ],
    keyVocabulary: [
      { word: '箸', reading: 'はし', romaji: 'hashi', spanish: 'Palillos para comer' },
      { word: '箸置き', reading: 'はしおき', romaji: 'hashioki', spanish: 'Reposapalillos de cerámica' },
      { word: 'いただきます', reading: 'いただきます', romaji: 'itadakimasu', spanish: 'Recibo con gratitud la comida' }
    ],
    proTip: 'Cuando no estés usando los palillos, déjalos apoyados sobre el soporte de cerámica (hashioki) o en horizontal sobre el borde del cuenco, nunca clavados.'
  },
  {
    id: 'culture-genkan',
    title: 'El Genkan y el mundo de los zapatos',
    japaneseTitle: '玄関と靴を脱ぐ文化',
    category: 'vida-cotidiana',
    summary: 'La frontera sagrada entre el mundo exterior (soto) y la pureza del hogar (uchi).',
    content: [
      'Al cruzar el umbral de cualquier casa japonesa, escuela o ryokan tradicional, encontrarás el **Genkan (玄関)**, un pequeño escalón que delimita físicamente dos mundos.',
      'El suelo inferior representa el exterior sucio y caótico (soto). El suelo superior de madera o tatami representa la pureza íntima del hogar (uchi).',
      'Regla de oro: Quítate los zapatos en la zona baja mirando hacia adelante. Una vez subido al escalón, da media vuelta y coloca tus zapatos apuntando hacia la puerta de salida para facilitar tu partida posterior.',
      'En muchos lugares te ofrecerán zapatillas de estar por casa (surippa), pero recuerda: **¡jamás pises un tatami con zapatillas!** El tatami siempre se pisa descalzo o con calcetines limpios.'
    ],
    keyVocabulary: [
      { word: '玄関', reading: 'げんかん', romaji: 'genkan', spanish: 'Vestíbulo / entrada de la casa' },
      { word: '靴', reading: 'くつ', romaji: 'kutsu', spanish: 'Zapatos' },
      { word: '畳', reading: 'たたみ', romaji: 'tatami', spanish: 'Esteras de paja de arroz' },
      { word: 'お邪魔します', reading: 'おじゃまします', romaji: 'ojamashimasu', spanish: 'Disculpe la molestia (al entrar a una casa ajena)' }
    ],
    proTip: 'Lleva siempre calcetines limpios y sin agujeros cuando viajes a Japón: te descalzarás varias veces al día.'
  }
];
