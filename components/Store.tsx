import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS, STRIPE_CHECKOUT_URL } from '../constants';

// Icons
const ShoppingBagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
);

export const Store: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section id="store" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-4xl font-bold mb-4">Digital Assets</h2>
            <p className="text-secondary max-w-xl">
              Professional templates, guides, and systems to accelerate your freelance career.
              Instant download after purchase.
            </p>
          </div>
          
          {/* Cart Trigger */}
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-3 bg-white border border-muted rounded-full hover:shadow-lg transition-all duration-300 group text-primary"
            aria-label="Open cart"
          >
            <ShoppingBagIcon />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map(product => (
            <div key={product.id} className="group bg-panel border border-muted rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-48 overflow-hidden relative">
                 <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                 <div className="absolute top-3 left-3 flex gap-2">
                   {product.tags.map(tag => (
                     <span key={tag} className="text-[10px] uppercase font-bold tracking-wider bg-white/90 px-2 py-1 rounded-sm text-primary backdrop-blur-sm">
                       {tag}
                     </span>
                   ))}
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-lg leading-tight mb-2">{product.title}</h3>
                <p className="text-sm text-secondary mb-6 flex-1">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-display font-bold text-xl">${product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-primary text-white p-2 rounded-full hover:bg-accent hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg"
                    aria-label={`Add ${product.title} to cart`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Widget / Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-panel shadow-2xl transform transition-transform duration-500 z-50 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-muted flex justify-between items-center bg-bg/50 backdrop-blur-sm">
          <h3 className="font-display font-bold text-xl">Your Cart</h3>
          <button onClick={() => setIsCartOpen(false)} className="text-secondary hover:text-primary p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-secondary opacity-60">
              <ShoppingBagIcon />
              <p className="mt-4 text-sm">Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm leading-tight">{item.title}</h4>
                    <div className="flex justify-between items-center mt-2">
                       <span className="text-accent font-bold">${item.price} x {item.quantity}</span>
                       <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                         <TrashIcon />
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-muted bg-bg/30">
          <div className="flex justify-between items-center mb-6">
            <span className="text-secondary">Total</span>
            <span className="font-display font-bold text-2xl">${cartTotal}</span>
          </div>
          <a 
            href={cart.length > 0 ? STRIPE_CHECKOUT_URL : '#'}
            target={cart.length > 0 ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`block w-full py-4 text-center font-bold tracking-wide rounded-xl transition-all duration-300 ${cart.length > 0 ? 'bg-accent text-white hover:bg-accent-hover shadow-lg hover:shadow-accent/40' : 'bg-muted text-secondary cursor-not-allowed'}`}
          >
            Checkout Securely
          </a>
          <p className="text-[10px] text-center text-secondary mt-3">
            Secure payment processing via Stripe. Opens in a new tab.
          </p>
        </div>
      </div>
      
      {/* Backdrop for Cart */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-40" onClick={() => setIsCartOpen(false)} />
      )}
    </section>
  );
};