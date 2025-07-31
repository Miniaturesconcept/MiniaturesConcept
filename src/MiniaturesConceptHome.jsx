import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import './index.css';

import allFactions from './data/factions.json'; // Load all MESBG factions from external file later

const categories = ['All', 'Good', 'Evil'];

export default function MiniaturesConceptHome() {
  const [selected, setSelected] = useState('All');
  const [factions, setFactions] = useState(allFactions);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [search, setSearch] = useState('');

  const filtered = factions.filter(f =>
    (selected === 'All' || f.category === selected) &&
    f.name.toLowerCase().includes(search.toLowerCase())
  );

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
    window.open('https://www.vinted.pt/member/265418008', '_blank');
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + parseFloat(item.price.replace('€', '')) * item.quantity, 0).toFixed(2);
  };

  useEffect(() => {
    document.body.style.backgroundImage = "url('https://i.imgur.com/WcTSPOk.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.title = 'MiniaturesConcept | Middle-earth 3D Resin Miniatures';
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  return (
    <div className="p-6 text-white">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">MiniaturesConcept</h1>
        <p className="text-lg text-gray-300">Premium 3D Resin Miniatures for the Middle-earth Strategy Battle Game</p>
      </header>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {categories.map(cat => (
          <Button
            key={cat}
            className={`rounded-full px-4 py-2 ${selected === cat ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-200'}`}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </Button>
        ))}
        <input
          type="text"
          placeholder="Search armies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-4 px-3 py-2 rounded text-black"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(item => (
          <Card key={item.name} className="bg-gray-900 shadow-xl rounded-xl">
            <img src={item.image} alt={item.name} className="rounded-t-xl h-48 w-full object-cover" />
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
              <p className="text-sm text-gray-300 mb-2">{item.description}</p>
              <p className="font-bold mb-2">{item.price}</p>
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="number"
                  min="1"
                  value={quantities[item.name] || 1}
                  onChange={(e) => handleQuantityChange(item.name, parseInt(e.target.value))}
                  className="w-16 px-2 py-1 rounded text-black"
                />
                <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-400">No items in cart.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-700">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between py-2">
                  <span>{item.quantity}x {item.name}</span>
                  <button className="text-red-500 hover:underline" onClick={() => handleRemoveFromCart(index)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="text-right text-lg font-bold text-white mt-4">
              Total: €{calculateTotal()}
            </div>
            <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={handleCheckout}>
              Checkout on Vinted
            </Button>
          </>
        )}
      </div>

      <footer className="mt-12 text-center text-sm text-gray-400">
        <p>© 2025 MiniaturesConcept • Custom 3D Resin Miniatures for MESBG</p>
        <p>Contact: miniaturesconcept@gmail.com</p>
      </footer>
    </div>
  );
}

