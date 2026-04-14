import { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { UI_TEXT } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { OrderModal } from '@/components/union/OrderModal';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const { t } = useLanguage();
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="font-semibold">{t(UI_TEXT.cart)}</span>
                  {totalItems > 0 && (
                    <span className="text-sm text-muted-foreground">
                      ({totalItems})
                    </span>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={closeCart}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-2">{t(UI_TEXT.emptyCart)}</p>
                    <Button onClick={closeCart} asChild>
                      <Link to="/catalog">{t(UI_TEXT.continueShopping)}</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 bg-secondary rounded-lg"
                      >
                        {/* Product image */}
                        <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {item.salePrice ? (
                              <>
                                <span className="text-sale font-bold">
                                  {UI_TEXT.priceFormat(item.salePrice)}
                                </span>
                                <span className="text-sm text-muted-foreground line-through">
                                  {UI_TEXT.priceFormat(item.price)}
                                </span>
                              </>
                            ) : (
                              <span className="font-bold">
                                {UI_TEXT.priceFormat(item.price)}
                              </span>
                            )}
                          </div>

                          {/* Quantity controls */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t p-4 space-y-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>{t(UI_TEXT.total)}:</span>
                    <span>{UI_TEXT.priceFormat(totalPrice)}</span>
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      setOrderOpen(true);
                    }}
                  >
                    {t(UI_TEXT.checkout)}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={closeCart}
                    asChild
                  >
                    <Link to="/union/catalog">{t(UI_TEXT.continueShopping)}</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
      <OrderModal
        open={orderOpen}
        onOpenChange={(v) => {
          setOrderOpen(v);
          if (!v) closeCart();
        }}
      />
    </AnimatePresence>
  );
}
