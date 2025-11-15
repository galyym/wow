const fonts = [
  'Inter',
  'Playfair Display',
  'Montserrat',
  'Roboto',
  'Lora',
  'Open Sans',
  'Cormorant Garamond',
  'Crimson Text'
];

const NamesBlock = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="label">Имена молодожёнов</label>
        <textarea
          value={data.text || ''}
          onChange={(e) => onChange({ text: e.target.value })}
          className="input"
          rows="2"
          placeholder="Қазақ & Қазақ"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Шрифт</label>
          <select
            value={data.font || 'Playfair Display'}
            onChange={(e) => onChange({ font: e.target.value })}
            className="input"
          >
            {fonts.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Размер шрифта</label>
          <input
            type="number"
            value={data.fontSize || 32}
            onChange={(e) => onChange({ fontSize: parseInt(e.target.value) })}
            className="input"
            min="16"
            max="72"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Цвет текста</label>
          <input
            type="color"
            value={data.color || '#1f2937'}
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

export default NamesBlock;
