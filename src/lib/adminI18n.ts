import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Admin-area translations. English source string → { ka, ru, en } dict.
 * Missing translations fall through to the English source (the key itself),
 * so adding new admin pages "just works" even before they're translated.
 *
 * Keep keys short and natural English — avoid `page.dashboard.title` style keys.
 */
export const adminDict: Record<string, { ka: string; ru?: string; en?: string }> = {
  // ─────────── Sidebar / navigation ───────────
  'Dashboard':               { ka: 'მთავარი',             ru: 'Панель',              en: 'Dashboard' },
  'Products':                { ka: 'პროდუქტები',           ru: 'Товары',              en: 'Products' },
  'Bulk Import':             { ka: 'მასობრივი იმპორტი',    ru: 'Массовый импорт',     en: 'Bulk Import' },
  'Categories':              { ka: 'კატეგორიები',           ru: 'Категории',           en: 'Categories' },
  'Home Grid':               { ka: 'მთავარი გრიდი',         ru: 'Главная (сетка)',     en: 'Home Grid' },
  'Door Finishes':           { ka: 'კარის მორთულობა',      ru: 'Отделка дверей',      en: 'Door Finishes' },
  'Door Frames':             { ka: 'კარის ჩარჩოები',        ru: 'Короба дверей',       en: 'Door Frames' },
  'Door Models':             { ka: 'კარის მოდელები',        ru: 'Модели дверей',       en: 'Door Models' },
  'Product Blocks':          { ka: 'პროდუქტის ბლოკები',     ru: 'Блоки товаров',       en: 'Product Blocks' },
  'Orders':                  { ka: 'შეკვეთები',             ru: 'Заказы',              en: 'Orders' },
  'Menu Items':              { ka: 'მენიუს ელემენტები',     ru: 'Пункты меню',         en: 'Menu Items' },
  'Banners':                 { ka: 'ბანერები',             ru: 'Баннеры',             en: 'Banners' },
  'Features Bar':            { ka: 'უპირატესობების ზოლი',    ru: 'Панель преимуществ',  en: 'Features Bar' },
  'HMspace Sections':        { ka: 'HMspace სექციები',      ru: 'Секции HMspace',      en: 'HMspace Sections' },
  'HMspace Projects':        { ka: 'HMspace პროექტები',     ru: 'Проекты HMspace',     en: 'HMspace Projects' },
  'Blog Posts':              { ka: 'ბლოგის ჩანაწერები',     ru: 'Блог',                en: 'Blog Posts' },
  'Testimonials':            { ka: 'მიმოხილვები',           ru: 'Отзывы',              en: 'Testimonials' },
  'Legal Pages':             { ka: 'იურიდიული გვერდები',    ru: 'Юридические страницы',en: 'Legal Pages' },
  'Consultations':           { ka: 'კონსულტაციები',         ru: 'Консультации',        en: 'Consultations' },
  'Showrooms':               { ka: 'შოურუმები',            ru: 'Шоурумы',             en: 'Showrooms' },
  'Settings':                { ka: 'პარამეტრები',           ru: 'Настройки',           en: 'Settings' },
  'UNION Admin':             { ka: 'UNION ადმინი',          ru: 'Админ UNION',         en: 'UNION Admin' },
  'Sign Out':                { ka: 'გასვლა',               ru: 'Выйти',               en: 'Sign Out' },
  'Language':                { ka: 'ენა',                  ru: 'Язык',                en: 'Language' },

  // ─────────── Actions / buttons ───────────
  'Add':                     { ka: 'დამატება',             ru: 'Добавить',            en: 'Add' },
  'Add Category':            { ka: 'კატეგორიის დამატება',   ru: 'Добавить категорию',  en: 'Add Category' },
  'Add Product':             { ka: 'პროდუქტის დამატება',    ru: 'Добавить товар',      en: 'Add Product' },
  'Add Banner':              { ka: 'ბანერის დამატება',     ru: 'Добавить баннер',     en: 'Add Banner' },
  'Add Feature':             { ka: 'უპირატესობის დამატება', ru: 'Добавить преимущество', en: 'Add Feature' },
  'Add Section':             { ka: 'სექციის დამატება',      ru: 'Добавить секцию',     en: 'Add Section' },
  'Add Project':             { ka: 'პროექტის დამატება',     ru: 'Добавить проект',     en: 'Add Project' },
  'Add Page':                { ka: 'გვერდის დამატება',      ru: 'Добавить страницу',   en: 'Add Page' },
  'Add Testimonial':         { ka: 'მიმოხილვის დამატება',   ru: 'Добавить отзыв',      en: 'Add Testimonial' },
  'Add Showroom':            { ka: 'შოურუმის დამატება',     ru: 'Добавить шоурум',     en: 'Add Showroom' },
  'Add Block':               { ka: 'ბლოკის დამატება',       ru: 'Добавить блок',       en: 'Add Block' },
  'Add Group':               { ka: 'ჯგუფის დამატება',       ru: 'Добавить группу',     en: 'Add Group' },
  'Add Link':                { ka: 'ბმულის დამატება',       ru: 'Добавить ссылку',     en: 'Add Link' },
  'Add Frame':               { ka: 'ჩარჩოს დამატება',       ru: 'Добавить короб',      en: 'Add Frame' },
  'Add Model':               { ka: 'მოდელის დამატება',      ru: 'Добавить модель',     en: 'Add Model' },
  'Add Swatch':              { ka: 'ნიმუშის დამატება',      ru: 'Добавить образец',    en: 'Add Swatch' },
  'Edit':                    { ka: 'რედაქტირება',          ru: 'Редактировать',       en: 'Edit' },
  'Delete':                  { ka: 'წაშლა',                ru: 'Удалить',             en: 'Delete' },
  'Save':                    { ka: 'შენახვა',              ru: 'Сохранить',           en: 'Save' },
  'Save block':              { ka: 'ბლოკის შენახვა',        ru: 'Сохранить блок',      en: 'Save block' },
  'Save Changes':            { ka: 'ცვლილებების შენახვა',   ru: 'Сохранить изменения', en: 'Save Changes' },
  'Cancel':                  { ka: 'გაუქმება',             ru: 'Отмена',              en: 'Cancel' },
  'Update':                  { ka: 'განახლება',            ru: 'Обновить',            en: 'Update' },
  'Create':                  { ka: 'შექმნა',               ru: 'Создать',             en: 'Create' },
  'Close':                   { ka: 'დახურვა',              ru: 'Закрыть',             en: 'Close' },

  // ─────────── Status / labels ───────────
  'Active':                  { ka: 'აქტიური',              ru: 'Активен',             en: 'Active' },
  'Inactive':                { ka: 'არააქტიური',            ru: 'Неактивен',           en: 'Inactive' },
  'Featured':                { ka: 'რჩეული',               ru: 'Избранный',           en: 'Featured' },
  'New':                     { ka: 'ახალი',                ru: 'Новый',               en: 'New' },
  'Hidden':                  { ka: 'დამალული',             ru: 'Скрыто',              en: 'Hidden' },
  'Off':                     { ka: 'გამორთული',            ru: 'Выкл.',               en: 'Off' },
  'Visible':                 { ka: 'ხილული',               ru: 'Видимый',             en: 'Visible' },
  'Global':                  { ka: 'გლობალური',            ru: 'Глобальный',          en: 'Global' },
  'Status':                  { ka: 'სტატუსი',              ru: 'Статус',              en: 'Status' },
  'Name':                    { ka: 'სახელი',               ru: 'Название',            en: 'Name' },
  'Slug':                    { ka: 'სლაგი',                ru: 'Слаг',                en: 'Slug' },
  'Parent':                  { ka: 'მშობელი',              ru: 'Родитель',            en: 'Parent' },
  'Order':                   { ka: 'რიგი',                 ru: 'Порядок',             en: 'Order' },
  'Actions':                 { ka: 'მოქმედებები',           ru: 'Действия',            en: 'Actions' },
  'Price':                   { ka: 'ფასი',                 ru: 'Цена',                en: 'Price' },
  'Stock':                   { ka: 'მარაგი',               ru: 'Остаток',             en: 'Stock' },
  'Category':                { ka: 'კატეგორია',            ru: 'Категория',           en: 'Category' },
  'Sale Price':              { ka: 'ფასდაკლება',            ru: 'Цена со скидкой',     en: 'Sale Price' },
  'Image':                   { ka: 'სურათი',               ru: 'Изображение',         en: 'Image' },
  'Title':                   { ka: 'სათაური',              ru: 'Заголовок',           en: 'Title' },
  'Subtitle':                { ka: 'ქვესათაური',            ru: 'Подзаголовок',        en: 'Subtitle' },
  'Description':             { ka: 'აღწერა',               ru: 'Описание',            en: 'Description' },
  'Body':                    { ka: 'ტექსტი',               ru: 'Текст',               en: 'Body' },
  'Icon':                    { ka: 'ხატულა',               ru: 'Иконка',              en: 'Icon' },
  'URL':                     { ka: 'ბმული',                ru: 'URL',                 en: 'URL' },
  'Image URL':               { ka: 'სურათის URL',           ru: 'URL изображения',     en: 'Image URL' },
  'Link URL':                { ka: 'ბმულის URL',            ru: 'URL ссылки',          en: 'Link URL' },
  'Sort order':              { ka: 'სორტირების რიგი',       ru: 'Порядок сортировки',  en: 'Sort order' },
  'Sort Order':              { ka: 'სორტირების რიგი',       ru: 'Порядок сортировки',  en: 'Sort Order' },
  'Code':                    { ka: 'კოდი',                 ru: 'Код',                 en: 'Code' },
  'Type':                    { ka: 'ტიპი',                 ru: 'Тип',                 en: 'Type' },
  'Email':                   { ka: 'ელ.ფოსტა',              ru: 'Эл. почта',           en: 'Email' },
  'Phone':                   { ka: 'ტელეფონი',             ru: 'Телефон',             en: 'Phone' },
  'Message':                 { ka: 'შეტყობინება',          ru: 'Сообщение',           en: 'Message' },
  'Address':                 { ka: 'მისამართი',            ru: 'Адрес',               en: 'Address' },

  // ─────────── Page titles & subtitles ───────────
  'Manage your product catalog':          { ka: 'მართე შენი პროდუქტების კატალოგი',     ru: 'Управление каталогом товаров',    en: 'Manage your product catalog' },
  'Manage product categories':            { ka: 'მართე პროდუქტების კატეგორიები',      ru: 'Управление категориями товаров',  en: 'Manage product categories' },
  'Manage hero slider banners':           { ka: 'მართე მთავარი გვერდის ბანერები',     ru: 'Управление баннерами героя',      en: 'Manage hero slider banners' },
  'Manage customer testimonials':         { ka: 'მართე მომხმარებელთა მიმოხილვები',    ru: 'Управление отзывами клиентов',    en: 'Manage customer testimonials' },
  'Home Features Bar':                    { ka: 'მთავარი გვერდის უპირატესობები',      ru: 'Панель преимуществ главной',      en: 'Home Features Bar' },
  'HMspace Landing Sections':             { ka: 'HMspace მთავარი გვერდის სექციები',   ru: 'Секции главной HMspace',          en: 'HMspace Landing Sections' },
  'Legal & Info Pages':                   { ka: 'იურიდიული და საინფორმაციო გვერდები', ru: 'Юридические и инфо-страницы',     en: 'Legal & Info Pages' },
  'Home Category Grid':                   { ka: 'მთავარი გვერდის კატეგორიების ბადე',  ru: 'Сетка категорий главной',         en: 'Home Category Grid' },
  'Door Finishes (Otdelka)':              { ka: 'კარის მორთულობა (ოტდელკა)',          ru: 'Отделка дверей',                  en: 'Door Finishes (Otdelka)' },
  'Product Content Blocks':               { ka: 'პროდუქტის კონტენტ-ბლოკები',          ru: 'Блоки контента товаров',          en: 'Product Content Blocks' },
  'Site Settings':                        { ka: 'საიტის პარამეტრები',                  ru: 'Настройки сайта',                 en: 'Site Settings' },
  'Admin Panel':                          { ka: 'ადმინ პანელი',                        ru: 'Админ-панель',                    en: 'Admin Panel' },
  'Sign In':                              { ka: 'შესვლა',                              ru: 'Войти',                           en: 'Sign In' },
  'Signing in...':                        { ka: 'შესვლა...',                           ru: 'Вход...',                         en: 'Signing in...' },
  'Enter your credentials to access the admin panel': { ka: 'შეიყვანე მონაცემები ადმინ პანელში შესასვლელად', ru: 'Введите учётные данные для доступа к админ-панели', en: 'Enter your credentials to access the admin panel' },
  'Password':                             { ka: 'პაროლი',                              ru: 'Пароль',                          en: 'Password' },

  // ─────────── Common empty / loading states ───────────
  'No products yet':         { ka: 'ჯერ პროდუქტები არაა',   ru: 'Нет товаров',         en: 'No products yet' },
  'No categories yet':       { ka: 'ჯერ კატეგორიები არაა',   ru: 'Нет категорий',       en: 'No categories yet' },
  'No banners yet':          { ka: 'ჯერ ბანერები არაა',     ru: 'Нет баннеров',        en: 'No banners yet' },
  'No testimonials yet':     { ka: 'ჯერ მიმოხილვები არაა',   ru: 'Нет отзывов',         en: 'No testimonials yet' },
  'No features yet':         { ka: 'ჯერ უპირატესობები არაა', ru: 'Нет преимуществ',     en: 'No features yet' },
  'No sections yet':         { ka: 'ჯერ სექციები არაა',     ru: 'Нет секций',          en: 'No sections yet' },
  'No pages yet':            { ka: 'ჯერ გვერდები არაა',     ru: 'Нет страниц',         en: 'No pages yet' },
  'No projects yet':         { ka: 'ჯერ პროექტები არაა',    ru: 'Нет проектов',        en: 'No projects yet' },
  'No orders yet':           { ka: 'ჯერ შეკვეთები არაა',    ru: 'Нет заказов',         en: 'No orders yet' },
  'No consultations yet':    { ka: 'ჯერ კონსულტაციები არაა', ru: 'Нет консультаций',    en: 'No consultations yet' },
  'No showrooms yet':        { ka: 'ჯერ შოურუმები არაა',    ru: 'Нет шоурумов',        en: 'No showrooms yet' },
  'No blog posts yet':       { ka: 'ჯერ ბლოგპოსტები არაა',  ru: 'Нет постов',          en: 'No blog posts yet' },

  // ─────────── Dashboard ───────────
  'Welcome to UNION Admin Panel': { ka: 'მოგესალმებით UNION ადმინ პანელში', ru: 'Добро пожаловать в админ UNION', en: 'Welcome to UNION Admin Panel' },
  'Recent Orders':           { ka: 'ბოლო შეკვეთები',         ru: 'Недавние заказы',       en: 'Recent Orders' },
  'Recent Consultations':    { ka: 'ბოლო კონსულტაციები',     ru: 'Недавние консультации', en: 'Recent Consultations' },

  // ─────────── Menu Items ───────────
  'Manage the catalog mega menu categories and sub-items': {
    ka: 'მართე კატალოგის მთავარი მენიუს კატეგორიები და ქვეპუნქტები',
    ru: 'Управление категориями мега-меню и подпунктами',
    en: 'Manage the catalog mega menu categories and sub-items',
  },
  'Column':                  { ka: 'სვეტი',                 ru: 'Колонка',             en: 'Column' },
  'Column 1':                { ka: 'სვეტი 1',               ru: 'Колонка 1',           en: 'Column 1' },
  'Column 2':                { ka: 'სვეტი 2',               ru: 'Колонка 2',           en: 'Column 2' },
  'Column 3':                { ka: 'სვეტი 3',               ru: 'Колонка 3',           en: 'Column 3' },
  'Add Sub-item':            { ka: 'ქვეპუნქტის დამატება',    ru: 'Добавить подпункт',   en: 'Add Sub-item' },
  'No groups yet':           { ka: 'ჯერ ჯგუფები არაა',       ru: 'Групп пока нет',      en: 'No groups yet' },
  'No sidebar links yet':    { ka: 'ჯერ გვერდითი ბმულები არაა', ru: 'Ссылок пока нет',     en: 'No sidebar links yet' },
  'Sidebar Links':           { ka: 'გვერდითი ბმულები',       ru: 'Ссылки в сайдбаре',   en: 'Sidebar Links' },
  'Mega Menu':               { ka: 'მთავარი მენიუ',          ru: 'Мега-меню',           en: 'Mega Menu' },
  'Sidebar':                 { ka: 'გვერდითი ზოლი',          ru: 'Сайдбар',             en: 'Sidebar' },
  'Section':                 { ka: 'სექცია',                ru: 'Раздел',              en: 'Section' },
  'NEW badge':               { ka: 'NEW ნიშანი',            ru: 'Значок NEW',          en: 'NEW badge' },
  'SALE style':              { ka: 'SALE სტილი',            ru: 'Стиль SALE',          en: 'SALE style' },
  'Edit Menu Item':          { ka: 'მენიუს ელემენტის რედაქტირება', ru: 'Редактировать пункт', en: 'Edit Menu Item' },
  'Add Menu Item':           { ka: 'მენიუს ელემენტის დამატება',    ru: 'Добавить пункт меню', en: 'Add Menu Item' },
  'Delete menu item?':       { ka: 'წავშალოთ მენიუს ელემენტი?', ru: 'Удалить пункт меню?', en: 'Delete menu item?' },
  'This will also delete all sub-items under this group. This action cannot be undone.': {
    ka: 'ეს ასევე წაშლის ამ ჯგუფის ყველა ქვეპუნქტს. ქმედების გაუქმება შეუძლებელია.',
    ru: 'Это удалит также все подпункты этой группы. Отменить нельзя.',
    en: 'This will also delete all sub-items under this group. This action cannot be undone.',
  },
  'Link (href)':             { ka: 'ბმული (href)',          ru: 'Ссылка (href)',       en: 'Link (href)' },
  'Select icon...':          { ka: 'აირჩიე ხატულა...',       ru: 'Выберите иконку...',  en: 'Select icon...' },
  'None':                    { ka: 'არცერთი',               ru: 'Нет',                 en: 'None' },

  // ─────────── Products ───────────
  'Product':                 { ka: 'პროდუქტი',              ru: 'Товар',               en: 'Product' },
  'Edit Product':            { ka: 'პროდუქტის რედაქტირება',  ru: 'Редактировать товар', en: 'Edit Product' },
  'Select category':         { ka: 'აირჩიე კატეგორია',       ru: 'Выберите категорию',  en: 'Select category' },
  '— No category —':         { ka: '— კატეგორიის გარეშე —',   ru: '— Без категории —',   en: '— No category —' },

  // ─────────── Banners ───────────
  'Edit Banner':             { ka: 'ბანერის რედაქტირება',    ru: 'Редактировать баннер', en: 'Edit Banner' },
  'Preview':                 { ka: 'გადახედვა',             ru: 'Превью',              en: 'Preview' },

  // ─────────── Orders ───────────
  'Customer':                { ka: 'მომხმარებელი',          ru: 'Клиент',              en: 'Customer' },
  'Total':                   { ka: 'ჯამი',                 ru: 'Итого',               en: 'Total' },
  'Date':                    { ka: 'თარიღი',               ru: 'Дата',                en: 'Date' },
  'View':                    { ka: 'ნახვა',                ru: 'Просмотр',            en: 'View' },
  'View order details and update status': {
    ka: 'ნახე შეკვეთის დეტალები და განაახლე სტატუსი',
    ru: 'Просмотр и обновление статуса заказов',
    en: 'View order details and update status',
  },

  // ─────────── Consultations ───────────
  'View and manage consultation requests': {
    ka: 'ნახე და მართე კონსულტაციის მოთხოვნები',
    ru: 'Просмотр и управление заявками',
    en: 'View and manage consultation requests',
  },
  'Notes':                   { ka: 'შენიშვნები',            ru: 'Заметки',             en: 'Notes' },

  // ─────────── Blog ───────────
  'Manage blog articles':    { ka: 'მართე ბლოგის სტატიები',   ru: 'Управление статьями блога', en: 'Manage blog articles' },
  'Add Blog Post':           { ka: 'სტატიის დამატება',      ru: 'Добавить статью',     en: 'Add Blog Post' },
  'Edit Blog Post':          { ka: 'სტატიის რედაქტირება',    ru: 'Редактировать статью', en: 'Edit Blog Post' },
  'Published':               { ka: 'გამოქვეყნებული',         ru: 'Опубликовано',        en: 'Published' },
  'Draft':                   { ka: 'მონახაზი',              ru: 'Черновик',            en: 'Draft' },

  // ─────────── Showrooms ───────────
  'Manage showroom locations': { ka: 'მართე შოურუმების მისამართები', ru: 'Управление шоурумами', en: 'Manage showroom locations' },
  'Edit Showroom':           { ka: 'შოურუმის რედაქტირება',   ru: 'Редактировать шоурум', en: 'Edit Showroom' },
  'Working hours':           { ka: 'სამუშაო საათები',       ru: 'Часы работы',         en: 'Working hours' },

  // ─────────── Testimonials ───────────
  'Author':                  { ka: 'ავტორი',               ru: 'Автор',               en: 'Author' },
  'Content':                 { ka: 'ტექსტი',               ru: 'Текст',               en: 'Content' },
  'Rating':                  { ka: 'რეიტინგი',             ru: 'Рейтинг',             en: 'Rating' },
  'Edit Testimonial':        { ka: 'მიმოხილვის რედაქტირება', ru: 'Редактировать отзыв', en: 'Edit Testimonial' },

  // ─────────── Settings ───────────
  'Configure site-wide settings': {
    ka: 'მართე საიტის ზოგადი პარამეტრები',
    ru: 'Настройки сайта',
    en: 'Configure site-wide settings',
  },
  'Save Settings':           { ka: 'პარამეტრების შენახვა',   ru: 'Сохранить настройки', en: 'Save Settings' },
  'Logo URL':                { ka: 'ლოგოს URL',             ru: 'URL логотипа',        en: 'Logo URL' },
  'Social Links':            { ka: 'სოც. ქსელები',          ru: 'Соц. сети',           en: 'Social Links' },

  // ─────────── Site Features ───────────
  'Items shown in the home page feature bar (delivery, warranty, etc.)': {
    ka: 'მთავარ გვერდზე ნაჩვენები ელემენტები (მიწოდება, გარანტია...)',
    ru: 'Пункты панели преимуществ на главной (доставка, гарантия...)',
    en: 'Items shown in the home page feature bar (delivery, warranty, etc.)',
  },
  'Edit Feature':            { ka: 'რედაქტირება',          ru: 'Редактировать',       en: 'Edit Feature' },

  // ─────────── Legal pages ───────────
  'Privacy, Terms, Delivery, Warranty, Returns — HTML body supported.': {
    ka: 'კონფიდენციალურობა, წესები, მიწოდება, გარანტია, დაბრუნება — HTML დაშვებულია.',
    ru: 'Конфиденциальность, условия, доставка и т.д. — HTML разрешён.',
    en: 'Privacy, Terms, Delivery, Warranty, Returns — HTML body supported.',
  },

  // ─────────── HMspace ───────────
  'Edit text, images, and sub-items for every section on the HMspace homepage.': {
    ka: 'ჩაასწორე ტექსტი, სურათები და ქვეპუნქტები HMspace-ის მთავარი გვერდის სექციებისთვის.',
    ru: 'Редактируйте текст, изображения и подпункты секций главной HMspace.',
    en: 'Edit text, images, and sub-items for every section on the HMspace homepage.',
  },
  'Portfolio / projects gallery shown on the HMspace landing.': {
    ka: 'პორტფოლიო / პროექტები HMspace-ის მთავარ გვერდზე.',
    ru: 'Портфолио проектов на главной HMspace.',
    en: 'Portfolio / projects gallery shown on the HMspace landing.',
  },
  'New Section':             { ka: 'ახალი სექცია',          ru: 'Новая секция',        en: 'New Section' },

  // ─────────── Home Grid / Door Finishes / Frames / Models ───────────
  'Which top-level categories appear on the home page, in what order, and with what image.': {
    ka: 'რომელი კატეგორიები გამოჩნდეს მთავარ გვერდზე, რა რიგით და რა სურათით.',
    ru: 'Какие категории показывать на главной, в каком порядке и с какой картинкой.',
    en: 'Which top-level categories appear on the home page, in what order, and with what image.',
  },
  'Manage finish groups (VENEER, LACCATO, HPL, etc.) and individual color swatches.': {
    ka: 'მართე მორთულობის ჯგუფები (VENEER, LACCATO, HPL) და ცალკეული ფერის ნიმუშები.',
    ru: 'Управляйте группами отделки (VENEER, LACCATO, HPL) и образцами цветов.',
    en: 'Manage finish groups (VENEER, LACCATO, HPL, etc.) and individual color swatches.',
  },
  'Global pool of {plural} — attach per product in the product editor.': {
    ka: 'გლობალური ფონდი — პროდუქტის რედაქტორში მიაბი კონკრეტულ პროდუქტზე.',
    ru: 'Глобальный пул — привязывайте к товарам в редакторе товаров.',
    en: 'Global pool — attach per product in the product editor.',
  },

  // ─────────── Product Blocks ───────────
  'Sections shown on every product page (global) or every product in a category. For per-product blocks, edit inside the product itself.': {
    ka: 'ყველა პროდუქტის გვერდზე ან კატეგორიის პროდუქტებზე ნაჩვენები სექციები. ცალკეული პროდუქტის ბლოკები — პროდუქტის რედაქტორში.',
    ru: 'Секции на каждом товаре (глобально) или в категории. Блоки для одного товара — в редакторе товара.',
    en: 'Sections shown on every product page (global) or every product in a category. For per-product blocks, edit inside the product itself.',
  },
  'New Block':               { ka: 'ახალი ბლოკი',           ru: 'Новый блок',          en: 'New Block' },
  'Edit block':              { ka: 'ბლოკის რედაქტირება',    ru: 'Редактировать блок',  en: 'Edit block' },
  'New block':               { ka: 'ახალი ბლოკი',           ru: 'Новый блок',          en: 'New block' },

  // ─────────── Login ───────────
  'admin@example.com':       { ka: 'admin@example.com',     ru: 'admin@example.com',   en: 'admin@example.com' },
  'Login failed':            { ka: 'შესვლა ვერ მოხერხდა',   ru: 'Ошибка входа',        en: 'Login failed' },
  'Error checking permissions': { ka: 'უფლებების შემოწმების შეცდომა', ru: 'Ошибка проверки прав', en: 'Error checking permissions' },
  'You do not have admin access': { ka: 'არ გაქვს ადმინ წვდომა', ru: 'У вас нет прав администратора', en: 'You do not have admin access' },
  'Welcome to Admin Panel':  { ka: 'მოგესალმებით ადმინ პანელში', ru: 'Добро пожаловать в админ-панель', en: 'Welcome to Admin Panel' },
  'An error occurred':       { ka: 'მოხდა შეცდომა',         ru: 'Произошла ошибка',    en: 'An error occurred' },
  'Failed to save settings': { ka: 'პარამეტრების შენახვა ვერ მოხერხდა', ru: 'Не удалось сохранить настройки', en: 'Failed to save settings' },
  'Saving...':               { ka: 'შენახვა...',           ru: 'Сохранение...',       en: 'Saving...' },
  'Loading...':              { ka: 'იტვირთება...',         ru: 'Загрузка...',         en: 'Loading...' },

  // ─────────── Multilingual field labels ───────────
  'Title (Georgian)':        { ka: 'სათაური (ქართული)',    ru: 'Заголовок (грузинский)', en: 'Title (Georgian)' },
  'Title (Russian)':         { ka: 'სათაური (რუსული)',     ru: 'Заголовок (русский)', en: 'Title (Russian)' },
  'Title (English)':         { ka: 'სათაური (ინგლისური)',   ru: 'Заголовок (английский)', en: 'Title (English)' },
  'Title (Georgian) *':      { ka: 'სათაური (ქართული) *',   ru: 'Заголовок (грузинский) *', en: 'Title (Georgian) *' },
  'Title (KA)':              { ka: 'სათაური (KA)',         ru: 'Заголовок (KA)',      en: 'Title (KA)' },
  'Title (RU)':              { ka: 'სათაური (RU)',         ru: 'Заголовок (RU)',      en: 'Title (RU)' },
  'Title (EN)':              { ka: 'სათაური (EN)',         ru: 'Заголовок (EN)',      en: 'Title (EN)' },
  'Title (KA) *':            { ka: 'სათაური (KA) *',       ru: 'Заголовок (KA) *',    en: 'Title (KA) *' },
  'Subtitle (Georgian)':     { ka: 'ქვესათაური (ქართული)',  ru: 'Подзаголовок (грузинский)', en: 'Subtitle (Georgian)' },
  'Subtitle (Russian)':      { ka: 'ქვესათაური (რუსული)',   ru: 'Подзаголовок (русский)', en: 'Subtitle (Russian)' },
  'Subtitle (English)':      { ka: 'ქვესათაური (ინგლისური)', ru: 'Подзаголовок (английский)', en: 'Subtitle (English)' },
  'Subtitle (KA)':           { ka: 'ქვესათაური (KA)',      ru: 'Подзаголовок (KA)',   en: 'Subtitle (KA)' },
  'Subtitle (RU)':           { ka: 'ქვესათაური (RU)',      ru: 'Подзаголовок (RU)',   en: 'Subtitle (RU)' },
  'Subtitle (EN)':           { ka: 'ქვესათაური (EN)',      ru: 'Подзаголовок (EN)',   en: 'Subtitle (EN)' },
  'Description (Georgian)':  { ka: 'აღწერა (ქართული)',     ru: 'Описание (грузинский)', en: 'Description (Georgian)' },
  'Description (Russian)':   { ka: 'აღწერა (რუსული)',      ru: 'Описание (русский)',  en: 'Description (Russian)' },
  'Description (English)':   { ka: 'აღწერა (ინგლისური)',    ru: 'Описание (английский)', en: 'Description (English)' },
  'Description (KA)':        { ka: 'აღწერა (KA)',          ru: 'Описание (KA)',       en: 'Description (KA)' },
  'Description (RU)':        { ka: 'აღწერა (RU)',          ru: 'Описание (RU)',       en: 'Description (RU)' },
  'Description (EN)':        { ka: 'აღწერა (EN)',          ru: 'Описание (EN)',       en: 'Description (EN)' },
  'Name (Georgian)':         { ka: 'სახელი (ქართული)',     ru: 'Название (грузинский)', en: 'Name (Georgian)' },
  'Name (Russian)':          { ka: 'სახელი (რუსული)',      ru: 'Название (русский)',  en: 'Name (Russian)' },
  'Name (English)':          { ka: 'სახელი (ინგლისური)',    ru: 'Название (английский)', en: 'Name (English)' },
  'Name (Georgian) *':       { ka: 'სახელი (ქართული) *',    ru: 'Название (грузинский) *', en: 'Name (Georgian) *' },
  'Address (Georgian)':      { ka: 'მისამართი (ქართული)',   ru: 'Адрес (грузинский)',  en: 'Address (Georgian)' },
  'Address (English)':       { ka: 'მისამართი (ინგლისური)', ru: 'Адрес (английский)',  en: 'Address (English)' },
  'Hours (Georgian)':        { ka: 'საათები (ქართული)',    ru: 'Часы (грузинский)',   en: 'Hours (Georgian)' },
  'Hours (English)':         { ka: 'საათები (ინგლისური)',   ru: 'Часы (английский)',   en: 'Hours (English)' },
  'Working Hours (Georgian)':{ ka: 'სამუშაო საათები (ქართული)', ru: 'Часы работы (грузинский)', en: 'Working Hours (Georgian)' },
  'Working Hours (English)': { ka: 'სამუშაო საათები (ინგლისური)', ru: 'Часы работы (английский)', en: 'Working Hours (English)' },
  'Eyebrow (KA)':            { ka: 'მცირე ტექსტი (KA)',    ru: 'Надзаголовок (KA)',   en: 'Eyebrow (KA)' },
  'Eyebrow (RU)':            { ka: 'მცირე ტექსტი (RU)',    ru: 'Надзаголовок (RU)',   en: 'Eyebrow (RU)' },
  'Eyebrow (EN)':            { ka: 'მცირე ტექსტი (EN)',    ru: 'Надзаголовок (EN)',   en: 'Eyebrow (EN)' },
  'Body KA':                 { ka: 'ტექსტი KA',            ru: 'Текст KA',            en: 'Body KA' },
  'Body RU':                 { ka: 'ტექსტი RU',            ru: 'Текст RU',            en: 'Body RU' },
  'Body EN':                 { ka: 'ტექსტი EN',            ru: 'Текст EN',            en: 'Body EN' },
  'Excerpt (Georgian)':      { ka: 'მოკლე აღწერა (ქართული)', ru: 'Краткое описание (грузинский)', en: 'Excerpt (Georgian)' },
  'Excerpt (Russian)':       { ka: 'მოკლე აღწერა (რუსული)',  ru: 'Краткое описание (русский)', en: 'Excerpt (Russian)' },
  'Content (Georgian) *':    { ka: 'შინაარსი (ქართული) *', ru: 'Содержимое (грузинский) *', en: 'Content (Georgian) *' },
  'Content (Russian)':       { ka: 'შინაარსი (რუსული)',    ru: 'Содержимое (русский)', en: 'Content (Russian)' },
  'Button Text (Georgian)':  { ka: 'ღილაკის ტექსტი (ქართული)', ru: 'Текст кнопки (грузинский)', en: 'Button Text (Georgian)' },
  'Button Text (Russian)':   { ka: 'ღილაკის ტექსტი (რუსული)',  ru: 'Текст кнопки (русский)', en: 'Button Text (Russian)' },

  // ─────────── Common form labels ───────────
  'Image URL *':             { ka: 'სურათის URL *',         ru: 'URL изображения *',   en: 'Image URL *' },
  'Slug *':                  { ka: 'სლაგი *',              ru: 'Слаг *',              en: 'Slug *' },
  'Section Key *':           { ka: 'სექციის გასაღები *',   ru: 'Ключ секции *',       en: 'Section Key *' },
  'Featured Image URL':      { ka: 'რჩეული სურათი URL',    ru: 'URL главного изображения', en: 'Featured Image URL' },
  'Banner image URL':        { ka: 'ბანერის სურათის URL',   ru: 'URL изображения баннера', en: 'Banner image URL' },
  'Banner click-through URL':{ ka: 'ბანერის ბმული',         ru: 'URL перехода с баннера', en: 'Banner click-through URL' },
  'Map Embed URL':           { ka: 'რუკის ჩასმის URL',      ru: 'URL карты',           en: 'Map Embed URL' },
  'Google Map embed URL':    { ka: 'Google Maps ჩასმის URL', ru: 'URL встраивания Google Maps', en: 'Google Map embed URL' },
  'Logo URL':                { ka: 'ლოგოს URL',            ru: 'URL логотипа',        en: 'Logo URL' },
  'Home image URL':          { ka: 'მთავარი სურათის URL',   ru: 'URL изображения главной', en: 'Home image URL' },
  'auto-generated':          { ka: 'ავტომატური',           ru: 'авто',                en: 'auto-generated' },
  'auto-generated-from-name': { ka: 'ავტომატური სახელიდან', ru: 'авто-из-названия',   en: 'auto-generated-from-name' },
  'Parent Category':         { ka: 'მშობელი კატეგორია',    ru: 'Родительская категория', en: 'Parent Category' },
  'None (Top level)':        { ka: 'არცერთი (მთავარი)',    ru: 'Нет (верхний уровень)', en: 'None (Top level)' },
  'Select category':         { ka: 'აირჩიე კატეგორია',    ru: 'Выберите категорию',  en: 'Select category' },
  'Show on home page':       { ka: 'ნაჩვენები მთავარზე',   ru: 'Показывать на главной', en: 'Show on home page' },
  'Home sort':               { ka: 'მთავარის რიგი',        ru: 'Порядок главной',     en: 'Home sort' },
  'Home visibility':         { ka: 'მთავარის ხილვადობა',   ru: 'Видимость на главной', en: 'Home visibility' },
  'Category page banner':    { ka: 'კატეგორიის გვერდის ბანერი', ru: 'Баннер страницы категории', en: 'Category page banner' },
  'Optional hero shown above the product grid on /catalog/<slug>.': {
    ka: 'არასავალდებულო ბანერი, რომელიც ნაჩვენებია პროდუქტების ბადის ზემოთ /catalog/<slug>-ზე.',
    ru: 'Необязательный баннер над сеткой товаров на /catalog/<slug>.',
    en: 'Optional hero shown above the product grid on /catalog/<slug>.',
  },

  // ─────────── Page headings & subtitles ───────────
  'Manage blog content':     { ka: 'ბლოგის შინაარსის მართვა', ru: 'Управление блогом', en: 'Manage blog content' },
  'Manage customer orders':  { ka: 'კლიენტის შეკვეთების მართვა', ru: 'Управление заказами клиентов', en: 'Manage customer orders' },
  'Manage consultation requests': { ka: 'კონსულტაციის მოთხოვნების მართვა', ru: 'Управление заявками на консультацию', en: 'Manage consultation requests' },
  'Global contact info, socials, and branding.': {
    ka: 'ზოგადი კონტაქტი, სოც. ქსელები და ბრენდინგი.',
    ru: 'Контакты, соцсети и брендинг.',
    en: 'Global contact info, socials, and branding.',
  },
  "Per-product modules (M01–M15) for furniture configurators (FORMINA-style).": {
    ka: 'პროდუქტისთვის სპეციფიკური მოდულები (M01–M15) ავეჯის კონფიგურატორებისთვის (FORMINA სტილში).',
    ru: 'Модули товара (M01–M15) для конфигуратора мебели (в стиле FORMINA).',
    en: 'Per-product modules (M01–M15) for furniture configurators (FORMINA-style).',
  },

  // ─────────── Cards / sections ───────────
  'Branding':                { ka: 'ბრენდინგი',            ru: 'Брендинг',            en: 'Branding' },
  'Contact':                 { ka: 'კონტაქტი',             ru: 'Контакт',             en: 'Contact' },
  'WhatsApp':                { ka: 'WhatsApp',             ru: 'WhatsApp',            en: 'WhatsApp' },
  'Save settings':           { ka: 'პარამეტრების შენახვა',  ru: 'Сохранить настройки', en: 'Save settings' },
  'Save Notes':              { ka: 'შენიშვნების შენახვა',   ru: 'Сохранить заметки',   en: 'Save Notes' },
  'Add internal notes...':   { ka: 'შიდა შენიშვნები...',   ru: 'Внутренние заметки...', en: 'Add internal notes...' },
  'Order Details':           { ka: 'შეკვეთის დეტალები',    ru: 'Детали заказа',       en: 'Order Details' },
  'Order Items':             { ka: 'შეკვეთის ელემენტები',  ru: 'Позиции заказа',      en: 'Order Items' },
  'Order ID':                { ka: 'შეკვეთის ID',          ru: 'ID заказа',           en: 'Order ID' },
  'Customer Name':           { ka: 'კლიენტის სახელი',      ru: 'Имя клиента',         en: 'Customer Name' },
  'Total Amount':            { ka: 'საერთო თანხა',         ru: 'Общая сумма',         en: 'Total Amount' },
  'Shipping Address':        { ka: 'მიწოდების მისამართი',   ru: 'Адрес доставки',      en: 'Shipping Address' },
  'Qty':                     { ka: 'რაოდ.',               ru: 'Кол-во',              en: 'Qty' },
  'Order status updated':    { ka: 'შეკვეთის სტატუსი განახლდა', ru: 'Статус заказа обновлён', en: 'Order status updated' },
  'Consultation Details':    { ka: 'კონსულტაციის დეტალები', ru: 'Детали консультации', en: 'Consultation Details' },
  'Consultation updated':    { ka: 'კონსულტაცია განახლდა',  ru: 'Консультация обновлена', en: 'Consultation updated' },
  'Consultation deleted':    { ka: 'კონსულტაცია წაიშალა',   ru: 'Консультация удалена', en: 'Consultation deleted' },

  // ─────────── Toast messages ───────────
  'Settings saved':          { ka: 'პარამეტრები შენახულია', ru: 'Настройки сохранены', en: 'Settings saved' },
  'Banner created':          { ka: 'ბანერი შექმნილია',     ru: 'Баннер создан',       en: 'Banner created' },
  'Banner updated':          { ka: 'ბანერი განახლდა',      ru: 'Баннер обновлён',     en: 'Banner updated' },
  'Banner deleted':          { ka: 'ბანერი წაიშალა',       ru: 'Баннер удалён',       en: 'Banner deleted' },
  'Category created':        { ka: 'კატეგორია შექმნილია',  ru: 'Категория создана',   en: 'Category created' },
  'Category updated':        { ka: 'კატეგორია განახლდა',    ru: 'Категория обновлена', en: 'Category updated' },
  'Category deleted':        { ka: 'კატეგორია წაიშალა',     ru: 'Категория удалена',   en: 'Category deleted' },
  'Post created':            { ka: 'პოსტი შექმნილია',      ru: 'Пост создан',         en: 'Post created' },
  'Post updated':            { ka: 'პოსტი განახლდა',       ru: 'Пост обновлён',       en: 'Post updated' },
  'Post deleted':            { ka: 'პოსტი წაიშალა',        ru: 'Пост удалён',         en: 'Post deleted' },
  'Page created':            { ka: 'გვერდი შექმნილია',     ru: 'Страница создана',    en: 'Page created' },
  'Page updated':            { ka: 'გვერდი განახლდა',      ru: 'Страница обновлена',  en: 'Page updated' },
  'Page deleted':            { ka: 'გვერდი წაიშალა',       ru: 'Страница удалена',    en: 'Page deleted' },
  'Project created':         { ka: 'პროექტი შექმნილია',    ru: 'Проект создан',       en: 'Project created' },
  'Project updated':         { ka: 'პროექტი განახლდა',     ru: 'Проект обновлён',     en: 'Project updated' },
  'Project deleted':         { ka: 'პროექტი წაიშალა',      ru: 'Проект удалён',       en: 'Project deleted' },
  'Section created':         { ka: 'სექცია შექმნილია',     ru: 'Секция создана',      en: 'Section created' },
  'Section updated':         { ka: 'სექცია განახლდა',      ru: 'Секция обновлена',    en: 'Section updated' },
  'Section deleted':         { ka: 'სექცია წაიშალა',       ru: 'Секция удалена',      en: 'Section deleted' },
  'Feature created':         { ka: 'უპირატესობა შექმნილია', ru: 'Преимущество создано', en: 'Feature created' },
  'Feature updated':         { ka: 'უპირატესობა განახლდა',  ru: 'Преимущество обновлено', en: 'Feature updated' },
  'Feature deleted':         { ka: 'უპირატესობა წაიშალა',   ru: 'Преимущество удалено', en: 'Feature deleted' },
  'Showroom created':        { ka: 'შოურუმი შექმნილია',    ru: 'Шоурум создан',       en: 'Showroom created' },
  'Showroom updated':        { ka: 'შოურუმი განახლდა',     ru: 'Шоурум обновлён',     en: 'Showroom updated' },
  'Showroom deleted':        { ka: 'შოურუმი წაიშალა',      ru: 'Шоурум удалён',       en: 'Showroom deleted' },
  'Testimonial created':     { ka: 'მიმოხილვა შექმნილია',  ru: 'Отзыв создан',        en: 'Testimonial created' },
  'Testimonial updated':     { ka: 'მიმოხილვა განახლდა',    ru: 'Отзыв обновлён',      en: 'Testimonial updated' },
  'Testimonial deleted':     { ka: 'მიმოხილვა წაიშალა',     ru: 'Отзыв удалён',        en: 'Testimonial deleted' },
  'Block saved':             { ka: 'ბლოკი შენახულია',      ru: 'Блок сохранён',       en: 'Block saved' },
  'Block deleted':           { ka: 'ბლოკი წაიშალა',        ru: 'Блок удалён',         en: 'Block deleted' },
  'Menu item saved':         { ka: 'მენიუს ელემენტი შენახულია', ru: 'Пункт меню сохранён', en: 'Menu item saved' },
  'Menu item deleted':       { ka: 'მენიუს ელემენტი წაიშალა',   ru: 'Пункт меню удалён',  en: 'Menu item deleted' },

  // ─────────── Confirms ───────────
  'Products in this category will be unassigned.': {
    ka: 'ამ კატეგორიის პროდუქტებს კატეგორია მოშორდება.',
    ru: 'Товары этой категории останутся без категории.',
    en: 'Products in this category will be unassigned.',
  },
  'Are you sure?':           { ka: 'დარწმუნებული ხარ?',    ru: 'Вы уверены?',         en: 'Are you sure?' },
  'This action cannot be undone.': {
    ka: 'ქმედების გაუქმება შეუძლებელია.',
    ru: 'Это действие нельзя отменить.',
    en: 'This action cannot be undone.',
  },

  // ─────────── Status badges / values ───────────
  'Banners — hero carousel':   { ka: 'ბანერები — მთავარი კარუსელი', ru: 'Баннеры — карусель героя', en: 'Banners — hero carousel' },
  'Union — hero carousel':     { ka: 'Union — მთავარი კარუსელი',    ru: 'Union — карусель героя',   en: 'Union — hero carousel' },
  'HMspace — hero':            { ka: 'HMspace — ბანერი',           ru: 'HMspace — баннер',         en: 'HMspace — hero' },
  'Main accents':              { ka: 'მთავარი აქცენტები',          ru: 'Главные акценты',          en: 'Main accents' },
  'Trending':                  { ka: 'ტრენდები',                  ru: 'Тренды',                   en: 'Trending' },
  'Projects':                  { ka: 'პროექტები',                 ru: 'Проекты',                  en: 'Projects' },
  'Custom section':            { ka: 'სხვა სექცია',               ru: 'Произвольная секция',      en: 'Custom section' },
  '(no title)':                { ka: '(უსათაურო)',               ru: '(без заголовка)',          en: '(no title)' },
  '-- choose --':              { ka: '-- აირჩიე --',             ru: '-- выберите --',           en: '-- choose --' },
  '— Select —':                { ka: '— აირჩიე —',                ru: '— Выберите —',             en: '— Select —' },
  'none':                      { ka: 'არცერთი',                   ru: 'нет',                      en: 'none' },

  // ─────────── Empty / placeholder messages ───────────
  'No top-level categories yet. Create them in the Categories section first.': {
    ka: 'ჯერ მთავარი კატეგორიები არაა. ჯერ Categories სექციაში შექმენი.',
    ru: 'Категорий верхнего уровня пока нет. Сначала создайте их в разделе «Категории».',
    en: 'No top-level categories yet. Create them in the Categories section first.',
  },
  "No products with category_type='furniture' yet. Create one in Products and set its Category type.": {
    ka: "ჯერ category_type='furniture' პროდუქტები არაა. შექმენი Products-ში და დააყენე Category type.",
    ru: "Товаров с category_type='furniture' пока нет. Создайте товар и укажите тип категории.",
    en: "No products with category_type='furniture' yet. Create one in Products and set its Category type.",
  },
  'No global blocks.':         { ka: 'გლობალური ბლოკები არაა.',  ru: 'Глобальных блоков нет.',   en: 'No global blocks.' },
  'No category blocks.':       { ka: 'კატეგორიული ბლოკები არაა.', ru: 'Блоков категорий нет.',    en: 'No category blocks.' },
  'No posts yet':              { ka: 'ჯერ პოსტები არაა',         ru: 'Постов пока нет',          en: 'No posts yet' },
  'Global blocks':             { ka: 'გლობალური ბლოკები',        ru: 'Глобальные блоки',         en: 'Global blocks' },
  'Category blocks':           { ka: 'კატეგორიის ბლოკები',       ru: 'Блоки категорий',          en: 'Category blocks' },
  'Shown on every product page.': {
    ka: 'ნაჩვენებია ყველა პროდუქტის გვერდზე.',
    ru: 'Показывается на каждой странице товара.',
    en: 'Shown on every product page.',
  },
  'Shown on every product in a selected category.': {
    ka: 'ნაჩვენებია არჩეული კატეგორიის ყველა პროდუქტზე.',
    ru: 'Показывается на каждом товаре выбранной категории.',
    en: 'Shown on every product in a selected category.',
  },

  // ─────────── Menu items / Mega menu ───────────
  'Add Post':                  { ka: 'პოსტის დამატება',           ru: 'Добавить пост',            en: 'Add Post' },
  'Edit Post':                 { ka: 'პოსტის რედაქტირება',        ru: 'Редактировать пост',       en: 'Edit Post' },
  'Edit Section':              { ka: 'სექციის რედაქტირება',       ru: 'Редактировать секцию',     en: 'Edit Section' },

  // ─────────── Misc ───────────
  'Tbilisi':                   { ka: 'თბილისი',                   ru: 'Тбилиси',                  en: 'Tbilisi' },
  'Year':                      { ka: 'წელი',                      ru: 'Год',                      en: 'Year' },
  'Location':                  { ka: 'ლოკაცია',                   ru: 'Местоположение',           en: 'Location' },
  'Location / Year':           { ka: 'ლოკაცია / წელი',            ru: 'Место / Год',              en: 'Location / Year' },
  'Show':                      { ka: 'ჩვენება',                   ru: 'Показать',                 en: 'Show' },
  'Hide':                      { ka: 'დამალვა',                   ru: 'Скрыть',                   en: 'Hide' },
  'Yes':                       { ka: 'კი',                        ru: 'Да',                       en: 'Yes' },
  'No':                        { ka: 'არა',                       ru: 'Нет',                      en: 'No' },

  // ─────────── Error boundary ───────────
  'Something broke in the admin UI': {
    ka: 'ადმინ პანელში რაღაც გატყდა',
    ru: 'Что-то сломалось в админ-панели',
    en: 'Something broke in the admin UI',
  },
  'The page crashed while rendering. The error has been logged to the browser console. Try the buttons below — if it keeps happening, copy the error from DevTools and send it over.': {
    ka: 'გვერდი ჩამოვარდა რენდერისას. შეცდომა დაფიქსირდა ბრაუზერის კონსოლში. სცადე ღილაკები ქვემოთ — თუ გრძელდება, გადააკოპირე შეცდომა DevTools-დან.',
    ru: 'Страница упала при рендеринге. Ошибка записана в консоль браузера. Попробуйте кнопки ниже — если повторяется, скопируйте ошибку из DevTools и пришлите.',
    en: 'The page crashed while rendering. The error has been logged to the browser console. Try the buttons below — if it keeps happening, copy the error from DevTools and send it over.',
  },
  'Try again':                 { ka: 'ხელახლა ცდა',               ru: 'Попробовать снова',        en: 'Try again' },
  'Go to dashboard':            { ka: 'პანელზე დაბრუნება',         ru: 'На главную панели',        en: 'Go to dashboard' },
  'Reload page':               { ka: 'გვერდის გადატვირთვა',       ru: 'Перезагрузить страницу',   en: 'Reload page' },

  // ─────────── Configurator ───────────
  'Door Configurator':         { ka: 'კარის კონფიგურატორი',       ru: 'Конфигуратор дверей',      en: 'Door Configurator' },
  'Enable variant dimensions and pick which options from the global pool apply to this product. Leave a dimension disabled if this product has no variants on it.': {
    ka: 'ჩართე ვარიანტის განზომილებები და აირჩიე რომელი ოფციები უნდა მოქმედებდეს ამ პროდუქტზე. დატოვე გათიშული, თუ ვარიანტები არ აქვს.',
    ru: 'Включите измерения вариантов и выберите, какие опции из общего пула применимы к этому товару. Оставьте измерение выключенным, если у товара нет таких вариантов.',
    en: 'Enable variant dimensions and pick which options from the global pool apply to this product. Leave a dimension disabled if this product has no variants on it.',
  },

  // ─────────── Module / Furniture ───────────
  'Add Module':                { ka: 'მოდულის დამატება',          ru: 'Добавить модуль',          en: 'Add Module' },
  'Parent product':            { ka: 'მშობელი პროდუქტი',          ru: 'Родительский товар',       en: 'Parent product' },
  'Pick a furniture-typed product': { ka: 'აირჩიე ავეჯის ტიპის პროდუქტი', ru: 'Выберите товар типа «мебель»', en: 'Pick a furniture-typed product' },

  // ─────────── Testimonials extra ───────────
  'Author Name *':             { ka: 'ავტორის სახელი *',          ru: 'Имя автора *',             en: 'Author Name *' },
  'Author Title':              { ka: 'ავტორის თანამდებობა',       ru: 'Должность автора',         en: 'Author Title' },
  'e.g. CEO, Designer':        { ka: 'მაგ.: CEO, დიზაინერი',      ru: 'напр.: CEO, дизайнер',     en: 'e.g. CEO, Designer' },
  'Avatar URL':                { ka: 'ავატარის URL',              ru: 'URL аватара',              en: 'Avatar URL' },
  'Rating (1-5)':              { ka: 'რეიტინგი (1–5)',            ru: 'Рейтинг (1–5)',            en: 'Rating (1-5)' },
};

/**
 * Translate an English source string. Falls back to the source if no entry exists,
 * so partial translations never break the UI.
 */
export function useAdminT() {
  const { language } = useLanguage();
  return (source: string): string => {
    const entry = adminDict[source];
    if (!entry) return source;
    if (language === 'ka') return entry.ka || source;
    if (language === 'ru') return entry.ru || source;
    return entry.en || source;
  };
}

/** Read the current admin language outside of React (for class components / error boundaries). */
export function getStoredAdminLanguage(): 'ka' | 'ru' | 'en' {
  if (typeof window === 'undefined') return 'ka';
  try {
    const stored = window.localStorage.getItem('union.language');
    if (stored === 'ka' || stored === 'ru' || stored === 'en') return stored;
  } catch {
    // ignore
  }
  return 'ka';
}

/** Translate a source string outside of React; uses the stored language. */
export function tAdmin(source: string, lang?: 'ka' | 'ru' | 'en'): string {
  const language = lang ?? getStoredAdminLanguage();
  const entry = adminDict[source];
  if (!entry) return source;
  if (language === 'ka') return entry.ka || source;
  if (language === 'ru') return entry.ru || source;
  return entry.en || source;
}
