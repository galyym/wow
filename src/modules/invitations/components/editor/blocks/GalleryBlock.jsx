import { useState } from 'react';

const GalleryBlock = ({ data, onChange }) => {
  const [images, setImages] = useState(data.images || []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > 20) {
      alert('Максимум 20 фотографий');
      return;
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`Файл ${file.name} превышает 5 МБ`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images, { id: Date.now() + Math.random(), url: reader.result }];
        setImages(newImages);
        onChange({ images: newImages });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemove = (imageId) => {
    const newImages = images.filter(img => img.id !== imageId);
    setImages(newImages);
    onChange({ images: newImages });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        До 20 фотографий (до 5 МБ каждая)
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.url}
              alt="Gallery"
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              onClick={() => handleRemove(image.id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}

        {images.length < 20 && (
          <label className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <p className="text-xs text-gray-500">Добавить</p>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default GalleryBlock;
