import React from 'react';

const ImagePopup = ({ url, onClose }) => {
  if (!url) return null;

  return (
    <div className="image-popup">
      <img src={url} alt="Full Size" />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ImagePopup;
