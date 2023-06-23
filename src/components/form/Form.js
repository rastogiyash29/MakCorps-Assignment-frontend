import React ,{useState,useRef} from 'react'
import './styles.scss'
import {axiosClient} from '../../utils/axiosClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Form() {
  const navigate=useNavigate()
  const location = useLocation();
  const form = location.state?.form;

  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: form?.name?form?.name:"",
    email: form?.email?form?.email:"",
    address: form?.address?form?.address:"",
    phone: form?.phone?form?.phone:"",
    dob: form?.dob?form?.dob:"",
    errors: {
      name: "",
      email: "",
      address: "",
      phone: "",
      dob: "",
    },
  });

  const validateForm = () => {
    const { name, email, address, phone, dob } = formData;
    const errors = {
      name: "",
      email: "",
      address: "",
      phone: "",
      dob: "",
    };

    // Check for empty fields
    if (!name) {
      errors.name = "Name is required.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else {
      // Check email format
      const emailPattern = /^\S+@\S+\.\S+$/;
      if (!emailPattern.test(email)) {
        errors.email = "Invalid email format.";
      }
    }

    if (!address) {
      errors.address = "Address is required.";
    }

    if (!phone) {
      errors.phone = "Phone number is required.";
    } else {
      // Check phone format
      const phonePattern = /^[1-9]\d{9}$/;
      if (!phonePattern.test(phone)) {
        errors.phone = "Phone number must be 10 digits and should not start with 0.";
      }
    }

    if (!dob) {
      errors.dob = "Date of Birth is required.";
    } else {
      // Check DOB format (DD-MM-YYYY)
      const dobPattern = /^(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
      if (!dobPattern.test(dob)) {
        errors.dob = "Date of Birth should be in DD-MM-YYYY format.";
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormData((prevState) => ({
      ...prevState,
      errors,
    }));

    // Submit the form if there are no errors
    if (Object.values(errors).every((error) => error === "")) {
      showInfo('Form saving initiated');
      var data;
      if(form){ //Older Form submission
        data=await axiosClient.post('form/update',{_id:form._id,name,email,address,phone,dob});
      }else{  //New Form saving
        data=await axiosClient.post('form/save',{name,email,address,phone,dob});      
      }
      //result of request made
      if(data?.status==='ok'){
        toast.success('Form data saved successfully',{
          position:toast.POSITION.TOP_CENTER
        });
        setFormData({
          name: "",
          email: "",
          address: "",
          phone: "",
          dob: "",
          errors: {
            name: "",
            email: "",
            address: "",
            phone: "",
            dob: "",
          },
        });
        if(form){
          await wait(2000)
          navigate('/allforms');
        }
      }else{
        showAlert(data?.result)
      }
    }
  };

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const showInfo = (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  const showAlert=(message)=>{
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { name, email, address, phone, dob, errors } = formData;

  return (
    <div id="form_container">
      <ToastContainer/>
      <form onSubmit={handleSubmit} ref={formRef}>
      <h1>{form?"Edit Form":"React Form"}</h1>
  
      <fieldset>
      <legend>Enter Your Details</legend>
      <label htmlFor="name">Name:</label>
      <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
      {errors.name && <p className="error">{errors.name}</p>}
      
      <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={handleInputChange}
        />
        {errors.address && <p className="error">{errors.address}</p>}


        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={handleInputChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="text"
          id="dob"
          name="dob"
          value={dob}
          onChange={handleInputChange}
        />
        {errors.dob && <p className="error">{errors.dob}</p>}
        </fieldset>
  
        <button id="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form