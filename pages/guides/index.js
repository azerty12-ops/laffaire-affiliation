import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import Head from 'next/head';

// Données simulées pour les guides d'achat
const guides = [
  {
    id: 'comment-choisir-smartphone',
    title: 'Comment choisir son smartphone en 2025 ?',
    excerpt: 'Guide complet pour comprendre les critères importants et choisir le smartphone adapté à vos besoins et votre budget.',
    image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1000_.jpg',
    category: 'Électronique',
    date: '10 avril 2025',
    readTime: '12 min'
  },
  {
    id: 'choisir-friteuse-sans-huile',
    title: 'Guide d\'achat : Comment choisir sa friteuse sans huile',
    excerpt: 'Découvrez tout ce qu\'il faut savoir pour sélectionner la meilleure friteuse sans huile selon vos besoins, votre budget et la taille de votre famille.',
    image: 'https://m.media-amazon.com/images/I/71+W2rPZl4L._AC_SL1500_.jpg',
    category: 'Cuisine',
    date: '5 avril 2025',
    readTime: '10 min'
  },
  {
    id: 'meilleur-casque-gamer',
    title: 'Quel casque gamer choisir en 2025 ?',
    excerpt: 'Notre guide complet pour trouver le casque gaming idéal : confort, qualité audio, microphone et compatibilité avec vos plateformes préférées.',
    image: 'https://m.media-amazon.com/images/I/71PvHfU+pwL._AC_SL1500_.jpg',
    category: 'Gaming',
    date: '2 avril 2025',
    readTime: '15 min'
  },
  {
    id: 'guide-chaussures-running',
    title: 'Comment choisir ses chaussures de running ?',
    excerpt: 'Tout savoir sur les types de foulée, le drop, l\'amorti et les autres caractéristiques importantes pour trouver la chaussure de course parfaite.',
    image: 'https://m.media-amazon.com/images/I/71HOGNsY9GL._AC_SL1500_.jpg',
    category: 'Sport',
    date: '28 mars 2025',
    readTime: '14 min'
  },
  {
    id: 'choisir-montre-connectee',
    title: 'Guide d\'achat : Quelle montre connectée choisir ?',
    excerpt: 'Analyse complète des meilleures montres connectées du marché avec comparaison des fonctionnalités santé, sport, autonomie et compatibilité smartphone.',
    image: 'https://m.media-amazon.com/images/I/61Ww4abGxCL._AC_SL1500_.jpg',
    category: 'Technologie',
    date: '25 mars 2025',
    readTime: '13 min'
  },
  {
    id: 'guide-choix-matelas',
    title: 'Comment choisir son matelas : le guide ultime',
    excerpt: 'Les différents types de matelas, fermetés, technologies et conseils pour trouver le matelas parfait selon votre morphologie et vos habitudes de sommeil.',
    image: 'https://m.media-amazon.com/images/I/71+n9vOjKIL._AC_SL1500_.jpg',
    category: 'Maison',
    date: '20 mars 2025',
    readTime: '16 min'
  },
];

export default function GuidesIndex() {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <Head>
        <title>Guides d'achat | 𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒</title>
        <meta name="description" content="Nos guides d'achat complets pour vous aider à choisir les meilleurs produits selon vos besoins et votre budget. Conseils d'experts et comparatifs détaillés." />
        <meta name="keywords" content="guide d'achat, comment choisir, comparatif produits, conseils achat, meilleurs produits" />
        <link rel="canonical" href="https://laffaire-italique.windsurf.build/guides" />
      </Head>

      <div className="guides-container">
        <header className="guides-header">
          <h1>Guides d'achat</h1>
          <p className="guides-intro">
            Nos guides d'achat vous accompagnent dans vos choix en vous fournissant toutes les informations essentielles pour faire l'acquisition des produits les mieux adaptés à vos besoins.
          </p>
        </header>

        <div className="guides-filter">
          <div className="filter-title">Filtrer par catégorie :</div>
          <div className="filter-options">
            <button className="filter-button active">Tous</button>
            <button className="filter-button">Électronique</button>
            <button className="filter-button">Cuisine</button>
            <button className="filter-button">Gaming</button>
            <button className="filter-button">Sport</button>
            <button className="filter-button">Maison</button>
          </div>
        </div>

        <div className="guides-grid">
          {guides.map((guide) => (
            <article key={guide.id} className="guide-card">
              <Link href={`/guides/${guide.id}`} legacyBehavior>
                <a>
                  <div className="guide-image">
                    <Image 
                      src={guide.image} 
                      alt={guide.title}
                      width={400}
                      height={250}
                      objectFit="cover"
                    />
                    <div className="guide-category">{guide.category}</div>
                  </div>
                  <div className="guide-content">
                    <h2 className="guide-title">{guide.title}</h2>
                    <p className="guide-excerpt">{guide.excerpt}</p>
                    <div className="guide-meta">
                      <span className="guide-date">{guide.date}</span>
                      <span className="guide-read-time">{guide.readTime} de lecture</span>
                    </div>
                  </div>
                </a>
              </Link>
            </article>
          ))}
        </div>

        <div className="cta-container">
          <div className="cta-box">
            <h2>Vous ne trouvez pas ce que vous cherchez ?</h2>
            <p>Contactez-nous pour nous suggérer un sujet de guide d'achat qui vous intéresse.</p>
            <Link href="/contact" legacyBehavior>
              <a className="cta-button">Nous contacter</a>
            </Link>
          </div>

          <div className="cta-box newsletter-box">
            <h2>Restez informé</h2>
            <p>Recevez nos nouveaux guides d'achat et bons plans directement dans votre boîte mail.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Votre email" required />
              <button type="submit">S'abonner</button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .guides-container {
          padding: 2rem 0;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .guides-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .guides-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .guides-intro {
          max-width: 800px;
          margin: 0 auto;
          color: #666;
          line-height: 1.6;
          font-size: 1.1rem;
        }
        
        .guides-filter {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }
        
        .filter-title {
          font-weight: bold;
        }
        
        .filter-options {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .filter-button {
          background-color: #f2f2f2;
          border: none;
          border-radius: 50px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }
        
        .filter-button.active, .filter-button:hover {
          background-color: var(--primary-color);
          color: white;
        }
        
        .guides-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .guide-card {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
          background-color: white;
        }
        
        .guide-card:hover {
          transform: translateY(-10px);
        }
        
        .guide-image {
          position: relative;
          height: 200px;
        }
        
        .guide-category {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background-color: var(--secondary-color);
          color: var(--primary-color);
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: bold;
        }
        
        .guide-content {
          padding: 1.5rem;
        }
        
        .guide-title {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        
        .guide-excerpt {
          color: #666;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .guide-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: #888;
        }
        
        .cta-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .cta-box {
          background-color: #f9f9f9;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
        }
        
        .cta-box h2 {
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
        
        .cta-box p {
          margin-bottom: 1.5rem;
          color: #666;
        }
        
        .cta-button {
          display: inline-block;
          background-color: var(--primary-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-weight: bold;
          transition: background-color 0.2s;
        }
        
        .cta-button:hover {
          background-color: #3a4e64;
        }
        
        .newsletter-form {
          display: flex;
          max-width: 400px;
          margin: 0 auto;
        }
        
        .newsletter-form input {
          flex-grow: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
          font-size: 1rem;
        }
        
        .newsletter-form button {
          background-color: var(--primary-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0 4px 4px 0;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .newsletter-form button:hover {
          background-color: #3a4e64;
        }
        
        @media (max-width: 768px) {
          .guides-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-container {
            grid-template-columns: 1fr;
          }
          
          .newsletter-form {
            flex-direction: column;
          }
          
          .newsletter-form input {
            border-radius: 4px;
            margin-bottom: 0.5rem;
          }
          
          .newsletter-form button {
            border-radius: 4px;
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
