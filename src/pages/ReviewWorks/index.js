import { useContext, useEffect, useRef, useState } from 'react';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import Statistic from 'antd/es/statistic';
import Space from 'antd/es/space';
import Table from 'antd/es/table';
import Tag from 'antd/es/tag';
import {
  Button,
  Heading,
  NumberInput,
  NumberInputField,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Loader } from '../../components/spinner';
import { useParams } from 'react-router-dom';
import { GET_WORK_BY_ID } from '../../services/work';
import CodeEditor from '../../components/codeEditor';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { updateScore } from '../../services/code';
import { Pane } from '../../components/pane';
import { CodeContext } from '../../context/CodeContext';
import useFetch from '../../hooks/useFetch';
import { CSVLink } from 'react-csv';
import { DownloadIcon } from '@chakra-ui/icons';

const ReviewWorks = () => {
  const { user } = useContext(UserContext);
  const { setToken, token } = useAuth();
  const { workId } = useParams();
  const [codes, setCodes] = useState([]);
  const [student, setStudent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setSrcDoc } = useContext(CodeContext);
  const score = useRef();
  const toast = useToast();
  const { data, refetch, loading } = useFetch(GET_WORK_BY_ID(workId));
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data?.code) {
      setCodes(data.code);
      setStudent(data.code[0]);
      score.current = data.code[0].score;
    }
  }, [data?.code]);

  if (loading) {
    return <Loader />;
  }

  const handleChangeScore = () => {
    const payload = {
      score: score.current.value?.toString(),
    };
    updateScore(student._id, token, payload).then((res) => {
      toast({
        title: 'Change score',
        description: res.data.message,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      onClose();
      refetch();
    });
  };

  const runCode = () => {
    setSrcDoc(`
		<html>
		<body>${student.htmlCode}</body>
		<style>${student.cssCode}</style>
		<script>${student.jsCode}</script>
		</html>`);
  };

  const handleReview = (studentId) => {
    const newStudent = codes.find((v) => v._id === studentId);
    setStudent(newStudent);
    score.current = newStudent.score;
  };

  const columnsTables = [
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
      render: (text, record) => <Text>{record.author.name}</Text>,
    },
    {
      title: 'Score',
      key: 'score',
      dataIndex: 'score',
      render: (_, record) => <Tag color="geekblue">{record.score}</Tag>,
    },
    {
      title: 'Similarity Result',
      dataIndex: 'similarity',
      key: 'similarity',
      render: (text, record) => (
        <Tag color={Number(record?.highestPercentage) > 90 ? 'red' : 'green'}>
          {record.highestPercentage} %
        </Tag>
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
            disabled={record?.author?.name === student?.author?.name}
            onClick={() => handleReview(record._id)}
          >
            Review
          </Button>
        </Space>
      ),
    },
  ];

  const handleDownload = () => {
    const table = [['No', 'Name', 'Score', 'Similarity']];
    codes.forEach((v, index) => {
      table.push([
        `${(index + 1).toString()}`,
        `${v.author.name}`,
        `${v.score}`,
        `${v.highestPercentage}`,
      ]);
    });

    setTableData(table);
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
        <Heading size="lg" mb={6}>
          {student?.author?.name}'s Assignment
        </Heading>
        <div className="flex">
          <Statistic
            title="Score"
            value={student?.score}
            suffix="/ 100"
            style={{ marginBottom: '1rem' }}
          />
          <Button colorScheme={'telegram'} size={'xs'} onClick={onOpen}>
            Change score
          </Button>
        </div>
        <Statistic
          title="Similarity Result"
          value={student?.highestPercentage}
          suffix="/ 100 %"
          style={{ marginBottom: '1rem' }}
        />
        <div className="flex justify-end mb-4">
          <CSVLink data={tableData} filename="SCORE_STUDENT">
            <Button
              leftIcon={<DownloadIcon />}
              className="absolute right-0"
              colorScheme={'telegram'}
              onClick={handleDownload}
            >
              Export to CSV
            </Button>
          </CSVLink>
        </div>
        <Table columns={columnsTables} dataSource={codes} />
        <div className="flex gap-4 mb-4">
          <CodeEditor
            display={'HTML'}
            value={student?.htmlCode}
            language={html()}
            readOnly={true}
          />
          <CodeEditor
            display={'CSS'}
            value={student?.cssCode}
            language={css()}
            readOnly={true}
          />
          <CodeEditor
            display={'JavaScript'}
            value={student?.jsCode}
            readOnly={true}
            language={javascript()}
          />
        </div>
        <Button onClick={runCode} colorScheme={'whatsapp'}>
          Run Code
        </Button>
        <Pane />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Change Score</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <NumberInput
                defaultValue={Number(score.current)}
                max={100}
                min={0}
              >
                <NumberInputField ref={score} />
              </NumberInput>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onClose} className="mr-4">
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleChangeScore}
                isLoading={loading}
              >
                Change
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </SidebarWithHeader>
  );
};

export default ReviewWorks;
