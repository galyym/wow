import { useState } from 'react';
import { Link } from 'react-router-dom';

const ArtistsRouter = () => {
  const [artists, setArtists] = useState([
    {
      id: 1,
      name: 'Жан & Жыргыс',
      category: 'Певцы',
      image: '🎤',
      rating: 4.8,
      reviews: 42,
      price: '50,000 ₸',
      genre: 'Казахская музыка',
      experience: '8 лет',
      bio: 'Дуэт профессиональных певцов, исполняющих казахскую и современную музыку'
    },
    {
      id: 2,
      name: 'Dream Dance Group',
      category: 'Танцоры',
      image: '💃',
      rating: 4.9,
      reviews: 56,
      price: '80,000 ₸',
      genre: 'Современный танец',
      experience: '10 лет',
      bio: 'Профессиональная группа танцоров с премиум хореографией'
    },
    {
      id: 3,
      name: 'DJ Rashid',
      category: 'DJ',
      image: '🎧',
      rating: 4.7,
      reviews: 38,
      price: '60,000 ₸',
      genre: 'Микс всех жанров',
      experience: '6 лет',
      bio: 'Опытный диджей, создает незабываемую атмосферу на каждом событии'
    },
    {
      id: 4,
      name: 'Акустический квартет',
      category: 'Инструменталисты',
      image: '🎸',
      rating: 4.6,
      reviews: 28,
      price: '45,000 ₸',
      genre: 'Классика, Джаз',
      experience: '12 лет',
      bio: 'Квартет скрипачей, пианистов и виолончелистов мирового уровня'
    },
    {
      id: 5,
      name: 'Comedy Show Team',
      category: 'Комедианты',
      image: '🎭',
      rating: 4.5,
      reviews: 22,
      price: '35,000 ₸',
      genre: 'Комедия и развлечение',
      experience: '7 лет',
      bio: 'Забавная команда с огромным репертуаром шуток и скетчей'
    },
    {
      id: 6,
      name: 'Light Show Studio',
      category: 'Световое шоу',
      image: '✨',
      rating: 4.8,
      reviews: 35,
      price: '70,000 ₸',
      genre: 'LED технологии',
      experience: '5 лет',
      bio: 'Профессиональное световое и пиротехническое шоу с эффектами'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const categories = ['Певцы', 'Танцоры', 'DJ', 'Инструменталисты', 'Комедианты', 'Световое шоу'];

  const filteredArtists = artists
    .filter(a => 
      (selectedCategory === 'all' || a.category === selectedCategory) &&
      a.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return parseInt(a.price) - parseInt(b.price);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
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
              <h1 className="text-3xl font-bold text-gray-900">🎵 Артисты и развлечения</h1>
            </div>
            <Link to="/" className="btn-primary">
              Добавить артиста
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="card mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Фильтры</h2>

          {/* Category Tabs */}
          <div className="mb-6">
            <label className="label">Категория</label>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
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
                      ? 'bg-blue-600 text-white'
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
                placeholder="Название артиста..."
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

        {/* Artists Grid */}
        {filteredArtists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <div key={artist.id} className="card card-hover">
                <div className="text-5xl mb-4">{artist.image}</div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">{artist.name}</h3>
                <p className="text-sm text-blue-600 font-semibold mb-2">{artist.category}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(artist.rating) ? '⭐' : '☆'} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({artist.reviews})</span>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4 text-sm">
                  <p className="text-gray-700">
                    <strong>Жанр:</strong> {artist.genre}
                  </p>
                  <p className="text-gray-700">
                    <strong>Опыт:</strong> {artist.experience}
                  </p>
                  <p className="text-gray-700">
                    <strong>Цена:</strong> {artist.price}
                  </p>
                  <p className="text-gray-600">{artist.bio}</p>
                </div>

                <button className="btn-primary w-full text-sm">
                  Забронировать
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center">
            <p className="text-lg text-gray-600">Артисты не найдены</p>
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

export default ArtistsRouter;
