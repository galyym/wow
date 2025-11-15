const patterns = [
  { id: 'none', name: 'Без узора' },
  { id: 'floral', name: 'Цветочный' },
  { id: 'geometric', name: 'Геометрический' },
  { id: 'dots', name: 'Точки' },
  { id: 'waves', name: 'Волны' }
];

const animations = [
  { id: 'none', name: 'Без анимации' },
  { id: 'parallax', name: 'Параллакс' },
  { id: 'float', name: 'Плавное движение' }
];

const BackgroundBlock = ({ data, onChange }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5 МБ');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ type: 'image', value: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Background Type */}
      <div>
        <label className="label">Тип фона</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onChange({ type: 'color' })}
            className={`p-4 border-2 rounded-lg transition-all ${
              data.type === 'color'
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🎨</div>
              <p className="text-sm font-medium">Цвет</p>
            </div>
          </button>

          <button
            onClick={() => onChange({ type: 'image' })}
            className={`p-4 border-2 rounded-lg transition-all ${
              data.type === 'image'
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🖼️</div>
              <p className="text-sm font-medium">Изображение</p>
            </div>
          </button>
        </div>
      </div>

      {/* Background Value */}
      {data.type === 'color' ? (
        <div>
          <label className="label">Цвет фона</label>
          <input
            type="color"
            value={data.value || '#ffffff'}
            onChange={(e) => onChange({ value: e.target.value })}
            className="input h-16"
          />
        </div>
      ) : (
        <div>
          <label className="label">Фоновое изображение</label>
          {data.value && data.type === 'image' ? (
            <div className="relative">
              <img src={data.value} alt="Background" className="w-full h-48 object-cover rounded-lg" />
              <button
                onClick={() => onChange({ value: null })}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
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

      {/* Blur Effect */}
      <div>
        <label className="label">Размытие фона: {data.blur || 0}px</label>
        <input
          type="range"
          min="0"
          max="20"
          value={data.blur || 0}
          onChange={(e) => onChange({ blur: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Pattern */}
      <div>
        <label className="label">Фоновый узор</label>
        <select
          value={data.pattern || 'none'}
          onChange={(e) => onChange({ pattern: e.target.value })}
          className="input"
        >
          {patterns.map(pattern => (
            <option key={pattern.id} value={pattern.id}>{pattern.name}</option>
          ))}
        </select>
      </div>

      {data.pattern && data.pattern !== 'none' && (
        <div>
          <label className="label">Прозрачность узора: {Math.round((data.patternOpacity || 0.2) * 100)}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={(data.patternOpacity || 0.2) * 100}
            onChange={(e) => onChange({ patternOpacity: e.target.value / 100 })}
            className="w-full"
          />
        </div>
      )}

      {/* Animation */}
      <div>
        <label className="label">Анимация фона</label>
        <select
          value={data.animation || 'none'}
          onChange={(e) => onChange({ animation: e.target.value })}
          className="input"
        >
          {animations.map(anim => (
            <option key={anim.id} value={anim.id}>{anim.name}</option>
          ))}
        </select>
      </div>

      {/* Color Palette */}
      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-900 mb-3">Цветовая палитра</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Основной цвет</label>
            <input
              type="color"
              value={data.palette?.primary || '#D4AF37'}
              onChange={(e) => onChange({ 
                palette: { ...data.palette, primary: e.target.value } 
              })}
              className="input h-12"
            />
          </div>

          <div>
            <label className="label">Второстепенный</label>
            <input
              type="color"
              value={data.palette?.secondary || '#ffffff'}
              onChange={(e) => onChange({ 
                palette: { ...data.palette, secondary: e.target.value } 
              })}
              className="input h-12"
            />
          </div>

          <div>
            <label className="label">Акцентный</label>
            <input
              type="color"
              value={data.palette?.accent || '#C8102E'}
              onChange={(e) => onChange({ 
                palette: { ...data.palette, accent: e.target.value } 
              })}
              className="input h-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundBlock;
