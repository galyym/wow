import { useState } from 'react';
import PhotoBlock from './blocks/PhotoBlock';
import NamesBlock from './blocks/NamesBlock';
import DescriptionBlock from './blocks/DescriptionBlock';
import GalleryBlock from './blocks/GalleryBlock';
import ScheduleBlock from './blocks/ScheduleBlock';
import RestaurantBlock from './blocks/RestaurantBlock';
import DateBlock from './blocks/DateBlock';
import RsvpBlock from './blocks/RsvpBlock';
import TimelineBlock from './blocks/TimelineBlock';
import MusicBlock from './blocks/MusicBlock';
import GiftBlock from './blocks/GiftBlock';
import TablesBlock from './blocks/TablesBlock';
import BackgroundBlock from './blocks/BackgroundBlock';

const BlocksEditor = ({ blocks, updateBlock, toggleBlock, reorderBlocks }) => {
  const [expandedBlock, setExpandedBlock] = useState(null);

  const blockComponents = {
    photo: PhotoBlock,
    names: NamesBlock,
    description: DescriptionBlock,
    gallery: GalleryBlock,
    schedule: ScheduleBlock,
    restaurant: RestaurantBlock,
    date: DateBlock,
    rsvp: RsvpBlock,
    timeline: TimelineBlock,
    music: MusicBlock,
    gift: GiftBlock,
    tables: TablesBlock,
    background: BackgroundBlock
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/html'));
    if (dragIndex !== dropIndex) {
      reorderBlocks(dragIndex, dropIndex);
    }
  };

  const toggleExpand = (blockId) => {
    setExpandedBlock(expandedBlock === blockId ? null : blockId);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="card">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Редактор блоков</h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Включите нужные блоки и настройте их содержимое. Перетаскивайте блоки для изменения порядка.
        </p>
      </div>

      {blocks
        .sort((a, b) => a.order - b.order)
        .map((block, index) => {
          const BlockComponent = blockComponents[block.id];
          const isExpanded = expandedBlock === block.id;

          return (
            <div
              key={block.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="card cursor-move hover:shadow-lg transition-shadow"
            >
              {/* Block Header */}
              <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <div className="flex flex-col items-center text-gray-400 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{block.name}</h3>
                </div>

                <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={block.enabled}
                      onChange={() => toggleBlock(block.id)}
                      className="sr-only peer"
                    />
                    <div className="w-10 sm:w-11 h-5 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>

                  {/* Expand/Collapse */}
                  {block.enabled && (
                    <button
                      onClick={() => toggleExpand(block.id)}
                      className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                    >
                      <svg
                        className={`w-5 h-5 transform transition-transform`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Block Content */}
              {block.enabled && isExpanded && BlockComponent && (
                <div className="pt-4 border-t border-gray-200">
                  <BlockComponent
                    data={block.data}
                    onChange={(newData) => updateBlock(block.id, newData)}
                  />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default BlocksEditor;
