const DescriptionBlock = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="label">Описание свадьбы и организаторы</label>
        <textarea
          value={data.text || ''}
          onChange={(e) => onChange({ text: e.target.value })}
          className="input"
          rows="4"
          placeholder="Напишите информацию о свадьбе..."
        />
      </div>

      <div>
        <label className="label">Выравнивание текста</label>
        <div className="flex gap-2 border border-gray-300 rounded-lg p-1 bg-gray-50">
          <button
            type="button"
            onClick={() => onChange({ textAlign: 'left' })}
            className={`flex-1 p-2 rounded transition-all ${
              (data.textAlign || 'left') === 'left'
                ? 'bg-white shadow-sm border border-gray-300'
                : 'hover:bg-gray-100'
            }`}
            title="Выровнять по левому краю"
          >
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h12M3 18h6" />
            </svg>
          </button>
          
          <button
            type="button"
            onClick={() => onChange({ textAlign: 'center' })}
            className={`flex-1 p-2 rounded transition-all ${
              (data.textAlign || 'left') === 'center'
                ? 'bg-white shadow-sm border border-gray-300'
                : 'hover:bg-gray-100'
            }`}
            title="Выровнять по центру"
          >
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M6 12h12M9 18h6" />
            </svg>
          </button>
          
          <button
            type="button"
            onClick={() => onChange({ textAlign: 'right' })}
            className={`flex-1 p-2 rounded transition-all ${
              (data.textAlign || 'left') === 'right'
                ? 'bg-white shadow-sm border border-gray-300'
                : 'hover:bg-gray-100'
            }`}
            title="Выровнять по правому краю"
          >
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M9 12h12M15 18h6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="label">Размер шрифта</label>
          <input
            type="number"
            value={data.fontSize || 16}
            onChange={(e) => onChange({ fontSize: parseInt(e.target.value) })}
            className="input"
            min="12"
            max="32"
          />
        </div>

        <div>
          <label className="label">Цвет текста</label>
          <input
            type="color"
            value={data.color || '#4b5563'}
            onChange={(e) => onChange({ color: e.target.value })}
            className="input h-12"
          />
        </div>

        <div>
          <label className="label">Цвет фона</label>
          <input
            type="color"
            value={data.bgColor || '#ffffff'}
            onChange={(e) => onChange({ bgColor: e.target.value })}
            className="input h-12"
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionBlock;
