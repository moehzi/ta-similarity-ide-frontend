import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

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
          //   if (err.response.data.data.message === 'jwt expired') {
          //     localStorage.removeItem('token');
          //     navigate('/login');
          //   }
          localStorage.removeItem('token');
          navigate('/login');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  const refetch = () => {
    setLoading(true);
    if (token) {
      return axios
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
          localStorage.removeItem('token');
          navigate('/login');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return { data, loading, error, refetch };
};

export default useFetch;
