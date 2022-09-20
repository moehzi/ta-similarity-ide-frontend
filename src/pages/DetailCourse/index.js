import { CheckCircleIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Button, useDisclosure } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardCourse } from '../../components/card';
import SidebarWithHeader from '../../components/Sidebar';
import { Loader } from '../../components/spinner';
import { ClassContext } from '../../context/ListClassCourse';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import ModalAddClass from './ModalAddClass';
const DetailCourse = () => {
  const { data, loading, refetch } = useContext(ClassContext);
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { user } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (loading) {
    return <Loader />;
  }
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
      <div className="flex items-center justify-between w-full">
        <h1 className="mb-4 text-2xl font-bold">List Of Class</h1>
        <Button
          leftIcon={<PlusSquareIcon />}
          colorScheme="facebook"
          onClick={onOpen}
        >
          Add new class
        </Button>
      </div>
      {data?.length > 0 && (
        <div className="flex flex-wrap gap-8 mb-8">
          {data.map((v, i) => {
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
                onClick={() => navigate(`/courses/${v._id}`)}
              />
            );
          })}
        </div>
      )}
      {user?.role === 'teacher' && (
        <ModalAddClass isOpen={isOpen} onClose={onClose} refetch={refetch} />
      )}
    </SidebarWithHeader>
  );
};

export default DetailCourse;
