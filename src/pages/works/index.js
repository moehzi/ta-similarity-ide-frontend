import React, { useContext, useEffect, useState } from 'react';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import { Space, Table, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { DETAIL_COURSE } from '../../services/course';
import { Button, Heading, Text } from '@chakra-ui/react';
import { Loader } from '../../components/spinner';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { useCourse } from '../../hooks/useCourse';
import { DetailCourseContext } from '../../context/DetailCourseContext';

export const Works = () => {
  const { user } = useContext(UserContext);
  const { setToken, token } = useAuth();
  const { courseId } = useParams();
  //   const { data, loading } = useFetch(DETAIL_COURSE(courseId));
  const { detailCourse, refetchDetailCourse, loadingDetailCourse } =
    useContext(DetailCourseContext);

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
      render: (text) => <a>{text}</a>,
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

  //   const data = [
  //     {
  //       key: '1',
  //       name: 'John Brown',
  //       age: 32,
  //       address: 'New York No. 1 Lake Park',
  //       tags: ['nice', 'developer'],
  //     },
  //     {
  //       key: '2',
  //       name: 'Jim Green',
  //       age: 42,
  //       address: 'London No. 1 Lake Park',
  //       tags: ['loser'],
  //     },
  //     {
  //       key: '3',
  //       name: 'Joe Black',
  //       age: 32,
  //       address: 'Sidney No. 1 Lake Park',
  //       tags: ['cool', 'teacher'],
  //     },
  //   ];

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
          <Button
            leftIcon={<PlusSquareIcon />}
            colorScheme="facebook"
            // onClick={onOpen}
          >
            Add Course
          </Button>
        </div>
        <Table columns={columns} dataSource={detailCourse?.works} />
      </div>
    </SidebarWithHeader>
  );
};
