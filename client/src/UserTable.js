import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Button, Popconfirm } from 'antd';
import './App.css';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import { useDispatch } from 'react-redux';
import { setModalData } from './slices/editUserModalSlice.js';

const API_URL = process.env.REACT_APP_API_URL;

function UserTable() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

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

  const handleConfirmOk = (record) => {
    handleDeleteClicked(record);
    console.log('Delete status: succesful');
  }

  const handleConfirmCancel = () => {
    console.log('Delete status: canceled');
  }

  const handleEditClicked = (record, rowIndex) => {
    console.log('Edit clicked');
    dispatch(setModalData({
      record: record,
      rowIndex: rowIndex,
      visible: true
    }));
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
          <Popconfirm
            title="Confirm Delete"
            onConfirm={() => handleConfirmOk(record)}
            onCancel={handleConfirmCancel}
          >
            <Button>Delete</Button>
          </Popconfirm>
        </>
      ),
    }
  ];

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
      <EditUserModal fetchData={fetchData}></EditUserModal>
    </>
  );
}

export default UserTable;