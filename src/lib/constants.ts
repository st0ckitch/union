// Georgian translations and constants

export const SITE_NAME = "იუნიონ";
export const SITE_NAME_EN = "UNION";

export const NAV_LINKS = {
  home: { ka: "მთავარი", en: "Home", path: "/" },
  catalog: { ka: "კატალოგი", en: "Catalog", path: "/catalog" },
  about: { ka: "ჩვენს შესახებ", en: "About Us", path: "/about" },
  showrooms: { ka: "შოურუმები", en: "Showrooms", path: "/showrooms" },
  designers: { ka: "დიზაინერებისთვის", en: "For Designers", path: "/designers" },
  sale: { ka: "აქცია", en: "Sale", path: "/sale" },
  blog: { ka: "ბლოგი", en: "Blog", path: "/blog" },
  contact: { ka: "კონტაქტი", en: "Contact", path: "/contact" },
};

export const CATEGORIES = {
  doors: {
    ka: "კარები",
    en: "Doors",
    slug: "doors",
    subcategories: [
      { ka: "შიდა კარები", en: "Interior Doors", slug: "interior-doors" },
      { ka: "შესასვლელი კარები", en: "Entrance Doors", slug: "entrance-doors" },
      { ka: "სრიალა კარები", en: "Sliding Doors", slug: "sliding-doors" },
      { ka: "შუშის კარები", en: "Glass Doors", slug: "glass-doors" },
      { ka: "ხის კარები", en: "Wooden Doors", slug: "wooden-doors" },
    ],
  },
  furniture: {
    ka: "ავეჯი",
    en: "Furniture",
    slug: "furniture",
    subcategories: [
      { ka: "კარადები", en: "Wardrobes", slug: "wardrobes" },
      { ka: "მაგიდები", en: "Tables", slug: "tables" },
      { ka: "თაროები", en: "Shelves", slug: "shelves" },
      { ka: "კომოდები", en: "Dressers", slug: "dressers" },
      { ka: "საწოლები", en: "Beds", slug: "beds" },
    ],
  },
  accessories: {
    ka: "აქსესუარები",
    en: "Accessories",
    slug: "accessories",
    subcategories: [
      { ka: "სახელურები", en: "Handles", slug: "handles" },
      { ka: "ფურნიტურა", en: "Fittings", slug: "fittings" },
      { ka: "საკეტები", en: "Locks", slug: "locks" },
      { ka: "ამორტიზატორები", en: "Dampers", slug: "dampers" },
    ],
  },
  panels: {
    ka: "კედლის პანელები",
    en: "Wall Panels",
    slug: "wall-panels",
    subcategories: [
      { ka: "ტიხრები", en: "Partitions", slug: "partitions" },
      { ka: "დეკორატიული პანელები", en: "Decorative Panels", slug: "decorative-panels" },
      { ka: "აკუსტიკური პანელები", en: "Acoustic Panels", slug: "acoustic-panels" },
    ],
  },
};

export const CONTACT_INFO = {
  phone: "+995 32 2 XX XX XX",
  email: "info@union.ge",
  address: {
    ka: "თბილისი, საქართველო",
    en: "Tbilisi, Georgia",
  },
  workingHours: {
    ka: "ორშ-შაბ: 10:00 - 19:00",
    en: "Mon-Sat: 10:00 - 19:00",
  },
  whatsapp: "+995599123456",
};

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/uniongeorgia",
  instagram: "https://instagram.com/uniongeorgia",
  youtube: "https://youtube.com/uniongeorgia",
};

export const FOOTER_LINKS = {
  company: {
    title: { ka: "კომპანია", en: "Company" },
    links: [
      { ka: "ჩვენს შესახებ", en: "About Us", path: "/about" },
      { ka: "შოურუმები", en: "Showrooms", path: "/showrooms" },
      { ka: "კარიერა", en: "Careers", path: "/careers" },
      { ka: "პარტნიორობა", en: "Partnership", path: "/partnership" },
    ],
  },
  support: {
    title: { ka: "მხარდაჭერა", en: "Support" },
    links: [
      { ka: "კონტაქტი", en: "Contact", path: "/contact" },
      { ka: "მიწოდება", en: "Delivery", path: "/delivery" },
      { ka: "გარანტია", en: "Warranty", path: "/warranty" },
      { ka: "დაბრუნება", en: "Returns", path: "/returns" },
    ],
  },
  legal: {
    title: { ka: "იურიდიული", en: "Legal" },
    links: [
      { ka: "კონფიდენციალურობა", en: "Privacy Policy", path: "/privacy" },
      { ka: "წესები და პირობები", en: "Terms & Conditions", path: "/terms" },
    ],
  },
};

export const UI_TEXT = {
  addToCart: { ka: "კალათაში დამატება", en: "Add to Cart" },
  buyNow: { ka: "ყიდვა", en: "Buy Now" },
  viewDetails: { ka: "დეტალები", en: "View Details" },
  viewAll: { ka: "ყველას ნახვა", en: "View All" },
  inStock: { ka: "მარაგშია", en: "In Stock" },
  outOfStock: { ka: "არ არის მარაგში", en: "Out of Stock" },
  new: { ka: "ახალი", en: "NEW" },
  sale: { ka: "ფასდაკლება", en: "SALE" },
  search: { ka: "ძიება", en: "Search" },
  searchPlaceholder: { ka: "მოძებნე პროდუქტი...", en: "Search products..." },
  cart: { ka: "კალათა", en: "Cart" },
  checkout: { ka: "შეკვეთა", en: "Checkout" },
  total: { ka: "ჯამი", en: "Total" },
  quantity: { ka: "რაოდენობა", en: "Quantity" },
  remove: { ka: "წაშლა", en: "Remove" },
  continueShopping: { ka: "შოპინგის გაგრძელება", en: "Continue Shopping" },
  emptyCart: { ka: "კალათა ცარიელია", en: "Your cart is empty" },
  consultation: { ka: "კონსულტაცია", en: "Consultation" },
  requestCallback: { ka: "დამირეკეთ", en: "Request Callback" },
  name: { ka: "სახელი", en: "Name" },
  phone: { ka: "ტელეფონი", en: "Phone" },
  email: { ka: "ელ-ფოსტა", en: "Email" },
  message: { ka: "შეტყობინება", en: "Message" },
  send: { ka: "გაგზავნა", en: "Send" },
  sending: { ka: "იგზავნება...", en: "Sending..." },
  success: { ka: "წარმატებით!", en: "Success!" },
  error: { ka: "შეცდომა", en: "Error" },
  loading: { ka: "იტვირთება...", en: "Loading..." },
  currency: "₾",
  priceFormat: (price: number) => `${price.toLocaleString()} ₾`,
};

export const HERO_SLIDES = [
  {
    id: 1,
    title: { ka: "პრემიუმ კარები", en: "Premium Doors" },
    subtitle: { ka: "იტალიური ხარისხი თქვენს სახლში", en: "Italian Quality for Your Home" },
    buttonText: { ka: "კატალოგის ნახვა", en: "View Catalog" },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    link: "/catalog/doors",
  },
  {
    id: 2,
    title: { ka: "თანამედროვე ავეჯი", en: "Modern Furniture" },
    subtitle: { ka: "დიზაინი და ფუნქციონალობა", en: "Design and Functionality" },
    buttonText: { ka: "აღმოაჩინე", en: "Discover" },
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80",
    link: "/catalog/furniture",
  },
  {
    id: 3,
    title: { ka: "სეზონური ფასდაკლება", en: "Seasonal Sale" },
    subtitle: { ka: "50%-მდე ფასდაკლება", en: "Up to 50% Off" },
    buttonText: { ka: "შეთავაზებები", en: "View Offers" },
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80",
    link: "/sale",
  },
];

export const FEATURES = [
  {
    icon: "Truck",
    title: { ka: "უფასო მიწოდება", en: "Free Delivery" },
    description: { ka: "თბილისის მასშტაბით", en: "Across Tbilisi" },
  },
  {
    icon: "Shield",
    title: { ka: "გარანტია", en: "Warranty" },
    description: { ka: "2 წლიანი გარანტია", en: "2 Year Warranty" },
  },
  {
    icon: "CreditCard",
    title: { ka: "განვადება", en: "Installments" },
    description: { ka: "0%-იანი განვადება", en: "0% Interest" },
  },
  {
    icon: "Headphones",
    title: { ka: "24/7 მხარდაჭერა", en: "24/7 Support" },
    description: { ka: "პროფესიონალური კონსულტაცია", en: "Professional Consultation" },
  },
];
