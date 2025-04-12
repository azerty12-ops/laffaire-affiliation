import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';

export default function Header() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Charger le compte de la liste de souhaits et du panier au chargement du composant
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlistCount(wishlist.length);
      
      // Écouter les événements de mise à jour de la liste de souhaits
      const handleWishlistUpdate = (e) => {
        setWishlistCount(e.detail.count);
      };
      
      // Écouter les événements de mise à jour du panier
      const handleCartUpdate = (e) => {
        setCartCount(e.detail.count);
      };
      
      // Initialiser le compteur du panier
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((count, item) => count + item.quantity, 0));
      
      document.addEventListener('wishlist-updated', handleWishlistUpdate);
      document.addEventListener('cart-updated', handleCartUpdate);
      
      return () => {
        document.removeEventListener('wishlist-updated', handleWishlistUpdate);
        document.removeEventListener('cart-updated', handleCartUpdate);
      };
    }
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const changeLanguage = (e) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };
  
  // Categories based on the image
  const categories = [
    { name: "Toutes catégories", value: "all" },
    { name: "Électronique", value: "electronics" },
    { name: "Livres", value: "books" },
    { name: "Mode", value: "fashion" },
    { name: "Maison", value: "home" },
    { name: "Jouets", value: "toys" },
    { name: "Beauté", value: "beauty" },
  ];

  return (
    <>
      <header className="amazon-header">
        <div className="top-header">
          {/* Logo et adresse de livraison */}
          <div className="header-logo-address">
            <Link href="/" legacyBehavior>
              <a className="logo">
                <span className="logo-text">laffaire<small>.fr</small></span>
              </a>
            </Link>
            
            <div 
              className="delivery-address" 
              onClick={() => router.push('/account/address')}
              style={{ cursor: 'pointer' }}
            >
              <span className="deliver-to">Votre adresse de livraison:</span>
              <div className="address-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                <span>Côte d'Ivoire</span>
              </div>
            </div>
          </div>
          
          {/* Barre de recherche */}
          <form className="amazon-search" onSubmit={handleSearch}>
            <div className="search-category">
              <select 
                aria-label="Catégories de recherche" 
                className="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div className="search-input">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('header.search_placeholder')}
              />
            </div>
            
            <button type="submit" aria-label="Rechercher" className="search-submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </form>
          
          {/* Navigation utilisateur */}
          <div className="header-nav">
            {/* Sélecteur de langue */}
            <div className="nav-item lang-selector">
              <select 
                onChange={changeLanguage}
                defaultValue={router.locale || 'fr'}
                className="language-select"
              >
                <option value="fr">FR</option>
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </div>
            
            {/* Compte et listes */}
            <Link href="/account" legacyBehavior>
              <a className="nav-item account-link">
                <div className="line-1">Bonjour, Identifiez-vous</div>
                <div className="line-2">Compte et listes <span className="dropdown-arrow">▼</span></div>
              </a>
            </Link>
            
            {/* Retours et commandes */}
            <Link href="/orders" legacyBehavior>
              <a className="nav-item returns-orders">
                <div className="line-1">Retours</div>
                <div className="line-2">et commandes</div>
              </a>
            </Link>
            
            {/* Panier */}
            <Link href="/cart" legacyBehavior>
              <a className="nav-item cart">
                <div className="cart-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>
                  <span className="cart-count">{typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]').reduce((count, item) => count + item.quantity, 0) : 0}</span>
                </div>
                <div className="cart-text">Panier</div>
              </a>
            </Link>
          </div>
        </div>
        
        {/* Navigation secondaire */}
        <div className="bottom-header">
          <div className="all-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="hamburger-icon">☰</span>
            <span>Toutes</span>
          </div>
          
          <nav className="main-navigation">
            <ul>
              {[...categories.slice(1, 8), ...[
                { name: 'Ventes Flash', value: 'deals' }, 
                { name: 'Service Client', value: 'customer-service' },
                { name: 'Idées Cadeaux', value: 'gift-ideas' }]].map((item, index) => (
                <li key={`nav-item-${item.value}-${index}`}>
                  <Link href={`/category/${item.value}`} legacyBehavior>
                    <a>{item.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="promo-banner">
            <Link href="/promotions" legacyBehavior>
              <a>Nouvelle saison '25 avril</a>
            </Link>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <ul>
              {categories.map((category, index) => (
                <li key={`mobile-cat-${category.value}-${index}`}>
                  <Link href={`/category/${category.value}`} legacyBehavior>
                    <a>{category.name}</a>
                  </Link>
                </li>
              ))}
              <li><a href="/blog">Blog</a></li>
              <li><a href="/guides">Guides d'achat</a></li>
              <li><a href="/comparatifs">Comparatifs</a></li>
            </ul>
          </div>
        )}
      </header>

      <style jsx>{`
        /* Style Amazon Header */
        .amazon-header {
          width: 100%;
          background-color: #131921;
          color: white;
          font-family: Arial, sans-serif;
        }
        
        /* Top Header */
        .top-header {
          display: flex;
          align-items: stretch;
          padding: 10px 15px;
          gap: 10px;
        }
        
        /* Logo & Adresse */
        .header-logo-address {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .logo {
          padding: 5px 8px;
          border: 1px solid transparent;
          border-radius: 2px;
          text-decoration: none;
          color: white;
        }
        
        .logo:hover {
          border-color: white;
        }
        
        .logo-text {
          font-size: 1.4rem;
          font-weight: bold;
        }
        
        .logo-text small {
          font-size: 0.8rem;
        }
        
        .delivery-address {
          padding: 5px 8px;
          border: 1px solid transparent;
          border-radius: 2px;
          font-size: 0.8rem;
          cursor: pointer;
        }
        
        .delivery-address:hover {
          border-color: white;
        }
        
        .deliver-to {
          color: #ccc;
          font-size: 0.7rem;
        }
        
        .address-box {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: bold;
        }
        
        /* Barre de recherche */
        .amazon-search {
          flex-grow: 1;
          display: flex;
          height: 40px;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .search-category {
          background-color: #f3f3f3;
          padding: 0 5px;
          display: flex;
          align-items: center;
          min-width: 120px;
          border-right: 1px solid #cdcdcd;
        }
        
        .category-select {
          width: 100%;
          background: transparent;
          border: none;
          padding: 8px;
          color: #555;
          font-size: 0.8rem;
          outline: none;
          cursor: pointer;
        }
        
        .search-input {
          flex-grow: 1;
        }
        
        .search-input input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          padding: 0 10px;
          font-size: 1rem;
        }
        
        .search-submit {
          width: 45px;
          background-color: #febd69;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .search-submit:hover {
          background-color: #f3a847;
        }
        
        /* Navigation utilisateur */
        .header-nav {
          display: flex;
          align-items: stretch;
        }
        
        .nav-item {
          padding: 5px 8px;
          border: 1px solid transparent;
          border-radius: 2px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-decoration: none;
          color: white;
          margin-left: 10px;
          white-space: nowrap;
        }
        
        .nav-item:hover {
          border-color: white;
        }
        
        .lang-selector {
          min-width: 40px;
        }
        
        .language-select {
          background: none;
          border: none;
          color: white;
          font-size: 0.85rem;
          cursor: pointer;
          padding: 4px;
        }
        
        .language-select option {
          background-color: #232f3e;
          color: white;
        }
        
        .line-1 {
          font-size: 0.75rem;
          color: #ccc;
        }
        
        .line-2 {
          font-size: 0.85rem;
          font-weight: bold;
        }
        
        .cart {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .cart-icon {
          position: relative;
        }
        
        .cart-count {
          position: absolute;
          top: -5px;
          right: 10px;
          background-color: #febd69;
          color: #131921;
          border-radius: 50%;
          padding: 0 6px;
          font-weight: bold;
          font-size: 1rem;
        }
        
        .cart-text {
          font-weight: bold;
          font-size: 0.85rem;
        }
        
        /* Bottom navigation */
        .bottom-header {
          background-color: #232f3e;
          display: flex;
          align-items: center;
          padding: 5px 15px;
        }
        
        .all-menu-button {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 12px;
          border: 1px solid transparent;
          border-radius: 2px;
          cursor: pointer;
          font-weight: bold;
          font-size: 0.9rem;
        }
        
        .all-menu-button:hover {
          border-color: white;
        }
        
        .hamburger-icon {
          font-size: 1.2rem;
        }
        
        .main-navigation {
          flex-grow: 1;
        }
        
        .main-navigation ul {
          display: flex;
          list-style: none;
          gap: 2px;
        }
        
        .main-navigation a {
          color: white;
          text-decoration: none;
          padding: 8px 12px;
          border: 1px solid transparent;
          border-radius: 2px;
          font-size: 0.9rem;
          white-space: nowrap;
        }
        
        .main-navigation a:hover {
          border-color: white;
        }
        
        .promo-banner {
          padding: 8px 12px;
          font-weight: bold;
          font-size: 0.9rem;
          white-space: nowrap;
        }
        
        /* Menu mobile */
        .mobile-menu {
          position: absolute;
          left: 0;
          top: 100%;
          width: 250px;
          background-color: white;
          color: #333;
          z-index: 1000;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .mobile-menu ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .mobile-menu li {
          border-bottom: 1px solid #ddd;
        }
        
        .mobile-menu a {
          display: block;
          padding: 12px 15px;
          color: #333;
          text-decoration: none;
          font-size: 0.9rem;
        }
        
        .mobile-menu a:hover {
          background-color: #f9f9f9;
        }
        
        /* Media queries */
        @media (max-width: 1200px) {
          .delivery-address,
          .nav-item.returns-orders .line-1,
          .nav-item.account-link .line-1 {
            display: none;
          }
          
          .main-navigation ul {
            gap: 0;
          }
          
          .main-navigation a {
            padding: 8px 6px;
            font-size: 0.8rem;
          }
        }
        
        @media (max-width: 992px) {
          .top-header {
            flex-wrap: wrap;
          }
          
          .amazon-search {
            order: 3;
            width: 100%;
            margin-top: 10px;
          }
          
          .promo-banner {
            display: none;
          }
        }
        
        @media (max-width: 768px) {
          .main-navigation {
            display: none;
          }
          
          .all-menu-button {
            margin-right: auto;
          }
        }
      `}</style>
    </>
  );
}
