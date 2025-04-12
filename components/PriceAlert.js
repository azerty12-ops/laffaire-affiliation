import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';

export default function PriceAlert({ productId, productName, currentPrice, currency = '€' }) {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [existingAlerts, setExistingAlerts] = useState([]);
  const [error, setError] = useState('');
  
  // Charger les alertes existantes pour ce produit
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAlerts = JSON.parse(localStorage.getItem('priceAlerts') || '[]');
      const productAlerts = savedAlerts.filter(alert => alert.productId === productId);
      setExistingAlerts(productAlerts);
    }
  }, [productId]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation du prix
    const priceFloat = parseFloat(targetPrice);
    if (isNaN(priceFloat) || priceFloat <= 0) {
      setError(t('price_alert.error_invalid_price'));
      return;
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('price_alert.error_invalid_email'));
      return;
    }
    
    setError('');
    
    // Créer une nouvelle alerte
    const newAlert = {
      id: Date.now(),
      productId,
      productName,
      email,
      targetPrice: priceFloat,
      currentPrice: parseFloat(currentPrice),
      currency,
      createdAt: new Date().toISOString(),
    };
    
    // Sauvegarder l'alerte
    const savedAlerts = JSON.parse(localStorage.getItem('priceAlerts') || '[]');
    localStorage.setItem('priceAlerts', JSON.stringify([...savedAlerts, newAlert]));
    
    // Mettre à jour l'interface
    setExistingAlerts([...existingAlerts, newAlert]);
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setEmail('');
      setTargetPrice('');
    }, 3000);
    
    // Dans un vrai site, on enverrait ces données à un serveur backend pour gérer les alertes
    console.log('Nouvelle alerte de prix créée:', newAlert);
  };
  
  const deleteAlert = (alertId) => {
    // Supprimer l'alerte
    const savedAlerts = JSON.parse(localStorage.getItem('priceAlerts') || '[]');
    const updatedAlerts = savedAlerts.filter(alert => alert.id !== alertId);
    localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts));
    
    // Mettre à jour l'interface
    setExistingAlerts(existingAlerts.filter(alert => alert.id !== alertId));
  };
  
  return (
    <div className="price-alert">
      {!showForm && !submitted ? (
        <button 
          className="alert-trigger-btn" 
          onClick={() => setShowForm(true)}
          aria-label={t('price_alert.btn_set_alert')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
          </svg>
          {t('price_alert.btn_set_alert')}
        </button>
      ) : (
        <div className="price-alert-form-container">
          {submitted ? (
            <div className="alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
              <p>{t('price_alert.success_message')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="price-alert-form">
              <div className="form-header">
                <h3>{t('price_alert.form_title')}</h3>
                <button 
                  type="button" 
                  className="close-btn" 
                  onClick={() => setShowForm(false)}
                  aria-label="Fermer"
                >
                  &times;
                </button>
              </div>
              
              <p className="form-info">
                {t('price_alert.form_info', { productName })}
              </p>
              
              <div className="current-price-info">
                <span>{t('price_alert.current_price')}:</span>
                <strong>{currentPrice} {currency}</strong>
              </div>
              
              <div className="form-group">
                <label htmlFor="targetPrice">{t('price_alert.target_price')}</label>
                <div className="price-input">
                  <input
                    type="number"
                    id="targetPrice"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    step="0.01"
                    min="0.01"
                    required
                    placeholder={t('price_alert.target_price_placeholder')}
                  />
                  <span className="currency-symbol">{currency}</span>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{t('price_alert.email')}</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={t('price_alert.email_placeholder')}
                />
              </div>
              
              {error && <p className="error-message">{error}</p>}
              
              <button type="submit" className="submit-btn">
                {t('price_alert.btn_create_alert')}
              </button>
            </form>
          )}
        </div>
      )}
      
      {existingAlerts.length > 0 && (
        <div className="existing-alerts">
          <h4>{t('price_alert.your_alerts')}</h4>
          <ul>
            {existingAlerts.map(alert => (
              <li key={alert.id} className="alert-item">
                <div className="alert-info">
                  <span className="alert-price">
                    {t('price_alert.target')}: <strong>{alert.targetPrice} {alert.currency}</strong>
                  </span>
                  <span className="alert-email">{alert.email}</span>
                </div>
                <button 
                  onClick={() => deleteAlert(alert.id)} 
                  className="delete-alert-btn"
                  aria-label={t('price_alert.delete_alert')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <style jsx>{`
        .price-alert {
          margin: 2rem 0;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          padding: 1.5rem;
          background-color: #f9f9f9;
        }
        
        .alert-trigger-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--primary-color);
          color: white;
          border: none;
          padding: 0.7rem 1.2rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .alert-trigger-btn:hover {
          background-color: #3a4e64;
        }
        
        .price-alert-form-container {
          width: 100%;
        }
        
        .price-alert-form {
          width: 100%;
        }
        
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .form-header h3 {
          margin: 0;
          color: var(--primary-color);
        }
        
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          line-height: 1;
          color: #666;
        }
        
        .form-info {
          margin-bottom: 1rem;
          color: #666;
        }
        
        .current-price-info {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding: 0.75rem;
          background-color: #e8f4fd;
          border-radius: 4px;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .price-input {
          position: relative;
        }
        
        .price-input input {
          padding-right: 2rem;
        }
        
        .currency-symbol {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }
        
        .error-message {
          color: #d32f2f;
          margin: 0.5rem 0;
          font-size: 0.875rem;
        }
        
        .submit-btn {
          width: 100%;
          background-color: var(--primary-color);
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-top: 0.5rem;
        }
        
        .submit-btn:hover {
          background-color: #3a4e64;
        }
        
        .alert-success {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background-color: #e8f5e9;
          border-radius: 4px;
          color: #2e7d32;
        }
        
        .existing-alerts {
          margin-top: 2rem;
          border-top: 1px solid #e5e5e5;
          padding-top: 1.5rem;
        }
        
        .existing-alerts h4 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: var(--primary-color);
        }
        
        .existing-alerts ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .alert-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }
        
        .alert-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .alert-price {
          font-weight: 500;
        }
        
        .alert-email {
          font-size: 0.875rem;
          color: #666;
        }
        
        .delete-alert-btn {
          background: none;
          border: none;
          color: #d32f2f;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        
        .delete-alert-btn:hover {
          background-color: rgba(211, 47, 47, 0.1);
        }
        
        @media (max-width: 768px) {
          .price-alert {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
