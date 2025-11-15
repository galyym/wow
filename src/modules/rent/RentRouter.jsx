import { useState } from 'react';
import { Link } from 'react-router-dom';

const RentRouter = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Свадебное платье "Королева"',
      category: 'Платья',
      image: '👰',
      price: '80,000 ₸',
      rentalDays: '3-7 дней',
      size: 'XS-XL',
      color: 'Белый',
      material: 'Шелк, кружево',
      description: 'Роскошное традиционное свадебное платье с вышивкой'
    },
    {
      id: 2,
      name: 'Традиционный казахский наряд',
      category: 'Национальная одежда',
      image: '👚',
      price: '50,000 ₸',
      rentalDays: '3-5 дней',
      size: 'S-XL',
      color: 'Золотой/Красный',
      material: 'Парча, золотая нить',
      description: 'Аутентичный казахский свадебный наряд с украшениями'
    },
    {
      id: 3,
      name: 'Мужской свадебный костюм',
      category: 'Костюмы',
      image: '🤵',
      price: '40,000 ₸',
      rentalDays: '2-4 дня',
      size: 'S-XXL',
      color: 'Черный',
      material: 'Шерсть, полиэстер',
      description: 'Классический черный смокинг для жениха'
    },
    {
      id: 4,
      name: 'Платье подружки невесты',
      category: 'Платья',
      image: '👗',
      price: '35,000 ₸',
      rentalDays: '2-3 дня',
      size: 'XS-XXL',
      color: 'Разные цвета',
      material: 'Шифон, атлас',
      description: 'Элегантное платье для подружек невесты'
    },
    {
      id: 5,
      name: 'Национальный костюм "Жигер"',
      category: 'Национальная одежда',
      image: '🧥',
      price: '45,000 ₸',
      rentalDays: '3-5 дней',
      size: 'S-XL',
      color: 'Коричневый/Черный',
      material: 'Кожа, шерсть',
      description: 'Традиционный казахский мужской наряд'
    },
    {
      id: 6,
      name: 'Аксессуары и украшения',
      category: 'Аксессуары',
      image: '✨',
      price: '10,000-25,000 ₸',
      rentalDays: '1-7 дней',
      size: 'Универсальный',
      color: 'Золотой, серебристый',
      material: 'Хрусталь, золото',
      description: 'Украшения, диадемы, ожерелья для невесты'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(100000);

  const categories = ['Платья', 'Костюмы', 'Национальная одежда', 'Аксессуары'];

  const filteredItems = items
    .filter(item =>
      (selectedCategory === 'all' || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      parseInt(item.price) <= priceRange
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50">
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
              <h1 className="text-3xl font-bold text-gray-900">👗 Аренда одежды</h1>
            </div>
            <Link to="/" className="btn-primary">
              Добавить костюм
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
                    ? 'bg-teal-600 text-white'
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
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Поиск</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
                placeholder="Название костюма..."
              />
            </div>

            <div>
              <label className="label">Макс. цена: {priceRange.toLocaleString()} ₸</label>
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="card card-hover">
                <div className="text-5xl mb-4">{item.image}</div>

                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-teal-600 font-semibold mb-3">{item.category}</p>

                {/* Info */}
                <div className="space-y-2 mb-4 text-sm">
                  <p className="text-gray-700">
                    <strong>Цена:</strong> {item.price}
                  </p>
                  <p className="text-gray-700">
                    <strong>Период аренды:</strong> {item.rentalDays}
                  </p>
                  <p className="text-gray-700">
                    <strong>Размер:</strong> {item.size}
                  </p>
                  <p className="text-gray-700">
                    <strong>Цвет:</strong> {item.color}
                  </p>
                  <p className="text-gray-700">
                    <strong>Материал:</strong> {item.material}
                  </p>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>

                <button className="btn-primary w-full text-sm">
                  Забронировать
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center">
            <p className="text-lg text-gray-600">Костюмы не найдены</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange(100000);
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

export default RentRouter;
