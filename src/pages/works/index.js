import { useContext, useEffect, useState } from 'react';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import Switch from 'antd/es/switch';
import Space from 'antd/es/space';
import Table from 'antd/es/table';
import Tag from 'antd/es/tag';
import {
  Button,
  Heading,
  Link,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Loader } from '../../components/spinner';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { DetailCourseContext } from '../../context/DetailCourseContext';
import ModalAddWork from './ModalAddWork';
import { useNavigate } from 'react-router-dom';
import { changeVisible } from '../../services/work';
import moment from 'moment';
import ModalEditWork from './ModalEditWork';
import ModalDeleteWork from './ModalDeleteWork';

const Works = () => {
  moment.locale('id');
  const { user } = useContext(UserContext);
  const { setToken, token } = useAuth();
  const { detailCourse, loadingDetailCourse, refetchDetailCourse } =
    useContext(DetailCourseContext);
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
  const navigate = useNavigate();
  const toast = useToast();
  const [studentWork, setStudentWork] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [workId, setWorkId] = useState(null);

  const todayTimestamp = parseInt((new Date().getTime() / 1000).toFixed(0));

  const handleVisible = (workId) => {
    setIsLoading(true);
    changeVisible(token, workId)
      .then((res) => {
        toast({
          title: 'Sucessfully change visible work',
          description: res.data.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const columnsTeacher = [
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
          <span>{record?.name}</span>
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
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (text, record) => (
        <span
          style={
            todayTimestamp > record?.deadline ? { color: 'red' } : { color: '' }
          }
        >
          {moment.unix(record?.deadline).format('dddd, MMMM DD YYYY, HH:mm')}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            colorScheme="whatsapp"
            size="sm"
            onClick={() => navigate(`/work/${record._id}`)}
          >
            Detail
          </Button>
          <Button
            disabled={
              record.status !== 'Not ready to review' || !record?.isVisible
            }
            colorScheme="telegram"
            size="sm"
            onClick={() => {
              setWorkId(record?._id);
              onOpenEdit();
            }}
          >
            Edit
          </Button>
          <Button
            colorScheme="red"
            size="sm"
            onClick={() => {
              setWorkId(record?._id);
              onOpenDelete();
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title: 'Visible',
      key: 'isVisible',
      id: '_id',
      render: (_, record) => (
        <Switch
          loading={loading}
          onClick={() => handleVisible(record?._id)}
          defaultChecked={record?.isVisible}
        />
      ),
    },
  ];

  const columnsStudent = [
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
        todayTimestamp < record?.workId?.deadline &&
        record.status === 'Not Completed' ? (
          <Link
            color="teal.500"
            onClick={() => navigate(`/text-editor/${record.workId._id}`)}
          >
            {record.workId?.name}
          </Link>
        ) : (
          <span>{record.workId?.name}</span>
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
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (text, record) => (
        <span
          style={
            todayTimestamp > record?.workId?.deadline
              ? { color: 'red' }
              : { color: '' }
          }
        >
          {moment
            .unix(record?.workId?.deadline)
            .format('dddd, MMMM DD YYYY, HH:mm')}
        </span>
      ),
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
              navigate(
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

  useEffect(() => {
    if (user?.role === 'student') {
      const visibleWork = detailCourse?.works.filter(
        (v) => v.workId?.isVisible
      );
      setStudentWork(visibleWork);
    }
  }, [detailCourse?.length, detailCourse?.works, user?.role]);

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
        <Table
          columns={user?.role === 'teacher' ? columnsTeacher : columnsStudent}
          dataSource={
            user?.role === 'teacher' ? detailCourse?.works : studentWork
          }
        />
        <ModalAddWork
          isOpen={isOpen}
          onClose={onClose}
          refetch={refetchDetailCourse}
        />
        <ModalEditWork
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          workId={workId}
          refetch={refetchDetailCourse}
        />
        <ModalDeleteWork
          isOpenDelete={isOpenDelete}
          onCloseDelete={onCloseDelete}
          workId={workId}
          refetch={refetchDetailCourse}
        />
      </div>
    </SidebarWithHeader>
  );
};

export default Works;
