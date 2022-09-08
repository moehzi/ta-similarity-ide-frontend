import { useContext, useState } from 'react';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import { Space, Table, Tag } from 'antd';
import { Button, Heading, Text, useToast } from '@chakra-ui/react';
import { Loader } from '../../components/spinner';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailWorkContext } from '../../context/DetailWorkContext';
import { checkSimilarityStudent } from '../../services/work';

export const DetailWork = () => {
  const { user } = useContext(UserContext);
  const { setToken, token } = useAuth();
  const { detailWork, loadingDetailWork, refetchDetailWork } =
    useContext(DetailWorkContext);
  const { workId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
      title: 'Highest Result',
      key: 'highestPercentage',
      dataIndex: 'highestPercentage',
      render: (_, record) => {
        if (!record?.highestPercentage) {
          return (
            <Tag color="volcano" key={record?.highestPercentage}>
              NO RESULT
            </Tag>
          );
        }

        return <span>{record?.highestPercentage} %</span>;
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
        </Space>
      ),
    },
  ];

  if (loadingDetailWork) {
    return <Loader />;
  }

  const checkSimilarity = () => {
    setIsLoading(true);
    checkSimilarityStudent(token, workId)
      .then((res) => {
        toast({
          title: 'Check Similarity',
          description: res.data.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        refetchDetailWork();
      })
      .finally(() => setIsLoading(false));
  };

  const color = () => {
    let color = '';
    if (detailWork?.status === 'Ready to review') {
      color = 'blue';
    } else if (detailWork?.status === 'Finished') {
      color = 'green';
    } else {
      color = 'volcano';
    }

    return color;
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
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-start gap-4">
            <Heading size="lg" mb={4}>
              {detailWork?.name}
            </Heading>
            <Tag color={color()}>{detailWork?.status}</Tag>
          </div>
          {detailWork?.status === 'Ready to review' && (
            <Button
              leftIcon={<CheckCircleIcon />}
              isLoading={isLoading}
              colorScheme="facebook"
              onClick={checkSimilarity}
            >
              Check similarity
            </Button>
          )}
        </div>
        <Table columns={columns} dataSource={detailWork?.code} />
      </div>
    </SidebarWithHeader>
  );
};
