const MusicBlock = ({ data, onChange }) => {
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Размер файла не должен превышать 10 МБ');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ audioUrl: reader.result, audioName: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange({ audioUrl: null, audioName: null });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Добавьте фоновую музыку для приглашения (до 10 МБ)
      </p>

      {data.audioUrl ? (
        <div className="card bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <svg className="w-10 h-10 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">{data.audioName || 'Аудио файл'}</p>
                <p className="text-sm text-gray-500">Музыка загружена</p>
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4">
            <label className="label">Громкость</label>
            <input
              type="range"
              min="0"
              max="100"
              value={(data.volume || 0.5) * 100}
              onChange={(e) => onChange({ volume: e.target.value / 100 })}
              className="w-full"
            />
            <p className="text-sm text-gray-500 text-center mt-1">
              {Math.round((data.volume || 0.5) * 100)}%
            </p>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-12 h-12 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Нажмите для загрузки</span> аудио файла
            </p>
            <p className="text-xs text-gray-500">MP3, WAV (макс. 10MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="audio/*"
            onChange={handleAudioUpload}
          />
        </label>
      )}
    </div>
  );
};

export default MusicBlock;
