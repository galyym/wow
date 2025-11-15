import { useState } from 'react';

// Компонент слайдера галереи
const GallerySlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToIndex = (idx) => {
    if (idx !== currentIndex) {
      setCurrentIndex(idx);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow overflow-hidden">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Галерея</h3>
      <div className="relative">
        {/* Main Image */}
        <div className="aspect-video overflow-hidden rounded-lg bg-gray-100 relative">
          <img
            key={currentIndex}
            src={images[currentIndex].url}
            alt={`Gallery ${currentIndex + 1}`}
            className="w-full h-full object-cover gallery-image-enter transition-all duration-500 ease-in-out"
          />
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => goToIndex(idx)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                idx === currentIndex 
                  ? 'ring-2 ring-primary-500 scale-110 shadow-lg' 
                  : 'opacity-60 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img
                src={img.url}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </button>
          ))}
        </div>
      )}

    </div>
  );
};

// Компонент временной шкалы
const TimelinePreview = ({ events }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Наша история</h3>

      {/* Desktop Timeline - side by side */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-300 to-primary-600 transform -translate-x-1/2" />

          {/* Events */}
          <div className="space-y-8">
            {events.map((event, idx) => (
              <div
                key={idx}
                className={`flex ${event.side === 'right' ? 'flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className={`w-1/2 min-w-0 ${event.side === 'right' ? 'pl-8' : 'pr-8'}`}>
                  <div className="bg-gray-50 p-4 rounded-lg max-w-full">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                      {event.date}
                    </p>
                    <h4 className="font-bold text-lg text-gray-900 mt-1 break-words">{event.title}</h4>
                    {event.description && (
                      <p className="text-gray-700 text-sm mt-2 whitespace-pre-wrap break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{event.description}</p>
                    )}
                  </div>
                </div>

                {/* Center dot */}
                <div className="flex justify-center">
                  <div className="w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg flex-shrink-0 mt-2" />
                </div>

                {/* Photo space */}
                <div className={`w-1/2 flex items-start ${event.side === 'right' ? 'justify-end pr-8' : 'pl-8'}`}>
                  {event.photo && (
                    <div 
                      className="w-24 h-24 rounded-full shadow-lg border-4 border-white overflow-hidden bg-gray-100"
                      style={{
                        maskImage: event.cropData 
                          ? `radial-gradient(circle at ${event.cropData.x * 100}% ${event.cropData.y * 100}%, black ${event.cropData.radius * 100}%, transparent ${event.cropData.radius * 100}%)`
                          : 'none',
                        WebkitMaskImage: event.cropData 
                          ? `radial-gradient(circle at ${event.cropData.x * 100}% ${event.cropData.y * 100}%, black ${event.cropData.radius * 100}%, transparent ${event.cropData.radius * 100}%)`
                          : 'none'
                      }}
                    >
                      <img
                        src={event.photo}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        style={event.cropData ? {
                          objectPosition: `${event.cropData.x * 100}% ${event.cropData.y * 100}%`
                        } : {}}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Timeline - vertical with swipe */}
      <div className="md:hidden">
        <div className="space-y-4">
          {/* Event Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {events.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`flex-shrink-0 w-10 h-10 rounded-full font-semibold transition-all ${
                  idx === activeIndex
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Active Event Display */}
          {events[activeIndex] && (
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-lg border border-primary-200">
              {events[activeIndex].photo && (
                <div className="mb-4 flex justify-center">
                  <div 
                    className="w-32 h-32 rounded-full shadow-lg border-4 border-white overflow-hidden bg-gray-100"
                    style={{
                      maskImage: events[activeIndex].cropData 
                        ? `radial-gradient(circle at ${events[activeIndex].cropData.x * 100}% ${events[activeIndex].cropData.y * 100}%, black ${events[activeIndex].cropData.radius * 100}%, transparent ${events[activeIndex].cropData.radius * 100}%)`
                        : 'none',
                      WebkitMaskImage: events[activeIndex].cropData 
                        ? `radial-gradient(circle at ${events[activeIndex].cropData.x * 100}% ${events[activeIndex].cropData.y * 100}%, black ${events[activeIndex].cropData.radius * 100}%, transparent ${events[activeIndex].cropData.radius * 100}%)`
                        : 'none'
                    }}
                  >
                    <img
                      src={events[activeIndex].photo}
                      alt={events[activeIndex].title}
                      className="w-full h-full object-cover"
                      style={events[activeIndex].cropData ? {
                        objectPosition: `${events[activeIndex].cropData.x * 100}% ${events[activeIndex].cropData.y * 100}%`
                      } : {}}
                    />
                  </div>
                </div>
              )}
              <p className="text-xs text-primary-700 uppercase tracking-wide font-semibold">
                {events[activeIndex].date}
              </p>
              <h4 className="font-bold text-lg text-gray-900 mt-2 break-words">{events[activeIndex].title}</h4>
              {events[activeIndex].description && (
                <p className="text-gray-700 text-sm mt-2 whitespace-pre-wrap break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{events[activeIndex].description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PreviewPanel = ({ blocks, templateId }) => {
  const enabledBlocks = blocks.filter(block => block.enabled).sort((a, b) => a.order - b.order);
  const backgroundBlock = blocks.find(b => b.id === 'background');
  const musicBlock = blocks.find(b => b.id === 'music');
  const bg = backgroundBlock?.data || {};

  const backgroundStyle = {
    backgroundColor: bg.type === 'color' ? bg.value : '#ffffff',
    backgroundImage: bg.type === 'image' && bg.value ? `url(${bg.value})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: bg.blur ? `blur(${bg.blur}px)` : 'none'
  };

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Предпросмотр</h3>
      
      <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
        <div 
          className="relative min-h-[600px] overflow-y-auto"
          style={backgroundStyle}
        >
          {/* Overlay if using background image with pattern */}
          {bg.pattern && bg.pattern !== 'none' && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: bg.patternOpacity || 0.2,
                backgroundImage: getPatternStyle(bg.pattern)
              }}
            />
          )}

          {/* Music Player - Hidden but playing in background */}
          {musicBlock?.enabled && musicBlock?.data?.audioUrl && (
            <audio
              src={musicBlock.data.audioUrl}
              autoPlay
              loop
              volume={musicBlock.data.volume || 0.5}
              style={{ display: 'none' }}
            />
          )}

          {/* Content */}
          <div className="relative z-10 p-8 space-y-8">
            {enabledBlocks.map(block => (
              <div key={block.id} className="animate-fade-in">
                {renderBlockPreview(block, templateId)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function getPatternStyle(pattern) {
  const patterns = {
    floral: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
    geometric: 'linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%)',
    dots: 'radial-gradient(circle, rgba(0,0,0,0.15) 2px, transparent 2px)',
    waves: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 10px, transparent 10px, transparent 20px)'
  };
  return patterns[pattern] || 'none';
}

function renderBlockPreview(block, templateId) {
  const { id, data } = block;

  switch (id) {
    case 'photo':
      return data.image ? (
        <div className="flex justify-center">
          <div 
            className="w-64 h-64 rounded-full shadow-xl border-4 border-white overflow-hidden bg-gray-100 flex-shrink-0"
            style={{
              maskImage: data.cropData 
                ? `radial-gradient(circle at ${data.cropData.x * 100}% ${data.cropData.y * 100}%, black ${data.cropData.radius * 100}%, transparent ${data.cropData.radius * 100}%)`
                : 'none',
              WebkitMaskImage: data.cropData 
                ? `radial-gradient(circle at ${data.cropData.x * 100}% ${data.cropData.y * 100}%, black ${data.cropData.radius * 100}%, transparent ${data.cropData.radius * 100}%)`
                : 'none'
            }}
          >
            <img 
              src={data.image} 
              alt="Молодожёны"
              className="w-full h-full object-cover"
              style={data.cropData ? {
                objectPosition: `${data.cropData.x * 100}% ${data.cropData.y * 100}%`
              } : {}}
            />
          </div>
        </div>
      ) : null;

    case 'names':
      return (
        <div 
          className="text-center py-6 rounded-lg"
          style={{ 
            backgroundColor: data.bgColor,
            fontFamily: data.font,
            fontSize: `${data.fontSize}px`,
            color: data.color
          }}
        >
          {data.text}
        </div>
      );

    case 'description':
      return data.text ? (
        <div 
          className="p-6 rounded-lg"
          style={{ 
            backgroundColor: data.bgColor,
            fontSize: `${data.fontSize}px`,
            color: data.color
          }}
        >
          <p 
            className="whitespace-pre-wrap"
            style={{ textAlign: data.textAlign || 'left' }}
          >
            {data.text}
          </p>
        </div>
      ) : null;

    case 'gallery':
      return data.images && data.images.length > 0 ? (
        <GallerySlider images={data.images} />
      ) : null;

    case 'schedule':
      return data.events && data.events.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Сценарий свадьбы</h3>
          <div className="space-y-3">
            {data.events.map((event, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="text-primary-600 font-bold text-lg min-w-[80px]">
                  {event.time}
                </span>
                <span className="text-gray-700">{event.event}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null;

    case 'restaurant':
      return (data.name || data.address) ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ресторан</h3>
          {data.name && <p className="font-semibold text-lg mb-2">{data.name}</p>}
          {data.address && <p className="text-gray-700 mb-3">{data.address}</p>}
          {data.mapUrl && (
            <a 
              href={data.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Построить маршрут
            </a>
          )}
        </div>
      ) : null;

    case 'date':
      return (data.date || data.time) ? (
        <div 
          className="text-center py-6 rounded-lg"
          style={{ 
            backgroundColor: data.bgColor,
            fontSize: `${data.fontSize}px`,
            color: data.color
          }}
        >
          <p className="font-bold">
            {data.date && new Date(data.date).toLocaleDateString('ru-RU', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
          {data.time && <p className="mt-2">{data.time}</p>}
        </div>
      ) : null;

    case 'rsvp':
      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Форма отклика</h3>
          <p className="text-sm text-gray-600 text-center">
            Форма будет отображаться гостям в финальной версии
          </p>
        </div>
      );

    case 'timeline':
      return data.events && data.events.length > 0 ? (
        <TimelinePreview events={data.events} />
      ) : null;

    case 'music':
      return data.audioUrl ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Фоновая музыка</h3>
          <p className="text-sm text-gray-600 text-center">
            🎵 Музыка будет воспроизводиться автоматически
          </p>
        </div>
      ) : null;

    case 'gift':
      return (data.cardNumber || data.phone) ? (
        <div 
          className="p-6 rounded-lg"
          style={{ 
            backgroundColor: data.bgColor,
            fontSize: `${data.fontSize}px`,
            color: data.color
          }}
        >
          <h3 className="text-xl font-bold mb-4">Реквизиты для подарков</h3>
          {data.bank && <p className="mb-2">Банк: {data.bank}</p>}
          {data.cardNumber && <p className="mb-2">Карта: {data.cardNumber}</p>}
          {data.phone && <p>Телефон: {data.phone}</p>}
        </div>
      ) : null;

    case 'tables':
      return data.tables && data.tables.length > 0 ? (
        <div 
          className="p-6 rounded-lg"
          style={{ 
            backgroundColor: data.bgColor,
            fontSize: `${data.fontSize}px`,
            color: data.color
          }}
        >
          <h3 className="text-xl font-bold mb-4">Рассадка гостей</h3>
          <div className="grid grid-cols-2 gap-3">
            {data.tables.map((table, index) => (
              <div key={index} className="border p-3 rounded">
                <p className="font-semibold">{table.name}</p>
                <p className="text-sm">Мест: {table.seats}</p>
                <p className="text-sm">{table.role}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null;

    default:
      return null;
  }
}

export default PreviewPanel;
