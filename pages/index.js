import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';

// Données de démonstration pour les produits
const demoProducts = [
  {
    id: '1',
    title: 'Casque Audio Sans Fil Bluetooth - Réduction de Bruit Active',
    price: '89.99',
    rating: 4.5,
    image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456789',
  },
  {
    id: '2',
    title: 'Smartphone 6.5" FHD+ - 128Go, 6Go RAM - Triple Caméra 48MP',
    price: '329.99',
    rating: 4.2,
    image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1000_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456790',
  },
  {
    id: '3',
    title: 'Montre Connectée Fitness avec GPS, Cardio, 14 Jours d\'Autonomie',
    price: '129.99',
    rating: 4.7,
    image: 'https://m.media-amazon.com/images/I/61Ww4abGxCL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456791',
  },
  {
    id: '4',
    title: 'Aspirateur Robot avec Cartographie, Navigation Laser, 2500Pa',
    price: '279.99',
    rating: 4.3,
    image: 'https://m.media-amazon.com/images/I/71uxzcDhACL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456792',
  },
  {
    id: '5',
    title: 'Enceinte Bluetooth Portable Étanche IPX7, 24h d\'Autonomie',
    price: '59.99',
    rating: 4.6,
    image: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456793',
  },
  {
    id: '6',
    title: 'Air Fryer 5,5L Digital, Friteuse Sans Huile, 8 Programmes',
    price: '89.99',
    rating: 4.8,
    image: 'https://m.media-amazon.com/images/I/71+W2rPZl4L._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456794',
  },
  {
    id: '7',
    title: 'Tablette 10.1" FHD - 64Go, 4Go RAM - Android 11, Octa-Core',
    price: '159.99',
    rating: 4.1,
    image: 'https://m.media-amazon.com/images/I/61utX8kBDlL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456795',
  },
  {
    id: '8',
    title: 'Cafetière à Expresso Automatique avec Broyeur à Grains',
    price: '349.99',
    rating: 4.4,
    image: 'https://m.media-amazon.com/images/I/71nJxMQKyYL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456796',
  },
];

// Ajout de plus de produits pour d'autres catégories
const fashionProducts = [
  {
    id: '9',
    title: 'Veste Homme Légère Imperméable avec Capuche',
    price: '49.99',
    rating: 4.3,
    image: 'https://m.media-amazon.com/images/I/71epzwGQ4KL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456797',
  },
  {
    id: '10',
    title: 'Chaussures de Running Homme, Coussin d\'Air',
    price: '89.99',
    rating: 4.5,
    image: 'https://m.media-amazon.com/images/I/71HOGNsY9GL._AC_SL1500_.jpg',
    amazonUrl: 'https://www.amazon.fr/dp/B0123456798',
  },
  // 6 autres produits de mode...
];

export default function Home({ products }) {
  const { t } = useTranslation('common');
  
  return (
    <Layout>
      <section className="category-section">
        <h2 className="section-title">{t('home.popular')}</h2>
        <div className="product-grid">
          {products.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      <section className="category-section">
        <h2 className="section-title">{t('home.new_arrivals')}</h2>
        <div className="product-grid">
          {products.slice(8, 16).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      <section className="category-section">
        <h2 className="section-title">{t('categories.fashion')}</h2>
        <div className="product-grid">
          {fashionProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  // Dans une application réelle, vous feriez un appel API à Amazon
  // ou à une API tierce pour récupérer les produits
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      products: [...demoProducts, ...fashionProducts],
    },
    // Revalider toutes les heures
    revalidate: 3600,
  };
}
