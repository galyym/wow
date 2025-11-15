const banks = ['Kaspi Bank', 'Halyk Bank', 'Forte Bank', 'Jusan Bank'];

const GiftBlock = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Укажите реквизиты для подарков
      </p>

      <div>
        <label className="label">Банк</label>
        <select
          value={data.bank || 'Kaspi Bank'}
          onChange={(e) => onChange({ bank: e.target.value })}
          className="input"
        >
          {banks.map(bank => (
            <option key={bank} value={bank}>{bank}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Номер карты</label>
        <input
          type="text"
          value={data.cardNumber || ''}
          onChange={(e) => onChange({ cardNumber: e.target.value })}
          className="input"
          placeholder="1234 5678 9012 3456"
        />
      </div>

      <div>
        <label className="label">Номер телефона для перевода</label>
        <input
          type="tel"
          value={data.phone || ''}
          onChange={(e) => onChange({ phone: e.target.value })}
          className="input"
          placeholder="+7 (777) 123-45-67"
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
            max="24"
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

export default GiftBlock;
