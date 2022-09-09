import React, { createContext } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { DETAIL_COURSE } from '../services/course';

export const DetailCourseContext = createContext(null);

export const DetailCourseProvider = ({ children }) => {
  const { courseId } = useParams();
  const {
    data: detailCourse,
    refetch: refetchDetailCourse,
    loading: loadingDetailCourse,
  } = useFetch(DETAIL_COURSE(courseId));
  return (
    <DetailCourseContext.Provider
      value={{
        detailCourse,
        refetchDetailCourse,
        loadingDetailCourse,
      }}
    >
      {children}
    </DetailCourseContext.Provider>
  );
};
