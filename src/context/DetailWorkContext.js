import React, { createContext } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { DETAIL_WORK } from '../services/work';

export const DetailWorkContext = createContext(null);

export const DetailWorkProvider = ({ children }) => {
  const { workId } = useParams();
  const {
    data: detailWork,
    refetch: refetchDetailWork,
    loading: loadingDetailWork,
  } = useFetch(DETAIL_WORK(workId));
  return (
    <DetailWorkContext.Provider
      value={{
        detailWork,
        refetchDetailWork,
        loadingDetailWork,
      }}
    >
      {children}
    </DetailWorkContext.Provider>
  );
};
