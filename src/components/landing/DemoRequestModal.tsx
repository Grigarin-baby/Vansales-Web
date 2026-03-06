import React, { useState, useEffect } from 'react';
import { X, Send, Building2, Mail, Phone, User, MapPin, CheckCircle2 } from 'lucide-react';

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoRequestModal({ isOpen, onClose }: DemoRequestModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // --- API CONFIGURATION ---
    // Replace with your actual endpoint when ready
    const API_ENDPOINT = 'https://api.yourdomain.com/enquiry'; 

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          companyName: '',
          address: '',
          message: ''
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      // For now, we'll log it. Since the user will provide the API later,
      // a failure is expected at this stage if tested.
      console.error('Submission Error:', err);
      setError('Could not connect to the enquiry service. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="modal-badge">Request a Demo</div>
          <h2 className="modal-title">Experience the Future of Field Sales</h2>
          <p className="modal-subtitle">Fill in your details and our team will get in touch to schedule a personalized walkthrough.</p>
        </div>

        {isSuccess ? (
          <div className="modal-success">
            <div className="modal-success-icon">
              <CheckCircle2 size={48} />
            </div>
            <h3>Request Sent Successfully!</h3>
            <p>Thank you. We've received your request and will get back to you shortly.</p>
            <button className="btn btn--primary" style={{ marginTop: '24px' }} onClick={onClose}>
              Back to Website
            </button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            {error && <div className="form-error" style={{ color: '#EF4444', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px', fontSize: '0.85rem' }}>{error}</div>}
            
            <div className="form-grid">
              <div className="form-group">
                <label><User size={14} /> First Name <span className="required-star">*</span></label>
                <input 
                  type="text" 
                  name="firstName" 
                  required 
                  placeholder="Alex"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label><User size={14} /> Last Name <span className="required-star">*</span></label>
                <input 
                  type="text" 
                  name="lastName" 
                  required 
                  placeholder="Johnson"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label><Mail size={14} /> Business Email <span className="required-star">*</span></label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label><Phone size={14} /> Contact Number <span className="required-star">*</span></label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label><Building2 size={14} /> Company Name <span className="required-star">*</span></label>
              <input 
                type="text" 
                name="companyName" 
                required 
                placeholder="Retail Solutions Ltd."
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label><MapPin size={14} /> Company Address (Optional)</label>
              <input 
                type="text" 
                name="address" 
                placeholder="Suite 402, Business Park, Mumbai"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Additional Notes (Optional)</label>
              <textarea 
                name="message" 
                rows={3} 
                placeholder="Tell us about your sales team size or specific requirements..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn--primary btn--lg" style={{ width: '100%', marginTop: '8px' }} disabled={isSubmitting}>
              {isSubmitting ? 'Sending Request...' : (
                <>
                  Confirm Demo Request <Send size={18} style={{ marginLeft: '8px' }} />
                </>
              )}
            </button>
            <p className="form-footer">By submitting, you agree to our privacy policy and terms of service.</p>
          </form>
        )}
      </div>
    </div>
  );
}
