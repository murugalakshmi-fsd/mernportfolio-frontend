import React from 'react'
import '../../CSS/AdminIntro.css'
import { Form,Input, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoading,HideLoading } from '../../redux/rootslice'
import axios from 'axios'

const AdminIntro = () => {
    const dispatch=useDispatch();
    const {portfolioData} = useSelector((state)=>state.root);
    //const intros = portfolioData ? portfolioData.intros : null;
    // console.log(portfolioData?.intros);

    const onFinish=async(values)=>{
      try{
          dispatch(ShowLoading());
          const response = await axios.post("https://mernportfolio-backend.onrender.com/portfolio/update-intro",{
            ...values,
            _id:portfolioData.intros._id,
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
        <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.intros}>
        <FormItem name='welcomeText' label='welcomeText'>
            <input placeholder='welcomeText'/>
        </FormItem>
        <FormItem name='firstName' label='FirstName'>
            <input placeholder='firstName'/>
        </FormItem>
        <FormItem name='lastName' label='LastName'>
            <input placeholder='lastName'/>
        </FormItem>
        <FormItem name='caption' label='Caption'>
            <input placeholder='caption'/>
        </FormItem>
        <FormItem name='description' label='Description'>
            <textarea placeholder='description'/>
        </FormItem>
        <div className='d-flex justify-content-end'>
            <button className='py-1  text-white' type='submit'>SAVE</button>
        </div>
        </Form>
    </div>
  )
}

export default AdminIntro