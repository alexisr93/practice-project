import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import axios from 'axios';

function EditContactModal(props) {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [accountCreatedDate, setAccountCreatedDate] = useState('');

  useEffect(() => {
    setVisible(props.modalData.visible);
    setId(props.modalData.record.id);
    setUsername(props.modalData.record.username);
    setFirstName(props.modalData.record.firstName);
    setLastName(props.modalData.record.lastName);
    setPhoneNumber(props.modalData.record.phoneNumber);
    setAccountCreatedDate(props.modalData.record.accountCreatedDate);
  }, [props]);

  const handleOk = () => {
    setConfirmLoading(true);
    axios.put('http://localhost:3003/users/'+ id, 
      {
        id: id,
        username: username,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        accountCreatedDate: accountCreatedDate,
      }
    )
    .then((res) => {
      console.log(res.data);
    });

    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

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
            value: username,
          },
          {
            name: ["firstName"],
            value: firstName,
          },
          {
            name: ["lastName"],
            value: lastName,
          },
          {
            name: ["phoneNumber"],
            value: phoneNumber,
          },
          {
            name: ["userCreatedDate"],
            value: accountCreatedDate,
          },
        ]}
      >
        <Form.Item
          label="Username"
          name="username"
        >
          <Input
            onChange={(e) => setUsername(e.target.value)}
          >
          </Input>
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
        >
          <Input
            onChange={(e) => setFirstName(e.target.value)}
          >
          </Input>
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
        >
          <Input
            onChange={(e) => setLastName(e.target.value)}
          >
          </Input>
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
        >
          <Input 
            onChange={(e) => setPhoneNumber(e.target.value)}
          >
          </Input>
        </Form.Item>
        <Form.Item
          label="Created Date"
          name="accountCreatedDate"
        >
          <Input
            onChange={(e) => setAccountCreatedDate(e.target.value)}
          >
          </Input>
        </Form.Item>
      </Form>
      </Modal>
    </>
  );
}

export default EditContactModal;