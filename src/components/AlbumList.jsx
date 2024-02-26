import React from 'react';

const AlbumList = ({ albums, onSelectAlbum }) => {
  if (!albums.length) return <div>No albums found</div>;

  return (
    <ul>
      {albums.map((albumName) => (
        <li key={albumName}>
          <button onClick={() => onSelectAlbum(albumName)}>{albumName}</button>
        </li>
      ))}
    </ul>
  );
};

export default AlbumList;
