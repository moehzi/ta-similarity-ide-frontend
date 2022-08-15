import React, { createContext, useContext } from 'react';
import { GET_ALL_COURSE, GET_MY_COURSE } from '../services/course';
import useFetch from './useFetch';

type CourseContextProps = React.PropsWithChildren<{}>;

export interface Works {
  name: string;
  description: string;
}

export const CourseContext = createContext<any>(null);

export const CourseProvider = ({ children }: CourseContextProps) => {
  const { data: courses, loading, refetch } = useFetch(GET_ALL_COURSE);
  const { data: myCourse } = useFetch(GET_MY_COURSE);

  return (
    <CourseContext.Provider
      value={{
        courses,
        myCourse,
        refetch,
        loading,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  return useContext(CourseContext);
};
