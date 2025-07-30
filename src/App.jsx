// MESBG Miniatures Website – Master Deployment Edition

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { ShoppingCart, CheckCircle, Trash, Menu, X } from 'lucide-react';

const initialFactions = [
  { name: 'Gondor', description: 'Minas Tirith warriors, heroes, and defenders of the West.', price: '€7.00', image: 'https://images.unsplash.com/photo-1587329310686-fcdc37e6f629' },
  { name: 'Rohan', description: 'Royal Guard, Helm Hammerhand, and valiant cavalry.', price: '€7.00', image: 'https://images.unsplash.com/photo-1607082349250-86b6c2e8b6d6' },
  { name: 'Dol Guldur', description: 'The Necromancer and twisted spirits of southern Mirkwood.', price: '€7.00', image: 'https://images.unsplash.com/photo-1583173200803-0a7f2d179d99' }
];

const categories = ['All', 'Good', 'Evil'];

export default function MiniaturesConceptHome() {
  const [selected, setSelected] = useState('All');
  const [factions, setFactions] = useState(initialFactions);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = selected === 'All' ? factions : selected === 'Good'
    ? factions.filter(f => ['Gondor', 'Rohan'].includes(f.name))
    : factions.filter(f => ['Dol Guldur'].includes(f.name));

  const handleAddToCart = (item) => {
    const quantity = quantities[item.name] || 1;
    setCart([...cart, { ...item, quantity }]);
  };

  const handleQuantityChange = (name, qty) => {
    setQuantities({ ...quantities, [name]: qty });
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    window.open("https://www.vinted.pt/member/269541000", "_blank");
  };

  useEffect(() => {
    document.body.style.backgroundImage = "url('https://wallpapers.com/images/hd/lotr-hd-background-1920-x-1080-ptzmd3wa51cv1xlj.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.title = "MiniaturesConcept | Middle-earth 3D Resin Miniatures";
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black/60 to-black/90 text-white">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">MiniaturesConcept</h1>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <nav className={`md:flex gap-4 ${menuOpen ? 'block' : 'hidden'} md:block`}> 
          {categories.map(cat => (
            <Button key={cat} variant="outline" onClick={() => setSelected(cat)}>{cat}</Button>
          ))}
        </nav>
      </header>

      <section className="px-4 py-8 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-extrabold mb-8 drop-shadow">Explore Factions of Middle-earth</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <Card key={index} className="bg-white text-black">
              <img src={item.image} alt={item.name} className="h-48 w-full object-cover rounded-t" />
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                <p className="text-sm mb-2">{item.description}</p>
                <p className="font-bold mb-2">{item.price}</p>
                <input type="number" min="1" value={quantities[item.name] || 1} onChange={e => handleQuantityChange(item.name, parseInt(e.target.value))} className="w-16 p-1 mb-2 border rounded" />
                <Button className="w-full" onClick={() => handleAddToCart(item)}>
                  <ShoppingCart className="mr-2 w-4 h-4" /> Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {cart.length > 0 && (
        <aside className="fixed bottom-4 right-4 bg-white text-black p-4 rounded shadow-xl w-80 z-50">
          <h3 className="text-lg font-bold mb-2">Your Cart</h3>
          <ul className="text-sm space-y-2 max-h-40 overflow-auto">
            {cart.map((item, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{item.name} × {item.quantity}</span>
                <button onClick={() => handleRemoveFromCart(i)}><Trash className="w-4 h-4 text-red-500" /></button>
              </li>
            ))}
          </ul>
          <Button className="mt-4 w-full bg-green-600 text-white" onClick={handleCheckout}>
            <CheckCircle className="mr-2 w-4 h-4" /> Checkout via Vinted
          </Button>
        </aside>
      )}

      <footer className="bg-black/80 text-center text-sm text-gray-400 py-6 mt-10">
        <p>© 2025 MiniaturesConcept · Custom 3D Resin Miniatures for MESBG · Built with passion in Middle-earth</p>
        <p>Contact: miniaturesconcept@gmail.com</p>
      </footer>
    </main>
  );
}
