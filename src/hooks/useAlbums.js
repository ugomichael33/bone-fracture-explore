import { useState, useEffect } from 'react';
import { s3 } from '../utils/aws';

const useAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const listAlbums = async () => {
      try {
        const { CommonPrefixes } = await s3.listObjectsV2({ Delimiter: '/' }).promise();
        const albumNames = CommonPrefixes.map(({ Prefix }) => Prefix.replace(/\/$/, ''));
        setAlbums(albumNames);
      } catch (err) {
        console.error('Error fetching albums:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    listAlbums();
  }, []);

  return { albums, loading, error };
};

export default useAlbums;
