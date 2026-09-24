import { Language } from './i18n';

export interface Product {
  id: string;
  category: string;
  price?: string;
  image: string;
  video?: string;
  getName: (lang: Language) => string;
  getDescription: (lang: Language) => string;
  getApplication: (lang: Language) => string;
  getDosage: (lang: Language) => string;
}

const productData: Product[] = [
  {
    id: 'care',
    category: 'Care',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
    video: '/videos/terawet-care.mp4',
    getName: (l) => ({ en: 'Terawet Care', bg: 'Terawet Care', uk: 'Догляд з Тераветом' }[l]),
    getDescription: (l) => ({
      en: 'Superabsorbent polymer for agriculture and landscaping. Retains water up to 400 times its weight, gradually releasing it to plant roots.',
      bg: 'Суперабсорбентен полимер за земеделие и озеленяване. Задържа вода до 400 пъти собственото си тегло.',
      uk: 'Суперабсорбентний полімер для сільського господарства та ландшафтного дизайну. Утримує воду до 400 разів власної ваги.',
    }[l]),
    getApplication: (l) => ({
      en: 'Agriculture, landscaping, green roofs, sports fields',
      bg: 'Земеделие, озеленяване, зелени покриви, спортни терени',
      uk: 'Сільське господарство, ландшафтний дизайн, зелені дахи, спортивні поля',
    }[l]),
    getDosage: (l) => ({
      en: '2-5 g per liter of soil',
      bg: '2-5 г на литър почва',
      uk: '2-5 г на літр ґрунту',
    }[l]),
  },
  {
    id: 'protect',
    category: 'Protect',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&h=400&fit=crop',
    video: '/videos/terawet-gel.mp4',
    getName: (l) => ({ en: 'Terawet Gel', bg: 'Terawet Gel', uk: 'Terawet Gel' }[l]),
    getDescription: (l) => ({
      en: 'Terawet Gel is used for transplanting plants into soil and for long-distance transportation to planting sites!',
      bg: 'Terawet Gel се използва за пресаждане на растения в почвата и за дълъг транспорт до местата за засаждане!',
      uk: 'Terawet Gel застосовується для пересадки рослин в ґрунт та для довгого транспортування в місця посадки!',
    }[l]),
    getApplication: (l) => ({
      en: 'Root system of any plant',
      bg: 'Коренова система на всяко растение',
      uk: 'Коренева система будь якої рослини',
    }[l]),
    getDosage: (l) => ({
      en: '8-10 g per liter of water',
      bg: '8-10 г на литър вода',
      uk: '8-10 г на літр води',
    }[l]),
  },
  {
    id: 'food',
    category: 'Food',
    price: '0.35 Euro',
    image: '',
    getName: (l) => ({ en: 'Terafood', bg: 'Terafood', uk: 'Terafood' }[l]),
    getDescription: (l) => ({
      en: 'Terafood — a micro survival system. Humic shell: root protection from pathogens and disease agents (no weed seeds). Mineral fertilizers: ideal physiological nutrition at start. Superabsorbent Terawet: water accumulation and nutrient retention right in the root zone. Ideal form for hydro-drill application. No analogues in the world.',
      bg: 'Terafood — микросистема за оцеляване. Хуминова обвивка: защита на корените от патогени и причинители на болести (без семена на плевели). Минерални торове: идеално физиологично хранене при старт. Суперабсорбент Terawet: акумулация на вода и задържане на хранителни вещества точно в кореновата зона. Идеална форма за приложение с хидробур. Няма аналози в света.',
      uk: 'Terafood — мікросистема виживання. Гумінова оболонка: захист коренів від патогенів та збудників хвороб (без насіння бур\'янів). Мінеральні добрива: забезпечення ідеального фізіологічного харчування на старті. Суперабсорбент Terawet: акумуляція води та утримання поживних речовин точно в кореневій зоні. Ідеальна форма для застосування за допомогою гідробуру. Не має аналогів у світі.',
    }[l]),
    getApplication: (l) => ({
      en: 'Reforestation, orchards, vineyards, landscaping',
      bg: 'Залесяване, овощни градини, лозя, озеленяване',
      uk: 'Лісопосадка, сади, виноградники, озеленення',
    }[l]),
    getDosage: (l) => ({
      en: '1 tablet per plant',
      bg: '1 таблетка на растение',
      uk: '1 таблетка на рослину',
    }[l]),
  },
  {
    id: 'bulk-25kg',
    category: 'Bulk',
    price: '360 Euro',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
    video: '/videos/terawet-25kg.mp4',
    getName: (l) => ({ en: 'TERAWET 25 kg', bg: 'TERAWET 25 кг', uk: 'TERAWET 25 кг' }[l]),
    getDescription: (l) => ({
      en: 'Bulk packaging of TERAWET superabsorbent polymer for large-scale agricultural applications. Ideal for farms and distributors.',
      bg: 'Чувал суперабсорбент TERAWET за мащабни земеделски приложения. Идеален за ферми и дистрибутори.',
      uk: 'Суперабсорбент TERAWET у мішку для масштабного сільськогосподарського застосування. Ідеальний для ферм та дистриб\'юторів.',
    }[l]),
    getApplication: (l) => ({
      en: 'Large-scale farming, commercial agriculture, distribution',
      bg: 'Мащабно земеделие, комерсиално земеделие, дистрибуция',
      uk: 'Масштабне землеробство, комерційне сільське господарство, дистрибуція',
    }[l]),
    getDosage: (l) => ({
      en: '25 kg per hectare',
      bg: '25 кг на хектар',
      uk: '25 кг на гектар',
    }[l]),
  },
  {
    id: 'bulk-1kg',
    category: 'Bulk',
    price: '18 Euro',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
    video: '/videos/terawet-1kg.mp4',
    getName: (l) => ({ en: 'TERAWET 1 kg', bg: 'TERAWET 1 кг', uk: 'TERAWET 1 кг' }[l]),
    getDescription: (l) => ({
      en: 'TERAWET superabsorbent mix for large-scale agricultural applications. Ideal for vineyards, nut orchards, gardens and houseplants!',
      bg: 'Суперабсорбент TERAWET в смес за мащабни земеделски приложения. Идеален за лозя, овощни градини, градини и домашни растения!',
      uk: 'Суперабсорбент TERAWET в суміші для масштабного сільськогосподарського застосування. Ідеальний для Виноградників, Горішників, Садів та Городів і домашніх рослин!',
    }[l]),
    getApplication: (l) => ({
      en: 'Large-scale farming, commercial agriculture, vineyards, orchards and reforestation!',
      bg: 'Мащабно земеделие, комерсиално земеделие, лозя, овощни градини и залесяване!',
      uk: 'Масштабне землеробство, комерційне сільське господарство, виноградники, сади та лісопосадка!',
    }[l]),
    getDosage: (l) => ({
      en: '2-5 g per liter of soil',
      bg: '2-5 г на литър почва',
      uk: '2-5 г на літр ґрунту',
    }[l]),
  },
];

export default productData;
