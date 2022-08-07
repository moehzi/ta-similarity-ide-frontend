import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { getAllCourse, getMyCourse } from '../services/course';
import { useAuth } from './useAuth';

type CourseContextProps = React.PropsWithChildren<{}>;

interface courses {
  _id: string;
  name: string;
  author: [
    {
      name: string;
    }
  ];
  works: Works[];
}

export interface Works {
  name: string;
  description: string;
}

export const CourseContext = createContext<any>(null);

export const CourseProvider = ({ children }: CourseContextProps) => {
  const [courses, setCourses] = useState<courses[]>([]);
  const [myCourse, setMyCourse] = useState<courses[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const [refecth, setRefetch] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        getAllCourse(token).then((res) => setCourses(res.data));
        if (user.role === 'student') {
          getMyCourse(token).then((res) => {
            setMyCourse(res.data.courses);
            setIsLoading(false);
          });
        }
        if (user.role === 'teacher') {
          getMyCourse(token).then((res) => {
            setMyCourse(res.data);
            setIsLoading(false);
          });
        }
      }
    };
    fetchData();
  }, [token, user.role]);

  return (
    <CourseContext.Provider
      value={{
        courses,
        setCourses,
        refecth,
        myCourse,
        setMyCourse,
        setRefetch,
        isLoading,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  return useContext(CourseContext);
};
