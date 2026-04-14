import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleSubmit = async (data: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    notes?: string;
  }) => {
    if (items.length === 0) return;

    setIsSubmitting(true);
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: data.customerName,
          customer_email: data.customerEmail,
          customer_phone: data.customerPhone,
          shipping_address: data.shippingAddress,
          notes: data.notes || null,
          total_amount: totalPrice,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Success
      setOrderId(order.id);
      setOrderComplete(true);
      clearCart();

      toast({
        title: language === 'ka' ? 'შეკვეთა გაფორმებულია!' : 'Order placed!',
        description: language === 'ka' 
          ? 'მალე დაგიკავშირდებით' 
          : 'We will contact you soon',
      });
    } catch (error) {
      console.error('Order error:', error);
      toast({
        title: language === 'ka' ? 'შეცდომა' : 'Error',
        description: language === 'ka' 
          ? 'გთხოვთ სცადოთ თავიდან' 
          : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbItems = [
    { label: language === 'ka' ? 'შეკვეთა' : 'Checkout' },
  ];

  if (orderComplete) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <CheckCircle className="h-20 w-20 text-success mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">
            {language === 'ka' ? 'შეკვეთა მიღებულია!' : 'Order Received!'}
          </h1>
          <p className="text-muted-foreground mb-2">
            {language === 'ka' 
              ? 'თქვენი შეკვეთა წარმატებით გაფორმდა' 
              : 'Your order has been successfully placed'}
          </p>
          {orderId && (
            <p className="text-sm text-muted-foreground mb-8">
              {language === 'ka' ? 'შეკვეთის ნომერი:' : 'Order ID:'} {orderId.slice(0, 8).toUpperCase()}
            </p>
          )}
          <Button onClick={() => navigate('/')}>
            {language === 'ka' ? 'მთავარ გვერდზე დაბრუნება' : 'Back to Home'}
          </Button>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'ka' ? 'კალათა ცარიელია' : 'Your cart is empty'}
          </h1>
          <Button onClick={() => navigate('/catalog')}>
            {language === 'ka' ? 'კატალოგში დაბრუნება' : 'Back to Catalog'}
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-3xl font-bold mb-8">
          {language === 'ka' ? 'შეკვეთის გაფორმება' : 'Checkout'}
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
