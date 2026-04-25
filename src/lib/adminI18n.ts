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
