import { useContext } from 'react';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import { Space, Table, Tag } from 'antd';
import { Button, Heading, Link, Text, useDisclosure } from '@chakra-ui/react';
import { Loader } from '../../components/spinner';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { DetailCourseContext } from '../../context/DetailCourseContext';
import ModalAddWork from './ModalAddWork';
import { useNavigate } from 'react-router-dom';

export const Works = () => {
  const { user } = useContext(UserContext);
  const { setToken } = useAuth();
  const { detailCourse, loadingDetailCourse, refetchDetailCourse } =
    useContext(DetailCourseContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  console.log(detailCourse);

  const columns = [
    {
      title: 'No. ',
      dataIndex: 'no',
      key: '_id',
      render: (item, record, index) => <Text>{index + 1}</Text>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) =>
        record.status === 'Not Completed' ? (
          <Link
            color="teal.500"
            onClick={() => navigate(`/text-editor/${record.workId._id}`)}
          >
            {record.workId?.name}
          </Link>
        ) : (
          <span>
            {user.role === 'teacher' ? record?.name : record.workId?.name}
          </span>
        ),
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, record) => {
        let color = '';
        if (
          record.status === 'Not Completed' ||
          record.status === 'Not ready to review'
        )
          color = 'volcano';

        if (record.status === 'Completed' || record.status === 'Finished')
          color = 'green';
        if (record.status === 'Ready to review') color = 'blue';
        return (
          <Tag color={color} key={record.status}>
            {record.status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            colorScheme="whatsapp"
            size="sm"
            onClick={() =>
              user.role === 'teacher'
                ? navigate(`/work/${record._id}`)
                : navigate(
                    `/detail-work/${record.workId._id}/student/${record.author}`
                  )
            }
          >
            Detail
          </Button>
          {/* <a>Delete</a> */}
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
              Lecturer :{' '}
              {user?.role === 'teacher'
                ? detailCourse?.author[0]?.name
                : detailCourse?.author}
            </Text>
          </div>
          {user?.role === 'teacher' && (
            <Button
              leftIcon={<PlusSquareIcon />}
              colorScheme="facebook"
              onClick={onOpen}
            >
              Add New Assignment
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
