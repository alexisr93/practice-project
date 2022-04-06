import React from 'react';
import { Modal, Form, Input } from 'antd';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { 
  updateModalData, 
  selectModalData 
} from './slices/editUserModalSlice.js';

function EditUserModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const modalData = useSelector(selectModalData);

  const handleOk = () => {
    axios.put('http://localhost:3003/users/'+ modalData.record.id, modalData.record)
    .then((res) => {
      console.log(res.data);
    });

    dispatch(updateModalData({
      name: 'visible',
      value: false,
    }));
    
    props.fetchData();
  };

  const handleCancel = () => {
    dispatch(updateModalData({
      name: 'visible',
      value: false,
    }));
  };

  const handleChange = (e) => {
    dispatch(updateModalData({
      name: 'record',
      value: {
        ...modalData.record,
        [e.target.id]: e.target.value,
      }
    }));
  }

  return (
    <>
      <Modal 
        title="Edit Info" 
        visible={modalData.visible}
        onOk={handleOk} 
        onCancel={handleCancel}
      >
      <Form
        layout="vertical"
        form={form}
        fields={[
          {
            name: ["username"],
            value: modalData.record.username,
          },
          {
            name: ["firstName"],
            value: modalData.record.firstName,
          },
          {
            name: ["lastName"],
            value: modalData.record.lastName,
          },
          {
            name: ["phoneNumber"],
            value: modalData.record.phoneNumber,
          },
          {
            name: ["accountCreatedDate"],
            value: modalData.record.accountCreatedDate,
          },
        ]}
      >
        <Form.Item
          label="Username"
          name="username"
        >
          <Input
            onChange={handleChange}
          >
          </Input>
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
        >
          <Input
            onChange={handleChange}
          >
          </Input>
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
        >
          <Input
            onChange={handleChange}
          >
          </Input>
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
        >
          <Input 
            onChange={handleChange}
          >
          </Input>
        </Form.Item>
        <Form.Item
          label="Created Date"
          name="accountCreatedDate"
        >
          <Input
            onChange={handleChange}
          >
          </Input>
        </Form.Item>
      </Form>
      </Modal>
    </>
  );
}

export default EditUserModal;