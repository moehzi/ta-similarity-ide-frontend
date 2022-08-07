import { Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  HTMLAttributes,
  MouseEventHandler,
} from 'react';
import { CardCourse } from '../../components/card';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../hooks/useCourse';
import { getAllCourse, getMyCourse, joinCourse } from '../../services/course';

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
  const { setToken, token, isLoading: loading } = useAuth();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { myCourse, courses, setRefetch, isLoading } = useCourse();

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
      setRefetch(true);
    });
    onClose();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="purple.600"
          size="xl"
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="purple.600"
          size="xl"
        />
      </div>
    );
  }

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
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">My Courses</h1>
        <div className="flex flex-wrap gap-8 mb-8">
          {myCourse.map((v: courses, i: number) => {
            return (
              <CardCourse
                id={`card-course-${i}`}
                key={`card-course-${i}`}
                name={v.name}
                recent_assignment={v.works[v.works.length - 1]?.name}
                author={v.author[0]?.name}
                total_assignment={v.works.length}
                works={v.works}
                isMyCourses
              />
            );
          })}
        </div>

        {user.role === 'student' && (
          <>
            <h1 className="mb-4 text-2xl font-bold">List of all course</h1>
            <div className="flex flex-wrap gap-y-8 gap-x-6">
              {courses
                .filter(
                  (v: courses, i: number) =>
                    !myCourse.some((v2: courses) => v._id === v2._id)
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
