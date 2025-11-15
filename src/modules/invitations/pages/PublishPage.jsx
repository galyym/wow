import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const PublishPage = () => {
  const { invitationId } = useParams();
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const savedInvitation = localStorage.getItem(invitationId);
    if (savedInvitation) {
      setInvitation(JSON.parse(savedInvitation));
    }
  }, [invitationId]);

  const invitationUrl = `${window.location.origin}/invitations/view/${invitationId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleViewAsOrganizer = () => {
    navigate(`/invitations/organizer/${invitationId}`);
  };

  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/invitations" className="flex items-center text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            К пригласительным
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Приглашение опубликовано!
          </h1>
          <p className="text-lg text-gray-600">
            Теперь вы можете поделиться им с гостями
          </p>
        </div>

        {/* Invitation Link Card */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ссылка на приглашение</h2>
          
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-4">
            <input
              type="text"
              value={invitationUrl}
              readOnly
              className="flex-1 bg-transparent border-none focus:outline-none text-sm"
            />
            <button
              onClick={handleCopyLink}
              className="btn-primary"
            >
              {copySuccess ? (
                <>
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Скопировано!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Копировать
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={invitationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full text-center"
            >
              Открыть приглашение
            </a>
            <button
              onClick={handleViewAsOrganizer}
              className="btn-secondary w-full"
            >
              Панель организатора
            </button>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button className="card card-hover text-center" disabled>
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            <h3 className="font-semibold text-gray-900 mb-1">QR-код</h3>
            <p className="text-sm text-gray-500">Скоро доступно</p>
          </button>

          <button className="card card-hover text-center" disabled>
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <h3 className="font-semibold text-gray-900 mb-1">Скачать PDF</h3>
            <p className="text-sm text-gray-500">Скоро доступно</p>
          </button>

          <Link to="/invitations" className="card card-hover text-center">
            <svg className="w-12 h-12 mx-auto mb-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <h3 className="font-semibold text-gray-900 mb-1">Новое приглашение</h3>
            <p className="text-sm text-gray-500">Создать еще одно</p>
          </Link>
        </div>

        {/* Tips */}
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="font-bold text-blue-900 mb-3">💡 Советы:</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Отправьте ссылку гостям через WhatsApp или Telegram</li>
            <li>• Проверьте приглашение перед отправкой</li>
            <li>• Отслеживайте отклики гостей в панели организатора</li>
            <li>• Вы можете редактировать приглашение в любое время</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PublishPage;
