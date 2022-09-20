import { useDisclosure, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardCourse } from '../../components/card';
import { Loader } from '../../components/spinner';
import { ListClassContext } from '../../context/ClassContext';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../hooks/useCourse';
import useFetch from '../../hooks/useFetch';
import { USER_CLASS } from '../../services/class';
import { joinCourse } from '../../services/course';
import ListClass from './ListClass';

const UserClass = () => {
  const { data, refetch, loading } = useFetch(USER_CLASS());
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const toast = useToast();
  const { token } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [myCourses, setMyCourses] = useState([]);
  const { data: listClass } = useContext(ListClassContext);

  useEffect(() => {
    setMyCourses(data?.classes);
  }, [data?.classes]);

  if (loading) {
    return <Loader />;
  }

  const handleJoinCourse = (e) => {
    const button = e.target.id;
    joinCourse(token, button).then((res) => {
      toast({
        title: 'Join succesfully',
        description: res.data?.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      refetch();
      onClose();
    });
    refetch();
  };

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">My Classes</h1>
      <div className="flex flex-wrap gap-8 mb-8">
        {data?.classes?.map((v, i) => {
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
              onClick={
                user.role === 'teacher'
                  ? () => navigate(`/courses/${v._id}/class`)
                  : () => navigate(`/courses/${v._id}`)
              }
            />
          );
        })}
      </div>
      <ListClass
        data={listClass}
        myCourses={myCourses}
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
        handleJoinCourse={handleJoinCourse}
      />
    </>
  );
};

export default UserClass;
