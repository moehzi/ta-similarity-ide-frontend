import { PlusSquareIcon } from '@chakra-ui/icons';
import { Button, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardCourse } from '../../components/card';
import SidebarWithHeader from '../../components/Sidebar';
import { Loader } from '../../components/spinner';
import { ClassContext } from '../../context/ListClassCourse';
import { UserClassContext } from '../../context/UserClassContext';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import { USER_CLASS } from '../../services/class';
import { getTeacher } from '../../services/user';
import UserClass from '../course/UserClass';
import ModalAddClass from './ModalAddClass';
import ModalDeleteClass from './ModalDeleteClass';
import ModalEditClass from './ModalEditClass';
const DetailCourse = () => {
  const { data, loading, refetch } = useContext(ClassContext);
  const navigate = useNavigate();
  const { setToken, token } = useAuth();
  const { user } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [classId, setClassId] = useState('');
  const [name, setClassName] = useState('');
  const [options, setOptions] = useState([]);
  const [listTeacher, setListTeacher] = useState([]);
  const [value, setValue] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleChange = (value2) => {
    console.log(`selected ${value2}`);
    setValue(value2);
    const selectedTeacher = listTeacher.filter((teacher) =>
      value2.includes(teacher.name)
    );

    const selectedId = selectedTeacher.map((v) => v._id);

    setSelected(selectedId);
  };

  const handleCourseById = useMemo(() => {
    const filtered = data?.find((item) => item._id === classId);

    if (filtered?.length) {
      setClassName(filtered.name);
      const teacherName = filtered.author.map((v) => v.name);
      setValue(teacherName);
    }
    console.log(filtered);
  }, [data, classId]);

  useEffect(() => {
    console.log('class called');
  }, [handleCourseById]);

  useEffect(() => {
    getTeacher(token).then((res) => {
      const teacherName = res?.data?.map((v) => v.name);
      setOptions(teacherName);
      setListTeacher(res.data);
    });
  }, []);

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
        <div className="flex flex-wrap gap-8 mt-8 mb-8">
          {data?.map((v, i) => {
            return (
              <CardCourse
                setCourseId={setClassId}
                courseId={classId}
                isTeacher
                isOpenEdit={isOpenEdit}
                onOpenEdit={onOpenEdit}
                onOpenDelete={onOpenDelete}
                onCloseEdit={onCloseEdit}
                id={v._id}
                isMyClass
                key={`card-course-${i}`}
                name={v.name}
                recent_assignment={v.works[v.works.length - 1]?.name}
                author={v.author[0]?.name}
                total_assignment={v.works?.length}
                works={v.works}
                isMyCourses={false}
                onClick={() => navigate(`/courses/${v._id}`)}
              />
            );
          })}
        </div>
      )}
      {user?.role === 'teacher' && (
        <>
          <ModalAddClass
            isOpen={isOpen}
            onClose={onClose}
            refetch={refetch}
            options={options}
            selected={selected}
            value={value}
            handleChange={handleChange}
          />
          <ModalEditClass
            courseId={classId}
            isOpen={isOpenEdit}
            onClose={onCloseEdit}
            className={name}
            setClassName={setClassName}
            value={value}
            options={options}
            handleChangeSelect={handleChange}
            selected={selected}
          />
          <ModalDeleteClass
            isOpenDelete={isOpenDelete}
            onCloseDelete={onCloseDelete}
            classId={classId}
            refetch={refetch}
          />
        </>
      )}
    </SidebarWithHeader>
  );
};

export default DetailCourse;
