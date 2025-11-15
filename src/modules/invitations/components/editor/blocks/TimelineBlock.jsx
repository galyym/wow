import { useState, useRef, useEffect } from 'react';

const TimelineBlock = ({ data, onChange }) => {
  const [events, setEvents] = useState(data.events || []);
  const [editingPhoto, setEditingPhoto] = useState(null); // { eventId, photo }
  const [cropData, setCropData] = useState({ x: 0.5, y: 0.5, radius: 0.3 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropStart, setCropStart] = useState({ x: 0.5, y: 0.5, radius: 0.3 });
  const containerRef = useRef(null);

  const addEvent = () => {
    const newEvents = [...events, { 
      id: Date.now(), 
      date: '', 
      title: '', 
      description: '', 
      photo: null,
      cropData: null,
      side: 'left'
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
        const photoData = reader.result;
        const initialCrop = { x: 0.5, y: 0.5, radius: 0.3 };
        setEditingPhoto({ eventId: id, photo: photoData });
        setCropData(initialCrop);
        setCropStart(initialCrop);
      };
      reader.readAsDataURL(file);
    }
  };

  const getRelativeCoords = (e) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    };
  };

  const getDistance = (p1, p2) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  };

  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    
    const coords = getRelativeCoords(e);
    const distToCenter = getDistance(coords, cropData);
    const distToHandle = getDistance(coords, { 
      x: cropData.x + cropData.radius, 
      y: cropData.y 
    });
    
    if (distToHandle < 0.05) {
      setIsDragging(true);
      setDragStart(coords);
      setCropStart(cropData);
    } else if (distToCenter < cropData.radius) {
      setIsDragging(true);
      setDragStart(coords);
      setCropStart(cropData);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const coords = getRelativeCoords(e);
    const distToHandle = getDistance(dragStart, { 
      x: cropStart.x + cropStart.radius, 
      y: cropStart.y 
    });
    
    if (distToHandle < 0.05) {
      const newRadius = Math.min(
        0.45,
        Math.max(0.1, getDistance(coords, cropStart))
      );
      setCropData({ ...cropStart, radius: newRadius });
    } else {
      const newX = Math.max(cropStart.radius, Math.min(1 - cropStart.radius, cropStart.x + (coords.x - dragStart.x)));
      const newY = Math.max(cropStart.radius, Math.min(1 - cropStart.radius, cropStart.y + (coords.y - dragStart.y)));
      setCropData({ ...cropStart, x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, cropStart]);

  const applyCrop = () => {
    if (editingPhoto) {
      updateEvent(editingPhoto.eventId, 'photo', editingPhoto.photo);
      updateEvent(editingPhoto.eventId, 'cropData', cropData);
      setEditingPhoto(null);
    }
  };

  const cancelCrop = () => {
    setEditingPhoto(null);
    setCropData({ x: 0.5, y: 0.5, radius: 0.3 });
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
            {editingPhoto && editingPhoto.eventId === event.id ? (
              <div className="space-y-3">
                <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                  <div className="w-full h-48 flex items-center justify-center">
                    <div 
                      className="w-32 h-32 rounded-full shadow-lg border-2 border-white overflow-hidden bg-gray-100"
                      style={{
                        maskImage: `radial-gradient(circle at ${cropData.x * 100}% ${cropData.y * 100}%, black ${cropData.radius * 100}%, transparent ${cropData.radius * 100}%)`,
                        WebkitMaskImage: `radial-gradient(circle at ${cropData.x * 100}% ${cropData.y * 100}%, black ${cropData.radius * 100}%, transparent ${cropData.radius * 100}%)`
                      }}
                    >
                      <img 
                        src={editingPhoto.photo} 
                        alt="Preview"
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: `${cropData.x * 100}% ${cropData.y * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-primary-200 rounded-lg p-4 space-y-3">
                  <p className="text-sm font-medium text-gray-700">Выберите область для показа:</p>
                  <div
                    ref={containerRef}
                    className="relative bg-gray-200 rounded-lg overflow-hidden select-none"
                    style={{ aspectRatio: '1 / 1', minHeight: '250px' }}
                    onMouseDown={handleMouseDown}
                  >
                    <img
                      src={editingPhoto.photo}
                      alt="Cropper"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at ${cropData.x * 100}% ${cropData.y * 100}%, transparent ${cropData.radius * 100}%, rgba(0,0,0,0.6) ${cropData.radius * 100}%)`
                      }}
                    />
                    
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{ zIndex: 10 }}
                      viewBox="0 0 1 1"
                      preserveAspectRatio="none"
                    >
                      <circle
                        cx={cropData.x}
                        cy={cropData.y}
                        r={cropData.radius}
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="0.01"
                        strokeDasharray="0.01,0.01"
                      />
                      <circle
                        cx={cropData.x}
                        cy={cropData.y}
                        r="0.02"
                        fill="#D4AF37"
                        stroke="white"
                        strokeWidth="0.005"
                      />
                      <circle
                        cx={cropData.x + cropData.radius}
                        cy={cropData.y}
                        r="0.03"
                        fill="#D4AF37"
                        stroke="white"
                        strokeWidth="0.008"
                        className="pointer-events-auto cursor-ew-resize"
                      />
                    </svg>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={applyCrop}
                      className="btn-primary flex-1 text-sm"
                    >
                      ✓ Применить
                    </button>
                    <button
                      onClick={cancelCrop}
                      className="btn-secondary text-sm"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              </div>
            ) : event.photo ? (
              <div className="space-y-2">
                <div className="relative inline-block">
                  <div 
                    className="w-32 h-32 rounded-full shadow-lg border-2 border-white overflow-hidden bg-gray-100"
                    style={{
                      maskImage: event.cropData 
                        ? `radial-gradient(circle at ${event.cropData.x * 100}% ${event.cropData.y * 100}%, black ${event.cropData.radius * 100}%, transparent ${event.cropData.radius * 100}%)`
                        : 'none',
                      WebkitMaskImage: event.cropData 
                        ? `radial-gradient(circle at ${event.cropData.x * 100}% ${event.cropData.y * 100}%, black ${event.cropData.radius * 100}%, transparent ${event.cropData.radius * 100}%)`
                        : 'none'
                    }}
                  >
                    <img 
                      src={event.photo} 
                      alt="Event" 
                      className="w-full h-full object-cover"
                      style={event.cropData ? {
                        objectPosition: `${event.cropData.x * 100}% ${event.cropData.y * 100}%`
                      } : {}}
                    />
                  </div>
                  <button
                    onClick={() => {
                      setEditingPhoto({ eventId: event.id, photo: event.photo });
                      setCropData(event.cropData || { x: 0.5, y: 0.5, radius: 0.3 });
                      setCropStart(event.cropData || { x: 0.5, y: 0.5, radius: 0.3 });
                    }}
                    className="absolute top-1 right-1 bg-primary-600 text-white p-1.5 rounded-full hover:bg-primary-700 transition-colors"
                    title="Изменить область"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => updateEvent(event.id, 'photo', null)}
                    className="absolute bottom-1 right-1 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                    title="Удалить фото"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
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
