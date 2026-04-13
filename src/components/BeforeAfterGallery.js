import React from 'react';
import './BeforeAfterGallery.css';

export default function BeforeAfterGallery({ galleryImages = [], subcategoryTitle }) {
  if (!galleryImages.length) {
    return (
      <div style={{ padding: '30px 0', textAlign: 'center', color: '#666' }}>
        <h3>Gallery</h3>
        <p>No gallery images available yet. Add image URLs directly in code.</p>
      </div>
    );
  }

  const filteredImages = subcategoryTitle
    ? galleryImages.filter((g) => g.subcategoryTitle === subcategoryTitle)
    : galleryImages;

  return (
    <div className="baf-gallery">
      <h3>Service Gallery</h3>
      {subcategoryTitle && <p>Showing images for: {subcategoryTitle}</p>}
      <div className="baf-grid">
        {filteredImages.map((item, index) => (
          <div className="baf-card" key={index}>
            <div className="baf-image-wrap">
              <img src={item.image} alt={item.title || item.subcategoryTitle || 'gallery image'} loading="lazy" />
            </div>
            <div className="baf-info">
              <h4>{item.title || item.subcategoryTitle}</h4>
              <p>{item.description}</p>
              {item.subcategoryTitle && <small>{item.subcategoryTitle}</small>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
