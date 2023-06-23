import React, { useEffect, useState} from 'react'
import {axiosClient} from '../../utils/axiosClient';
import Form_card from '../form_card/Form_card';
import './styles.scss'
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function All_Forms_Data() {
  const navigate=useNavigate();
  const [formArray,setFromArray]=useState([])

  useEffect(()=>{
    fetchData();
  },[]);

  async function fetchData(){
    const data=await axiosClient.get('form/all');
    if(data?.status==='ok'){
      setFromArray(data.result);      
    } 
    else{
      window.location.replace('/error','_self');
    }
  } 

  function redirectToEditForm(form){
    navigate('/', { state: { form } });
  }

  const handleDeleteConfirmation = async(form) => {
    const result = window.confirm('Are you sure, you want to delete?');
    if (result) {
      //show proceeding to delete in post
      toast.info('Deletion initiated!!',{
        position: toast.POSITION.TOP_CENTER
      });
      const data=await axiosClient.post('/form/delete',{_id:form._id})
      if(data?.status==='ok'){
        toast.success('Deletion Successful!!',{
          position: toast.POSITION.TOP_CENTER
        });
        fetchData();
      } 
      else{
        toast.error('Error occurred in deletion!!',{
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
  };

  return (
    <div id="all_forms_data_container">
      <ToastContainer />
      <div className="card-list">
        {formArray.map((form,index)=>(
          <div className="card" key={index}>
          <div className="tool">
              <i class="edit fa-regular fa-pen-to-square" onClick={()=>redirectToEditForm(form)}/>
              <i class="trash fas fa-trash" onClick={()=>handleDeleteConfirmation(form)}/>
          </div>
          <Form_card name={form.name} email={form.email} address={form.address} 
          phone={form.phone} dob={form.dob}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default All_Forms_Data