import { useState, useEffect } from 'react';
import { s3 } from '../utils/aws';
import yaml from 'js-yaml';

const useClassNames = () => {
  const [classNames, setClassNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataYaml = async () => {
      try {
        setLoading(true);
        const response = await s3.getObject({ Key: 'data.yaml' }).promise();
        const dataYaml = yaml.load(response.Body.toString('utf-8'));
        setClassNames(dataYaml.names);
      } catch (err) {
        console.error('Error fetching class names:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDataYaml();
  }, []);

  return { classNames, loading, error };
};

export default useClassNames;
