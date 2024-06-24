import React, { useEffect } from 'react'
import '../CSS/AdminIntro.css'
import { Form,Input, message,Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading,hideLoading,setPortfolioData, fetchPortfolioData} from '../redux/rootslice'
import axiosInstance from '../axiosConfig';

const AdminContact = () => {
  const dispatch = useDispatch();
  const { portfolioData, loading } = useSelector((state) => state.root);
  const [form] = Form.useForm();
  const {portfolio} = portfolioData || {};

  useEffect(() => {
    dispatch(fetchPortfolioData());
  }, [dispatch]);

  useEffect(() => {
    if (portfolio?.contact) {
      const { name,  email, country} = portfolio.contact;
      console.log(name,email);
      form.setFieldsValue({
        name: name || '',
        email: email || '',
        country : country || ''
      });
    } else {
      form.resetFields();  // Reset form fields for new users
    }
  }, [portfolioData, form]);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      const contactId = portfolioData?.portfolio.contact?._id;

      const response = await axiosInstance.post("/portfolio/update-contact", {
        ...values,
        _id: contactId,
      });

      dispatch(hideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        dispatch(setPortfolioData({ ...portfolioData, contact: values })); // Update local state
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
        <div>
      <Form
        onFinish={onFinish}
        layout='vertical'
        form={form}
        initialValues={portfolio?.contact}
      >
        <Form.Item name='name' label='Name'>
          <Input placeholder='Name' />
        </Form.Item>

        <Form.Item name='email' label='Email'>
          <Input placeholder='Email' />
        </Form.Item>

        <Form.Item name='country' label='Country'>
          <Input placeholder='Country' />
        </Form.Item>

        <div className='d-flex justify-content-end'>
          <button className='py-1 text-white' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
    </div>
  )
}

export default AdminContact