import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    setLoading(true);
    if (token) {
      axios
        .get(url, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [url, token]);

  const refetch = () => {
    setLoading(true);
    axios
      .get(url, {
        headers: {
          Autrhorization: token,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { data, loading, error, refetch };
};

export default useFetch;
