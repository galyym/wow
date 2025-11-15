const DateBlock = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Дата</label>
          <input
            type="date"
            value={data.date || ''}
            onChange={(e) => onChange({ date: e.target.value })}
            className="input"
          />
        </div>

        <div>
          <label className="label">Время</label>
          <input
            type="time"
            value={data.time || ''}
            onChange={(e) => onChange({ time: e.target.value })}
            className="input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="label">Размер шрифта</label>
          <input
            type="number"
            value={data.fontSize || 24}
            onChange={(e) => onChange({ fontSize: parseInt(e.target.value) })}
            className="input"
            min="16"
            max="48"
          />
        </div>

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

export default DateBlock;
