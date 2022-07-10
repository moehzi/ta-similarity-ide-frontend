import React, { useContext, useEffect, useState } from 'react';
import { CardCourse } from '../../components/card';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import { getAllCourse } from '../../services/course';

interface courses {
  name: string;
}

export const Course = () => {
  const { user, isLoading } = useContext(UserContext);
  const { setToken, token } = useAuth();
  const [courses, setCourses] = useState<courses[]>([]);

  useEffect(() => {
    if (token) {
      getAllCourse(token).then((res) => setCourses(res.data));
    }
    console.log(courses);
  }, [token]);

  return (
    <SidebarWithHeader
      name={user.name}
      role={user.role}
      handleLogout={(e: React.MouseEvent) => {
        e.preventDefault();
        localStorage.clear();
        setToken('');
      }}
    >
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {courses.map((v, i) => {
            return <CardCourse name={v.name} />;
          })}
        </div>
      )}
    </SidebarWithHeader>
  );
};
