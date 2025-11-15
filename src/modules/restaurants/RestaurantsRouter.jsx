import { useState } from 'react';
import { Link } from 'react-router-dom';

const RestaurantsRouter = () => {
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'Royal Hall',
      address: 'ул. Кабанбай батыра, 79, Нур-Султан',
      image: '🏛️',
      rating: 4.8,
      reviews: 24,
      maxGuests: 500,
      pricePerPerson: '5000 ₸',
      specialties: ['Национальная кухня', 'Европейская кухня'],
      description: 'Роскошный ресторан-холл с полным спектром услуг для проведения той'
    },
    {
      id: 2,
      name: 'Garden Palace',
      address: 'проспект Назарбаева, 45, Алматы',
      image: '🌳',
      rating: 4.6,
      reviews: 18,
      maxGuests: 300,
      pricePerPerson: '4000 ₸',
      specialties: ['Кавказская кухня', 'Азиатская кухня'],
      description: 'Светлый ресторан с видом на сад, идеален для семейных событий'
    },
    {
      id: 3,
      name: 'Grand Palace',
      address: 'улица Манаса, 120, Актау',
      image: '👑',
      rating: 4.9,
      reviews: 31,
      maxGuests: 400,
      pricePerPerson: '6000 ₸',
      specialties: ['Премиум обслуживание', 'Казахская кухня'],
      description: 'Премиальное заведение с великолепным дизайном и обслуживанием'
    }
  ]);

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    minGuests: 0,
    search: ''
  });

  const filteredRestaurants = restaurants.filter(r => {
    const priceNum = parseInt(r.pricePerPerson);
    const matchPrice = priceNum >= filters.minPrice && priceNum <= filters.maxPrice;
    const matchGuests = r.maxGuests >= filters.minGuests;
    const matchSearch = r.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                       r.description.toLowerCase().includes(filters.search.toLowerCase());
    return matchPrice && matchGuests && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
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
              <h1 className="text-3xl font-bold text-gray-900">🍽️ Рестораны</h1>
            </div>
            <Link to="/" className="btn-primary">
              Добавить ресторан
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="card mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Фильтры</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="label">Поиск</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="input"
                placeholder="Название ресторана..."
              />
            </div>

            <div>
              <label className="label">Мин. гостей: {filters.minGuests}</label>
              <input
                type="range"
                min="0"
                max="500"
                step="50"
                value={filters.minGuests}
                onChange={(e) => setFilters({ ...filters, minGuests: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="label">Мин. цена: {filters.minPrice} ₸</label>
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="label">Макс. цена: {filters.maxPrice} ₸</label>
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="card card-hover">
                <div className="text-5xl mb-3">{restaurant.image}</div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{restaurant.name}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(restaurant.rating) ? '⭐' : '☆'} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({restaurant.reviews})</span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{restaurant.address}</p>

                <div className="space-y-2 mb-4 text-sm">
                  <p className="text-gray-700">
                    <strong>Макс. гостей:</strong> {restaurant.maxGuests}
                  </p>
                  <p className="text-gray-700">
                    <strong>Цена:</strong> {restaurant.pricePerPerson}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.specialties.map((spec, idx) => (
                      <span key={idx} className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{restaurant.description}</p>

                <button className="btn-primary w-full text-sm">
                  Забронировать
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center">
            <p className="text-lg text-gray-600">Рестораны не найдены</p>
            <button 
              onClick={() => setFilters({ minPrice: 0, maxPrice: 10000, minGuests: 0, search: '' })}
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

export default RestaurantsRouter;
