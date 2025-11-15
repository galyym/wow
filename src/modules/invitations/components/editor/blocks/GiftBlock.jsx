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
          onChange={(e) => {
            // Удаляем все нецифровые символы и ограничиваем до 16 цифр
            const value = e.target.value.replace(/\D/g, '').slice(0, 16);
            onChange({ cardNumber: value });
          }}
          className="input font-mono"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
        <p className="text-xs text-gray-500 mt-1">Введите 16 цифр номера карты</p>
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

      <div>
        <label className="label">Стиль карты</label>
        <select
          value={data.cardStyle || 'gradient'}
          onChange={(e) => {
            const style = e.target.value;
            let bgColor = '#ffffff';
            let color = '#1f2937';
            
            if (style === 'gradient') {
              bgColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
              color = '#ffffff';
            } else if (style === 'gold') {
              bgColor = 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)';
              color = '#1f2937';
            } else if (style === 'blue') {
              bgColor = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
              color = '#ffffff';
            } else if (style === 'pink') {
              bgColor = 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
              color = '#ffffff';
            } else if (style === 'green') {
              bgColor = 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)';
              color = '#ffffff';
            } else {
              bgColor = data.bgColor || '#ffffff';
              color = data.color || '#1f2937';
            }
            
            onChange({ cardStyle: style, bgColor, color });
          }}
          className="input"
        >
          <option value="gradient">Фиолетовый градиент (по умолчанию)</option>
          <option value="gold">Золотой градиент</option>
          <option value="blue">Синий градиент</option>
          <option value="pink">Розовый градиент</option>
          <option value="green">Зеленый градиент</option>
          <option value="custom">Кастомный цвет</option>
        </select>
      </div>

      {data.cardStyle === 'custom' && (
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
      )}

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
    </div>
  );
};

export default GiftBlock;
