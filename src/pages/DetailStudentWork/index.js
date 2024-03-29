import { useContext, useEffect, useState } from 'react';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import Card from 'antd/es/card';
import Space from 'antd/es/space';
import Table from 'antd/es/table';
import Tag from 'antd/es/tag';
import { Button, Heading, Text } from '@chakra-ui/react';
import { Loader } from '../../components/spinner';
import { DetailStudentWorkContext } from '../../context/DetailStudentWorkContext';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import { useNavigate } from 'react-router-dom';
import Statistic from 'antd/es/statistic';

const DetailStudentWork = () => {
  const { user } = useContext(UserContext);
  const { setToken } = useAuth();
  const { data, loading } = useContext(DetailStudentWorkContext);
  const [student, setStudent] = useState('');
  const [code, setCode] = useState('');
  const [esprima, setEsprima] = useState([]);
  const [similarityResult, setSimilarityResult] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsUpdated(false);
  }, [isUpdated]);

  useEffect(() => {
    if (data?.length > 0) {
      setCode(data[0]?.similarityResult[0]?.jsCode);
      setStudent(data[0]?.similarityResult[0]?.name);
      setEsprima(data[0]?.similarityResult[0]?.esprimaCode?.split(''));
      setSimilarityResult(data[0]?.similarityResult[0]?.percentage);
    }
  }, [data?.length]);

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
      render: (text, record) => <span>{record?.name}</span>,
    },
    {
      title: 'Percentage Result',
      key: 'percentage',
      dataIndex: 'percentage',
      render: (text, record) => {
        let color = 'green';

        if (record.percentage > 90) color = 'volcano';
        return (
          <Tag color={color} key={record?.percentage}>
            {record?.percentage} %
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
            disabled={record?.name === student}
            colorScheme="whatsapp"
            size="sm"
            onClick={() =>
              handleClick(
                record?.name,
                record?.jsCode,
                record?.esprimaCode,
                record?.percentage
              )
            }
          >
            Compare
          </Button>
        </Space>
      ),
    },
  ];

  const handleClick = (
    newStudent,
    newCode,
    newEsprima,
    newSimilarityResult
  ) => {
    setStudent(newStudent);
    setCode(newCode);
    setEsprima(newEsprima.split(''));
    setSimilarityResult(newSimilarityResult);
    setIsUpdated(true);
  };

  const newStyles = {
    variables: {
      light: {
        codeFoldGutterBackground: '#6F767E',
        codeFoldBackground: '#E2E4ED',
        gutterColor: 'black',
      },
    },
    diffRemoved: {
      color: '#e96868',
      background: 'white',
    },
    diffAdded: {
      color: '#e96868',
      background: 'white',
    },
    emptyLine: {
      color: 'white',
    },
    removedGutter: {
      color: '#e96868',
    },
    removedGutterBackground: '#e96868',
    wordAdded: {
      background: 'white',
    }, // style object
    wordRemoved: {
      background: 'white',
    },
    line: {
      padding: '10px 2px',
      color: 'red',
    },
    emptyGutter: {
      backgruond: 'white',
    },
  };

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
      {data?.length > 0 && (
        <div className="p-4">
          <div className="mb-8">
            <div className="flex items-start gap-4">
              <Heading size="lg" mb={4}>
                {data[0]?.author?.name}'s Similarity Report
              </Heading>
            </div>
            <Statistic
              title="Similarity Result"
              value={similarityResult}
              suffix="/ 100 %"
              style={{ marginBottom: '1rem' }}
            />
            <ReactDiffViewer
              disableWordDiff={false}
              oldValue={data[0].jsCode}
              newValue={code}
              splitView={true}
              //   wordAdded={false}
              //   wordRemoved={false}
              // hideLineNumbers={true}
              styles={newStyles}
              compareMethod={DiffMethod.WORDS}
              leftTitle={data[0]?.author?.name}
              rightTitle={student}
            />
            <Card title="Esprima Result" style={{ marginTop: '1rem' }}>
              <Card type="inner" title={data[0]?.author?.name}>
                {data[0]?.esprimaCode.split('').map((v, i) => {
                  return (
                    <span
                      className={
                        v === esprima[i] ? 'text-red-500 mr-1' : 'mr-1'
                      }
                    >
                      {v}
                    </span>
                  );
                })}
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title={student}
              >
                {esprima?.length > 0 &&
                  esprima.map((v, i) => {
                    return (
                      <span
                        className={
                          v === data[0]?.esprimaCode.split('')[i]
                            ? 'text-red-500 mr-1'
                            : 'mr-1'
                        }
                      >
                        {v}
                      </span>
                    );
                  })}
              </Card>
            </Card>
          </div>
          <Table columns={columns} dataSource={data[0]?.similarityResult} />
        </div>
      )}
    </SidebarWithHeader>
  );
};

export default DetailStudentWork;
