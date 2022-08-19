import React, { useContext, useEffect, useState } from 'react';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import { Space, Table, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { DETAIL_COURSE } from '../../services/course';

export const Works = () => {
  const { user } = useContext(UserContext);
  const { setToken, token } = useAuth();
  const { courseId } = useParams();
  const { data, loading } = useFetch(DETAIL_COURSE(courseId));

  const columns = [
    {
      title: 'Id',
      dataIndex: 'name',
      key: '_id',
      render: (text) => <a>{text}</a>,
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
          <a>Invite {record.name}</a>
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
      <Table columns={columns} dataSource={data?.works} />
    </SidebarWithHeader>
  );
};
