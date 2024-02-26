import { useState, useEffect } from 'react';
import { s3 } from '../utils/aws';

export const useAlbumContents = (albumName) => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!albumName) {
      setLoading(false);
      return;
    }

    const fetchAlbumContents = async () => {
      try {
        const { Contents } = await s3.listObjectsV2({ Prefix: `${albumName}/` }).promise();
        const photos = Contents.map(({ Key }) => ({
          key: Key,
          url: `https://${s3.config.params.Bucket}.s3.${s3.config.region}.amazonaws.com/${encodeURIComponent(Key)}`,
        }));
        setContents(photos);
      } catch (err) {
        console.error(`Error fetching contents of album ${albumName}:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumContents();
  }, [albumName]);

  return { contents, loading, error };
};
