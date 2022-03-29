import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import axios from 'axios';

function EditContactModal(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    accountCreatedDate: '',

  });

  useEffect(() => {
    setVisible(props.modalData.visible);
    setFormData({
      id: props.modalData.record.id,
      username: props.modalData.record.username,
      firstName: props.modalData.record.firstName,
      lastName: props.modalData.record.lastName,
      phoneNumber: props.modalData.record.phoneNumber,
      accountCreatedDate: props.modalData.record.accountCreatedDate,
    });
  }, [props]);

  const handleOk = () => {
    setConfirmLoading(true);
    axios.put('http://localhost:3003/users/'+ formData.id, formData)
    .then((res) => {
      console.log(res.data);
    });

    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = (e) => {
    setFormData((oldFormData) => {
      oldFormData[e.target.id] = e.target.value;

      return oldFormData;
    });
  }

  return (
    <>
      <Modal 
        title="Edit Info" 
        visible={visible}
        onOk={handleOk} 
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
      <Form
        layout="vertical"
        form={form}
        fields={[
          {
            name: ["username"],
            value: formData.username,
          },
          {
            name: ["firstName"],
            value: formData.firstName,
          },
          {
            name: ["lastName"],
            value: formData.lastName,
          },
          {
            name: ["phoneNumber"],
            value: formData.phoneNumber,
          },
          {
            name: ["accountCreatedDate"],
            value: formData.accountCreatedDate,
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

export default EditContactModal;