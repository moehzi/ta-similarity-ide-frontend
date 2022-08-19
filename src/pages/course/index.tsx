import { PlusSquareIcon } from '@chakra-ui/icons';
import { Button, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardCourse } from '../../components/card';
import SidebarWithHeader from '../../components/Sidebar';
import { Loader } from '../../components/spinner';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../hooks/useCourse';
import { joinCourse } from '../../services/course';
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

export interface Works {
  name: string;
  description: string;
}

export const Course = () => {
  const { user } = useContext(UserContext);
  const { setToken, token } = useAuth();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { myCourse, courses, refetch, loading, refetchMyCourse } = useCourse();
  const [myCourses, setMyCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'student') {
      setMyCourses(myCourse.courses);
    }
    if (user?.role === 'teacher') {
      setMyCourses(myCourse);
    }
  }, [myCourse, user?.role, refetch, refetchMyCourse]);

  const handleJoinCourse = (e: React.MouseEvent) => {
    const button = e.target as HTMLButtonElement;
    joinCourse(token, button.id).then((res) => {
      toast({
        title: 'Join succesfully',
        description: res.data.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      onClose();
      refetch();
      refetchMyCourse();
    });
  };

  if (loading) {
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
        {user.role === 'teacher' && (
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
        <h1 className="mb-4 text-2xl font-bold">My Courses</h1>
        <div className="flex flex-wrap gap-8 mb-8">
          {(myCourses || []).map((v: courses, i: number) => {
            return (
              <CardCourse
                id={v._id}
                key={`card-course-${i}`}
                name={v.name}
                recent_assignment={v.works[v.works.length - 1]?.name}
                author={v.author[0]?.name}
                total_assignment={v.works.length}
                works={v.works}
                isMyCourses
                onClick={() => navigate(`/courses/${v._id}`)}
              />
            );
          })}
        </div>

        {user?.role === 'student' && (
          <>
            <h1 className="mb-4 text-2xl font-bold">List of all course</h1>
            <div className="flex flex-wrap gap-y-8 gap-x-6">
              {courses
                .filter(
                  (v: courses, i: number) =>
                    !myCourses.some((v2: courses) => v._id === v2._id)
                )
                .map((course: courses, i: number) => {
                  return (
                    <CardCourse
                      onClose={onClose}
                      isOpen={isOpen}
                      onOpen={onOpen}
                      id={course._id}
                      key={`card-course-${i}`}
                      onJoinCourse={handleJoinCourse}
                      name={course.name}
                      isMyCourses={false}
                      author={course.author[0]?.name}
                      total_assignment={course.works.length}
                      works={[]}
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
