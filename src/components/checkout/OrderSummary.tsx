import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';

export function OrderSummary() {
  const { items, totalPrice } = useCart();
  const { language } = useLanguage();

  const shippingCost = 0; // Free shipping
  const total = totalPrice + shippingCost;

  return (
    <div className="bg-secondary rounded-lg p-6 space-y-4 sticky top-24">
      <h3 className="text-lg font-semibold">
        {language === 'ka' ? 'შეკვეთის დეტალები' : 'Order Summary'}
      </h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium line-clamp-2">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.quantity} x {item.price.toLocaleString()} ₾
              </p>
            </div>
            <p className="text-sm font-medium">
              {(item.quantity * item.price).toLocaleString()} ₾
            </p>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            {language === 'ka' ? 'პროდუქტები' : 'Subtotal'}
          </span>
          <span>{totalPrice.toLocaleString()} ₾</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            {language === 'ka' ? 'მიწოდება' : 'Shipping'}
          </span>
          <span className="text-success">
            {language === 'ka' ? 'უფასო' : 'Free'}
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between text-lg font-semibold">
        <span>{language === 'ka' ? 'ჯამი' : 'Total'}</span>
        <span className="text-primary">{total.toLocaleString()} ₾</span>
      </div>
    </div>
  );
}
