import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaUser, FaPaperPlane, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { SiWhatsapp, SiTelegram } from 'react-icons/si';
import useWhatsApp from '../useWhatsApp';
import './Contact.css';

const qr = '/qr.jpg';
const WA_CHANNEL = 'https://whatsapp.com/channel/0029Vb6p4yfCxoAqsYAVcm2E';
const TELEGRAM = 'https://t.me/+xc-AmHSjMOtmOTc1';
const EMAIL = 'freelancingplat44@gmail.com';

emailjs.init('Sb4tbC-qSGcVRUkYU');

const openMailto = ({ subject = '', body = '' } = {}) => {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
};

const openGmailComposer = ({ subject = '', body = '' } = {}) => {
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(url, '_blank');
};

const openEmailApp = ({ subject = '', body = '' } = {}) => {
  try {
    openGmailComposer({ subject, body });
  } catch (err) {
    openMailto({ subject, body });
  }
};

export default function Contact() {
  const { open } = useWhatsApp();
  const [form, setForm] = useState({ name: '', email: '', service: 'Video Editing', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'info' }), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const result = await emailjs.send(
        'service_03gqtg5',
        'template_5s1yhub',
        {
          from_name: form.name,
          from_email: form.email,
          service: form.service,
          message: form.message,
        }
      );
      if (result.status === 200) {
        setStatus('success');
        showToast('Message sent successfully!', 'success');
        setForm({ name: '', email: '', service: 'Video Editing', message: '' });
      } else {
        setStatus('error');
        showToast('Failed to send message, using fallback email client.', 'error');
      }
    } catch (err) {
      setStatus('error');
      showToast('Failed to send. Opening fallback email client.', 'error');
      openEmailApp({
        subject: 'CREOVATE contact form fallback',
        body: `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\nMessage: ${form.message}`,
      });
    }
    setLoading(false);
    setTimeout(() => setStatus(''), 6000);
  };

  return (
    <div className="contact-page">

      {/* Hero */}
      <div className="contact-hero">
        <div className="contact-hero-badge">📬 Get In Touch</div>
        <h1>Contact <span>Us</span></h1>
        <p>We respond within 24 hours — WhatsApp is fastest!</p>
      </div>

      <button className="mobile-drawer-toggle" onClick={() => setDrawerOpen(true)}>☰ Contact Info</button>

      <div className={`mobile-drawer${drawerOpen ? ' open' : ''}`}>
        <button className="drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
        <h3>Contact Information</h3>
        <div className="drawer-contact-item" onClick={() => open('Hi Bikash! I want to know more about CREOVATE')}>
          <FaWhatsapp /> WhatsApp Chat
        </div>
        <div className="drawer-contact-item" onClick={() => openEmailApp({ subject: 'Hello CREOVATE', body: 'Hi Bikash...' })}>
          <FaEnvelope /> Send Email
        </div>
        <div className="drawer-contact-item">
          <FaMapMarkerAlt /> Odisha, India
        </div>
      </div>
      <div className={`drawer-backdrop${drawerOpen ? ' show' : ''}`} onClick={() => setDrawerOpen(false)}></div>

      <section className={`contact-main${loaded ? ' fade-slide-in' : ''}`}>

        {/* LEFT — Info */}
        <div className="contact-info">

          <div className="info-card">
            <h2>Let's Work Together!</h2>
            <p>Have a project in mind? Reach us via WhatsApp for instant reply or fill the form to email us.</p>

            <div className="contact-items">
              <div className="contact-item clickable" onClick={() => open('Hi Bikash! I want to know more about CREOVATE')}>
                <div className="contact-icon wa"><FaWhatsapp /></div>
                <div>
                  <h4>WhatsApp</h4>
                  <p>Click to chat instantly</p>
                </div>
                <span className="item-arrow">→</span>
              </div>

              <button type="button" className="contact-item clickable" onClick={() => openEmailApp({ subject: 'Hello CREOVATE', body: 'Hi Bikash, I would like to discuss...' })}>
                <div className="contact-icon email"><FaEnvelope /></div>
                <div>
                  <h4>Email</h4>
                  <p>{EMAIL} (Open Gmail)</p>
                </div>
                <span className="item-arrow">→</span>
              </button>

              <div className="contact-item">
                <div className="contact-icon location"><FaMapMarkerAlt /></div>
                <div>
                  <h4>Location</h4>
                  <p>Berhampur(Odisha), INDIA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Channels */}
          <div className="channels-card">
            <h3>Follow Our Channels</h3>
            <div className="channel-btns">
              <a href={WA_CHANNEL} target="_blank" rel="noreferrer" className="btn-wa-channel">
                <SiWhatsapp /> WhatsApp Channel
              </a>
              <a href={TELEGRAM} target="_blank" rel="noreferrer" className="btn-telegram">
                <SiTelegram /> Telegram Channel
              </a>
            </div>
          </div>

          {/* Quick Order */}
          <div className="quick-order-card">
            <h3>⚡ Quick Order via WhatsApp</h3>
            <div className="quick-btns-grid">
              {['Video Editing', 'Photo Editing', 'Website Building', 'Presentations'].map((s, i) => (
                <button key={i} onClick={() => open(`Hi Bikash! I want to order ${s} from CREOVATE`)} className="quick-btn">
                  <FaWhatsapp /> {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Form + QR */}
        <div className="contact-right">

          {/* Email Form */}
          <div className="contact-form-box">
            <div className="form-header">
              <div className="form-header-icon"><FaEnvelope /></div>
              <div>
                <h2>Send Us a Message</h2>
                <p>We'll reply to your email within 24 hours</p>
              </div>
            </div>

            {status === 'success' && (
              <div className="form-alert success">
                <FaCheckCircle /> Message sent successfully! Check your inbox for confirmation.
              </div>
            )}
            {status === 'error' && (
              <div className="form-alert error">
                <FaTimesCircle /> Failed to send. Please try WhatsApp instead.
              </div>
            )}

            {toast.visible && (
              <div className={`toast ${toast.type}`}>
                {toast.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <div className="input-wrap">
                    <FaUser className="form-icon" />
                    <input
                      placeholder="John Smeth"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Your Email</label>
                  <div className="input-wrap">
                    <FaEnvelope className="form-icon" />
                    <input
                      type="email"
                      placeholder="you@gmail.com"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Service Needed</label>
                <div className="input-wrap">
                  <FaWhatsapp className="form-icon" />
                  <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                    <option>Video Editing</option>
                    <option>Photo Editing</option>
                    <option>Website Building</option>
                    <option>Presentations</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Your Message</label>
                <textarea
                  placeholder="Tell us what you need in detail..."
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  rows={5}
                  required
                />
              </div>

              <button type="submit" className="btn-orange form-submit" disabled={loading}>
                {loading ? (
                  <><span className="spinner" /> Sending...</>
                ) : (
                  <><FaPaperPlane /> Send Message</>
                )}
              </button>
            </form>
          </div>

          {/* Payment QR */}
          <div className="payment-card">
            <h2>💳 Payment Method</h2>
            <div className="payment-flow">
              {[
                { n: '1', t: 'Place Order', d: 'Message on WhatsApp with requirements', color: '#ff6b35' },
                { n: '2', t: 'Preview Sent', d: 'Receive watermark preview to approve', color: '#7c3aed' },
                { n: '3', t: 'Approve & Pay', d: 'Pay via UPI/QR after approval', color: '#0ea5e9' },
                { n: '4', t: 'Get Full File', d: 'Receive full HD file instantly', color: '#10b981' },
              ].map((s, i) => (
                <div className="pay-step" key={i}>
                  <div className="pay-num" style={{background: s.color}}>{s.n}</div>
                  <div>
                    <h4>{s.t}</h4>
                    <p>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="qr-section">
              <div className="qr-box">
                <img src={qr} alt="PhonePe QR - Bikash Nahak" />
              </div>
              <p className="upi-id">📱 Scan & Pay via PhonePe — BIKASH NAHAK</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
