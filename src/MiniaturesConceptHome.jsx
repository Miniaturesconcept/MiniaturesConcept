import React, { useState, useEffect } from 'react';

const initialFactions = [
  {
    name: 'Gondor',
    description: 'Minas Tirith warriors, heroes, and defenders of the West.',
    price: '€7.00',
    image: 'https://images.unsplash.com/photo-1587323910686-fcdc37e6f629'
  },
  {
    name: 'Rohan',
    description: 'Royal Guard, Helm Hammerhand, and valiant cavalry.',
    price: '€7.00',
    image: 'https://images.unsplash.com/photo-1607082349250-86b6c2eb8dd6'
  },
  {
    name: 'Dol Guldur',
    description: 'The Necromancer and twisted spirits of southern Mirkwood.',
    price: '€7.00',
    image: 'https://images.unsplash.com/photo-1583173208803-0a7f2d179d99'
  }
];

const categories = ['All', 'Good', 'Evil'];

export default function MiniaturesConceptHome() {
  const [selected, setSelected] = useState('All');
  const [factions, setFactions] = useState(initialFactions);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered =
    selected === 'All'
      ? factions
      : selected === 'Good'
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
    window.open('https://www.vinted.pt/member/205410808', '_blank');
  };

  useEffect(() => {
    document.body.style.backgroundImage = "url('https://wallpapers.com/images/hd/lotr-hd-background-8298-x-3888-ptmd3wa5t1c4x1dj.jpg')";
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
    <div className="min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center p-4">Miniatures Catalog</h1>
      <div className="flex justify-center space-x-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded ${
              selected === cat ? 'bg-white text-black' : 'bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {filtered.map((faction) => (
          <div key={faction.name} className="bg-gray-900 p-4 rounded shadow-lg">
            <img src={faction.image} alt={faction.name} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{faction.name}</h2>
            <p className="text-sm">{faction.description}</p>
            <p className="text-lg font-bold">{faction.price}</p>
            <input
              type="number"
              min="1"
              value={quantities[faction.name] || 1}
              onChange={(e) => handleQuantityChange(faction.name, parseInt(e.target.value))}
              className="mt-2 p-1 w-16 text-black"
            />
            <button
              onClick={() => handleAddToCart(faction)}
              className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-4 mt-4">
        <h2 className="text-2xl mb-2">Cart</h2>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>
              {item.quantity}x {item.name}
            </span>
            <button onClick={() => handleRemoveFromCart(index)} className="text-red-400">
              Remove
            </button>
          </div>
        ))}
        {cart.length > 0 && (
          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Checkout
          </button>
        )}
      </div>

      <footer className="text-center text-sm mt-10 text-gray-400">
        <p>© 2025 MiniaturesConcept · Custom 3D Resin Miniatures for MESBG</p>
        <p>Contact: miniaturesconcept@gmail.com</p>
      </footer>
    </div>
  );
}
