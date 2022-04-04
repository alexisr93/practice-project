import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setFormData, 
  updateFormData, 
  selectFormData 
} from './slices/formDataSlice.js';

function EditUserModal(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);

  useEffect(() => {
    setVisible(props.modalData.visible);
    dispatch(setFormData(props.modalData.record));
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
    dispatch(updateFormData({
      name: e.target.id,
      value: e.target.value
    }));
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

export default EditUserModal;