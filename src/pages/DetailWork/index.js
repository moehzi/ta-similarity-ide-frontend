import { useContext } from 'react';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import { Space, Table, Tag } from 'antd';
import { Button, Heading, Text } from '@chakra-ui/react';
import { Loader } from '../../components/spinner';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { DetailWorkContext } from '../../context/DetailWorkContext';

export const DetailWork = () => {
  const { user } = useContext(UserContext);
  const { setToken } = useAuth();
  const { detailWork, loadingDetailWork } = useContext(DetailWorkContext);
  const navigate = useNavigate();

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
      render: (text, record) => <span>{record.author.name}</span>,
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, record) => {
        let color = '';
        if (record.status === 'Not Completed') color = 'volcano';

        if (record.status === 'Completed') color = 'green';
        return (
          <Tag color={color} key={record.status}>
            {record.status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Result',
      key: 'result',
      dataIndex: 'result',
      render: (_, record) => {
        if (!record.result) {
          return (
            <Tag color="volcano" key={record.result}>
              NO RESULT
            </Tag>
          );
        }
      },
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

  if (loadingDetailWork) {
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-start gap-4">
            <Heading size="lg" mb={4}>
              {detailWork?.name}
            </Heading>
            <Tag
              color={
                detailWork?.status === 'Not ready to review'
                  ? 'volcano'
                  : 'green'
              }
            >
              {detailWork?.status}
            </Tag>
          </div>
          {detailWork?.status === 'Ready to review' && (
            <Button leftIcon={<CheckCircleIcon />} colorScheme="facebook">
              Check similarity
            </Button>
          )}
        </div>
        <Table columns={columns} dataSource={detailWork?.code} />
      </div>
    </SidebarWithHeader>
  );
};
