export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      banners: {
        Row: {
          button_text_en: string | null
          button_text_ka: string | null
          created_at: string
          id: string
          image_url: string
          is_active: boolean | null
          link_url: string | null
          section: string | null
          sort_order: number | null
          subtitle_en: string | null
          subtitle_ka: string | null
          title_en: string | null
          title_ka: string
          updated_at: string
        }
        Insert: {
          button_text_en?: string | null
          button_text_ka?: string | null
          created_at?: string
          id?: string
          image_url: string
          is_active?: boolean | null
          link_url?: string | null
          section?: string | null
          sort_order?: number | null
          subtitle_en?: string | null
          subtitle_ka?: string | null
          title_en?: string | null
          title_ka: string
          updated_at?: string
        }
        Update: {
          button_text_en?: string | null
          button_text_ka?: string | null
          created_at?: string
          id?: string
          image_url?: string
          is_active?: boolean | null
          link_url?: string | null
          section?: string | null
          sort_order?: number | null
          subtitle_en?: string | null
          subtitle_ka?: string | null
          title_en?: string | null
          title_ka?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          content_en: string | null
          content_ka: string
          created_at: string
          excerpt_en: string | null
          excerpt_ka: string | null
          featured_image: string | null
          id: string
          is_published: boolean | null
          published_at: string | null
          slug: string
          title_en: string | null
          title_ka: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content_en?: string | null
          content_ka: string
          created_at?: string
          excerpt_en?: string | null
          excerpt_ka?: string | null
          featured_image?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          title_en?: string | null
          title_ka: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content_en?: string | null
          content_ka?: string
          created_at?: string
          excerpt_en?: string | null
          excerpt_ka?: string | null
          featured_image?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          title_en?: string | null
          title_ka?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description_ka: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name_en: string | null
          name_ka: string
          parent_id: string | null
          slug: string
          sort_order: number | null
          updated_at: string
          home_visible: boolean | null
          home_sort_order: number | null
          home_image_url: string | null
        }
        Insert: {
          created_at?: string
          description_ka?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name_en?: string | null
          name_ka: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string
          home_visible?: boolean | null
          home_sort_order?: number | null
          home_image_url?: string | null
        }
        Update: {
          created_at?: string
          description_ka?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name_en?: string | null
          name_ka?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string
          home_visible?: boolean | null
          home_sort_order?: number | null
          home_image_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          created_at: string
          email: string | null
          id: string
          message: string | null
          name: string
          notes: string | null
          phone: string
          status: Database["public"]["Enums"]["consultation_status"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name: string
          notes?: string | null
          phone: string
          status?: Database["public"]["Enums"]["consultation_status"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          notes?: string | null
          phone?: string
          status?: Database["public"]["Enums"]["consultation_status"] | null
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: string | null
          product_name: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id?: string | null
          product_name: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string | null
          product_name?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          id: string
          notes: string | null
          shipping_address: string
          status: Database["public"]["Enums"]["order_status"] | null
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          id?: string
          notes?: string | null
          shipping_address: string
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          id?: string
          notes?: string | null
          shipping_address?: string
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string
          description_en: string | null
          description_ka: string | null
          id: string
          images: string[] | null
          is_active: boolean | null
          is_featured: boolean | null
          is_new: boolean | null
          name_en: string | null
          name_ka: string
          price: number
          sale_price: number | null
          slug: string
          specifications: Json | null
          stock_quantity: number | null
          updated_at: string
          has_otdelka_variants: boolean | null
          has_korobka_variants: boolean | null
          has_model_variants: boolean | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description_en?: string | null
          description_ka?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          is_new?: boolean | null
          name_en?: string | null
          name_ka: string
          price: number
          sale_price?: number | null
          slug: string
          specifications?: Json | null
          stock_quantity?: number | null
          updated_at?: string
          has_otdelka_variants?: boolean | null
          has_korobka_variants?: boolean | null
          has_model_variants?: boolean | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description_en?: string | null
          description_ka?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          is_new?: boolean | null
          name_en?: string | null
          name_ka?: string
          price?: number
          sale_price?: number | null
          slug?: string
          specifications?: Json | null
          stock_quantity?: number | null
          updated_at?: string
          has_otdelka_variants?: boolean | null
          has_korobka_variants?: boolean | null
          has_model_variants?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      showrooms: {
        Row: {
          address_en: string | null
          address_ka: string
          created_at: string
          email: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          map_embed_url: string | null
          name_en: string | null
          name_ka: string
          phone: string | null
          sort_order: number | null
          working_hours_en: string | null
          working_hours_ka: string | null
        }
        Insert: {
          address_en?: string | null
          address_ka: string
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          map_embed_url?: string | null
          name_en?: string | null
          name_ka: string
          phone?: string | null
          sort_order?: number | null
          working_hours_en?: string | null
          working_hours_ka?: string | null
        }
        Update: {
          address_en?: string | null
          address_ka?: string
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          map_embed_url?: string | null
          name_en?: string | null
          name_ka?: string
          phone?: string | null
          sort_order?: number | null
          working_hours_en?: string | null
          working_hours_ka?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_name: string
          author_title: string | null
          avatar_url: string | null
          content_en: string | null
          content_ka: string
          created_at: string
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          rating: number | null
        }
        Insert: {
          author_name: string
          author_title?: string | null
          avatar_url?: string | null
          content_en?: string | null
          content_ka: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          rating?: number | null
        }
        Update: {
          author_name?: string
          author_title?: string | null
          avatar_url?: string | null
          content_en?: string | null
          content_ka?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          rating?: number | null
        }
        Relationships: []
      }
      site_features: {
        Row: {
          id: string
          icon: string
          title_ka: string
          title_ru: string | null
          title_en: string | null
          description_ka: string | null
          description_ru: string | null
          description_en: string | null
          sort_order: number | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          icon: string
          title_ka: string
          title_ru?: string | null
          title_en?: string | null
          description_ka?: string | null
          description_ru?: string | null
          description_en?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          icon?: string
          title_ka?: string
          title_ru?: string | null
          title_en?: string | null
          description_ka?: string | null
          description_ru?: string | null
          description_en?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      hmspace_sections: {
        Row: {
          id: string
          section_key: string
          eyebrow_ka: string | null
          eyebrow_ru: string | null
          eyebrow_en: string | null
          title_ka: string | null
          title_ru: string | null
          title_en: string | null
          subtitle_ka: string | null
          subtitle_ru: string | null
          subtitle_en: string | null
          body_ka: string | null
          body_ru: string | null
          body_en: string | null
          image_url: string | null
          secondary_image_url: string | null
          cta_label_ka: string | null
          cta_label_ru: string | null
          cta_label_en: string | null
          cta_url: string | null
          cta_secondary_label_ka: string | null
          cta_secondary_label_ru: string | null
          cta_secondary_label_en: string | null
          cta_secondary_url: string | null
          items: Json | null
          is_active: boolean | null
          sort_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          section_key: string
          eyebrow_ka?: string | null
          eyebrow_ru?: string | null
          eyebrow_en?: string | null
          title_ka?: string | null
          title_ru?: string | null
          title_en?: string | null
          subtitle_ka?: string | null
          subtitle_ru?: string | null
          subtitle_en?: string | null
          body_ka?: string | null
          body_ru?: string | null
          body_en?: string | null
          image_url?: string | null
          secondary_image_url?: string | null
          cta_label_ka?: string | null
          cta_label_ru?: string | null
          cta_label_en?: string | null
          cta_url?: string | null
          cta_secondary_label_ka?: string | null
          cta_secondary_label_ru?: string | null
          cta_secondary_label_en?: string | null
          cta_secondary_url?: string | null
          items?: Json | null
          is_active?: boolean | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          section_key?: string
          eyebrow_ka?: string | null
          eyebrow_ru?: string | null
          eyebrow_en?: string | null
          title_ka?: string | null
          title_ru?: string | null
          title_en?: string | null
          subtitle_ka?: string | null
          subtitle_ru?: string | null
          subtitle_en?: string | null
          body_ka?: string | null
          body_ru?: string | null
          body_en?: string | null
          image_url?: string | null
          secondary_image_url?: string | null
          cta_label_ka?: string | null
          cta_label_ru?: string | null
          cta_label_en?: string | null
          cta_url?: string | null
          cta_secondary_label_ka?: string | null
          cta_secondary_label_ru?: string | null
          cta_secondary_label_en?: string | null
          cta_secondary_url?: string | null
          items?: Json | null
          is_active?: boolean | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      hmspace_projects: {
        Row: {
          id: string
          title_ka: string
          title_ru: string | null
          title_en: string | null
          description_ka: string | null
          description_ru: string | null
          description_en: string | null
          image_url: string
          link_url: string | null
          location: string | null
          year: string | null
          sort_order: number | null
          is_active: boolean | null
          is_featured: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title_ka: string
          title_ru?: string | null
          title_en?: string | null
          description_ka?: string | null
          description_ru?: string | null
          description_en?: string | null
          image_url: string
          link_url?: string | null
          location?: string | null
          year?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          is_featured?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title_ka?: string
          title_ru?: string | null
          title_en?: string | null
          description_ka?: string | null
          description_ru?: string | null
          description_en?: string | null
          image_url?: string
          link_url?: string | null
          location?: string | null
          year?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          is_featured?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      legal_pages: {
        Row: {
          id: string
          slug: string
          title_ka: string
          title_ru: string | null
          title_en: string | null
          body_ka: string | null
          body_ru: string | null
          body_en: string | null
          is_active: boolean | null
          sort_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title_ka: string
          title_ru?: string | null
          title_en?: string | null
          body_ka?: string | null
          body_ru?: string | null
          body_en?: string | null
          is_active?: boolean | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title_ka?: string
          title_ru?: string | null
          title_en?: string | null
          body_ka?: string | null
          body_ru?: string | null
          body_en?: string | null
          is_active?: boolean | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      door_otdelka_groups: {
        Row: {
          id: string
          code: string | null
          name_ka: string
          name_ru: string | null
          name_en: string | null
          description_ka: string | null
          description_ru: string | null
          description_en: string | null
          sort_order: number | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code?: string | null
          name_ka: string
          name_ru?: string | null
          name_en?: string | null
          description_ka?: string | null
          description_ru?: string | null
          description_en?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string | null
          name_ka?: string
          name_ru?: string | null
          name_en?: string | null
          description_ka?: string | null
          description_ru?: string | null
          description_en?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      door_otdelka_options: {
        Row: {
          id: string
          group_id: string
          code: string | null
          label_ka: string
          label_ru: string | null
          label_en: string | null
          swatch_image_url: string | null
          preview_image_url: string | null
          price_modifier: number | null
          sort_order: number | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          group_id: string
          code?: string | null
          label_ka: string
          label_ru?: string | null
          label_en?: string | null
          swatch_image_url?: string | null
          preview_image_url?: string | null
          price_modifier?: number | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          code?: string | null
          label_ka?: string
          label_ru?: string | null
          label_en?: string | null
          swatch_image_url?: string | null
          preview_image_url?: string | null
          price_modifier?: number | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "door_otdelka_options_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "door_otdelka_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      door_korobka_options: {
        Row: {
          id: string
          code: string | null
          name_ka: string
          name_ru: string | null
          name_en: string | null
          description_ka: string | null
          description_ru: string | null
          description_en: string | null
          image_url: string | null
          preview_image_url: string | null
          price_modifier: number | null
          sort_order: number | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code?: string | null
          name_ka: string
          name_ru?: string | null
          name_en?: string | null
          description_ka?: string | null
          description_ru?: string | null
          description_en?: string | null
          image_url?: string | null
          preview_image_url?: string | null
          price_modifier?: number | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string | null
          name_ka?: string
          name_ru?: string | null
          name_en?: string | null
          description_ka?: string | null
          description_ru?: string | null
          description_en?: string | null
          image_url?: string | null
          preview_image_url?: string | null
          price_modifier?: number | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      door_model_options: {
        Row: {
          id: string
          code: string | null
          name_ka: string
          name_ru: string | null
          name_en: string | null
          description_ka: string | null
          description_ru: string | null
          description_en: string | null
          image_url: string | null
          preview_image_url: string | null
          price_modifier: number | null
          sort_order: number | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code?: string | null
          name_ka: string
          name_ru?: string | null
          name_en?: string | null
          description_ka?: string | null
          description_ru?: string | null
          description_en?: string | null
          image_url?: string | null
          preview_image_url?: string | null
          price_modifier?: number | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string | null
          name_ka?: string
          name_ru?: string | null
          name_en?: string | null
          description_ka?: string | null
          description_ru?: string | null
          description_en?: string | null
          image_url?: string | null
          preview_image_url?: string | null
          price_modifier?: number | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_otdelka_options: {
        Row: {
          id: string
          product_id: string
          otdelka_option_id: string
          is_default: boolean | null
          sort_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          otdelka_option_id: string
          is_default?: boolean | null
          sort_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          otdelka_option_id?: string
          is_default?: boolean | null
          sort_order?: number | null
          created_at?: string
        }
        Relationships: []
      }
      product_korobka_options: {
        Row: {
          id: string
          product_id: string
          korobka_option_id: string
          is_default: boolean | null
          sort_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          korobka_option_id: string
          is_default?: boolean | null
          sort_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          korobka_option_id?: string
          is_default?: boolean | null
          sort_order?: number | null
          created_at?: string
        }
        Relationships: []
      }
      product_model_options: {
        Row: {
          id: string
          product_id: string
          model_option_id: string
          is_default: boolean | null
          sort_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          model_option_id: string
          is_default?: boolean | null
          sort_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          model_option_id?: string
          is_default?: boolean | null
          sort_order?: number | null
          created_at?: string
        }
        Relationships: []
      }
      product_content_blocks: {
        Row: {
          id: string
          scope: 'global' | 'category' | 'product'
          product_id: string | null
          category_id: string | null
          block_type: 'specs_list' | 'image_gallery' | 'technical_diagram' | 'cta_tiles' | 'variants_carousel' | 'text_with_image' | 'contact_cta' | 'faq_list' | 'rich_text'
          sort_order: number | null
          is_active: boolean | null
          title_ka: string | null
          title_ru: string | null
          title_en: string | null
          subtitle_ka: string | null
          subtitle_ru: string | null
          subtitle_en: string | null
          body_ka: string | null
          body_ru: string | null
          body_en: string | null
          image_url: string | null
          secondary_image_url: string | null
          data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          scope: 'global' | 'category' | 'product'
          product_id?: string | null
          category_id?: string | null
          block_type: 'specs_list' | 'image_gallery' | 'technical_diagram' | 'cta_tiles' | 'variants_carousel' | 'text_with_image' | 'contact_cta' | 'faq_list' | 'rich_text'
          sort_order?: number | null
          is_active?: boolean | null
          title_ka?: string | null
          title_ru?: string | null
          title_en?: string | null
          subtitle_ka?: string | null
          subtitle_ru?: string | null
          subtitle_en?: string | null
          body_ka?: string | null
          body_ru?: string | null
          body_en?: string | null
          image_url?: string | null
          secondary_image_url?: string | null
          data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          scope?: 'global' | 'category' | 'product'
          product_id?: string | null
          category_id?: string | null
          block_type?: 'specs_list' | 'image_gallery' | 'technical_diagram' | 'cta_tiles' | 'variants_carousel' | 'text_with_image' | 'contact_cta' | 'faq_list' | 'rich_text'
          sort_order?: number | null
          is_active?: boolean | null
          title_ka?: string | null
          title_ru?: string | null
          title_en?: string | null
          subtitle_ka?: string | null
          subtitle_ru?: string | null
          subtitle_en?: string | null
          body_ka?: string | null
          body_ru?: string | null
          body_en?: string | null
          image_url?: string | null
          secondary_image_url?: string | null
          data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      consultation_status: "new" | "contacted" | "completed" | "cancelled"
      order_status:
        | "pending"
        | "confirmed"
        | "shipped"
        | "delivered"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      consultation_status: ["new", "contacted", "completed", "cancelled"],
      order_status: [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
      ],
    },
  },
} as const
