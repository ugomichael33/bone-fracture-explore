import React from 'react';

const ImageGrid = ({ thumbnails, onSelectImage }) => {
  return (
    <div className="image-grid">
      {thumbnails.map((thumbnail) => (
        <img
          key={thumbnail.key}
          src={thumbnail.url}
          alt="Thumbnail"
          onClick={() => onSelectImage(thumbnail.url)}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
