import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const templates = [
  {
    id: 'kazakh',
    name: 'Казахские мотивы',
    description: 'Традиционный дизайн с национальными узорами',
    preview: '/templates/kazakh-preview.svg',
    style: 'traditional'
  },
  {
    id: 'modern',
    name: 'Современный стиль',
    description: 'Минималистичный и элегантный дизайн',
    preview: '/templates/modern-preview.svg',
    style: 'modern'
  }
];

const TemplateSelection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate(`/invitations/editor/${selectedTemplate}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              На главную
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Пригласительные</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Выберите шаблон приглашения
          </h2>
          <p className="text-lg text-gray-600">
            Начните с выбора стиля, который вам нравится
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={`card card-hover cursor-pointer transition-all duration-300 ${
                selectedTemplate === template.id
                  ? 'ring-4 ring-primary-500 shadow-xl scale-105'
                  : ''
              }`}
            >
              {/* Template Preview */}
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {template.style === 'traditional' ? (
                  <div className="w-full h-full bg-gradient-to-br from-kazakh-gold via-white to-kazakh-blue flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🏵️</div>
                      <p className="text-2xl font-serif text-kazakh-blue">Қазақ</p>
                      <div className="mt-4 text-4xl">💍</div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="text-6xl mb-4">✨</div>
                      <p className="text-2xl font-light text-gray-800">Modern</p>
                      <div className="mt-4 text-4xl">💝</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {template.description}
                </p>
              </div>

              {/* Selection Indicator */}
              {selectedTemplate === template.id && (
                <div className="mt-4 flex items-center justify-center text-primary-600 font-medium">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Выбрано
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className={`btn-primary w-full sm:w-auto ${
              !selectedTemplate ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Перейти к редактированию
          </button>
          <button className="btn-secondary w-full sm:w-auto" disabled>
            Быстрая настройка
            <span className="ml-2 text-xs bg-gray-400 text-white px-2 py-0.5 rounded">скоро</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
