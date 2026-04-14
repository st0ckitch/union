

# UNION Website 100% Replica Implementation

## Overview

Based on the reference screenshots you provided, I'll restructure the project so that:
1. **HMspace** remains the main landing page at `/`
2. **UNION** becomes accessible via a navbar link on HMspace
3. The UNION platform (`/union`) will be an exact visual replica of the reference screenshots

---

## Current Issues Identified

Comparing the current implementation to your reference screenshots:

| Element | Current State | Reference (To Match) |
|---------|--------------|---------------------|
| Header style | Black with simple layout | White background with black text, gold "35 лет" badge |
| Hero banner | Dark teal gradient | Dark charcoal/black with prominent date "до 31.01.26" |
| Products section title | Georgian text | "Двери и мебель UNION" style layout |
| Quick links icons | Card style | Circular icons with arrows |
| Testimonials | Quote cards | Video thumbnails with celebrity photos and overlay text |
| Article preview | Two cards | Full-width dark overlaid images with play buttons |
| Mega menu | Dark sidebar | White background with yellow sidebar header |
| Footer | Multi-column | Detailed multi-row with bank/payment logos |

---

## Implementation Plan

### Phase 1: HMspace Navbar with UNION Link

**File: `src/pages/HMspaceLanding.tsx`**
- Add a navigation bar at the top with "UNION" as a prominent link
- Keep the hero and platform cards sections
- The UNION card will link to `/union`

### Phase 2: UNION Header Redesign

**File: `src/components/union/UnionHeader.tsx`**
- Change header background to **white** (not black)
- Add the UNION logo in **dark teal/black**
- Add the **"35 лет уверенного превосходства"** gold badge
- Navigation items: КАТАЛОГ, ШОУ-РУМЫ, ПОКУПАТЕЛЯМ, ДИЗАЙНЕРАМ, ПОЛЕЗНОЕ, АКЦИИ %, О КОМПАНИИ, КОНТАКТЫ
- **АКЦИИ %** in yellow/gold color

### Phase 3: UNION Mega Menu Update

**File: `src/components/union/UnionMegaMenu.tsx`**
- White/light background (matching reference)
- Left sidebar with **yellow "Ассортимент UNION"** header
- Categories: В наличии, На заказ из Италии, Акции, SALE, Для застройщиков
- Main grid with category icons and subcategories
- **NEW** badges in orange/red where applicable

### Phase 4: Hero Banner Redesign

**File: `src/components/union/UnionHeroBanner.tsx`**
- Dark background with prominent text: **"УСПЕЙ КУПИТЬ!"** and **"ПО ЦЕНАМ 2025 года"**
- Date badge: **"до 31.01.26"** in styled box
- "ДВЕРИ И МЕБЕЛЬ" subtitle
- CTA button: **"ВСЕ АКЦИИ"**

### Phase 5: Featured Products Section

**File: `src/components/union/FeaturedProducts.tsx`**
- Section title: **"Двери и мебель UNION"**
- 4 product cards with images and category labels
- "В КАТАЛОГ" centered button below

### Phase 6: Quick Links Bar Redesign

**File: `src/components/union/QuickLinksBar.tsx`**
- Three circular icon cards matching reference:
  - **"В наличии >"** with package icon
  - **"Акции >"** with sale tag icon  
  - **"Отзывы >"** with star icon
- Clean card design with subtle backgrounds

### Phase 7: Trends Section

**File: `src/components/union/TrendsSection.tsx`**
- Section title: **"Тренды"**
- 3 product/trend cards with overlay labels
- Links row below: **Портфолио, YouTube, Рассылка**

### Phase 8: Testimonials (Stars About Us)

**File: `src/components/union/TestimonialsSection.tsx`**
- Section title: **"Звезды о нас"**
- 3 video thumbnail cards with:
  - Celebrity photos as backgrounds
  - Overlay text: "ДВЕРИ UNION В ОФИСЕ КСЕНИИ СОБЧАК", etc.
  - Play button overlay
  - Caption text below

### Phase 9: Consultation CTA

**File: `src/components/union/ConsultationCTA.tsx`**
- Two columns layout:
  - **"Консультация >"** with WhatsApp icon
  - **"Обзор >"** with video/document icon

### Phase 10: Article Preview Section

**File: `src/components/union/ArticlePreview.tsx`**
- Full-width dark image cards with overlay text
- **"Почему стоит выбирать двери нестандартных размеров?"**
- **"Как сделать гардеробную и не допустить ошибок?"**
- Play/video icons
- Carousel arrows

### Phase 11: About Company Section

**File: `src/components/union/AboutCompanySection.tsx`**
- Dark background section
- Company info with image
- Quick links: **Рецензии, Блог, Советы, TV сюжет, Карьера**

### Phase 12: Footer Redesign

**File: `src/components/union/UnionFooter.tsx`**
- Multi-column layout matching reference
- Category links organized by type
- Contact information
- Payment/bank partner logos
- Social media icons
- Copyright and legal links

---

## Technical Details

### Color Palette Update (index.css)

```css
/* UNION specific colors - white header mode */
--union-header-bg: 0 0% 100%;
--union-header-text: 0 0% 10%;
--union-accent-gold: 45 100% 50%;
--union-sale-yellow: 48 100% 50%;
--union-new-badge: 0 100% 50%;
```

### Georgian Translations

All text will be in Georgian to match your requirements:
- "УСПЕЙ КУПИТЬ!" → "მოასწარი ყიდვა!"
- "ПО ЦЕНАМ 2025 года" → "2025 წლის ფასებით"
- "Двери и мебель UNION" → "კარები და ავეჯი UNION"
- "В наличии" → "მარაგშია"
- "Акции" → "აქცია"
- "Отзывы" → "შეფასებები"

### File Changes Summary

| File | Action |
|------|--------|
| `src/pages/HMspaceLanding.tsx` | Add navbar with UNION link |
| `src/components/union/UnionHeader.tsx` | Redesign to white background |
| `src/components/union/UnionMegaMenu.tsx` | Match reference layout exactly |
| `src/components/union/UnionHeroBanner.tsx` | Match reference banner design |
| `src/components/union/FeaturedProducts.tsx` | Update layout and styling |
| `src/components/union/QuickLinksBar.tsx` | Circular icon cards |
| `src/components/union/TrendsSection.tsx` | Match reference layout |
| `src/components/union/TestimonialsSection.tsx` | Video thumbnails with overlays |
| `src/components/union/ConsultationCTA.tsx` | Two-column CTA design |
| `src/components/union/ArticlePreview.tsx` | Full-width dark image cards |
| `src/components/union/AboutCompanySection.tsx` | Dark section with links |
| `src/components/union/UnionFooter.tsx` | Detailed multi-row footer |
| `src/index.css` | Add UNION-specific color variables |

---

## Outcome

After implementation:
- HMspace landing page will have a navbar with "UNION" link
- Clicking UNION navigates to `/union`
- The UNION platform will be a pixel-perfect replica of the reference screenshots in Georgian

