const RestaurantBlock = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="label">Название ресторана</label>
        <input
          type="text"
          value={data.name || ''}
          onChange={(e) => onChange({ name: e.target.value })}
          className="input"
          placeholder="Название ресторана"
        />
      </div>

      <div>
        <label className="label">Адрес</label>
        <textarea
          value={data.address || ''}
          onChange={(e) => onChange({ address: e.target.value })}
          className="input"
          rows="2"
          placeholder="Адрес ресторана"
        />
      </div>

      <div>
        <label className="label">Ссылка на карту (Яндекс.Карты или Google Maps)</label>
        <input
          type="url"
          value={data.mapUrl || ''}
          onChange={(e) => onChange({ mapUrl: e.target.value })}
          className="input"
          placeholder="https://yandex.kz/maps/..."
        />
        <p className="text-xs text-gray-500 mt-1">
          Вставьте ссылку для построения маршрута
        </p>
      </div>
    </div>
  );
};

export default RestaurantBlock;
