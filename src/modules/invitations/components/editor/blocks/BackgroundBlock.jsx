import { useState } from 'react';

// Готовые смарт-фоны с полной композицией
const smartBackgrounds = [
  {
    id: 'gradient-chic',
    name: 'Gradient Chic',
    preview: '🌈',
    type: 'smart',
    style: {
      background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 25%, #f9a8d4 50%, #fde68a 75%, #fef3c7 100%)',
      pattern: 'dots',
      patternOpacity: 0.15,
      patternColor: '#ffffff',
      patternSize: 40,
      overlay: true,
      overlayColor: 'rgba(255,255,255,0.1)',
      blur: 0
    }
  },
  {
    id: 'floral-ivory',
    name: 'Floral Ivory',
    preview: '🌸',
    type: 'smart',
    style: {
      background: 'linear-gradient(180deg, #fef9f3 0%, #fef3e7 50%, #fdecd3 100%)',
      pattern: 'floral',
      patternOpacity: 0.2,
      patternColor: '#D4AF37',
      patternSize: 60,
      overlay: false,
      blur: 0
    }
  },
  {
    id: 'textured-gold',
    name: 'Textured Gold',
    preview: '✨',
    type: 'smart',
    style: {
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 30%, #fcd34d 60%, #fbbf24 100%)',
      pattern: 'geometric',
      patternOpacity: 0.25,
      patternColor: '#92400e',
      patternSize: 50,
      overlay: true,
      overlayColor: 'rgba(212,175,55,0.15)',
      blur: 0
    }
  },
  {
    id: 'soft-pattern',
    name: 'Soft Pattern',
    preview: '💫',
    type: 'smart',
    style: {
      background: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
      pattern: 'waves',
      patternOpacity: 0.2,
      patternColor: '#0ea5e9',
      patternSize: 45,
      overlay: false,
      blur: 0
    }
  },
  {
    id: 'kazakh-traditional',
    name: 'Kazakh Traditional',
    preview: '🇰🇿',
    type: 'smart',
    style: {
      background: 'linear-gradient(135deg, #003366 0%, #004080 50%, #0059b3 100%)',
      pattern: 'geometric',
      patternOpacity: 0.3,
      patternColor: '#D4AF37',
      patternSize: 55,
      overlay: true,
      overlayColor: 'rgba(212,175,55,0.1)',
      blur: 0
    }
  },
  {
    id: 'dark-royal',
    name: 'Dark Royal',
    preview: '👑',
    type: 'smart',
    style: {
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
      pattern: 'circles',
      patternOpacity: 0.2,
      patternColor: '#a78bfa',
      patternSize: 50,
      overlay: true,
      overlayColor: 'rgba(139,92,246,0.1)',
      blur: 0
    }
  },
  {
    id: 'minimalist-white',
    name: 'Minimalist White',
    preview: '⚪',
    type: 'smart',
    style: {
      background: '#ffffff',
      pattern: 'lines-vertical',
      patternOpacity: 0.08,
      patternColor: '#e5e7eb',
      patternSize: 30,
      overlay: false,
      blur: 0
    }
  },
  {
    id: 'pastel-dream',
    name: 'Pastel Dream',
    preview: '💜',
    type: 'smart',
    style: {
      background: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #e9d5ff 100%)',
      pattern: 'dots',
      patternOpacity: 0.12,
      patternColor: '#c084fc',
      patternSize: 35,
      overlay: false,
      blur: 0
    }
  }
];

// Цветовые пресеты
const colorPresets = [
  { id: 'ivory', name: 'Ivory', color: '#fef9f3', preview: '⬜' },
  { id: 'champagne', name: 'Champagne', color: '#fef3c7', preview: '🥂' },
  { id: 'soft-pink', name: 'Soft Pink', color: '#fce7f3', preview: '🌸' },
  { id: 'sand', name: 'Sand', color: '#fef3e7', preview: '🏖️' },
  { id: 'royal-blue', name: 'Royal Blue', color: '#1e40af', preview: '💙' },
  { id: 'deep-plum', name: 'Deep Plum', color: '#6b21a8', preview: '🍇' }
];

// Фильтры оттенка
const toneFilters = [
  { id: 'warm', name: 'Тёплый', icon: '🔥', filter: 'sepia(0.2) saturate(1.1)' },
  { id: 'neutral', name: 'Нейтральный', icon: '⚪', filter: 'none' },
  { id: 'cool', name: 'Холодный', icon: '❄️', filter: 'hue-rotate(180deg) saturate(0.9)' }
];

// Простые узоры
const simplePatterns = [
  { id: 'none', name: 'Без узора', icon: '🚫' },
  { id: 'dots', name: 'Точки', icon: '⚫' },
  { id: 'lines-vertical', name: 'Вертикальные линии', icon: '📏' },
  { id: 'lines-horizontal', name: 'Горизонтальные линии', icon: '📐' },
  { id: 'waves', name: 'Волны', icon: '🌊' }
];

// Расширенные узоры
const advancedPatterns = [
  { id: 'floral', name: 'Цветочный', icon: '🌺' },
  { id: 'geometric', name: 'Геометрический', icon: '🔷' },
  { id: 'grid', name: 'Сетка', icon: '🔲' },
  { id: 'circles', name: 'Круги', icon: '⭕' },
  { id: 'lines-diagonal', name: 'Диагональные линии', icon: '⚡' }
];

// Вспомогательная функция для получения стиля узора (для превью)
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

const BackgroundBlock = ({ data, onChange }) => {
  const [expandedSection, setExpandedSection] = useState('quick');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const currentData = {
    type: data?.type || 'smart',
    smartBackground: data?.smartBackground || null,
    color: data?.color || '#ffffff',
    image: data?.image || null,
    toneFilter: data?.toneFilter || 'neutral',
    brightness: data?.brightness ?? 100,
    blur: data?.blur || 0,
    pattern: data?.pattern || 'none',
    patternOpacity: data?.patternOpacity ?? 0.2,
    patternColor: data?.patternColor || '#000000',
    patternSize: data?.patternSize || 50,
    patternPosition: data?.patternPosition || 'full',
    overlay: data?.overlay || false,
    overlayColor: data?.overlayColor || 'rgba(0,0,0,0.1)',
    imageScale: data?.imageScale ?? 100,
    imagePosition: data?.imagePosition || { x: 50, y: 50 },
    ...data
  };

  const updateData = (updates) => {
    onChange({ ...currentData, ...updates });
  };

  const applySmartBackground = (smartBg) => {
    updateData({
      type: 'smart',
      smartBackground: smartBg.id,
      ...smartBg.style
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5 МБ');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData({ type: 'image', image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Определяем, какие опции показывать
  const showPatternOptions = currentData.type !== 'color' || currentData.pattern !== 'none';
  const showImageOptions = currentData.type === 'image';
  const showBlurOption = currentData.type === 'image' || currentData.type === 'smart';

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Выберите фон для вашего приглашения. Начните с готового стиля или создайте свой.
      </p>

      {/* Быстрый выбор: Готовые стили */}
      <div className="card">
        <button
          onClick={() => toggleSection('quick')}
          className="w-full flex items-center justify-between mb-3"
        >
          <h3 className="text-base font-semibold text-gray-900">🎨 Готовые стили</h3>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'quick' ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSection === 'quick' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {smartBackgrounds.map((bg) => (
              <button
                key={bg.id}
                onClick={() => applySmartBackground(bg)}
                className={`relative p-0 border-2 rounded-xl transition-all hover:scale-105 overflow-hidden ${
                  currentData.smartBackground === bg.id
                    ? 'border-primary-600 ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Визуальное превью фона */}
                <div 
                  className="w-full h-20 rounded-t-xl"
                  style={{ background: bg.style.background }}
                >
                  {/* Мини-превью узора */}
                  {bg.style.pattern && bg.style.pattern !== 'none' && (
                    <div 
                      className="w-full h-full opacity-30"
                      style={{
                        backgroundImage: getPatternStyle(bg.style.pattern, bg.style.patternColor || '#000000', bg.style.patternSize || 50),
                        backgroundSize: `${(bg.style.patternSize || 50) * 0.3}px ${(bg.style.patternSize || 50) * 0.3}px`
                      }}
                    />
                  )}
                </div>
                <div className="p-2 bg-white text-center">
                  <p className="text-xs font-medium text-gray-700">{bg.name}</p>
                </div>
                {currentData.smartBackground === bg.id && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Простые настройки */}
      <div className="card">
        <button
          onClick={() => toggleSection('simple')}
          className="w-full flex items-center justify-between mb-3"
        >
          <h3 className="text-base font-semibold text-gray-900">⚙️ Простые настройки</h3>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'simple' ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSection === 'simple' && (
          <div className="space-y-4">
            {/* Тип фона */}
            <div>
              <label className="label">Тип фона</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => updateData({ type: 'smart', smartBackground: null })}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    currentData.type === 'smart'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-xl mb-1">🎨</div>
                    <p className="text-xs">Стиль</p>
                  </div>
                </button>
                <button
                  onClick={() => updateData({ type: 'color' })}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    currentData.type === 'color'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-xl mb-1">🎨</div>
                    <p className="text-xs">Цвет</p>
                  </div>
                </button>
                <button
                  onClick={() => updateData({ type: 'image' })}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    currentData.type === 'image'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-xl mb-1">🖼️</div>
                    <p className="text-xs">Фото</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Цветовые пресеты (если выбран цвет) */}
            {currentData.type === 'color' && (
              <div>
                <label className="label">Цветовые пресеты</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => updateData({ color: preset.color })}
                      className={`relative p-0 border-2 rounded-lg transition-all hover:scale-105 overflow-hidden ${
                        currentData.color === preset.color
                          ? 'border-primary-600 ring-2 ring-primary-200'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: preset.color }}
                      title={preset.name}
                    >
                      <div className="w-full h-16 flex items-center justify-center">
                        <span className="text-2xl">{preset.preview}</span>
                      </div>
                      <div className="p-2 bg-white/90 text-center">
                        <p className="text-xs font-medium text-gray-700">{preset.name}</p>
                      </div>
                      {currentData.color === preset.color && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <label className="label">Или выберите свой цвет</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={currentData.color || '#ffffff'}
                      onChange={(e) => updateData({ color: e.target.value })}
                      className="input h-16 w-24 flex-shrink-0"
                    />
                    <div 
                      className="flex-1 h-16 rounded-lg border-2 border-gray-300"
                      style={{ backgroundColor: currentData.color || '#ffffff' }}
                    />
                    <input
                      type="text"
                      value={currentData.color || '#ffffff'}
                      onChange={(e) => updateData({ color: e.target.value })}
                      className="input flex-1"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Фильтр оттенка */}
            <div>
              <label className="label">Фильтр оттенка</label>
              <div className="grid grid-cols-3 gap-2">
                {toneFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => updateData({ toneFilter: filter.id })}
                    className={`relative p-0 border-2 rounded-lg transition-all overflow-hidden ${
                      currentData.toneFilter === filter.id
                        ? 'border-primary-600 ring-2 ring-primary-200'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {/* Мини-превью фильтра */}
                    <div 
                      className="w-full h-12"
                      style={{ 
                        background: currentData.type === 'color' 
                          ? currentData.color 
                          : 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
                        filter: filter.filter
                      }}
                    />
                    <div className="p-2 bg-white text-center">
                      <div className="text-lg mb-1">{filter.icon}</div>
                      <p className="text-xs font-medium text-gray-700">{filter.name}</p>
                    </div>
                    {currentData.toneFilter === filter.id && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Яркость */}
            <div>
              <label className="label">Яркость: {currentData.brightness || 100}%</label>
              <div className="flex gap-2 items-center">
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={currentData.brightness || 100}
                  onChange={(e) => updateData({ brightness: parseInt(e.target.value) })}
                  className="flex-1"
                />
                {/* Мини-превью яркости */}
                <div 
                  className="w-16 h-12 rounded-lg border-2 border-gray-300 flex-shrink-0"
                  style={{ 
                    backgroundColor: currentData.type === 'color' ? currentData.color : '#f0f0f0',
                    filter: `brightness(${currentData.brightness || 100}%)`
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Темнее</span>
                <span>Ярче</span>
              </div>
            </div>

            {/* Размытие (только для изображений и смарт-фонов) */}
            {showBlurOption && (
              <div>
                <label className="label">Размытие: {currentData.blur || 0}px</label>
                <div className="flex gap-2">
                  {[0, 5, 10].map((blur) => (
                    <button
                      key={blur}
                      onClick={() => updateData({ blur })}
                      className={`flex-1 p-2 border-2 rounded-lg transition-all ${
                        currentData.blur === blur
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <span className="text-xs">{blur === 0 ? 'Нет' : `${blur}px`}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Простые узоры */}
            <div>
              <label className="label">Минимальные узоры</label>
              <div className="grid grid-cols-5 gap-2">
                {simplePatterns.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => updateData({ pattern: pattern.id })}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      currentData.pattern === pattern.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    title={pattern.name}
                  >
                    <div className="text-center">
                      <div className="text-xl">{pattern.icon}</div>
                      <p className="text-xs mt-1 hidden sm:block">{pattern.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Расширенные настройки */}
      <div className="card">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between mb-3"
        >
          <h3 className="text-base font-semibold text-gray-900">🔧 Расширенные настройки</h3>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showAdvanced && (
          <div className="space-y-4">
            {/* Загрузка изображения */}
            {currentData.type === 'image' && (
              <div>
                <label className="label">Фоновое изображение</label>
                {currentData.image ? (
                  <div className="relative">
                    <img src={currentData.image} alt="Background" className="w-full h-48 object-cover rounded-lg" />
                    <button
                      onClick={() => updateData({ image: null })}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-500 mt-2">Загрузить изображение</p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            )}

            {/* Масштабирование изображения */}
            {showImageOptions && currentData.image && (
              <div>
                <label className="label">Масштаб: {currentData.imageScale || 100}%</label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={currentData.imageScale || 100}
                  onChange={(e) => updateData({ imageScale: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            )}

            {/* Расширенные узоры */}
            {showPatternOptions && (
              <>
                <div>
                  <label className="label">Расширенные узоры</label>
                  <div className="grid grid-cols-5 gap-2">
                    {advancedPatterns.map((pattern) => (
                      <button
                        key={pattern.id}
                        onClick={() => updateData({ pattern: pattern.id })}
                        className={`p-3 border-2 rounded-lg transition-all ${
                          currentData.pattern === pattern.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        title={pattern.name}
                      >
                        <div className="text-center">
                          <div className="text-xl">{pattern.icon}</div>
                          <p className="text-xs mt-1 hidden sm:block">{pattern.name}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {currentData.pattern && currentData.pattern !== 'none' && (
                  <>
                    <div>
                      <label className="label">Прозрачность узора: {Math.round((currentData.patternOpacity ?? 0.2) * 100)}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={(currentData.patternOpacity ?? 0.2) * 100}
                        onChange={(e) => updateData({ patternOpacity: e.target.value / 100 })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="label">Цвет узора</label>
                      <input
                        type="color"
                        value={currentData.patternColor || '#000000'}
                        onChange={(e) => updateData({ patternColor: e.target.value })}
                        className="input h-12 w-full"
                      />
                    </div>

                    <div>
                      <label className="label">Размер узора: {currentData.patternSize || 50}px</label>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={currentData.patternSize || 50}
                        onChange={(e) => updateData({ patternSize: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    {/* Позиционирование узора */}
                    <div>
                      <label className="label">Позиция узора</label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {[
                          { id: 'full', name: 'Везде', icon: '⬛' },
                          { id: 'left', name: 'Слева', icon: '⬅️' },
                          { id: 'right', name: 'Справа', icon: '➡️' },
                          { id: 'top', name: 'Сверху', icon: '⬆️' },
                          { id: 'bottom', name: 'Снизу', icon: '⬇️' },
                          { id: 'top-left', name: 'Верхний левый', icon: '↖️' },
                          { id: 'top-right', name: 'Верхний правый', icon: '↗️' },
                          { id: 'bottom-left', name: 'Нижний левый', icon: '↙️' },
                          { id: 'bottom-right', name: 'Нижний правый', icon: '↘️' },
                          { id: 'center', name: 'По центру', icon: '⭕' }
                        ].map((pos) => (
                          <button
                            key={pos.id}
                            onClick={() => updateData({ patternPosition: pos.id })}
                            className={`p-2 border-2 rounded-lg transition-all text-sm ${
                              currentData.patternPosition === pos.id
                                ? 'border-primary-600 bg-primary-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            title={pos.name}
                          >
                            <span className="text-lg">{pos.icon}</span>
                            <p className="text-xs mt-1">{pos.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Наложение */}
            <div className="flex items-center justify-between">
              <div>
                <label className="label mb-1">Цветное наложение</label>
                <p className="text-xs text-gray-500">Добавить цветной слой поверх фона</p>
              </div>
              <button
                onClick={() => updateData({ overlay: !currentData.overlay })}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  currentData.overlay ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    currentData.overlay ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {currentData.overlay && (
              <div>
                <label className="label">Цвет наложения</label>
                <input
                  type="color"
                  value={currentData.overlayColor || 'rgba(0,0,0,0.1)'}
                  onChange={(e) => updateData({ overlayColor: e.target.value })}
                  className="input h-12 w-full"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundBlock;
