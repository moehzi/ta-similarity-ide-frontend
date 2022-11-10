import { useDisclosure, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardCourse } from '../../components/card';
import ModalJoin from '../../components/card/Modal';
import SidebarWithHeader from '../../components/Sidebar';
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
  const { token, setToken } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef();
  const {
    isOpen: isOpenJoin,
    onClose: onCloseJoin,
    onOpen: onOpenJoin,
  } = useDisclosure();
  const [myCourses, setMyCourses] = useState([]);
  const { data: listClass } = useContext(ListClassContext);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    setMyCourses(data?.classes);
  }, [data?.classes]);

  if (loading) {
    return <Loader />;
  }

  const handleJoinCourse = () => {
    joinCourse(token, selectedId)
      .then((res) => {
        toast({
          title: 'Join succesfully',
          description: res.data?.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => {
        refetch();
        onCloseJoin();
      });
  };

  return (
    <SidebarWithHeader
      name={user?.name}
      role={user?.role}
      handleLogout={(e) => {
        e.preventDefault();
        localStorage.clear();
        setToken('');
      }}
    >
      <h1 className="mb-4 text-2xl font-bold">My Classes</h1>
      <div className="flex flex-wrap gap-8 mb-8">
        {data?.classes?.map((v, i) => {
          return (
            <>
              <CardCourse
                id={v._id}
                key={`card-course-${i}`}
                name={v.name}
                recent_assignment={v.works[v.works.length - 1]?.name}
                author={v.author[0]?.name}
                total_assignment={v.works?.length}
                works={v.works}
                isMyClass
                onClick={
                  user.role === 'teacher'
                    ? () => navigate(`/courses/${v._id}/class`)
                    : () => navigate(`/courses/${v._id}`)
                }
              />
            </>
          );
        })}
      </div>

      <ListClass
        data={listClass}
        myCourses={myCourses}
        onClose={onCloseJoin}
        isOpen={isOpenJoin}
        onOpen={onOpenJoin}
        setSelectedId={setSelectedId}
        handleJoinCourse={handleJoinCourse}
      />
      <ModalJoin
        id={selectedId}
        handleJoinCourse={handleJoinCourse}
        isOpen={isOpenJoin}
        cancelRef={cancelRef}
        onClose={onCloseJoin}
      />
    </SidebarWithHeader>
  );
};

export default UserClass;
