import React, { useState, useEffect } from 'react';
import '../CSS/AdminIntro.css';
import { Form, Input, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading, setPortfolioData, fetchPortfolioData } from '../redux/rootslice';
import axiosInstance from '../axiosConfig';

const AdminIntro = () => {
  const dispatch = useDispatch();
  const { portfolioData, loading } = useSelector((state) => state.root);
  const [form] = Form.useForm();
 const {portfolio} = portfolioData || {};

  useEffect(() => {
 
    dispatch(fetchPortfolioData());
 
  }, [dispatch]);

  useEffect(() => {
    if (portfolioData?.portfolio?.intro) {
      const { welcomeText, firstName, lastName, caption } = portfolio.intro;
      form.setFieldsValue({
        welcomeText: welcomeText || '',
        firstName: firstName || '',
        lastName: lastName || '',
        caption: caption || '',
      });
    } else {
      form.resetFields();  // Reset form fields for new users
    }
  }, [portfolioData, form]);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      const portfolioId = portfolioData?._id;

      const response = await axiosInstance.post("/portfolio/update-intro", {
        ...values,
        _id: portfolioId,
      });

      dispatch(hideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        dispatch(setPortfolioData({ ...portfolioData, intro: values })); // Update local state
      } else {
        message.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

      // Improved error handling with detailed logs
      if (error.response) {
        console.log('Data:', error.response.data);
        console.log('Status:', error.response.status);
        console.log('Headers:', error.response.headers);
        message.error(`Error: ${error.response.data.message || 'An error occurred'}`);
      } else if (error.request) {
        console.log('Request:', error.request);
        message.error('No response received from server');
      } else {
        console.log('Error:', error.message);
        message.error(`Error: ${error.message}`);
      }
    }
  };

  if (loading) {
    return <Spin tip="Loading..."/>;
  }

  return (
    <div>
      <Form 
        form={form}
        onFinish={onFinish} 
        layout='vertical'
        onFinishFailed={(errorInfo) => {
          console.log('Failed:', errorInfo);
          message.error('Please fill out all required fields.');
        }}
      >
        <Form.Item 
          name='welcomeText' 
          label='Welcome Text' 
          rules={[{ required: true, message: 'Please enter welcome text' }]}
        >
          <Input placeholder='Welcome Text' />
        </Form.Item>
        <Form.Item 
          name='firstName' 
          label='First Name' 
          rules={[{ required: true, message: 'Please enter first name' }]}
        >
          <Input placeholder='First Name' />
        </Form.Item>
        <Form.Item 
          name='lastName' 
          label='Last Name' 
          rules={[{ required: true, message: 'Please enter last name' }]}
        >
          <Input placeholder='Last Name' />
        </Form.Item>
        <Form.Item 
          name='caption' 
          label='Who you are Caption' 
          rules={[{ required: true, message: 'Please enter caption' }]}
        >
          <Input placeholder='Ex: I am Developer' />
        </Form.Item>
        <div className='d-flex justify-content-end'>
          <button className='py-1 text-white' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
  );
};

export default AdminIntro;
