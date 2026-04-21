import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

// HMspace Pages
import HMspaceLanding from "./pages/HMspaceLanding";
import StrategyMicrosite from "./pages/StrategyMicrosite";

// Union Pages
import UnionIndex from "./pages/union/Index";
import UnionCatalog from "./pages/union/Catalog";
import UnionProductDetail from "./pages/union/ProductDetail";
import UnionSale from "./pages/union/Sale";
import UnionBlog from "./pages/union/Blog";
import UnionBlogPost from "./pages/union/BlogPost";
import UnionAbout from "./pages/union/About";
import UnionShowrooms from "./pages/union/Showrooms";
import UnionDesigners from "./pages/union/Designers";
import UnionContact from "./pages/union/Contact";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminCategories from "./pages/admin/Categories";
import AdminOrders from "./pages/admin/Orders";
import AdminBanners from "./pages/admin/Banners";
import AdminBlog from "./pages/admin/Blog";
import AdminConsultations from "./pages/admin/Consultations";
import AdminShowrooms from "./pages/admin/Showrooms";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminSettings from "./pages/admin/Settings";
import AdminProductsImport from "./pages/admin/ProductsImport";
import AdminMenuItems from "./pages/admin/MenuItems";
import AdminSiteFeatures from "./pages/admin/SiteFeatures";
import AdminHMSections from "./pages/admin/HMSections";
import AdminHMProjects from "./pages/admin/HMProjects";
import AdminLegalPages from "./pages/admin/LegalPages";
import AdminHomeCategories from "./pages/admin/HomeCategories";

// Shared pages (will use Union layout)
import Checkout from "./pages/Checkout";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Delivery from "./pages/Delivery";
import Warranty from "./pages/Warranty";
import Returns from "./pages/Returns";
import Careers from "./pages/Careers";
import Partnership from "./pages/Partnership";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Routes>
              {/* HMspace main landing */}
              <Route path="/" element={<HMspaceLanding />} />

              {/* Strategy Microsite */}
              <Route path="/strategy" element={<StrategyMicrosite />} />
              
              {/* Admin Panel */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/products/import" element={<AdminProductsImport />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/menu-items" element={<AdminMenuItems />} />
              <Route path="/admin/banners" element={<AdminBanners />} />
              <Route path="/admin/blog" element={<AdminBlog />} />
              <Route path="/admin/consultations" element={<AdminConsultations />} />
              <Route path="/admin/showrooms" element={<AdminShowrooms />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              <Route path="/admin/site-features" element={<AdminSiteFeatures />} />
              <Route path="/admin/home-categories" element={<AdminHomeCategories />} />
              <Route path="/admin/hmspace-sections" element={<AdminHMSections />} />
              <Route path="/admin/hmspace-projects" element={<AdminHMProjects />} />
              <Route path="/admin/legal-pages" element={<AdminLegalPages />} />
              
              {/* UNION platform */}
              <Route path="/union" element={<UnionIndex />} />
              <Route path="/union/catalog" element={<UnionCatalog />} />
              <Route path="/union/catalog/:category" element={<UnionCatalog />} />
              <Route path="/union/catalog/:category/:subcategory" element={<UnionCatalog />} />
              <Route path="/union/product/:slug" element={<UnionProductDetail />} />
              <Route path="/union/sale" element={<UnionSale />} />
              <Route path="/union/blog" element={<UnionBlog />} />
              <Route path="/union/blog/:slug" element={<UnionBlogPost />} />
              <Route path="/union/about" element={<UnionAbout />} />
              <Route path="/union/showrooms" element={<UnionShowrooms />} />
              <Route path="/union/designers" element={<UnionDesigners />} />
              <Route path="/union/contact" element={<UnionContact />} />
              <Route path="/union/checkout" element={<Checkout />} />
              <Route path="/union/privacy" element={<Privacy />} />
              <Route path="/union/terms" element={<Terms />} />
              <Route path="/union/delivery" element={<Delivery />} />
              <Route path="/union/warranty" element={<Warranty />} />
              <Route path="/union/returns" element={<Returns />} />
              <Route path="/union/careers" element={<Careers />} />
              <Route path="/union/partnership" element={<Partnership />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
