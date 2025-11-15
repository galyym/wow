import { useState, useRef, useEffect } from 'react';

const PhotoBlock = ({ data, onChange }) => {
  const [imagePreview, setImagePreview] = useState(data.image);
  const [cropData, setCropData] = useState(data.cropData || { x: 0.5, y: 0.5, radius: 0.3 });
  const [showCropper, setShowCropper] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState(null); // 'move', 'resize'
  const canvasRef = useRef(null);
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
        setCropData({ x: 0.5, y: 0.5, radius: 0.3 });
        setShowCropper(true);
        onChange({ image: imageData, cropData: { x: 0.5, y: 0.5, radius: 0.3 } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const distToCenter = Math.sqrt((x - cropData.x) ** 2 + (y - cropData.y) ** 2);
    
    if (distToCenter < cropData.radius + 0.05) {
      setIsDragging(true);
      setDragType(distToCenter < cropData.radius - 0.02 ? 'move' : 'resize');
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    if (dragType === 'move') {
      const newX = Math.max(cropData.radius, Math.min(1 - cropData.radius, x));
      const newY = Math.max(cropData.radius, Math.min(1 - cropData.radius, y));
      setCropData({ ...cropData, x: newX, y: newY });
    } else if (dragType === 'resize') {
      const newRadius = Math.min(0.5, Math.sqrt((x - cropData.x) ** 2 + (y - cropData.y) ** 2));
      setCropData({ ...cropData, radius: Math.max(0.1, newRadius) });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType(null);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragType, cropData]);

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

  const getCroppedImageCanvas = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = Math.min(img.width, img.height) * cropData.radius * 2;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.clip();
      
      ctx.drawImage(
        img,
        cropData.x * img.width - size / 2,
        cropData.y * img.height - size / 2,
        size,
        size,
        0,
        0,
        size,
        size
      );
    };
    img.src = imagePreview;
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
            <img
              src={imagePreview}
              alt="Молодожёны"
              className="w-full h-64 object-cover"
              style={{
                maskImage: `radial-gradient(circle at ${cropData.x * 100}% ${cropData.y * 100}%, black ${cropData.radius * 100}%, transparent ${cropData.radius * 100}% + 2%)`,
                WebkitMaskImage: `radial-gradient(circle at ${cropData.x * 100}% ${cropData.y * 100}%, black ${cropData.radius * 100}%, transparent ${cropData.radius * 100}% + 2%)`
              }}
            />
            <div
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
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
                className="relative bg-gray-200 rounded-lg overflow-hidden cursor-move select-none"
                style={{ aspectRatio: '1 / 1' }}
                onMouseDown={handleMouseDown}
              >
                <img
                  src={imagePreview}
                  alt="Cropper"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />
                
                {/* Circle mask */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 1 1"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <mask id="circleMask">
                      <rect width="1" height="1" fill="white" />
                      <circle
                        cx={cropData.x}
                        cy={cropData.y}
                        r={cropData.radius}
                        fill="black"
                      />
                    </mask>
                  </defs>
                  <rect width="1" height="1" fill="black" mask="url(#circleMask)" opacity="0" />
                </svg>
                
                {/* Circle outline and controls */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 1 1"
                  preserveAspectRatio="none"
                >
                  {/* Circle */}
                  <circle
                    cx={cropData.x}
                    cy={cropData.y}
                    r={cropData.radius}
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="0.01"
                  />
                  
                  {/* Center point */}
                  <circle
                    cx={cropData.x}
                    cy={cropData.y}
                    r="0.02"
                    fill="#D4AF37"
                  />
                  
                  {/* Resize handle */}
                  <circle
                    cx={cropData.x + cropData.radius}
                    cy={cropData.y}
                    r="0.025"
                    fill="#D4AF37"
                    stroke="white"
                    strokeWidth="0.005"
                  />
                </svg>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                Перетащите круг, чтобы переместить область • потяните край, чтобы изменить размер
              </p>
              
              <button
                onClick={applyCrop}
                className="btn-primary w-full text-sm"
              >
                ✓ Применить выбор
              </button>
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
