import React from 'react';
import { FaWhatsapp, FaHeart, FaRocket, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useWhatsApp from '../useWhatsApp';
import './About.css';

const bikash = '/bikash.jpg';

export default function About() {
  const { open } = useWhatsApp();
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About <span>CREOVATE</span></h1>
        <p>The story behind the brand</p>
      </div>

      <section className="about-main">
        <div className="about-img">
          <img src={bikash} alt="Bikash Nahak" />
        </div>
        <div className="about-text">
          <span className="badge-orange">👋 Hello, I'm</span>
          <h2>Bikash Nahak</h2>
          <p className="about-role">🎓 Frontend Developer — RIT College Berhampur</p>
          <p>I'm a passionate creative freelancer and the founder of <strong>CREOVATE</strong>. I specialize in video editing, photo editing, website building, and presentations.</p>
          <p>My mission is simple — deliver <strong>professional quality creative work</strong> at prices that everyone can afford. No complicated processes, just WhatsApp me and I'll handle the rest!</p>
          <div className="about-values">
            <div className="value"><FaHeart color="#ff6b35" /><span>Passion for Creativity</span></div>
            <div className="value"><FaRocket color="#7c3aed" /><span>Fast Delivery</span></div>
            <div className="value"><FaShieldAlt color="#10b981" /><span>Quality Guaranteed</span></div>
          </div>
          <div className="about-btns">
            <button onClick={() => open('Hi Bikash! I want to know more about CREOVATE')} className="btn-orange">
              <FaWhatsapp /> Chat on WhatsApp
            </button>
          </div>
        </div>
      </section>

      <section className="stats-section">
        {[
          { n: '4+', l: 'Services Offered' },
          { n: '100%', l: 'Client Satisfaction' },
          { n: '24hr', l: 'Fast Delivery' },
          { n: '₹20', l: 'Starting Price' },
        ].map((s, i) => (
          <div className="stat" key={i}>
            <h3>{s.n}</h3>
            <p>{s.l}</p>
          </div>
        ))}
      </section>

      <section className="cta-section">
        <h2>Ready to work together?</h2>
        <p>Browse our services and place your order in seconds via WhatsApp</p>
        <Link to="/services" className="btn-orange">View Services 🚀</Link>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <p>The creative minds behind CREOVATE</p>
        <div className="team-grid">
          {[
            { name: 'Kishan Nahak', role: 'NIST College, Specialization in Website Development', src: 'team1.jpg', alt: 'Team Member 1' },
            { name: 'Ritesh Nahak', role: 'Disha College, Specialization in Video Editing', src: 'team2.jpg', alt: 'Team Member 2' },
            { name: 'Raj Swain', role: 'RIT College, Specialization in Graphic Design', src: 'team3.jpg', alt: 'Team Member 3' },
          ].map((member, idx) => (
            <div className="team-member" key={idx}>
              <div className="member-img">
                <img
                  src={member.src}
                  alt={member.alt}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(member.name)}`;
                  }}
                />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
