import { useState, useEffect } from 'react';

const guestRoles = ['Гость', 'Близкий друг', 'Родственник', 'Коллега', 'Жиен', 'Көрші'];

const TablesBlock = ({ data, onChange }) => {
  const [rows, setRows] = useState(data.rows || 2);
  const [tablesPerRow, setTablesPerRow] = useState(data.tablesPerRow || 3);
  const [tables, setTables] = useState(data.tables || []);
  const [selectedTable, setSelectedTable] = useState(null);
  const [orientation, setOrientation] = useState(data.orientation || 'horizontal');

  // Создание дефолтной схемы при первом запуске
  useEffect(() => {
    if (tables.length === 0 && rows > 0 && tablesPerRow > 0) {
      generateDefaultLayout();
    }
  }, []);

  const generateDefaultLayout = () => {
    const newTables = [];
    let tableIndex = 1;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < tablesPerRow; col++) {
        newTables.push({
          id: Date.now() + tableIndex,
          name: `Стол ${tableIndex}`,
          seats: 10,
          role: 'Гость',
          row: row,
          col: col
        });
        tableIndex++;
      }
    }
    
    setTables(newTables);
    onChange({ tables: newTables, rows, tablesPerRow, orientation });
  };

  const updateTable = (id, field, value) => {
    const newTables = tables.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    );
    setTables(newTables);
    onChange({ tables: newTables, rows, tablesPerRow, orientation });
  };

  const removeTable = (id) => {
    const newTables = tables.filter(t => t.id !== id);
    setTables(newTables);
    onChange({ tables: newTables, rows, tablesPerRow, orientation });
  };

  const getTableColor = (role) => {
    switch(role) {
      case 'Близкий друг': return { border: '#3b82f6', bg: '#dbeafe', text: '#1e40af' };
      case 'Родственник': return { border: '#10b981', bg: '#d1fae5', text: '#065f46' };
      case 'Жиен': return { border: '#f59e0b', bg: '#fef3c7', text: '#92400e' };
      case 'Көрші': return { border: '#8b5cf6', bg: '#ede9fe', text: '#5b21b6' };
      default: return { border: '#6b7280', bg: '#f3f4f6', text: '#374151' };
    }
  };

  // Вычисление размера стола на основе количества столов
  const getTableSize = () => {
    const totalTables = rows * tablesPerRow;
    
    // При малом количестве - крупнее, при большом - мельче (уменьшены размеры)
    if (totalTables <= 4) {
      return { size: 110, fontSize: 14, smallFontSize: 11 };
    } else if (totalTables <= 6) {
      return { size: 95, fontSize: 13, smallFontSize: 10 };
    } else if (totalTables <= 9) {
      return { size: 80, fontSize: 12, smallFontSize: 9 };
    } else if (totalTables <= 12) {
      return { size: 70, fontSize: 11, smallFontSize: 8 };
    } else if (totalTables <= 16) {
      return { size: 65, fontSize: 10, smallFontSize: 8 };
    } else {
      return { size: 55, fontSize: 9, smallFontSize: 7 };
    }
  };

  const handleRowsChange = (newRows) => {
    const newRowsValue = Math.max(1, Math.min(10, parseInt(newRows) || 1));
    setRows(newRowsValue);
    
    setTimeout(() => {
      const currentTables = tables.length > 0 ? tables : [];
      const totalTables = newRowsValue * tablesPerRow;
      let newTables = [...currentTables];
      
      if (totalTables > currentTables.length) {
        for (let i = currentTables.length; i < totalTables; i++) {
          const row = Math.floor(i / tablesPerRow);
          const col = i % tablesPerRow;
          newTables.push({
            id: Date.now() + i,
            name: `Стол ${i + 1}`,
            seats: 10,
            role: 'Гость',
            row: row,
            col: col
          });
        }
      } else if (totalTables < currentTables.length) {
        newTables = newTables.slice(0, totalTables);
      }
      
      newTables = newTables.map((table, index) => ({
        ...table,
        row: Math.floor(index / tablesPerRow),
        col: index % tablesPerRow
      }));
      
      setTables(newTables);
      onChange({ tables: newTables, rows: newRowsValue, tablesPerRow, orientation });
    }, 0);
  };

  const handleTablesPerRowChange = (newTablesPerRow) => {
    const newTablesPerRowValue = Math.max(1, Math.min(10, parseInt(newTablesPerRow) || 1));
    setTablesPerRow(newTablesPerRowValue);
    
    setTimeout(() => {
      const currentTables = tables.length > 0 ? tables : [];
      const totalTables = rows * newTablesPerRowValue;
      let newTables = [...currentTables];
      
      if (totalTables > currentTables.length) {
        for (let i = currentTables.length; i < totalTables; i++) {
          const row = Math.floor(i / newTablesPerRowValue);
          const col = i % newTablesPerRowValue;
          newTables.push({
            id: Date.now() + i,
            name: `Стол ${i + 1}`,
            seats: 10,
            role: 'Гость',
            row: row,
            col: col
          });
        }
      } else if (totalTables < currentTables.length) {
        newTables = newTables.slice(0, totalTables);
      }
      
      newTables = newTables.map((table, index) => ({
        ...table,
        row: Math.floor(index / newTablesPerRowValue),
        col: index % newTablesPerRowValue
      }));
      
      setTables(newTables);
      onChange({ tables: newTables, rows, tablesPerRow: newTablesPerRowValue, orientation });
    }, 0);
  };

  const tableSize = getTableSize();
  
  // Вычисление оптимальной ширины canvas на основе количества столов и их размера
  // Но ограничиваем максимальной шириной контейнера, чтобы избежать вертикальной прокрутки
  const calculateCanvasWidth = () => {
    const gap = 20;
    const padding = 30;
    // Ширина = (размер стола * количество в ряду) + (промежутки между столами) + (отступы)
    const calculatedWidth = (tableSize.size * tablesPerRow) + (gap * (tablesPerRow - 1)) + (padding * 2);
    // Минимальная ширина для удобства просмотра, но не больше 100% контейнера
    return Math.max(calculatedWidth, 600);
  };
  
  const calculateCanvasHeight = () => {
    const gap = 20;
    const padding = 30;
    // Высота = (размер стола * количество рядов) + (промежутки между рядами) + (отступы)
    const height = (tableSize.size * rows) + (gap * (rows - 1)) + (padding * 2);
    // Минимальная высота для удобства просмотра
    return Math.max(height, 400);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Настройте схему рассадки: выберите количество рядов и столов в каждом ряду.
      </p>

      {/* Layout controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="label">Количество рядов</label>
          <input
            type="number"
            value={rows}
            onChange={(e) => handleRowsChange(e.target.value)}
            className="input"
            min="1"
            max="10"
          />
        </div>

        <div>
          <label className="label">Столов в ряду</label>
          <input
            type="number"
            value={tablesPerRow}
            onChange={(e) => handleTablesPerRowChange(e.target.value)}
            className="input"
            min="1"
            max="10"
          />
        </div>

        <div>
          <label className="label">Ориентация схемы</label>
          <select
            value={orientation}
            onChange={(e) => {
              setOrientation(e.target.value);
              onChange({ tables, rows, tablesPerRow, orientation: e.target.value });
            }}
            className="input"
          >
            <option value="horizontal">Горизонтальная</option>
            <option value="vertical">Вертикальная</option>
          </select>
        </div>
      </div>

      {/* Canvas for table layout using CSS Grid */}
      <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
        <div
          className="relative bg-white rounded-lg overflow-visible"
          style={{ 
            width: '100%',
            height: orientation === 'horizontal' ? `${calculateCanvasHeight()}px` : '600px',
            minHeight: orientation === 'horizontal' ? `${calculateCanvasHeight()}px` : '600px',
            display: 'grid',
            gridTemplateColumns: `repeat(${tablesPerRow}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: '20px',
            padding: '30px',
            backgroundImage: `
              linear-gradient(to right, #e5e7eb 1px, transparent 1px),
              linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        >
          {tables.map((table) => {
            const colors = getTableColor(table.role);
            
            return (
              <div
                key={table.id}
                className={`flex items-center justify-center cursor-pointer transition-all ${
                  selectedTable === table.id ? 'z-50 scale-110 ring-4 ring-primary-500 rounded-lg' : 'z-10 hover:scale-105'
                }`}
                onClick={() => setSelectedTable(table.id)}
                style={{
                  gridRow: table.row + 1,
                  gridColumn: table.col + 1
                }}
              >
                {/* Table visualization */}
                <div className="relative">
                  {/* Table top (circle) */}
                  <div 
                    className="rounded-full border-4 shadow-lg flex items-center justify-center"
                    style={{
                      width: `${tableSize.size}px`,
                      height: `${tableSize.size}px`,
                      borderColor: colors.border,
                      backgroundColor: colors.bg
                    }}
                  >
                    <div className="text-center px-2">
                      <div 
                        className="font-bold" 
                        style={{ 
                          color: colors.text,
                          fontSize: `${tableSize.fontSize}px`,
                          lineHeight: '1.2'
                        }}
                      >
                        {table.name}
                      </div>
                      <div 
                        className="mt-0.5" 
                        style={{ 
                          color: colors.text, 
                          opacity: 0.8,
                          fontSize: `${tableSize.smallFontSize}px`,
                          lineHeight: '1.2'
                        }}
                      >
                        {table.seats} мест
                      </div>
                    </div>
                  </div>
                  
                  {/* Table legs (decorative) */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                    <div 
                      className="bg-gray-400 rounded-full" 
                      style={{ 
                        width: `${Math.max(6, tableSize.size * 0.08)}px`, 
                        height: `${Math.max(6, tableSize.size * 0.08)}px` 
                      }} 
                    />
                    <div 
                      className="bg-gray-400 rounded-full" 
                      style={{ 
                        width: `${Math.max(6, tableSize.size * 0.08)}px`, 
                        height: `${Math.max(6, tableSize.size * 0.08)}px` 
                      }} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
          
          {tables.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 col-span-full row-span-full">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p>Настройте количество рядов и столов</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table editor */}
      {selectedTable && (
        <div className="card bg-primary-50 border-2 border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-lg text-gray-900">
              Редактирование: {tables.find(t => t.id === selectedTable)?.name}
            </h4>
            <button
              onClick={() => setSelectedTable(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">Название</label>
              <input
                type="text"
                value={tables.find(t => t.id === selectedTable)?.name || ''}
                onChange={(e) => updateTable(selectedTable, 'name', e.target.value)}
                className="input"
                placeholder="Стол 1"
              />
            </div>

            <div>
              <label className="label">Количество мест</label>
              <input
                type="number"
                value={tables.find(t => t.id === selectedTable)?.seats || 10}
                onChange={(e) => updateTable(selectedTable, 'seats', parseInt(e.target.value))}
                className="input"
                min="1"
                max="50"
              />
            </div>

            <div>
              <label className="label">Для кого</label>
              <select
                value={tables.find(t => t.id === selectedTable)?.role || 'Гость'}
                onChange={(e) => updateTable(selectedTable, 'role', e.target.value)}
                className="input"
              >
                {guestRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              removeTable(selectedTable);
              setSelectedTable(null);
            }}
            className="mt-4 text-red-500 hover:text-red-700 text-sm"
          >
            Удалить этот стол
          </button>
        </div>
      )}

      {!selectedTable && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            💡 <strong>Подсказка:</strong> Нажмите на стол в схеме, чтобы отредактировать его параметры
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="label">Размер шрифта</label>
          <input
            type="number"
            value={data.fontSize || 16}
            onChange={(e) => onChange({ fontSize: parseInt(e.target.value), tables, rows, tablesPerRow, orientation })}
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
            onChange={(e) => onChange({ color: e.target.value, tables, rows, tablesPerRow, orientation })}
            className="input h-12"
          />
        </div>

        <div>
          <label className="label">Цвет фона</label>
          <input
            type="color"
            value={data.bgColor || '#ffffff'}
            onChange={(e) => onChange({ bgColor: e.target.value, tables, rows, tablesPerRow, orientation })}
            className="input h-12"
          />
        </div>
      </div>
    </div>
  );
};

export default TablesBlock;
