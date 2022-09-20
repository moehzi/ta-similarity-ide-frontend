import { PlusSquareIcon } from '@chakra-ui/icons';
import { Button, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardCourse } from '../../components/card';
import SidebarWithHeader from '../../components/Sidebar';
import { Loader } from '../../components/spinner';
import { ListClassContext } from '../../context/ClassContext';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../hooks/useCourse';
import { joinCourse } from '../../services/course';
import ListClass from './ListClass';
import ModalAddCourse from './ModalAddCourse';

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

interface classCourse {
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

export const Course = () => {
  const { user } = useContext(UserContext);
  const { setToken, token } = useAuth();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    myCourse,
    courses,
    refetch,
    loading,
    refetchMyCourse,
    loadingCourse,
  } = useCourse();
  const [myCourses, setMyCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMyCourses(myCourse);
  }, [myCourse, user?.role, refetch, refetchMyCourse]);

  if (loading) {
    return <Loader />;
  }

  if (loadingCourse) {
    return <Loader />;
  }

  return (
    <SidebarWithHeader
      name={user?.name}
      role={user?.role}
      handleLogout={(e: React.MouseEvent) => {
        e.preventDefault();
        localStorage.clear();
        setToken('');
      }}
    >
      <div className="p-4">
        {user?.role === 'teacher' && (
          <div className="flex justify-end">
            <Button
              leftIcon={<PlusSquareIcon />}
              colorScheme="facebook"
              onClick={onOpen}
            >
              Add Course
            </Button>
            <ModalAddCourse isOpen={isOpen} onClose={onClose} />
          </div>
        )}
        {myCourses?.length > 0 && (
          <>
            <h1 className="mb-4 text-2xl font-bold">My Courses</h1>
            <div className="flex flex-wrap gap-8 mb-8">
              {myCourses.map((v: courses, i: number) => {
                return (
                  <CardCourse
                    id={v._id}
                    key={`card-course-${i}`}
                    name={v.name}
                    recent_assignment={v.works[v.works.length - 1]?.name}
                    author={v.author[0]?.name}
                    total_assignment={v.works?.length}
                    works={v.works}
                    isMyCourses
                    onClick={() => navigate(`/courses/${v._id}/class`)}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </SidebarWithHeader>
  );
};
