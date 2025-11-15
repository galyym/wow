import { useState, useRef, useEffect } from 'react';

const PhotoBlock = ({ data, onChange }) => {
  const [imagePreview, setImagePreview] = useState(data.image);
  const [cropData, setCropData] = useState(data.cropData || { x: 0.5, y: 0.5, radius: 0.3 });
  const [showCropper, setShowCropper] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropStart, setCropStart] = useState({ x: 0.5, y: 0.5, radius: 0.3 });
  const containerRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5 МБ');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setImagePreview(imageData);
        const initialCrop = { x: 0.5, y: 0.5, radius: 0.3 };
        setCropData(initialCrop);
        setShowCropper(true);
        onChange({ image: imageData, cropData: initialCrop });
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
    
    // Определяем, что перетаскиваем: центр (move), ручку (resize) или ничего
    if (distToHandle < 0.05) {
      // Перетаскиваем ручку изменения размера
      setIsDragging(true);
      setDragStart(coords);
      setCropStart(cropData);
    } else if (distToCenter < cropData.radius) {
      // Перетаскиваем центр круга
      setIsDragging(true);
      setDragStart(coords);
      setCropStart(cropData);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const coords = getRelativeCoords(e);
    const deltaX = coords.x - dragStart.x;
    const deltaY = coords.y - dragStart.y;
    
    // Проверяем, перетаскиваем ли мы ручку изменения размера
    const distToHandle = getDistance(dragStart, { 
      x: cropStart.x + cropStart.radius, 
      y: cropStart.y 
    });
    
    if (distToHandle < 0.05) {
      // Изменяем размер
      const newRadius = Math.min(
        0.45,
        Math.max(0.1, getDistance(coords, cropStart))
      );
      setCropData({ ...cropStart, radius: newRadius });
    } else {
      // Перемещаем центр
      const newX = Math.max(cropStart.radius, Math.min(1 - cropStart.radius, cropStart.x + deltaX));
      const newY = Math.max(cropStart.radius, Math.min(1 - cropStart.radius, cropStart.y + deltaY));
      setCropData({ ...cropStart, x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      onChange({ image: imagePreview, cropData });
    }
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
    onChange({ image: imagePreview, cropData });
    setShowCropper(false);
  };

  const handleRemove = () => {
    setImagePreview(null);
    setCropData({ x: 0.5, y: 0.5, radius: 0.3 });
    setShowCropper(false);
    onChange({ image: null, cropData: null });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Загрузите фотографию молодожёнов (до 5 МБ)
      </p>

      {imagePreview ? (
        <div className="space-y-4">
          {/* Preview */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <div className="w-full h-64 flex items-center justify-center">
              <div 
                className="w-64 h-64 rounded-full shadow-xl border-4 border-white overflow-hidden bg-gray-100 flex-shrink-0"
                style={{
                  maskImage: cropData 
                    ? `radial-gradient(circle at ${cropData.x * 100}% ${cropData.y * 100}%, black ${cropData.radius * 100}%, transparent ${cropData.radius * 100}%)`
                    : 'none',
                  WebkitMaskImage: cropData 
                    ? `radial-gradient(circle at ${cropData.x * 100}% ${cropData.y * 100}%, black ${cropData.radius * 100}%, transparent ${cropData.radius * 100}%)`
                    : 'none'
                }}
              >
                <img 
                  src={imagePreview} 
                  alt="Молодожёны"
                  className="w-full h-full object-cover"
                  style={cropData ? {
                    objectPosition: `${cropData.x * 100}% ${cropData.y * 100}%`
                  } : {}}
                />
              </div>
            </div>
            <div
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors cursor-pointer z-10"
              onClick={handleRemove}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowCropper(!showCropper)}
              className="btn-secondary flex-1 text-sm"
            >
              {showCropper ? '✓ Готово' : '✏️ Выбрать область'}
            </button>
          </div>

          {/* Cropper */}
          {showCropper && (
            <div className="bg-white border-2 border-primary-200 rounded-lg p-4 space-y-3">
              <p className="text-sm font-medium text-gray-700">Выберите область для показа:</p>
              <div
                ref={containerRef}
                className="relative bg-gray-200 rounded-lg overflow-hidden select-none"
                style={{ aspectRatio: '1 / 1', minHeight: '300px' }}
                onMouseDown={handleMouseDown}
              >
                <img
                  src={imagePreview}
                  alt="Cropper"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                
                {/* Overlay with circle cutout */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at ${cropData.x * 100}% ${cropData.y * 100}%, transparent ${cropData.radius * 100}%, rgba(0,0,0,0.6) ${cropData.radius * 100}%)`
                  }}
                />
                
                {/* Circle outline and controls */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 10 }}
                  viewBox="0 0 1 1"
                  preserveAspectRatio="none"
                >
                  {/* Circle outline */}
                  <circle
                    cx={cropData.x}
                    cy={cropData.y}
                    r={cropData.radius}
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="0.01"
                    strokeDasharray="0.01,0.01"
                  />
                  
                  {/* Center point */}
                  <circle
                    cx={cropData.x}
                    cy={cropData.y}
                    r="0.02"
                    fill="#D4AF37"
                    stroke="white"
                    strokeWidth="0.005"
                  />
                  
                  {/* Resize handle */}
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
                  ✓ Применить выбор
                </button>
                <button
                  onClick={() => {
                    const reset = { x: 0.5, y: 0.5, radius: 0.3 };
                    setCropData(reset);
                    onChange({ image: imagePreview, cropData: reset });
                  }}
                  className="btn-secondary text-sm"
                >
                  Сбросить
                </button>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                Перетащите центр для перемещения • Перетащите правую точку для изменения размера
              </p>
            </div>
          )}
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-12 h-12 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Нажмите для загрузки</span> или перетащите файл
            </p>
            <p className="text-xs text-gray-500">PNG, JPG (макс. 5MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      )}
    </div>
  );
};

export default PhotoBlock;
