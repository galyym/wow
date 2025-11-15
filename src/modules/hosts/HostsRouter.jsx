import { useState } from 'react';
import { Link } from 'react-router-dom';

const HostsRouter = () => {
  const [hosts, setHosts] = useState([
    {
      id: 1,
      name: 'Рахат Нурбаев',
      image: '🎤',
      specialization: 'Свадьбы и той',
      experience: '10+ лет',
      rating: 4.9,
      reviews: 45,
      pricePerEvent: '100,000 ₸',
      bio: 'Профессиональный тамада с большим опытом проведения традиционных и современных той',
      languages: ['Казахский', 'Русский', 'Английский'],
      availability: 'Доступен для бронирования'
    },
    {
      id: 2,
      name: 'Алтынай Сейтова',
      image: '👸',
      specialization: 'Модные ведущие',
      experience: '7 лет',
      rating: 4.7,
      reviews: 32,
      pricePerEvent: '85,000 ₸',
      bio: 'Энергичная и позитивная ведущая, специализируется на молодежных мероприятиях',
      languages: ['Казахский', 'Русский'],
      availability: 'Доступна для бронирования'
    },
    {
      id: 3,
      name: 'Айтбай Ермеков',
      image: '🧑',
      specialization: 'Традиционные той',
      experience: '15+ лет',
      rating: 5.0,
      reviews: 58,
      pricePerEvent: '120,000 ₸',
      bio: 'Опытный тамада, знаток казахских традиций и обычаев',
      languages: ['Казахский', 'Русский'],
      availability: 'Доступен для бронирования'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filteredHosts = hosts
    .filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return parseInt(a.pricePerEvent) - parseInt(b.pricePerEvent);
      if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
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
              <h1 className="text-3xl font-bold text-gray-900">🎤 Тамады</h1>
            </div>
            <Link to="/" className="btn-primary">
              Стать тамадой
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Sort */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Поиск по имени</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
                placeholder="Введите имя ведущего..."
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
                <option value="experience">По опыту (больше)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hosts List */}
        {filteredHosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHosts.map((host) => (
              <div key={host.id} className="card card-hover">
                <div className="text-5xl mb-4">{host.image}</div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">{host.name}</h3>
                <p className="text-sm text-primary-600 font-semibold mb-2">{host.specialization}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(host.rating) ? '⭐' : '☆'} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({host.reviews})</span>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4 text-sm">
                  <p className="text-gray-700">
                    <strong>Опыт:</strong> {host.experience}
                  </p>
                  <p className="text-gray-700">
                    <strong>Цена:</strong> {host.pricePerEvent}
                  </p>
                  <p className="text-gray-600">{host.bio}</p>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {host.languages.map((lang, idx) => (
                      <span key={idx} className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="btn-primary w-full text-sm">
                  Забронировать
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center">
            <p className="text-lg text-gray-600">Тамады не найдены</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="btn-secondary mt-4"
            >
              Сбросить поиск
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostsRouter;
