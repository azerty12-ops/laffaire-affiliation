import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';

// Données de démonstration pour les produits par catégorie
const categoryProducts = {
  electronics: [
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
      id: '7',
      title: 'Tablette 10.1" FHD - 64Go, 4Go RAM - Android 11, Octa-Core',
      price: '159.99',
      rating: 4.1,
      image: 'https://m.media-amazon.com/images/I/61utX8kBDlL._AC_SL1500_.jpg',
      amazonUrl: 'https://www.amazon.fr/dp/B0123456795',
    },
  ],
  fashion: [
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
    {
      id: '11',
      title: 'Robe Femme Élégante pour Soirée',
      price: '39.99',
      rating: 4.2,
      image: 'https://m.media-amazon.com/images/I/61ZhL7sgLfL._AC_SL1500_.jpg',
      amazonUrl: 'https://www.amazon.fr/dp/B0123456799',
    },
    {
      id: '12',
      title: 'Lunettes de Soleil Polarisées Style Aviateur',
      price: '29.99',
      rating: 4.4,
      image: 'https://m.media-amazon.com/images/I/71P+ffH7AfL._AC_SL1500_.jpg',
      amazonUrl: 'https://www.amazon.fr/dp/B0123456800',
    },
  ],
  home: [
    {
      id: '6',
      title: 'Air Fryer 5,5L Digital, Friteuse Sans Huile, 8 Programmes',
      price: '89.99',
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/I/71+W2rPZl4L._AC_SL1500_.jpg',
      amazonUrl: 'https://www.amazon.fr/dp/B0123456794',
    },
    {
      id: '8',
      title: 'Cafetière à Expresso Automatique avec Broyeur à Grains',
      price: '349.99',
      rating: 4.4,
      image: 'https://m.media-amazon.com/images/I/71nJxMQKyYL._AC_SL1500_.jpg',
      amazonUrl: 'https://www.amazon.fr/dp/B0123456796',
    },
    {
      id: '13',
      title: 'Set de 3 Poêles Antiadhésives Compatible Induction',
      price: '49.99',
      rating: 4.6,
      image: 'https://m.media-amazon.com/images/I/719zB7Uo9kL._AC_SL1500_.jpg',
      amazonUrl: 'https://www.amazon.fr/dp/B0123456801',
    },
    {
      id: '14',
      title: 'Ensemble de Literie 4 Pièces, 100% Coton',
      price: '59.99',
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/I/71+n9vOjKIL._AC_SL1500_.jpg',
      amazonUrl: 'https://www.amazon.fr/dp/B0123456802',
    },
  ],
  books: [
    {
      id: '15',
      title: 'Le Grand Livre de la Cuisine Française',
      price: '24.99',
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/I/81JKHYj+blL._AC_SL1500_.jpg',
      amazonUrl: 'https://www.amazon.fr/dp/B0123456803',
    },
    {
      id: '16',
      title: 'Roman Policier: L\'énigme du Manuscrit',
      price: '12.99',
      rating: 4.5,
      image: 'https://m.media-amazon.com/images/I/71qOYS2Ln5L._AC_SL1500_.jpg',
      amazonUrl: 'https://www.amazon.fr/dp/B0123456804',
    },
  ],
  toys: [
    {
      id: '17',
      title: 'Jeu de Construction 520 Pièces Compatible avec Toutes Marques',
      price: '29.99',
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/I/71q+M95RTrL._AC_SL1500_.jpg',
      amazonUrl: 'https://www.amazon.fr/dp/B0123456805',
    },
    {
      id: '18',
      title: 'Peluche Interactive Parlante pour Enfants',
      price: '19.99',
      rating: 4.4,
      image: 'https://m.media-amazon.com/images/I/61wLxzZeIVL._AC_SL1500_.jpg',
      amazonUrl: 'https://www.amazon.fr/dp/B0123456806',
    },
  ],
  beauty: [
    {
      id: '19',
      title: 'Coffret Soins Visage Bio - 5 Produits Essentiels',
      price: '39.99',
      rating: 4.6,
      image: 'https://m.media-amazon.com/images/I/71XMQISn9ML._AC_SL1500_.jpg',
      amazonUrl: 'https://www.amazon.fr/dp/B0123456807',
    },
    {
      id: '20',
      title: 'Sèche-Cheveux Professionnel Ionique 2200W',
      price: '49.99',
      rating: 4.5,
      image: 'https://m.media-amazon.com/images/I/71I6X+KwUXL._AC_SL1500_.jpg',
      amazonUrl: 'https://www.amazon.fr/dp/B0123456808',
    },
  ],
};

// Traduction des noms de catégories
const categoryTranslations = {
  electronics: {
    fr: 'Électronique',
    en: 'Electronics',
  },
  books: {
    fr: 'Livres',
    en: 'Books',
  },
  fashion: {
    fr: 'Mode',
    en: 'Fashion',
  },
  home: {
    fr: 'Maison',
    en: 'Home',
  },
  toys: {
    fr: 'Jouets',
    en: 'Toys',
  },
  beauty: {
    fr: 'Beauté',
    en: 'Beauty',
  },
};

export default function CategoryPage({ products, category }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  
  // Gérer l'état de chargement
  if (router.isFallback) {
    return (
      <Layout>
        <div>Chargement...</div>
      </Layout>
    );
  }
  
  // Obtenir le nom traduit de la catégorie
  const categoryName = categoryTranslations[category]?.[router.locale] || 
                      categoryTranslations[category]?.fr || 
                      category;
  
  return (
    <Layout title={categoryName}>
      <h1 className="category-title">{categoryName}</h1>
      
      {products && products.length > 0 ? (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>Aucun produit trouvé dans cette catégorie.</p>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  // Générer les chemins pour toutes les catégories
  const categories = Object.keys(categoryProducts);
  
  const paths = categories.map(category => ({
    params: { slug: category },
  }));
  
  return {
    paths,
    fallback: true, // ou 'blocking' pour un rendu côté serveur
  };
}

export async function getStaticProps({ params, locale }) {
  const { slug } = params;
  
  // Récupérer les produits pour cette catégorie
  const products = categoryProducts[slug] || [];
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      products,
      category: slug,
    },
    // Revalider toutes les heures
    revalidate: 3600,
  };
}
