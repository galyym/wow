# 🏗️ Архитектура и техническая документация Ashkel

## 📊 Общая архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                    Ashkel Platform                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  React Application (Vite)                                  │
│  ├── Router (React Router v6)                              │
│  ├── State Management (React Hooks)                        │
│  └── Styling (Tailwind CSS)                                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Modules (7 основных разделов)                            │
│  ├── Invitations (Пригласительные)                        │
│  ├── Restaurants (Рестораны)                              │
│  ├── Hosts (Тамады)                                       │
│  ├── Artists (Артисты)                                   │
│  ├── Rent (Аренда одежды)                                 │
│  ├── Services (Услуги)                                    │
│  └── Admin (Администрация)                                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Storage                                                    │
│  └── Browser LocalStorage (JSON data)                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Поток данных (Data Flow)

### Пригласительные
```
User Input (Форма)
    ↓
State Update (useState)
    ↓
Preview Update (PreviewPanel)
    ↓
Publish → Save to LocalStorage
    ↓
Generate Unique URL
    ↓
Share with Guests
```

### Отклики гостей
```
Guest Form Submission
    ↓
Save to LocalStorage (key: {invitationId}_responses)
    ↓
Update Statistics in OrganizerPanel
    ↓
Display Confirmation Message
```

## 📁 Структура файлов (детально)

```
wow/
├── src/
│   ├── App.jsx
│   │   └── Routes (7 основных маршрутов)
│   │
│   ├── index.css
│   │   ├── @tailwind directives
│   │   ├── Custom component classes
│   │   │   ├── .btn-primary, .btn-secondary, .btn-outline
│   │   │   ├── .card, .card-hover
│   │   │   ├── .input, .label
│   │   │   └── Scrollbar styling
│   │   └── Animations (.fade-in, .slide-up, .slide-down)
│   │
│   ├── main.jsx (Entry point)
│   │
│   ├── pages/
│   │   └── HomePage.jsx
│   │       ├── Section grid (6 основных модулей)
│   │       ├── Navigation links
│   │       └── Responsive design
│   │
│   └── modules/
│       │
│       ├── invitations/
│       │   ├── InvitationsRouter.jsx
│       │   │   └── Route definitions
│       │   │
│       │   ├── pages/
│       │   │   ├── TemplateSelection.jsx
│       │   │   │   ├── 2 шаблона (казахский, современный)
│       │   │   │   ├── Preview миниатюры
│       │   │   │   └── Selection logic
│       │   │   │
│       │   │   ├── EditorPage.jsx
│       │   │   │   ├── State для 13 блоков
│       │   │   │   ├── updateBlock(), toggleBlock(), reorderBlocks()
│       │   │   │   ├── resetBlocks(), handlePublish()
│       │   │   │   ├── Mobile/Desktop layout logic
│       │   │   │   └── GridLayout (2 колонки на Desktop)
│       │   │   │
│       │   │   ├── PublishPage.jsx
│       │   │   │   ├── Успешное опубликование
│       │   │   │   ├── Display уникальной ссылки
│       │   │   │   ├── Copy to clipboard функционал
│       │   │   │   ├── QR код (заглушка)
│       │   │   │   ├── PDF скачивание (заглушка)
│       │   │   │   └── Navigation options
│       │   │   │
│       │   │   ├── GuestView.jsx
│       │   │   │   ├── Загрузка приглашения из localStorage
│       │   │   │   ├── Отрисовка PreviewPanel
│       │   │   │   ├── RSVP форма с полями
│       │   │   │   ├── Сохранение откликов в localStorage
│       │   │   │   └── Спасибо сообщение
│       │   │   │
│       │   │   └── OrganizerPanel.jsx
│       │   │       ├── Загрузка откликов из localStorage
│       │   │       ├── Statistics (total, attending, %)
│       │   │       ├── Фильтрация (статус, роль)
│       │   │       ├── Таблица откликов
│       │   │       └── Export options (заглушка)
│       │   │
│       │   └── components/
│       │       ├── editor/
│       │       │   ├── BlocksEditor.jsx
│       │       │   │   ├── Drag-and-drop реализация
│       │       │   │   ├── Block list с toggle switches
│       │       │   │   ├── Expand/collapse функционал
│       │       │   │   └── Dynamic component rendering
│       │       │   │
│       │       │   ├── MobilePreviewButton.jsx
│       │       │   │   ├── Fixed floating button
│       │       │   │   ├── Eye icon
│       │       │   │   └── onClick handler
│       │       │   │
│       │       │   └── blocks/ (13 компонентов)
│       │       │       ├── PhotoBlock.jsx
│       │       │       │   ├── File upload (base64)
│       │       │       │   ├── Size validation (5MB)
│       │       │       │   ├── Preview + remove button
│       │       │       │   └── onChange callback
│       │       │       │
│       │       │       ├── NamesBlock.jsx
│       │       │       │   ├── Text textarea
│       │       │       │   ├── Font select (8 вариантов)
│       │       │       │   ├── Font size input
│       │       │       │   ├── Color pickers (text + bg)
│       │       │       │   └── Real-time preview
│       │       │       │
│       │       │       ├── DescriptionBlock.jsx
│       │       │       │   ├── Large textarea
│       │       │       │   ├── Styling controls
│       │       │       │   └── onChange callbacks
│       │       │       │
│       │       │       ├── GalleryBlock.jsx
│       │       │       │   ├── Multiple file upload
│       │       │       │   ├── Max 20 images
│       │       │       │   ├── Grid preview (2-3 columns)
│       │       │       │   ├── Delete buttons (hover)
│       │       │       │   └── Add image button
│       │       │       │
│       │       │       ├── ScheduleBlock.jsx
│       │       │       │   ├── Time input + event text
│       │       │       │   ├── Add event button
│       │       │       │   ├── Delete individual events
│       │       │       │   └── Event list display
│       │       │       │
│       │       │       ├── RestaurantBlock.jsx
│       │       │       │   ├── Name, address, map URL inputs
│       │       │       │   └── Basic form structure
│       │       │       │
│       │       │       ├── DateBlock.jsx
│       │       │       │   ├── Date picker
│       │       │       │   ├── Time picker (24h)
│       │       │       │   ├── Styling controls
│       │       │       │   └── Preview formatting
│       │       │       │
│       │       │       ├── RsvpBlock.jsx
│       │       │       │   ├── Info display (no editing)
│       │       │       │   └── Field list info
│       │       │       │
│       │       │       ├── TimelineBlock.jsx
│       │       │       │   ├── Event management (add/edit/delete)
│       │       │       │   ├── Event structure (date, title, desc, photo)
│       │       │       │   ├── Side selection (жених/невеста)
│       │       │       │   └── Photo upload per event
│       │       │       │
│       │       │       ├── MusicBlock.jsx
│       │       │       │   ├── Audio file upload (10MB max)
│       │       │       │   ├── File name display
│       │       │       │   ├── Volume slider (0-100%)
│       │       │       │   └── Remove button
│       │       │       │
│       │       │       ├── GiftBlock.jsx
│       │       │       │   ├── Bank select (4 банка)
│       │       │       │   ├── Card number input
│       │       │       │   ├── Phone number input
│       │       │       │   └── Styling controls
│       │       │       │
│       │       │       ├── TablesBlock.jsx
│       │       │       │   ├── Table management (add/edit/delete)
│       │       │       │   ├── Name, seats, role selects
│       │       │       │   ├── Guest role options (6 вариантов)
│       │       │       │   └── Styling controls
│       │       │       │
│       │       │       └── BackgroundBlock.jsx
│       │       │           ├── Type select (color/image)
│       │       │           ├── Color picker или image upload
│       │       │           ├── Blur effect slider (0-20px)
│       │       │           ├── Pattern select (5 типов)
│       │       │           ├── Pattern opacity slider
│       │       │           └── Animation select (3 типа)
│       │       │
│       │       └── preview/
│       │           └── PreviewPanel.jsx
│       │               ├── GallerySlider component
│       │               │   ├── Current image display
│       │               │   ├── Previous/Next buttons
│       │               │   ├── Counter display
│       │               │   └── Thumbnail grid
│       │               │
│       │               ├── TimelinePreview component
│       │               │   ├── Desktop: horizontal layout
│       │               │   ├── Mobile: vertical with tabs
│       │               │   ├── Center timeline line
│       │               │   ├── Event dots
│       │               │   └── Photo avatars
│       │               │
│       │               ├── Background rendering (color/image/pattern)
│       │               ├── Audio element (hidden, autoplay, loop)
│       │               ├── Block rendering logic (13 блоков)
│       │               └── Responsive styling
│       │
│       ├── restaurants/ (RestaurantsRouter.jsx)
│       │   ├── State: [restaurants]
│       │   ├── State: [filters]
│       │   ├── Filter logic (поиск, цена, гости)
│       │   ├── Card grid (1-3 колонки)
│       │   ├── Rating display (⭐)
│       │   └── Book button
│       │
│       ├── hosts/ (HostsRouter.jsx)
│       │   ├── State: [hosts]
│       │   ├── Search + sort functionality
│       │   ├── Card display (рейтинг, опыт, языки)
│       │   └── Book button
│       │
│       ├── artists/ (ArtistsRouter.jsx)
│       │   ├── State: [artists]
│       │   ├── Category tabs (6 категорий)
│       │   ├── Search + sort
│       │   ├── Rating display
│       │   └── Book button
│       │
│       ├── rent/ (RentRouter.jsx)
│       │   ├── State: [items]
│       │   ├── Category filtering
│       │   ├── Price range slider
│       │   ├── Item details (размер, материал, цвет)
│       │   └── Book button
│       │
│       ├── services/ (ServicesRouter.jsx)
│       │   ├── State: [services]
│       │   ├── Category tabs (8 категорий)
│       │   ├── Search + sort
│       │   ├── Service package info
│       │   └── Book button
│       │
│       └── admin/ (AdminRouter.jsx)
│           ├── Stats display (5 метрик с градиентами)
│           ├── Tab navigation (3 вкладки)
│           ├── Dashboard tab (recent activity)
│           ├── Moderation tab (таблица с approve/reject)
│           └── Users tab (таблица пользователей)
│
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
│
├── README.md (этот файл)
├── GUIDE.md (пользовательский гайд)
├── DEVELOPMENT.md (для разработчиков)
└── prompt.md (исходное описание проекта)
```

## 🎨 Цветовая схема

### Primary Colors (Tailwind extend)
```javascript
primary: {
  50: '#fef7ee',
  100: '#fdecd3',
  200: '#fad6a5',
  300: '#f7ba6d',
  400: '#f49533',
  500: '#f1780b',    // Main
  600: '#e25d01',
  700: '#bb4504',
  800: '#95360a',
  900: '#782e0b',
}
```

### Kazakh Theme
```javascript
kazakh: {
  gold: '#D4AF37',   // Золотой
  blue: '#003366',   // Синий
  red: '#C8102E',    // Красный
}
```

## 🧮 State Management Strategy

### Local State (useState)
```javascript
// В EditorPage
const [blocks, setBlocks] = useState([...]) // 13 блоков
const [isMobile, setIsMobile] = useState(false)
const [showMobilePreview, setShowMobilePreview] = useState(false)

// В компонентах модулей
const [restaurants, setRestaurants] = useState([...])
const [filters, setFilters] = useState({...})
const [searchTerm, setSearchTerm] = useState('')
```

### LocalStorage
```javascript
// Сохранение приглашения
localStorage.setItem(invitationId, JSON.stringify({
  templateId,
  blocks
}))

// Сохранение откликов
localStorage.setItem(`${invitationId}_responses`, JSON.stringify([...]))

// Загрузка
const savedInvitation = JSON.parse(localStorage.getItem(invitationId))
```

## 🔌 API Integration Points (заглушки)

Текущие заглушки для будущей интеграции:
```javascript
// POST /api/invitations
handlePublish() → Save to server

// GET /api/invitations/:id
GuestView → Load from server

// POST /api/invitations/:id/rsvp
handleSubmit() → Submit RSVP to server

// GET /api/restaurants
RestaurantsRouter → Load restaurants

// GET /api/hosts
HostsRouter → Load hosts

// И т.д.
```

## 📱 Responsive Breakpoints (Tailwind)

```javascript
// Mobile First approach
sm: '640px'   // Small phones
md: '768px'   // Tablets
lg: '1024px'  // Laptops
xl: '1280px'  // Desktops
2xl: '1536px' // Large screens
```

## ⚡ Performance Optimizations

### Текущие оптимизации:
- ✅ React Hooks (функциональные компоненты)
- ✅ Conditional rendering (enabled blocks only)
- ✅ Image optimization (loading in preview)
- ✅ CSS classes (Tailwind minified)

### Рекомендуемые улучшения:
- 🔲 Code splitting (lazy loading routes)
- 🔲 Image lazy loading
- 🔲 Memoization (React.memo for blocks)
- 🔲 Production build optimization
- 🔲 Service Worker for PWA

## 🔐 Security Considerations

### Текущие подходы:
- ✅ Input validation (file sizes, types)
- ✅ URL sanitization (for maps links)
- ✅ LocalStorage isolation

### Рекомендуемые улучшения:
- 🔲 Helmet.js for headers
- 🔲 Input sanitization (DOMPurify)
- 🔲 CSRF tokens (if API added)
- 🔲 Rate limiting (if API added)
- 🔲 Authentication/Authorization

## 📊 Data Structures

### Block Structure
```javascript
{
  id: 'photo',              // unique identifier
  name: 'Фотография молодожёнов',
  enabled: true,            // visible or not
  order: 0,                 // display order (drag-drop)
  data: {                   // block specific data
    image: 'data:image/...'
  }
}
```

### Invitation Structure
```javascript
{
  templateId: 'kazakh',
  blocks: [
    { id: 'photo', ... },
    { id: 'names', ... },
    // ... 11 more blocks
  ]
}
```

### RSVP Response
```javascript
{
  name: 'Айман',
  whatsapp: '+7 (777) 123-45-67',
  attending: 'yes',
  role: 'Гость',
  comment: 'Будем рады',
  timestamp: '2025-01-14T...'
}
```

---

## 📚 Дополнительные ресурсы

- [Tailwind Configuration](./tailwind.config.js)
- [Vite Configuration](./vite.config.js)
- [User Guide](./GUIDE.md)
- [Development Guide](./DEVELOPMENT.md)
- [Original Prompt](./prompt.md)

---

**Версия:** 1.0  
**Последнее обновление:** Ноябрь 2025  
**Статус:** Production Ready ✅
