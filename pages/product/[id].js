import { useRouter } from 'next/router';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import ReviewSystem from '../../components/ReviewSystem';
import PriceAlert from '../../components/PriceAlert';

// Données de démonstration pour les produits
const demoProducts = [
  {
    id: '1',
    title: 'Casque Audio Sans Fil Bluetooth - Réduction de Bruit Active',
    price: '89.99',
    rating: 4.5,
    image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456789',
    description: 'Profitez d\'un son exceptionnel avec ce casque audio sans fil Bluetooth. Sa technologie de réduction de bruit active vous permettra de vous immerger complètement dans votre musique en supprimant tous les bruits extérieurs. Avec sa batterie longue durée, vous pourrez l\'utiliser pendant plus de 30 heures sans avoir à le recharger.',
    specifications: [
      'Bluetooth 5.0',
      'Autonomie: 30 heures',
      'Réduction de bruit active',
      'Compatible avec assistant vocal',
      'Poids: 250g',
    ],
  },
  {
    id: '2',
    title: 'Smartphone 6.5" FHD+ - 128Go, 6Go RAM - Triple Caméra 48MP',
    price: '329.99',
    rating: 4.2,
    image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1000_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456790',
    description: 'Ce smartphone performant dispose d\'un écran FHD+ de 6.5 pouces offrant une expérience visuelle immersive. Équipé d\'un processeur octa-core, de 6Go de RAM et de 128Go de stockage, il vous garantit des performances fluides pour toutes vos applications. Sa triple caméra arrière de 48MP vous permettra de capturer des photos de qualité professionnelle.',
    specifications: [
      'Écran 6.5" FHD+',
      'Processeur Octa-core',
      '6Go RAM, 128Go Stockage',
      'Triple Caméra 48MP',
      'Batterie 4500mAh',
    ],
  },
  // Autres produits...
];

export default function ProductPage({ product, relatedProducts }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  // Vérifier si le produit est dans la liste de souhaits
  useEffect(() => {
    if (typeof window !== 'undefined' && product) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsInWishlist(wishlist.some(item => item.id === product.id));
    }
  }, [product]);
  
  // Gérer l'ajout/suppression de la liste de souhaits
  const toggleWishlist = () => {
    if (typeof window !== 'undefined' && product) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      let newWishlist;
      
      if (isInWishlist) {
        // Supprimer de la liste de souhaits
        newWishlist = wishlist.filter(item => item.id !== product.id);
      } else {
        // Ajouter à la liste de souhaits
        newWishlist = [...wishlist, { 
          id: product.id, 
          title: product.title,
          price: product.price,
          image: product.image,
          amazonUrl: product.amazonUrl
        }];
      }
      
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      setIsInWishlist(!isInWishlist);
      
      // Dispatcher un événement pour mettre à jour le compteur dans le header
      const event = new CustomEvent('wishlist-updated', { 
        detail: { count: newWishlist.length } 
      });
      document.dispatchEvent(event);
    }
  };
  
  // Gérer l'état de chargement ou l'absence de produit
  if (router.isFallback || !product) {
    return (
      <Layout>
        <div className="loading-container">Chargement...</div>
      </Layout>
    );
  }
  
  return (
    <Layout title={product.title}>
      <div className="product-detail">
        <div className="product-detail-grid">
          <div className="product-image-container">
            <Image 
              src={product.image} 
              alt={product.title}
              width={500}
              height={500}
              className="product-detail-image"
            />
          </div>
          
          <div className="product-info">
            <h1 className="product-detail-title">{product.title}</h1>
            
            <div className="product-detail-rating">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
              <span className="rating-value"> {product.rating}/5</span>
            </div>
            
            <div className="product-detail-price">{product.price}€</div>
            
            <div className="product-stock">
              <span className="in-stock">{t('product.in_stock')}</span>
            </div>
            
            <div className="product-actions">
              <a 
                href={product.amazonUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="amazon-button"
              >
                {t('product.buy_now')}
              </a>
              
              <button 
                className={`wishlist-button ${isInWishlist ? 'active' : ''}`}
                onClick={toggleWishlist}
                aria-label={isInWishlist ? t('product.remove_from_wishlist') : t('product.add_to_wishlist')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
                <span className="wishlist-button-text">
                  {isInWishlist ? t('product.remove_from_wishlist') : t('product.add_to_wishlist')}
                </span>
              </button>
              
              <div className="share-product">
                <button className="share-button" aria-label={t('product.share')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                  </svg>
                  <span>{t('product.share')}</span>
                </button>
              </div>
            </div>
            
            <PriceAlert 
              productId={product.id}
              productName={product.title}
              currentPrice={product.price}
              currency="€"
            />
          </div>
        </div>
        
        <div className="product-description">
          <h2>{t('product.description')}</h2>
          <p>{product.description}</p>
        </div>
        
        <div className="product-specifications">
          <h2>{t('product.specifications')}</h2>
          <ul>
            {product.specifications.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </div>
        
        <div className="product-reviews">
          <h2>{t('product.reviews')}</h2>
          <ReviewSystem productId={product.id} productTitle={product.title} />
        </div>
        
        <div className="related-products">
          <h2>{t('product.related')}</h2>
          <div className="product-grid">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Dans une application réelle, vous feriez un appel API à Amazon
  // ou à une API tierce pour récupérer les IDs des produits
  
  const paths = demoProducts.map(product => ({
    params: { id: product.id },
  }));
  
  return {
    paths,
    fallback: true, // ou 'blocking' pour un rendu côté serveur
  };
}

export async function getStaticProps({ params, locale }) {
  // Dans une application réelle, vous feriez un appel API à Amazon
  // ou à une API tierce pour récupérer les détails du produit
  
  const product = demoProducts.find(p => p.id === params.id);
  
  // Produits similaires (pour cet exemple, juste d'autres produits aléatoires)
  const relatedProducts = demoProducts
    .filter(p => p.id !== params.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      product: product || null,
      relatedProducts,
    },
    // Revalider toutes les heures
    revalidate: 3600,
  };
}
