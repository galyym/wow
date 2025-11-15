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
