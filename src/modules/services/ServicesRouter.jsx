import { useState } from 'react';
import { Link } from 'react-router-dom';

const ServicesRouter = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Фотография "Golden Hour"',
      category: 'Фото',
      image: '📸',
      rating: 4.9,
      reviews: 52,
      price: '200,000 ₸',
      duration: '8 часов',
      experience: '10 лет',
      package: 'Полный день съемок + 2000+ фото',
      description: 'Профессиональная свадебная фотография с опытом съемки более 500 свадеб'
    },
    {
      id: 2,
      name: 'Видеография "Dream Studio"',
      category: 'Видео',
      image: '🎬',
      rating: 4.8,
      reviews: 38,
      price: '300,000 ₸',
      duration: '16 часов',
      experience: '8 лет',
      package: '4K видео + свадебный фильм (20-30 мин)',
      description: 'Профессиональное видео и кинематографический монтаж'
    },
    {
      id: 3,
      name: 'Декор "Flower Dreams"',
      category: 'Декор',
      image: '🌸',
      rating: 4.7,
      reviews: 44,
      price: '250,000 ₸',
      duration: 'По договоренности',
      experience: '7 лет',
      package: 'Декорация стола, арки, входа',
      description: 'Цветочный декор и оформление праздничного зала'
    },
    {
      id: 4,
      name: 'Каллиграфия и дизайн',
      category: 'Дизайн',
      image: '✏️',
      rating: 4.6,
      reviews: 28,
      price: '80,000 ₸',
      duration: '5-7 дней',
      experience: '6 лет',
      package: 'Карточки, меню, приглашения',
      description: 'Красивый дизайн пригласительных и печатных материалов'
    },
    {
      id: 5,
      name: 'Макияж и прически',
      category: 'Красота',
      image: '💄',
      rating: 4.8,
      reviews: 56,
      price: '150,000 ₸',
      duration: '6 часов',
      experience: '9 лет',
      package: 'Макияж + прически для невесты и подруг',
      description: 'Профессиональные стилисты и визажисты'
    },
    {
      id: 6,
      name: 'Организация и координация',
      category: 'Организация',
      image: '📋',
      rating: 4.9,
      reviews: 35,
      price: '350,000 ₸',
      duration: 'Полный день',
      experience: '12 лет',
      package: 'Полная организация всех деталей',
      description: 'Полная координация мероприятия от начала до конца'
    },
    {
      id: 7,
      name: 'Кейтеринг "Royal Taste"',
      category: 'Еда',
      image: '🍽️',
      rating: 4.7,
      reviews: 42,
      price: '15,000 ₸/чел',
      duration: 'Весь день',
      experience: '8 лет',
      package: 'Полный меню + обслуживание',
      description: 'Гаджный кейтеринг с премиум меню и обслуживанием'
    },
    {
      id: 8,
      name: 'Транспорт лимузина',
      category: 'Транспорт',
      image: '🚗',
      rating: 4.6,
      reviews: 31,
      price: '100,000 ₸',
      duration: '6 часов',
      experience: '5 лет',
      package: 'Премиум лимузин с водителем',
      description: 'Роскошный транспорт для жениха и невесты'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const categories = ['Фото', 'Видео', 'Декор', 'Дизайн', 'Красота', 'Организация', 'Еда', 'Транспорт'];

  const filteredServices = services
    .filter(s =>
      (selectedCategory === 'all' || s.category === selectedCategory) &&
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return parseInt(a.price) - parseInt(b.price);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                На главную
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">🎨 Прочие услуги</h1>
            </div>
            <Link to="/" className="btn-primary">
              Добавить услугу
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="card mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Фильтры</h2>

          {/* Category */}
          <div className="mb-6">
            <label className="label">Категория</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Все
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Sort */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Поиск</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
                placeholder="Название услуги..."
              />
            </div>

            <div>
              <label className="label">Сортировка</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
              >
                <option value="rating">По рейтингу (выше)</option>
                <option value="price">По цене (дешевле)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div key={service.id} className="card card-hover">
                <div className="text-5xl mb-4">{service.image}</div>

                <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
                <p className="text-sm text-amber-600 font-semibold mb-3">{service.category}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(service.rating) ? '⭐' : '☆'} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({service.reviews})</span>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4 text-sm">
                  <p className="text-gray-700">
                    <strong>Цена:</strong> {service.price}
                  </p>
                  <p className="text-gray-700">
                    <strong>Длительность:</strong> {service.duration}
                  </p>
                  <p className="text-gray-700">
                    <strong>Опыт:</strong> {service.experience}
                  </p>
                  <p className="text-gray-700">
                    <strong>Пакет:</strong> {service.package}
                  </p>
                  <p className="text-gray-600 mt-2">{service.description}</p>
                </div>

                <button className="btn-primary w-full text-sm">
                  Забронировать
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center">
            <p className="text-lg text-gray-600">Услуги не найдены</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn-secondary mt-4"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesRouter;
