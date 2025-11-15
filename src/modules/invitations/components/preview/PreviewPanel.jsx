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

  // Функция для получения стиля узора
  const getPatternStyle = (patternType, color = '#000000', size = 50) => {
    const patterns = {
      'lines-vertical': `repeating-linear-gradient(0deg, ${color} 0px, ${color} 2px, transparent 2px, transparent ${size}px)`,
      'lines-horizontal': `repeating-linear-gradient(90deg, ${color} 0px, ${color} 2px, transparent 2px, transparent ${size}px)`,
      'lines-diagonal': `repeating-linear-gradient(45deg, ${color} 0px, ${color} 2px, transparent 2px, transparent ${size}px)`,
      'dots': `radial-gradient(circle, ${color} 2px, transparent 2px)`,
      'grid': `
        linear-gradient(${color} 1px, transparent 1px),
        linear-gradient(90deg, ${color} 1px, transparent 1px)
      `,
      'waves': `repeating-linear-gradient(0deg, transparent, transparent 10px, ${color} 10px, ${color} 12px)`,
      'circles': `radial-gradient(circle at 50% 50%, ${color} 3px, transparent 3px)`,
      'floral': `radial-gradient(circle, ${color} 1px, transparent 1px)`,
      'geometric': `
        linear-gradient(45deg, ${color} 25%, transparent 25%),
        linear-gradient(-45deg, ${color} 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, ${color} 75%),
        linear-gradient(-45deg, transparent 75%, ${color} 75%)
      `
    };
    return patterns[patternType] || 'none';
  };

  // Функция для получения позиции узора
  const getPatternPosition = (position) => {
    const positions = {
      'full': { inset: '0' },
      'left': { left: '0', top: '0', bottom: '0', width: '30%' },
      'right': { right: '0', top: '0', bottom: '0', width: '30%' },
      'top': { top: '0', left: '0', right: '0', height: '30%' },
      'bottom': { bottom: '0', left: '0', right: '0', height: '30%' },
      'top-left': { top: '0', left: '0', width: '40%', height: '40%' },
      'top-right': { top: '0', right: '0', width: '40%', height: '40%' },
      'bottom-left': { bottom: '0', left: '0', width: '40%', height: '40%' },
      'bottom-right': { bottom: '0', right: '0', width: '40%', height: '40%' },
      'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', height: '60%' }
    };
    return positions[position] || positions.full;
  };

  // Функция для получения фильтра оттенка
  const getToneFilter = (tone) => {
    const filters = {
      'warm': 'sepia(0.2) saturate(1.1)',
      'neutral': 'none',
      'cool': 'hue-rotate(180deg) saturate(0.9)'
    };
    return filters[tone] || 'none';
  };

  // Вычисление стиля фона
  const getBackgroundStyle = () => {
    const style = {};
    
    // Базовый фон
    if (bg.type === 'smart' && bg.background) {
      // Смарт-фон с готовой композицией
      style.background = bg.background;
      style.backgroundColor = '#ffffff'; // fallback
    } else if (bg.type === 'color') {
      style.backgroundColor = bg.color || '#ffffff';
    } else if (bg.type === 'image' && bg.image) {
      style.backgroundImage = `url(${bg.image})`;
      style.backgroundSize = bg.imageScale ? `${bg.imageScale}%` : 'cover';
      style.backgroundPosition = bg.imagePosition 
        ? `${bg.imagePosition.x}% ${bg.imagePosition.y}%`
        : 'center';
      style.backgroundColor = '#ffffff'; // fallback
    } else {
      style.backgroundColor = '#ffffff';
    }

    // Фильтры (применяются ко всему фону)
    const filters = [];
    if (bg.blur) filters.push(`blur(${bg.blur}px)`);
    if (bg.toneFilter && bg.toneFilter !== 'neutral') {
      const toneFilter = getToneFilter(bg.toneFilter);
      if (toneFilter !== 'none') filters.push(toneFilter);
    }
    if (bg.brightness && bg.brightness !== 100) {
      filters.push(`brightness(${bg.brightness}%)`);
    }
    if (filters.length > 0) {
      style.filter = filters.join(' ');
    }

    return style;
  };

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Предпросмотр</h3>
      
      <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
        <div 
          className="relative min-h-[600px]"
          style={getBackgroundStyle()}
        >
          {/* Pattern overlay with positioning */}
          {bg.pattern && bg.pattern !== 'none' && (
            <div 
              className="absolute pointer-events-none"
              style={{
                ...getPatternPosition(bg.patternPosition || 'full'),
                opacity: bg.patternOpacity ?? 0.2,
                backgroundImage: getPatternStyle(bg.pattern, bg.patternColor || '#000000', bg.patternSize || 50),
                backgroundSize: `${bg.patternSize || 50}px ${bg.patternSize || 50}px`
              }}
            />
          )}

          {/* Overlay color */}
          {bg.overlay && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundColor: bg.overlayColor || 'rgba(0,0,0,0.1)'
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
        <div className="relative">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Реквизиты для подарков</h3>
          <div 
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            style={{
              background: data.bgColor && data.bgColor.startsWith('linear-gradient')
                ? data.bgColor
                : data.bgColor && data.bgColor !== '#ffffff'
                ? data.bgColor
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              minHeight: '220px',
              color: data.color || '#ffffff'
            }}
          >
            {/* Holographic effect */}
            <div className="absolute inset-0 opacity-20">
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                  animation: 'shimmer 3s infinite'
                }}
              />
            </div>

            {/* Card content */}
            <div className="relative p-6 h-full flex flex-col justify-between">
              {/* Top section */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {/* Chip icon */}
                    <div className="w-10 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md flex items-center justify-center">
                      <div className="w-6 h-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm">
                        <div className="w-full h-full border border-yellow-700 rounded-sm" style={{ borderWidth: '1px' }} />
                      </div>
                    </div>
                    {/* Contactless icon */}
                    <div className="flex gap-1">
                      <div className="w-1 h-4 bg-white rounded-full" />
                      <div className="w-1 h-4 bg-white rounded-full" />
                      <div className="w-1 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  {data.bank && (
                    <p className="text-sm font-semibold opacity-90" style={{ fontSize: `${(data.fontSize || 16) * 0.875}px` }}>
                      {data.bank}
                    </p>
                  )}
                </div>
                
                {/* Bank logo placeholder */}
                <div className="text-2xl font-bold opacity-80">💳</div>
              </div>

              {/* Card number */}
              {data.cardNumber && (
                <div className="mb-6">
                  <p 
                    className="text-2xl font-mono font-bold tracking-wider"
                    style={{ fontSize: `${(data.fontSize || 16) * 1.5}px` }}
                  >
                    {data.cardNumber.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()}
                  </p>
                </div>
              )}

              {/* Bottom section */}
              <div className="flex items-end justify-between">
                <div>
                  {data.phone && (
                    <div>
                      <p className="text-xs opacity-75 mb-1" style={{ fontSize: `${(data.fontSize || 16) * 0.75}px` }}>
                        Телефон
                      </p>
                      <p className="font-semibold" style={{ fontSize: `${(data.fontSize || 16) * 0.875}px` }}>
                        {data.phone}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Card type icon */}
                <div className="text-3xl opacity-60">💝</div>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full" />
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-white opacity-10 rounded-full" />
          </div>
        </div>
      ) : null;

    case 'tables':
      const getTableColor = (role) => {
        switch(role) {
          case 'Близкий друг': return { border: '#3b82f6', bg: '#dbeafe', text: '#1e40af' };
          case 'Родственник': return { border: '#10b981', bg: '#d1fae5', text: '#065f46' };
          case 'Жиен': return { border: '#f59e0b', bg: '#fef3c7', text: '#92400e' };
          case 'Көрші': return { border: '#8b5cf6', bg: '#ede9fe', text: '#5b21b6' };
          default: return { border: '#6b7280', bg: '#f3f4f6', text: '#374151' };
        }
      };
      
      const getTableSize = (totalTables) => {
        // Уменьшены размеры столов
        if (totalTables <= 4) {
          return { size: 110, fontSize: 14, smallFontSize: 11 };
        } else if (totalTables <= 6) {
          return { size: 95, fontSize: 13, smallFontSize: 10 };
        } else if (totalTables <= 9) {
          return { size: 80, fontSize: 12, smallFontSize: 9 };
        } else if (totalTables <= 12) {
          return { size: 70, fontSize: 11, smallFontSize: 8 };
        } else if (totalTables <= 16) {
          return { size: 65, fontSize: 10, smallFontSize: 8 };
        } else {
          return { size: 55, fontSize: 9, smallFontSize: 7 };
        }
      };
      
      // Вычисление оптимальной ширины canvas для превью
      const calculateCanvasWidth = (tablesPerRow, tableSize) => {
        const gap = 20;
        const padding = 30;
        const width = (tableSize.size * tablesPerRow) + (gap * (tablesPerRow - 1)) + (padding * 2);
        return Math.max(width, 600);
      };
      
      const calculateCanvasHeight = (rows, tableSize) => {
        const gap = 20;
        const padding = 30;
        const height = (tableSize.size * rows) + (gap * (rows - 1)) + (padding * 2);
        return Math.max(height, 400);
      };
      
      return data.tables && data.tables.length > 0 ? (
        <div 
          className="p-6 rounded-lg"
          style={{ 
            backgroundColor: data.bgColor || '#ffffff',
            fontSize: `${data.fontSize || 16}px`,
            color: data.color || '#1f2937'
          }}
        >
          <h3 className="text-xl font-bold mb-6 text-gray-900">Рассадка гостей</h3>
          
          {/* Restaurant floor plan using CSS Grid */}
          <div>
            <div 
              className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border-2 border-amber-200 shadow-lg"
              style={{ 
                width: '100%',
                minHeight: data.orientation === 'vertical' 
                  ? `${calculateCanvasHeight(data.rows || 2, getTableSize((data.rows || 2) * (data.tablesPerRow || 3)))}px` 
                  : `${calculateCanvasHeight(data.rows || 2, getTableSize((data.rows || 2) * (data.tablesPerRow || 3)))}px`,
                display: 'grid',
                gridTemplateColumns: `repeat(${data.tablesPerRow || 3}, 1fr)`,
                gridTemplateRows: `repeat(${data.rows || 2}, 1fr)`,
                gap: '20px',
                padding: '30px',
                backgroundImage: `
                  linear-gradient(to right, rgba(251, 191, 36, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(251, 191, 36, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            >
            {data.tables.map((table, index) => {
              const colors = getTableColor(table.role);
              const rows = data.rows || 2;
              const tablesPerRow = data.tablesPerRow || 3;
              const totalTables = rows * tablesPerRow;
              const tableSize = getTableSize(totalTables);
              
              return (
                <div
                  key={table.id || index}
                  className="flex items-center justify-center"
                  style={{
                    gridRow: table.row !== undefined ? table.row + 1 : Math.floor(index / tablesPerRow) + 1,
                    gridColumn: table.col !== undefined ? table.col + 1 : (index % tablesPerRow) + 1
                  }}
                >
                  <div className="relative group">
                    {/* Table visualization */}
                    <div 
                      className="rounded-full border-4 shadow-xl flex flex-col items-center justify-center transition-all hover:scale-110"
                      style={{
                        width: `${tableSize.size}px`,
                        height: `${tableSize.size}px`,
                        borderColor: colors.border,
                        backgroundColor: colors.bg
                      }}
                    >
                      <div className="text-center px-2">
                        <div 
                          className="font-bold"
                          style={{ 
                            color: colors.text,
                            fontSize: `${tableSize.fontSize}px`,
                            lineHeight: '1.2'
                          }}
                        >
                          {table.name}
                        </div>
                        <div 
                          className="mt-1 font-semibold"
                          style={{ 
                            color: colors.text, 
                            opacity: 0.8,
                            fontSize: `${tableSize.smallFontSize}px`,
                            lineHeight: '1.2'
                          }}
                        >
                          {table.seats} мест
                        </div>
                        <div 
                          className="mt-0.5"
                          style={{ 
                            color: colors.text, 
                            opacity: 0.7,
                            fontSize: `${Math.max(7, tableSize.smallFontSize * 0.9)}px`,
                            lineHeight: '1.2'
                          }}
                        >
                          {table.role}
                        </div>
                      </div>
                    </div>
                    
                    {/* Table legs */}
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                      <div 
                        className="rounded-full shadow-md"
                        style={{ 
                          backgroundColor: colors.border, 
                          opacity: 0.6,
                          width: `${Math.max(8, tableSize.size * 0.08)}px`,
                          height: `${Math.max(8, tableSize.size * 0.08)}px`
                        }}
                      />
                      <div 
                        className="rounded-full shadow-md"
                        style={{ 
                          backgroundColor: colors.border, 
                          opacity: 0.6,
                          width: `${Math.max(8, tableSize.size * 0.08)}px`,
                          height: `${Math.max(8, tableSize.size * 0.08)}px`
                        }}
                      />
                    </div>
                    
                    {/* Table number badge */}
                    <div 
                      className="absolute -top-2 -right-2 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
                      style={{ 
                        backgroundColor: colors.border,
                        width: `${Math.max(20, tableSize.size * 0.2)}px`,
                        height: `${Math.max(20, tableSize.size * 0.2)}px`,
                        fontSize: `${Math.max(10, tableSize.size * 0.12)}px`
                      }}
                    >
                      {index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Legend - перемещена вниз */}
          <div className="mt-4 flex justify-end">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-2">Легенда:</p>
              <div className="space-y-1 text-xs">
                {['Близкий друг', 'Родственник', 'Жиен', 'Көрші', 'Гость'].map(role => {
                  const colors = getTableColor(role);
                  return (
                    <div key={role} className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border-2"
                        style={{ borderColor: colors.border, backgroundColor: colors.bg }}
                      />
                      <span className="text-gray-600">{role}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          </div>
        </div>
      ) : null;

    default:
      return null;
  }
}

export default PreviewPanel;
