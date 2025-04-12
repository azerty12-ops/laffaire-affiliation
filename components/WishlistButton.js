import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';

export default function WishlistButton({ product }) {
  const { t } = useTranslation('common');
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  useEffect(() => {
    // Vérifier si le produit est déjà dans la liste de souhaits
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.some(item => item.id === product.id));
  }, [product.id]);
  
  const toggleWishlist = () => {
    // Récupérer la liste de souhaits actuelle
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    let newWishlist;
    if (isInWishlist) {
      // Retirer le produit de la liste
      newWishlist = wishlist.filter(item => item.id !== product.id);
      setIsInWishlist(false);
    } else {
      // Ajouter le produit à la liste
      newWishlist = [...wishlist, {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        amazonUrl: product.amazonUrl,
        dateAdded: new Date().toISOString(),
      }];
      setIsInWishlist(true);
    }
    
    // Sauvegarder la liste mise à jour
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    
    // Mettre à jour le compteur d'éléments dans la barre de navigation
    document.dispatchEvent(new CustomEvent('wishlist-updated', { 
      detail: { count: newWishlist.length } 
    }));
  };
  
  return (
    <button 
      className={`wishlist-button ${isInWishlist ? 'in-wishlist' : ''}`}
      onClick={toggleWishlist}
      aria-label={isInWishlist ? "Retirer de la liste de souhaits" : "Ajouter à la liste de souhaits"}
    >
      <span className="wishlist-icon">
        {isInWishlist ? '❤️' : '🤍'}
      </span>
      <span className="wishlist-text">
        {isInWishlist ? t('product.remove_from_wishlist') : t('product.add_to_wishlist')}
      </span>
      
      <style jsx>{`
        .wishlist-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 0.75rem 1rem;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }
        
        .wishlist-button:hover {
          background-color: #f9f9f9;
        }
        
        .wishlist-button.in-wishlist {
          background-color: #fff0f3;
          border-color: #ffccd5;
          color: #e91e63;
        }
        
        .wishlist-icon {
          font-size: 1.2rem;
        }
      `}</style>
    </button>
  );
}
