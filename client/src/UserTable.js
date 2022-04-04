import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Button } from 'antd';
import './App.css';
import axios from 'axios';
import EditUserModal from './EditUserModal';

const API_URL = process.env.REACT_APP_API_URL;

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

  const fetchData = async () => {
    try {
      const res = await axios(
        API_URL + 'users',
      );

      setData(res.data);
    }
    catch(error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
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
    {
      title: 'Actions',
      dataIndex: '',
      key: 'actions',
      width: 100,
      render: (text, record, rowIndex) => (
        <>
          <Button 
            type="primary"
            onClick={() => handleEditClicked(record, rowIndex)}
          >
            Edit
          </Button>
          <Button 
            onClick={() => handleDeleteClicked(record)}
          >
            Delete
          </Button>
        </>
      ),
    }
  ];

  const handleEditClicked = (record, rowIndex) => {
    setModalData({
      record: record,
      rowIndex: rowIndex,
      visible: true
    });
  };

  const handleDeleteClicked = async (record) => {
    try {
      await axios.delete(
        API_URL + 'users/' + record.id,
      );
    }
    catch(error) {
      console.log(error.response);
    }

    fetchData();
  };

  return (
    <>
      <Row>
        <Col span={14}>
          <Table 
            columns={columns} 
            dataSource={data} 
          />
        </Col>
      </Row>
      <EditUserModal modalData={modalData}></EditUserModal>
    </>
  );
}

export default UserTable;