import { useState, useEffect } from 'react';
import { s3 } from '../utils/aws';

const useImageLabels = (imageName) => {
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageName) return;

    const fetchLabels = async () => {
      try {
        setLoading(true);
        const labelKey = imageName.replace(/images/, 'labels').replace(/\.jpg$/, '.txt');
        const response = await s3.getObject({ Key: labelKey }).promise();
        const labelData = response.Body.toString('utf-8');
        const parsedLabels = labelData.split('\n').map((line) => {
          const [classIndex, ...coords] = line.split(' ');
          return { classIndex, polygon: coords.map(Number) };
        });
        setLabels(parsedLabels);
      } catch (err) {
        console.error('Error fetching image labels:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLabels();
  }, [imageName]);

  return { labels, loading, error };
};

export default useImageLabels;
