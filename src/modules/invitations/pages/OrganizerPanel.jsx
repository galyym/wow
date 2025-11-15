import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const OrganizerPanel = () => {
  const { invitationId } = useParams();
  const [responses, setResponses] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    const savedResponses = localStorage.getItem(`${invitationId}_responses`);
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, [invitationId]);

  const filteredResponses = responses.filter(r => {
    if (filterStatus !== 'all' && r.attending !== filterStatus) return false;
    if (filterRole !== 'all' && r.role !== filterRole) return false;
    return true;
  });

  const stats = {
    total: responses.length,
    attending: responses.filter(r => r.attending === 'yes').length,
    notAttending: responses.filter(r => r.attending === 'no').length,
    percentage: responses.length > 0 
      ? Math.round((responses.filter(r => r.attending === 'yes').length / responses.length) * 100)
      : 0
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to={`/invitations/publish/${invitationId}`} className="flex items-center text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Панель организатора</h1>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-600 mb-1">Всего откликов</p>
            <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
          </div>

          <div className="card bg-green-50 border border-green-200">
            <p className="text-sm text-green-600 mb-1">Придут</p>
            <p className="text-3xl font-bold text-green-900">{stats.attending}</p>
          </div>

          <div className="card bg-red-50 border border-red-200">
            <p className="text-sm text-red-600 mb-1">Не придут</p>
            <p className="text-3xl font-bold text-red-900">{stats.notAttending}</p>
          </div>

          <div className="card bg-purple-50 border border-purple-200">
            <p className="text-sm text-purple-600 mb-1">Процент подтверждений</p>
            <p className="text-3xl font-bold text-purple-900">{stats.percentage}%</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Фильтры</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">По статусу</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input"
              >
                <option value="all">Все</option>
                <option value="yes">Придут</option>
                <option value="no">Не придут</option>
              </select>
            </div>

            <div>
              <label className="label">По роли</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="input"
              >
                <option value="all">Все</option>
                <option value="Гость">Гость</option>
                <option value="Близкий друг">Близкий друг</option>
                <option value="Родственник">Родственник</option>
                <option value="Коллега">Коллега</option>
                <option value="Жиен">Жиен</option>
                <option value="Көрші">Көрші</option>
              </select>
            </div>
          </div>
        </div>

        {/* Responses Table */}
        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Отклики гостей ({filteredResponses.length})
          </h2>

          {filteredResponses.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-600">Пока нет откликов</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Имя</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">WhatsApp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Роль</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Комментарий</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredResponses.map((response, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {response.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {response.whatsapp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {response.attending === 'yes' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Придет
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Не придет
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {response.role}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {response.comment || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerPanel;
