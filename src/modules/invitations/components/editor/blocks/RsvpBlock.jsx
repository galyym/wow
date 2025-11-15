const RsvpBlock = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="card bg-blue-50 border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Форма отклика гостей</strong> будет автоматически отображаться в приглашении.
          Гости смогут оставить свои данные: имя, WhatsApp, роль и ответ (приду/не приду).
        </p>
      </div>

      <div className="text-sm text-gray-600">
        <p className="font-medium mb-2">Поля формы:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Имя гостя</li>
          <li>WhatsApp</li>
          <li>Приду / Не приду</li>
          <li>Роль: Гость, Близкий друг, Родственник, Коллега, Жиен, Көрші</li>
          <li>Комментарий / Пожелания</li>
        </ul>
      </div>
    </div>
  );
};

export default RsvpBlock;
