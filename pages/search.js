import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';

// Tous les produits de démo pour la recherche
const allProducts = [
  // Produits électroniques
  {
    id: '1',
    title: 'Casque Audio Sans Fil Bluetooth - Réduction de Bruit Active',
    price: '89.99',
    rating: 4.5,
    image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456789',
    category: 'electronics',
  },
  {
    id: '2',
    title: 'Smartphone 6.5" FHD+ - 128Go, 6Go RAM - Triple Caméra 48MP',
    price: '329.99',
    rating: 4.2,
    image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1000_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456790',
    category: 'electronics',
  },
  {
    id: '3',
    title: 'Montre Connectée Fitness avec GPS, Cardio, 14 Jours d\'Autonomie',
    price: '129.99',
    rating: 4.7,
    image: 'https://m.media-amazon.com/images/I/61Ww4abGxCL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456791',
    category: 'electronics',
  },
  {
    id: '4',
    title: 'Aspirateur Robot avec Cartographie, Navigation Laser, 2500Pa',
    price: '279.99',
    rating: 4.3,
    image: 'https://m.media-amazon.com/images/I/71uxzcDhACL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456792',
    category: 'electronics',
  },
  {
    id: '5',
    title: 'Enceinte Bluetooth Portable Étanche IPX7, 24h d\'Autonomie',
    price: '59.99',
    rating: 4.6,
    image: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456793',
    category: 'electronics',
  },
  // Mode
  {
    id: '9',
    title: 'Veste Homme Légère Imperméable avec Capuche',
    price: '49.99',
    rating: 4.3,
    image: 'https://m.media-amazon.com/images/I/71epzwGQ4KL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456797',
    category: 'fashion',
  },
  {
    id: '10',
    title: 'Chaussures de Running Homme, Coussin d\'Air',
    price: '89.99',
    rating: 4.5,
    image: 'https://m.media-amazon.com/images/I/71HOGNsY9GL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456798',
    category: 'fashion',
  },
  // Maison
  {
    id: '6',
    title: 'Air Fryer 5,5L Digital, Friteuse Sans Huile, 8 Programmes',
    price: '89.99',
    rating: 4.8,
    image: 'https://m.media-amazon.com/images/I/71+W2rPZl4L._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456794',
    category: 'home',
  },
  {
    id: '8',
    title: 'Cafetière à Expresso Automatique avec Broyeur à Grains',
    price: '349.99',
    rating: 4.4,
    image: 'https://m.media-amazon.com/images/I/71nJxMQKyYL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456796',
    category: 'home',
  },
  // Livres
  {
    id: '15',
    title: 'Le Grand Livre de la Cuisine Française',
    price: '24.99',
    rating: 4.8,
    image: 'https://m.media-amazon.com/images/I/81JKHYj+blL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456803',
    category: 'books',
  },
  {
    id: '16',
    title: 'Roman Policier: L\'énigme du Manuscrit',
    price: '12.99',
    rating: 4.5,
    image: 'https://m.media-amazon.com/images/I/71qOYS2Ln5L._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456804',
    category: 'books',
  },
];

export default function SearchPage({ initialQuery }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery || '');
  const [searchResults, setSearchResults] = useState([]);
  
  // Fonction de recherche
  const searchProducts = (searchQuery) => {
    if (!searchQuery) return [];
    
    const q = searchQuery.toLowerCase();
    return allProducts.filter(product => 
      product.title.toLowerCase().includes(q) || 
      product.category.toLowerCase().includes(q)
    );
  };
  
  // Effectuer la recherche quand la requête change
  useEffect(() => {
    if (router.query.q) {
      setQuery(router.query.q);
      setSearchResults(searchProducts(router.query.q));
    }
  }, [router.query.q]);
  
  return (
    <Layout title={`${t('header.search')}: ${query}`}>
      <div className="search-page">
        <h1 className="search-title">
          {t('header.search')}: <span className="search-query">{query}</span>
        </h1>
        
        <p className="search-results-count">
          {searchResults.length} {t('results_found')}
        </p>
        
        {searchResults.length > 0 ? (
          <div className="product-grid">
            {searchResults.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>Aucun résultat trouvé pour "{query}"</p>
            <p>Essayez avec d'autres mots-clés ou parcourez nos catégories.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query, locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      initialQuery: query.q || '',
    },
  };
}
