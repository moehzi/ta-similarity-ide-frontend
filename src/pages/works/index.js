import { useContext } from 'react';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import { Space, Table } from 'antd';
import { Button, Heading, Link, Text, useDisclosure } from '@chakra-ui/react';
import { Loader } from '../../components/spinner';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { DetailCourseContext } from '../../context/DetailCourseContext';
import ModalAddWork from './ModalAddWork';

export const Works = () => {
  const { user } = useContext(UserContext);
  const { setToken } = useAuth();
  const { detailCourse, loadingDetailCourse, refetchDetailCourse } =
    useContext(DetailCourseContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = [
    {
      title: 'No. ',
      dataIndex: 'name',
      key: '_id',
      render: (item, record, index) => <Text>{index + 1}</Text>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Link color="teal.500" href="#">
          {text}
        </Link>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button colorScheme="whatsapp" size="sm">
            Detail
          </Button>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  if (loadingDetailCourse) {
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
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <Heading size="md" mb={2}>
              {detailCourse?.name}
            </Heading>
            <Text mb={4} opacity={'70%'}>
              Lecturer : {detailCourse?.author[0].name}
            </Text>
          </div>
          {user.role === 'teacher' && (
            <Button
              leftIcon={<PlusSquareIcon />}
              colorScheme="facebook"
              onClick={onOpen}
            >
              Add New Work
            </Button>
          )}
        </div>
        <Table columns={columns} dataSource={detailCourse?.works} />
        <ModalAddWork
          isOpen={isOpen}
          onClose={onClose}
          refetch={refetchDetailCourse}
        />
      </div>
    </SidebarWithHeader>
  );
};
