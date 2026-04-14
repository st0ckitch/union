import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useCart, CartItem } from '@/contexts/CartContext';

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** If provided, the modal treats this as a single-product quick-order */
  singleProduct?: {
    id?: string;
    name: string;
    price: number;
    image?: string;
  };
}

const ORDER_NOTIFY_EMAIL = 'artyomananov@gmail.com';

async function sendOrderEmail(payload: {
  fullName: string;
  phone: string;
  address: string;
  idNumber: string;
  notes: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  total: number;
}) {
  // FormSubmit.co — free email relay, requires a one-time confirmation
  // the first time the target address receives a message.
  const response = await fetch(`https://formsubmit.co/ajax/${ORDER_NOTIFY_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: `New UNION order — ${payload.fullName}`,
      _template: 'table',
      'Full name': payload.fullName,
      Phone: payload.phone,
      Address: payload.address,
      'ID number': payload.idNumber,
      Notes: payload.notes || '—',
      Items: payload.items
        .map((it) => `${it.name} × ${it.quantity} = ${(it.price * it.quantity).toFixed(2)} ₾`)
        .join('\n'),
      Total: `${payload.total.toFixed(2)} ₾`,
    }),
  });
  if (!response.ok) {
    throw new Error(`Email relay responded ${response.status}`);
  }
}

export function OrderModal({ open, onOpenChange, singleProduct }: OrderModalProps) {
  const { items: cartItems, totalPrice, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    idNumber: '',
    notes: '',
  });

  const items: CartItem[] = singleProduct
    ? [
        {
          id: singleProduct.id ?? 'single',
          name: singleProduct.name,
          price: singleProduct.price,
          image: singleProduct.image ?? '',
          quantity: 1,
        },
      ]
    : cartItems;

  const total = singleProduct ? singleProduct.price : totalPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setSubmitting(true);

    // 1. Try to persist the order in Supabase (best-effort)
    try {
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          customer_name: form.fullName,
          customer_phone: form.phone,
          customer_email: `${form.idNumber}@order.local`,
          shipping_address: form.address,
          total_amount: total,
          notes: `ID: ${form.idNumber}\n${form.notes}`,
          status: 'pending',
        } as any)
        .select()
        .single();

      if (!error && order) {
        const orderItemsPayload = items.map((it) => ({
          order_id: order.id,
          product_id: it.id.length === 36 ? it.id : null,
          product_name: it.name,
          quantity: it.quantity,
          unit_price: it.price,
          total_price: it.price * it.quantity,
        }));
        await supabase.from('order_items').insert(orderItemsPayload as any);
      }
    } catch (err) {
      console.warn('[order] Supabase persist failed — proceeding with email only', err);
    }

    // 2. Send the email notification
    try {
      await sendOrderEmail({
        fullName: form.fullName,
        phone: form.phone,
        address: form.address,
        idNumber: form.idNumber,
        notes: form.notes,
        items: items.map((it) => ({ name: it.name, price: it.price, quantity: it.quantity })),
        total,
      });
      setSuccess(true);
      toast.success('Order submitted — we will contact you shortly');
      if (!singleProduct) clearCart();
    } catch (err: any) {
      toast.error(`Could not send order: ${err?.message ?? 'unknown error'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSuccess(false);
      setForm({ fullName: '', phone: '', address: '', idNumber: '', notes: '' });
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? onOpenChange(v) : close())}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {success ? 'Order received' : 'Complete your order'}
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="py-10 text-center">
            <CheckCircle2 className="h-14 w-14 text-green-600 mx-auto mb-4" />
            <p className="text-base mb-2">Thank you, {form.fullName || 'friend'}!</p>
            <p className="text-sm text-muted-foreground mb-6">
              We have received your request and a consultant will contact you shortly at {form.phone}.
            </p>
            <Button onClick={close}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Items summary */}
            <div className="bg-neutral-50 rounded-lg p-4 text-sm">
              {items.length === 0 ? (
                <p className="text-muted-foreground">Your cart is empty.</p>
              ) : (
                <>
                  {items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between gap-3 py-1">
                      <span className="truncate">
                        {it.name}{' '}
                        <span className="text-muted-foreground">× {it.quantity}</span>
                      </span>
                      <span className="font-medium">{(it.price * it.quantity).toFixed(2)} ₾</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-neutral-200 font-semibold">
                    <span>Total</span>
                    <span>{total.toFixed(2)} ₾</span>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full name *</Label>
                <Input
                  id="fullName"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="address">Delivery address *</Label>
              <Input
                id="address"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="idNumber">Identification number *</Label>
              <Input
                id="idNumber"
                required
                value={form.idNumber}
                onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting || items.length === 0}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...
                  </>
                ) : (
                  'Place order'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
