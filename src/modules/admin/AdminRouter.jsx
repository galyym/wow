import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminRouter = () => {
  const [stats] = useState({
    users: 1250,
    invitations: 342,
    services: 128,
    restaurants: 45,
    revenue: '15,750,000 ₸'
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  const [moderationQueue] = useState([
    { id: 1, type: 'restaurant', name: 'New Palace', status: 'pending', date: '2025-01-14' },
    { id: 2, type: 'artist', name: 'Jazz Band Pro', status: 'pending', date: '2025-01-13' },
    { id: 3, type: 'service', name: 'Photo Studio XYZ', status: 'pending', date: '2025-01-12' }
  ]);

  const [users] = useState([
    { id: 1, name: 'Айман Кадыров', email: 'aiman@example.com', role: 'vendor', joined: '2024-12-15', status: 'active' },
    { id: 2, name: 'Гулнара Нусупова', email: 'gulnara@example.com', role: 'user', joined: '2024-11-20', status: 'active' },
    { id: 3, name: 'Бахтияр Омаров', email: 'bakhtiyor@example.com', role: 'vendor', joined: '2024-10-05', status: 'suspended' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                На главную
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">⚙️ Панель администратора</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
            <h3 className="text-sm font-semibold text-blue-600 mb-1">Пользователи</h3>
            <p className="text-3xl font-bold text-blue-900">{stats.users}</p>
            <p className="text-xs text-blue-600 mt-1">Зарегистрированных</p>
          </div>

          <div className="card bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500">
            <h3 className="text-sm font-semibold text-green-600 mb-1">Приглашения</h3>
            <p className="text-3xl font-bold text-green-900">{stats.invitations}</p>
            <p className="text-xs text-green-600 mt-1">Созданных</p>
          </div>

          <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500">
            <h3 className="text-sm font-semibold text-purple-600 mb-1">Услуги</h3>
            <p className="text-3xl font-bold text-purple-900">{stats.services}</p>
            <p className="text-xs text-purple-600 mt-1">Активных</p>
          </div>

          <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500">
            <h3 className="text-sm font-semibold text-orange-600 mb-1">Рестораны</h3>
            <p className="text-3xl font-bold text-orange-900">{stats.restaurants}</p>
            <p className="text-xs text-orange-600 mt-1">Партнёров</p>
          </div>

          <div className="card bg-gradient-to-br from-pink-50 to-pink-100 border-l-4 border-pink-500">
            <h3 className="text-sm font-semibold text-pink-600 mb-1">Доход</h3>
            <p className="text-2xl font-bold text-pink-900">{stats.revenue}</p>
            <p className="text-xs text-pink-600 mt-1">Этот месяц</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="card mb-8">
          <div className="flex flex-wrap gap-2 border-b">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-3 font-medium border-b-2 transition-all ${
                activeTab === 'dashboard'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Обзор
            </button>
            <button
              onClick={() => setActiveTab('moderation')}
              className={`px-4 py-3 font-medium border-b-2 transition-all ${
                activeTab === 'moderation'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Модерация ({moderationQueue.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-3 font-medium border-b-2 transition-all ${
                activeTab === 'users'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Пользователи
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Недавняя активность</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-gray-900">Новое приглашение создано</p>
                    <p className="text-sm text-gray-600">Айман Кадыров</p>
                  </div>
                  <span className="text-sm text-gray-500">2 часа назад</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-gray-900">Новый отклик на приглашение</p>
                    <p className="text-sm text-gray-600">Гулнара Нусупова</p>
                  </div>
                  <span className="text-sm text-gray-500">5 часов назад</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-gray-900">Новая регистрация</p>
                    <p className="text-sm text-gray-600">Бахтияр Омаров</p>
                  </div>
                  <span className="text-sm text-gray-500">1 день назад</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'moderation' && (
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Очередь на модерацию</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Название</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Тип</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Дата</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {moderationQueue.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                      <td className="px-6 py-4 text-right text-sm">
                        <button className="text-green-600 hover:text-green-900 font-medium mr-4">
                          ✓ Утвердить
                        </button>
                        <button className="text-red-600 hover:text-red-900 font-medium">
                          ✕ Отклонить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Пользователи</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Имя</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Роль</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Присоединился</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'vendor'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role === 'vendor' ? 'Поставщик' : 'Пользователь'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status === 'active' ? 'Активен' : 'Приостановлен'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRouter;
