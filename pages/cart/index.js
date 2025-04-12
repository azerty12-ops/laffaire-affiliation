import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CartPage() {
  const { t } = useTranslation('common');
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Charger les éléments du panier et les articles sauvegardés depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const storedSaved = JSON.parse(localStorage.getItem('savedItems') || '[]');
      
      // Si le panier est vide, ajouter des articles de démonstration
      if (storedCart.length === 0 && storedSaved.length === 0) {
        const demoItems = [
          {
            id: '1',
            title: 'Casque Audio Sans Fil Bluetooth - Réduction de Bruit Active',
            price: 89.99,
            quantity: 1,
            image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
          },
          {
            id: '2',
            title: 'Smartphone 6.5" FHD+ - 128Go, 6Go RAM - Triple Caméra 48MP',
            price: 329.99,
            quantity: 1,
            image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1000_.jpg',
          }
        ];
        setCartItems(demoItems);
      } else {
        setCartItems(storedCart);
        setSavedItems(storedSaved);
      }
      
      setLoading(false);
    }
  }, []);
  
  // Sauvegarder les mises à jour du panier et des articles sauvegardés
  useEffect(() => {
    if (!loading && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      localStorage.setItem('savedItems', JSON.stringify(savedItems));
      
      // Mettre à jour le compteur du panier dans le header
      const event = new CustomEvent('cart-updated', { 
        detail: { count: cartItems.reduce((count, item) => count + item.quantity, 0) } 
      });
      document.dispatchEvent(event);
    }
  }, [cartItems, savedItems, loading]);
  
  // Modifier la quantité d'un article
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  // Supprimer un article du panier
  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast.success('Article supprimé du panier');
  };
  
  // Sauvegarder un article pour plus tard
  const saveForLater = (itemId) => {
    const itemToSave = cartItems.find(item => item.id === itemId);
    if (itemToSave) {
      setSavedItems(prevSaved => [...prevSaved, itemToSave]);
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
      toast.success('Article sauvegardé pour plus tard');
    }
  };
  
  // Déplacer un article sauvegardé vers le panier
  const moveToCart = (itemId) => {
    const itemToMove = savedItems.find(item => item.id === itemId);
    if (itemToMove) {
      setCartItems(prevItems => [...prevItems, itemToMove]);
      setSavedItems(prevSaved => prevSaved.filter(item => item.id !== itemId));
      toast.success('Article ajouté au panier');
    }
  };
  
  // Supprimer un article sauvegardé
  const removeSavedItem = (itemId) => {
    setSavedItems(prevSaved => prevSaved.filter(item => item.id !== itemId));
    toast.success('Article supprimé');
  };
  
  // Calculer le total du panier
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + shipping;
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <Layout title="Votre Panier">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="cart-page">
        <div className="cart-container">
          <h1>Votre Panier</h1>
          
          {loading ? (
            <div className="loading">Chargement de votre panier...</div>
          ) : cartItems.length > 0 ? (
            <div className="cart-content">
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                    
                    <div className="item-details">
                      <Link href={`/product/${item.id}`} legacyBehavior>
                        <a className="item-title">{item.title}</a>
                      </Link>
                      
                      <div className="item-stock">En stock</div>
                      
                      <div className="item-actions">
                        <div className="quantity-selector">
                          <label htmlFor={`quantity-${item.id}`}>Qté:</label>
                          <select 
                            id={`quantity-${item.id}`}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>
                        
                        <span className="action-divider">|</span>
                        
                        <button 
                          className="remove-button"
                          onClick={() => removeItem(item.id)}
                        >
                          Supprimer
                        </button>
                        
                        <span className="action-divider">|</span>
                        
                        <button 
                          className="save-for-later" 
                          onClick={() => saveForLater(item.id)}
                        >
                          Enregistrer pour plus tard
                        </button>
                      </div>
                    </div>
                    
                    <div className="item-price">
                      {item.price.toFixed(2)} €
                    </div>
                  </div>
                ))}
                
                <div className="cart-subtotal-mobile">
                  Sous-total ({itemCount} {itemCount > 1 ? 'articles' : 'article'}): <span>{subtotal.toFixed(2)} €</span>
                </div>
              </div>
              
              <div className="cart-sidebar">
                <div className="cart-summary">
                  <div className="summary-subtotal">
                    Sous-total ({itemCount} {itemCount > 1 ? 'articles' : 'article'}): <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  
                  <div className="summary-shipping">
                    Livraison estimée: <span>{shipping.toFixed(2)} €</span>
                  </div>
                  
                  <div className="summary-total">
                    Total: <span>{total.toFixed(2)} €</span>
                  </div>
                  
                  <button className="checkout-button">
                    Passer à la caisse
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-cart">
              <h2>Votre panier est vide</h2>
              <p>Vous n'avez aucun article dans votre panier. Pour en ajouter, cliquez sur "Ajouter au panier" sur la page d'un produit.</p>
              <Link href="/" legacyBehavior>
                <a className="continue-shopping">
                  Continuer vos achats
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .cart-page {
          padding: 2rem 0;
        }
        
        .cart-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        h1 {
          margin-bottom: 2rem;
          font-size: 1.8rem;
          color: #333;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e3e3e3;
        }
        
        .loading {
          text-align: center;
          padding: 2rem;
          font-size: 1.1rem;
          color: #666;
        }
        
        .cart-content {
          display: grid;
          grid-template-columns: 3fr 1fr;
          gap: 2rem;
        }
        
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .cart-item {
          display: grid;
          grid-template-columns: 120px 1fr auto;
          gap: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e3e3e3;
        }
        
        .item-image {
          width: 100%;
        }
        
        .item-image img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }
        
        .item-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .item-title {
          font-size: 1.1rem;
          color: #0066c0;
          text-decoration: none;
          line-height: 1.4;
        }
        
        .item-title:hover {
          color: #c45500;
          text-decoration: underline;
        }
        
        .item-stock {
          color: #007600;
          font-size: 0.9rem;
        }
        
        .item-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: auto;
        }
        
        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .quantity-selector label {
          font-size: 0.9rem;
          color: #555;
        }
        
        .quantity-selector select {
          padding: 0.25rem 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .action-divider {
          color: #ccc;
        }
        
        .remove-button, .save-for-later {
          background: none;
          border: none;
          color: #0066c0;
          cursor: pointer;
          font-size: 0.9rem;
          padding: 0;
        }
        
        .remove-button:hover, .save-for-later:hover {
          color: #c45500;
          text-decoration: underline;
        }
        
        .item-price {
          font-size: 1.1rem;
          font-weight: bold;
          color: #B12704;
          text-align: right;
        }
        
        .cart-subtotal-mobile {
          display: none;
          font-size: 1.1rem;
          font-weight: bold;
          padding: 1rem 0;
          border-top: 1px solid #e3e3e3;
          text-align: right;
        }
        
        .cart-sidebar {
          align-self: flex-start;
        }
        
        .cart-summary {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1.5rem;
          background-color: #f9f9f9;
        }
        
        .summary-subtotal, .summary-shipping {
          margin-bottom: 1rem;
          font-size: 0.95rem;
          color: #333;
        }
        
        .summary-subtotal span, .summary-shipping span {
          font-weight: bold;
        }
        
        .summary-total {
          font-size: 1.2rem;
          font-weight: bold;
          color: #B12704;
          margin-bottom: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #e3e3e3;
        }
        
        .checkout-button {
          width: 100%;
          background-color: #febd69;
          color: #000;
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .checkout-button:hover {
          background-color: #f3a847;
        }
        
        .empty-cart {
          text-align: center;
          padding: 3rem;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        
        .empty-cart h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #333;
        }
        
        .empty-cart p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        
        .continue-shopping {
          display: inline-block;
          background-color: #febd69;
          color: #000;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .continue-shopping:hover {
          background-color: #f3a847;
        }
        
        /* Styles pour la section des articles sauvegardés */
        .saved-items-section {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #e3e3e3;
        }
        
        .saved-items-section h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: #232f3e;
        }
        
        .saved-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .saved-item {
          display: grid;
          grid-template-columns: 100px 1fr auto;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #e3e3e3;
          border-radius: 8px;
          background-color: white;
        }
        
        .move-to-cart {
          background: none;
          border: none;
          color: #0066c0;
          cursor: pointer;
          font-size: 0.9rem;
          padding: 0;
        }
        
        .move-to-cart:hover {
          color: #c45500;
          text-decoration: underline;
        }
        
        @media (max-width: 992px) {
          .cart-content {
            grid-template-columns: 1fr;
          }
          
          .cart-subtotal-mobile {
            display: block;
          }
        }
        
        @media (max-width: 768px) {
          .cart-item {
            grid-template-columns: 80px 1fr;
            grid-template-rows: auto auto;
          }
          
          .item-price {
            grid-column: 2;
            grid-row: 1;
            text-align: right;
          }
          
          .item-actions {
            flex-wrap: wrap;
          }
        }
        
        @media (max-width: 480px) {
          .action-divider {
            display: none;
          }
          
          .item-actions {
            gap: 0.5rem;
          }
          
          .remove-button, .save-for-later {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
