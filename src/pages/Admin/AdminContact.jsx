import React from 'react'
import '../../CSS/AdminIntro.css'
import { Form,Input, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoading,HideLoading } from '../../redux/rootslice'
import axios from 'axios'

const AdminContact = () => {
    const dispatch=useDispatch();
    const {portfolioData} = useSelector((state)=>state.root);
    //const intros = portfolioData ? portfolioData.intros : null;
    // console.log(portfolioData?.intros);

    const onFinish=async(values)=>{
      try{
          dispatch(ShowLoading());
          const response = await axios.post("https://mernportfolio-backend.onrender.com/portfolio/update-contact",{
            ...values,
            _id:portfolioData.contacts._id,
      });
      dispatch(HideLoading())
      if(response.data.success){
        message.success(response.data.message)
      }else{
        message.error(response.data.message)
      }
      }catch(error){
          dispatch(HideLoading());
          message.error(error.message);
      }
    }
  return (
    <div>
        <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.contacts}>
        
        <FormItem name='name' label='Name'>
            <input placeholder='Name'/>
        </FormItem>
        
        <FormItem name='email' label='Email'>
            <input placeholder='caption'/>
        </FormItem>

        <FormItem name='age' label='Age'>
            <textarea placeholder='Age'/>
        </FormItem>

        <FormItem name='gender' label='Gender'>
            <textarea placeholder='Gender'/>
        </FormItem>

        <FormItem name='mobile' label='Mobile'>
            <textarea placeholder='Mobile'/>
        </FormItem>

        <FormItem name='country' label='Country'>
            <textarea placeholder='Country'/>
        </FormItem>

        <div className='d-flex justify-content-end'>
            <button className='py-1  text-white' type='submit'>SAVE</button>
        </div>
        </Form>
    </div>
  )
}

export default AdminContact