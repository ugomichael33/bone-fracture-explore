import React, { useState } from 'react';

import AlbumList from './components/AlbumList';
import ImageGrid from './components/ImageGrid';
import ImagePopup from './components/ImagePopup';
import FilterPanel from './components/FilterPanel';
import useAlbums from './hooks/useAlbums';
import useThumbnails from './hooks/useThumbnails';
import useImageLabels from './hooks/useImageLabels';
import { useAlbumContents } from './hooks/useAlbumContent';
// import useClassNames from './hooks/useClassNames';

const App = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // Add other state variables as needed for filters, etc.

  const { albums, loading: loadingAlbums, error: errorAlbums } = useAlbums();
  const { albumContent, loading: loadingAlbumContent, error: errorAlbumContent } = useAlbumContents();
  const { thumbnails, loading: loadingThumbnails, error: errorThumbnails } = useThumbnails();
  const { ImageLabels, loading: loadingImageLabels, error: errorImageLabels } = useImageLabels();
  // const { classNames, loading: loadingClassNames, error: errorClassNames } = useClassNames();

  console.log({albumContent})

  return (
    <div className="app">
      <header>
        <h1>Bone-fracture-detection</h1>
      </header>
      <AlbumList albums={albums} onSelectAlbum={setSelectedAlbum} />
      <ImageGrid />
      <ImagePopup url={selectedImage} onClose={() => setSelectedImage(null)} />
      <FilterPanel />
    </div>
  );
};

export default App;
