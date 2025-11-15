import { useState } from 'react';

const guestRoles = ['Гость', 'Близкий друг', 'Родственник', 'Коллега', 'Жиен', 'Көрші'];

const TablesBlock = ({ data, onChange }) => {
  const [tables, setTables] = useState(data.tables || []);

  const addTable = () => {
    const newTables = [...tables, { 
      id: Date.now(), 
      name: `Стол ${tables.length + 1}`, 
      seats: 10,
      role: 'Гость'
    }];
    setTables(newTables);
    onChange({ tables: newTables });
  };

  const updateTable = (id, field, value) => {
    const newTables = tables.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    );
    setTables(newTables);
    onChange({ tables: newTables });
  };

  const removeTable = (id) => {
    const newTables = tables.filter(t => t.id !== id);
    setTables(newTables);
    onChange({ tables: newTables });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Укажите количество столов и распределите места
      </p>

      {tables.map((table) => (
        <div key={table.id} className="card bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">Название</label>
              <input
                type="text"
                value={table.name || ''}
                onChange={(e) => updateTable(table.id, 'name', e.target.value)}
                className="input"
                placeholder="Стол 1"
              />
            </div>

            <div>
              <label className="label">Количество мест</label>
              <input
                type="number"
                value={table.seats || 10}
                onChange={(e) => updateTable(table.id, 'seats', parseInt(e.target.value))}
                className="input"
                min="1"
                max="50"
              />
            </div>

            <div>
              <label className="label">Для кого</label>
              <select
                value={table.role || 'Гость'}
                onChange={(e) => updateTable(table.id, 'role', e.target.value)}
                className="input"
              >
                {guestRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => removeTable(table.id)}
            className="mt-4 text-red-500 hover:text-red-700 text-sm"
          >
            Удалить стол
          </button>
        </div>
      ))}

      <button onClick={addTable} className="btn-secondary w-full">
        + Добавить стол
      </button>

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

export default TablesBlock;
