import { useContext, useState } from 'react';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import Space from 'antd/es/space';
import Table from 'antd/es/table';
import Tag from 'antd/es/tag';
import { Button, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { Loader } from '../../components/spinner';
import { CheckCircleIcon, StarIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailWorkContext } from '../../context/DetailWorkContext';
import ModalSimilarity from './ModalSimilarity';
import moment from 'moment';

const DetailWork = () => {
  const { user } = useContext(UserContext);
  const { setToken } = useAuth();
  const { detailWork, loadingDetailWork, refetchDetailWork } =
    useContext(DetailWorkContext);
  const { workId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      title: 'Highest Similarity',
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

        return (
          <Tag color={Number(record?.highestPercentage) > 90 ? 'red' : 'green'}>
            {record?.highestPercentage} %
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
              navigate(
                `/detail-work/${record?.workId}/student/${record?.author._id}`
              )
            }
          >
            Detail
          </Button>
        </Space>
      ),
    },
  ];

  const handleReview = () => {
    navigate(`/works/${workId}/review`);
  };

  if (loadingDetailWork) {
    return <Loader />;
  }

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
          {detailWork?.status !== 'Not ready to review' && (
            <div className="flex gap-4">
              <Button
                leftIcon={<CheckCircleIcon />}
                isLoading={isLoading}
                colorScheme="facebook"
                onClick={onOpen}
              >
                Check similarity
              </Button>
              <Button
                leftIcon={<StarIcon />}
                colorScheme="whatsapp"
                onClick={handleReview}
              >
                Review
              </Button>
            </div>
          )}
        </div>
        <Table columns={columns} dataSource={detailWork?.code} />
        <ModalSimilarity
          isOpen={isOpen}
          onClose={onClose}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          refetchDetailWork={refetchDetailWork}
          workId={workId}
        />
      </div>
    </SidebarWithHeader>
  );
};

export default DetailWork;
