import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/Layout';

export default function ContactPage() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dans une version réelle, nous enverrions les données à un backend
    // Pour cette démonstration, nous simulerons simplement une réponse réussie
    setFormStatus('success');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };
  
  return (
    <Layout title={t('footer.contact')}>
      <div className="legal-page">
        <h1>{t('footer.contact')}</h1>
        
        <section className="legal-section">
          <p>
            Vous avez des questions, des suggestions ou vous souhaitez nous contacter pour toute autre raison ? N'hésitez pas à utiliser le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
          </p>
        </section>
        
        <div className="contact-form-container">
          {formStatus === 'success' ? (
            <div className="success-message">
              <p>Merci pour votre message ! Nous vous répondrons dès que possible.</p>
              <button onClick={() => setFormStatus(null)}>Envoyer un autre message</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">Envoyer</button>
            </form>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .contact-form-container {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-group label {
          font-weight: bold;
        }
        
        .form-group input,
        .form-group textarea {
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-family: inherit;
          font-size: 1rem;
        }
        
        .submit-button {
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          cursor: pointer;
          align-self: flex-start;
          transition: background-color 0.2s;
        }
        
        .submit-button:hover {
          background-color: #3a4e64;
        }
        
        .success-message {
          text-align: center;
          padding: 2rem;
          background-color: #f2f9f5;
          border: 1px solid #67c387;
          border-radius: 4px;
        }
        
        .success-message p {
          margin-bottom: 1rem;
          color: #2e7d48;
        }
        
        .success-message button {
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          cursor: pointer;
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
