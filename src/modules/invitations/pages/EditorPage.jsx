import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import BlocksEditor from '../components/editor/BlocksEditor';
import PreviewPanel from '../components/preview/PreviewPanel';
import MobilePreviewButton from '../components/editor/MobilePreviewButton';

const EditorPage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Инициализация блоков
  const [blocks, setBlocks] = useState([
    { id: 'photo', name: 'Фотография молодожёнов', enabled: true, order: 0, data: { image: null, cropData: null } },
    { id: 'names', name: 'Имена молодожёнов', enabled: true, order: 1, data: { text: 'Қазақ & Қазақ', font: 'Playfair Display', fontSize: 32, color: '#1f2937', bgColor: '#ffffff' } },
    { id: 'description', name: 'Описание свадьбы', enabled: true, order: 2, data: { text: '', fontSize: 16, color: '#4b5563', bgColor: '#ffffff' } },
    { id: 'gallery', name: 'Галерея', enabled: false, order: 3, data: { images: [] } },
    { id: 'schedule', name: 'Сценарий свадьбы', enabled: true, order: 4, data: { events: [{ time: '18:00', event: 'Беташар' }] } },
    { id: 'restaurant', name: 'Информация о ресторане', enabled: true, order: 5, data: { name: '', address: '', mapUrl: '' } },
    { id: 'date', name: 'Дата свадьбы', enabled: true, order: 6, data: { date: '', time: '', fontSize: 24, color: '#1f2937', bgColor: '#ffffff' } },
    { id: 'rsvp', name: 'Форма отклика гостей', enabled: true, order: 7, data: {} },
    { id: 'timeline', name: 'История молодожёнов', enabled: false, order: 8, data: { events: [] } },
    { id: 'music', name: 'Фоновая музыка', enabled: false, order: 9, data: { audioUrl: null, volume: 0.5 } },
    { id: 'gift', name: 'Реквизиты для подарков', enabled: false, order: 10, data: { bank: 'Kaspi Bank', cardNumber: '', phone: '', fontSize: 16, color: '#1f2937', bgColor: '#ffffff' } },
    { id: 'tables', name: 'Места в ресторане', enabled: false, order: 11, data: { tables: [] } },
    { id: 'background', name: 'Задний фон', enabled: true, order: 12, data: { type: 'color', value: '#ffffff', pattern: null, blur: 0, animation: null, palette: { primary: '#D4AF37', secondary: '#ffffff', accent: '#C8102E' } } }
  ]);

  // Проверка мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateBlock = (blockId, newData) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, data: { ...block.data, ...newData } } : block
    ));
  };

  const toggleBlock = (blockId) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, enabled: !block.enabled } : block
    ));
  };

  const reorderBlocks = (startIndex, endIndex) => {
    const result = Array.from(blocks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    // Обновляем order
    const updated = result.map((block, index) => ({ ...block, order: index }));
    setBlocks(updated);
  };

  const resetBlocks = () => {
    if (confirm('Вы уверены, что хотите сбросить все изменения?')) {
      window.location.reload();
    }
  };

  const handlePublish = () => {
    // Генерируем уникальный ID
    const invitationId = `inv_${Date.now()}`;
    
    // Сохраняем в localStorage
    localStorage.setItem(invitationId, JSON.stringify({ templateId, blocks }));
    
    navigate(`/invitations/publish/${invitationId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap">
              <Link to="/invitations" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0">
                <svg className="w-5 h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Назад</span>
              </Link>
              <h1 className="text-base sm:text-lg font-bold text-gray-900">Редактор приглашения</h1>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <button onClick={resetBlocks} className="btn-secondary text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2">
                Сбросить
              </button>
              <button onClick={handlePublish} className="btn-primary text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2">
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="order-2 lg:order-1">
            <BlocksEditor 
              blocks={blocks}
              updateBlock={updateBlock}
              toggleBlock={toggleBlock}
              reorderBlocks={reorderBlocks}
            />
          </div>

          {/* Preview Panel */}
          {!isMobile ? (
            <div className="order-1 lg:order-2">
              <div className="sticky top-24">
                <PreviewPanel blocks={blocks} templateId={templateId} />
              </div>
            </div>
          ) : (
            <>
              <MobilePreviewButton onClick={() => setShowMobilePreview(true)} />
              
              {showMobilePreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h3 className="font-bold text-lg">Предпросмотр</h3>
                      <button 
                        onClick={() => setShowMobilePreview(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <PreviewPanel blocks={blocks} templateId={templateId} />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
