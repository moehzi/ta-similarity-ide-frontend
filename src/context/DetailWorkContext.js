import React, { createContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { DETAIL_WORK } from '../services/work';
// import useFetch from '../hooks/useFetch';
// import { GET_PROFILE } from '../services/user';

// type UserProviderProps = React.PropsWithChildren<{}>;

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
