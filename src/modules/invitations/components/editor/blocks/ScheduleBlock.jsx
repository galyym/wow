import { useState } from 'react';

const ScheduleBlock = ({ data, onChange }) => {
  const [events, setEvents] = useState(data.events || []);

  const addEvent = () => {
    const newEvents = [...events, { id: Date.now(), time: '18:00', event: '' }];
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

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Добавьте расписание мероприятий
      </p>

      {events.map((event, index) => (
        <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex-shrink-0">
            <input
              type="time"
              value={event.time || ''}
              onChange={(e) => updateEvent(event.id, 'time', e.target.value)}
              className="input text-sm"
            />
          </div>
          <input
            type="text"
            value={event.event || ''}
            onChange={(e) => updateEvent(event.id, 'event', e.target.value)}
            className="input flex-1"
            placeholder="Название события"
          />
          <button
            onClick={() => removeEvent(event.id)}
            className="text-red-500 hover:text-red-700 flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}

      <button onClick={addEvent} className="btn-secondary w-full">
        + Добавить событие
      </button>
    </div>
  );
};

export default ScheduleBlock;
