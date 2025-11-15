import { Link } from 'react-router-dom';

const HomePage = () => {
  const sections = [
    {
      id: 'invitations',
      title: 'Пригласительные',
      description: 'Создайте красивые цифровые приглашения на той',
      icon: '💌',
      path: '/invitations',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 'restaurants',
      title: 'Рестораны',
      description: 'Найдите идеальный ресторан для вашего той',
      icon: '🍽️',
      path: '/restaurants',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'hosts',
      title: 'Тамады',
      description: 'Профессиональные ведущие для вашего мероприятия',
      icon: '🎤',
      path: '/hosts',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'artists',
      title: 'Артисты',
      description: 'Певцы, танцоры и шоу-группы',
      icon: '🎵',
      path: '/artists',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'rent',
      title: 'Аренда одежды',
      description: 'Свадебные и праздничные наряды',
      icon: '👗',
      path: '/rent',
      gradient: 'from-teal-500 to-green-500'
    },
    {
      id: 'services',
      title: 'Прочие услуги',
      description: 'Фото, видео, декор и другое',
      icon: '🎨',
      path: '/services',
      gradient: 'from-yellow-500 to-amber-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Ashkel
              </h1>
              <p className="text-sm text-gray-600 mt-1">Платформа автоматизации той-бизнеса</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 animate-fade-in">
            Добро пожаловать в Ashkel
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Всё для организации идеального той в одном месте
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sections.map((section, index) => (
            <Link
              key={section.id}
              to={section.path}
              className="card card-hover group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {section.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {section.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {section.description}
              </p>
              <div className="mt-4 flex items-center text-primary-600 font-medium text-sm group-hover:translate-x-2 transition-transform duration-200">
                Перейти
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white mt-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm">
            © 2024 Ashkel. Платформа автоматизации той-бизнеса в Казахстане
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
