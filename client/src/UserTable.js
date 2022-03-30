import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'antd';
import './App.css';
import axios from 'axios';
import EditUserModal from './EditUserModal';

function UserTable() {
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState({
    visible: false,
    record: {
      id: '',
      username: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      accountCreatedDate: '',
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(
        'http://localhost:3003/users',
      );

      setData(res.data);
    }

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: 120,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: 120,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 140,
    },
    {
      title: 'Created Date',
      dataIndex: 'accountCreatedDate',
      key: 'accountCreatedDate',
      width: 140,
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    },
  ];

  const rowClicked = (record, rowIndex) => {
    setModalData({
      record: record,
      rowIndex: rowIndex,
      visible: true
    });
  };

  return (
    <>
      <Row>
        <Col span={14}>
          <Table 
            columns={columns} 
            dataSource={data} 
            onRow={(record, rowIndex) => {
              return {
                onDoubleClick: () => {
                  rowClicked(record, rowIndex);
                }
              }
            }}
          />
        </Col>
      </Row>
      <EditUserModal modalData={modalData}></EditUserModal>
    </>
  );
}

export default UserTable;