import React, { createContext } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { DETAIL_STUDENT_WORK } from '../services/code';

export const DetailStudentWorkContext = createContext(null);

export const DetailStudentWorkProvider = ({ children }) => {
  const { workId, studentId } = useParams();
  const { data, refetch, loading } = useFetch(
    DETAIL_STUDENT_WORK(workId, studentId)
  );
  return (
    <DetailStudentWorkContext.Provider
      value={{
        data,
        refetch,
        loading,
      }}
    >
      {children}
    </DetailStudentWorkContext.Provider>
  );
};
