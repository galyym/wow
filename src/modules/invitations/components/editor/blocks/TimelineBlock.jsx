import { useState } from 'react';

const TimelineBlock = ({ data, onChange }) => {
  const [events, setEvents] = useState(data.events || []);

  const addEvent = () => {
    const newEvents = [...events, { 
      id: Date.now(), 
      date: '', 
      title: '', 
      description: '', 
      photo: null,
      side: 'left' // left = жених, right = невеста
    }];
    setEvents(newEvents);
    onChange({ events: newEvents });
  };

  const updateEvent = (id, field, value) => {
    const newEvents = events.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    );
    setEvents(newEvents);
    onChange({ events: newEvents });
  };

  const removeEvent = (id) => {
    const newEvents = events.filter(e => e.id !== id);
    setEvents(newEvents);
    onChange({ events: newEvents });
  };

  const handlePhotoUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5 МБ');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        updateEvent(id, 'photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Добавьте важные события из вашей истории
      </p>

      {events.map((event) => (
        <div key={event.id} className="card bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Дата</label>
              <input
                type="text"
                value={event.date || ''}
                onChange={(e) => updateEvent(event.id, 'date', e.target.value)}
                className="input"
                placeholder="2020 год"
              />
            </div>

            <div>
              <label className="label">Сторона</label>
              <select
                value={event.side || 'left'}
                onChange={(e) => updateEvent(event.id, 'side', e.target.value)}
                className="input"
              >
                <option value="left">Жених (слева)</option>
                <option value="right">Невеста (справа)</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="label">Заголовок</label>
            <input
              type="text"
              value={event.title || ''}
              onChange={(e) => updateEvent(event.id, 'title', e.target.value)}
              className="input"
              placeholder="Первая встреча"
            />
          </div>

          <div className="mt-4">
            <label className="label">Описание</label>
            <textarea
              value={event.description || ''}
              onChange={(e) => updateEvent(event.id, 'description', e.target.value)}
              className="input"
              rows="2"
              placeholder="История события..."
            />
          </div>

          <div className="mt-4">
            <label className="label">Фото</label>
            {event.photo ? (
              <div className="relative">
                <img src={event.photo} alt="Event" className="w-32 h-32 object-cover rounded-lg" />
                <button
                  onClick={() => updateEvent(event.id, 'photo', null)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(event.id, e)}
                />
              </label>
            )}
          </div>

          <button
            onClick={() => removeEvent(event.id)}
            className="mt-4 text-red-500 hover:text-red-700 text-sm"
          >
            Удалить событие
          </button>
        </div>
      ))}

      <button onClick={addEvent} className="btn-secondary w-full">
        + Добавить событие
      </button>
    </div>
  );
};

export default TimelineBlock;
