import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-column">
            <h3>𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒</h3>
            <ul>
              <li>
                <Link href="/about" legacyBehavior>
                  <a>{t('footer.about')}</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" legacyBehavior>
                  <a>{t('footer.contact')}</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>{t('header.categories')}</h3>
            <ul>
              <li>
                <Link href="/category/electronics" legacyBehavior>
                  <a>{t('categories.electronics')}</a>
                </Link>
              </li>
              <li>
                <Link href="/category/books" legacyBehavior>
                  <a>{t('categories.books')}</a>
                </Link>
              </li>
              <li>
                <Link href="/category/fashion" legacyBehavior>
                  <a>{t('categories.fashion')}</a>
                </Link>
              </li>
              <li>
                <Link href="/category/home" legacyBehavior>
                  <a>{t('categories.home')}</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>{t('footer.terms')}</h3>
            <ul>
              <li>
                <Link href="/terms" legacyBehavior>
                  <a>{t('footer.terms')}</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy" legacyBehavior>
                  <a>{t('footer.privacy')}</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Amazon</h3>
            <p>
              𝑙'𝑎𝑓𝑓𝑎𝑖𝑟𝑒 participe au Programme Partenaires d'Amazon, un programme d'affiliation conçu pour permettre à des sites de percevoir une rémunération grâce à la création de liens vers Amazon.
            </p>
          </div>
        </div>
        
        <div className="copyright">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
