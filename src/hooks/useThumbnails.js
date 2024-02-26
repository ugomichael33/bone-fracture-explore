import { useState, useEffect } from 'react';
import { s3 } from '../utils/aws';

const useThumbnails = (albumName) => {
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!albumName) return;

    const fetchThumbnails = async () => {
      try {
        setLoading(true);
        const response = await s3
          .listObjectsV2({ Prefix: `${albumName}/thumbnails/` })
          .promise();
        const thumbnailUrls = response.Contents.map((item) => ({
          key: item.Key,
          url: `https://${s3.config.params.Bucket}.s3.${s3.config.region}.amazonaws.com/${item.Key}`,
        }));
        setThumbnails(thumbnailUrls);
      } catch (err) {
        console.error('Error fetching thumbnails:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchThumbnails();
  }, [albumName]);

  return { thumbnails, loading, error };
};

export default useThumbnails;
