import React, { createContext } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { GET_LIST_CLASS_BY_COURSEID } from '../services/class';

export const ClassContext = createContext(null);

export const ClassProvider = ({ children }) => {
  const { courseId } = useParams();
  const { data, refetch, loading } = useFetch(
    GET_LIST_CLASS_BY_COURSEID(courseId)
  );
  return (
    <ClassContext.Provider
      value={{
        data,
        refetch,
        loading,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};
