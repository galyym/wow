import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PreviewPanel from '../components/preview/PreviewPanel';

const GuestView = () => {
  const { invitationId } = useParams();
  const [invitation, setInvitation] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    attending: '',
    role: 'Гость',
    comment: ''
  });

  useEffect(() => {
    const savedInvitation = localStorage.getItem(invitationId);
    if (savedInvitation) {
      setInvitation(JSON.parse(savedInvitation));
    }
  }, [invitationId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Сохраняем отклик в localStorage
    const responses = JSON.parse(localStorage.getItem(`${invitationId}_responses`) || '[]');
    responses.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem(`${invitationId}_responses`, JSON.stringify(responses));
    
    setSubmitted(true);
  };

  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Загрузка...</p>
      </div>
    );
  }

  const rsvpBlock = invitation.blocks.find(b => b.id === 'rsvp' && b.enabled);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Invitation Content */}
        <PreviewPanel blocks={invitation.blocks} templateId={invitation.templateId} />

        {/* RSVP Form */}
        {rsvpBlock && !submitted && (
          <div className="card mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ваш отклик</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Ваше имя *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="Введите ваше имя"
                />
              </div>

              <div>
                <label className="label">WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="input"
                  placeholder="+7 (777) 123-45-67"
                />
              </div>

              <div>
                <label className="label">Вы придете? *</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'yes' })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.attending === 'yes'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-2xl">✅</span>
                    <p className="mt-2 font-medium">Приду</p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'no' })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.attending === 'no'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-2xl">❌</span>
                    <p className="mt-2 font-medium">Не смогу</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="label">Кем вы приходитесь?</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="input"
                >
                  <option value="Гость">Гость</option>
                  <option value="Близкий друг">Близкий друг</option>
                  <option value="Родственник">Родственник</option>
                  <option value="Коллега">Коллега</option>
                  <option value="Жиен">Жиен</option>
                  <option value="Көрші">Көрші</option>
                </select>
              </div>

              <div>
                <label className="label">Комментарий / Пожелания</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="input"
                  rows="4"
                  placeholder="Ваши пожелания..."
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Отправить отклик
              </button>
            </form>
          </div>
        )}

        {/* Success Message */}
        {submitted && (
          <div className="card mt-8 bg-green-50 border border-green-200">
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">
                Спасибо за отклик!
              </h2>
              <p className="text-green-700">
                Организаторы получили ваш ответ
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestView;
