import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../assets/background.jpg'
const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctorName: '',
    patientName: '',
    patientAge: '',
    currentDate: '',
    soundFile: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === 'soundFile') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    let errors = {};
    const { doctorName, patientName, patientAge, currentDate, soundFile } = formData;

    if (!doctorName) {
      errors.doctorName = "Doctor's name is required";
    }
    if (!patientName) {
      errors.patientName = "Patient's name is required";
    }
    if (!patientAge) {
      errors.patientAge = "Patient's age is required";
    }
    if (!currentDate) {
      errors.currentDate = 'Date of the sound recording is required';
    }
    if (!soundFile) {
      errors.soundFile = 'Sound file is required';
    }
    return errors;
  };

  const submitData = async (data) => {
    try {
      const formData = new FormData();
      formData.append('doctorName', data.doctorName);
      formData.append('patientName', data.patientName);
      formData.append('patientAge', data.patientAge);
      formData.append('recordingDate', data.currentDate);
      formData.append('soundFile', data.soundFile);

      const response = await axios.post('http://localhost:5000/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Submitted');
      return response.data._id;

    } catch (error) {
      throw new Error('Failed to submit data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const id= await submitData(formData);
        alert('Data submitted');
        navigate(`/${id}`); 
      } catch (error) {
        alert(error.message); 
      }
    } else {
      setErrors(errors);
    }
  };

  
  return (
    <div className='flex items-center justify-center min-h-screen' style={{backgroundImage:`url(${background})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
    <form onSubmit={handleSubmit} className="mx-auto w-full  md:w-1/2 lg:w-1/3 xl:1/4 p-6 bg-white rounded-md shadow-md">
      <h2 className='block md-2 text-lg font-medium text-gray-900 text-center'>Enter your details </h2>
      <div className="mb-4">
        <label htmlFor="doctorName" className="block mb-2 text-sm font-medium text-gray-900">
          Doctor's Name
        </label>
        <input
          type="text"
          id="doctorName"
          name="doctorName"
          value={formData.doctorName}
          onChange={handleChange}
          className={`  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
          ${
            errors.doctorName ? 'border-red-500' : ''
          }`}
        />
        {errors.doctorName && <p className="text-red-500 text-xs italic">{errors.doctorName}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="patientName" className="block mb-2 text-sm font-medium text-gray-900">
          Patient's Name
        </label>
        <input
          type="text"
          id="patientName"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          className={`  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
 ${
            errors.patientName ? 'border-red-500' : ''
          }`}
        />
        {errors.patientName && <p className="text-red-500 text-xs italic">{errors.patientName}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="patientAge" className="block mb-2 text-sm font-medium text-gray-900">
          Patient's Age
        </label>
        <input
          type="number"
          id="patientAge"
          name="patientAge"
          value={formData.patientAge}
          onChange={handleChange}
          className={`  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
 ${
            errors.patientAge ? 'border-red-500' : ''
          }`}
        />
        {errors.patientAge && <p className="text-red-500 text-xs italic">{errors.patientAge}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="currentDate" className="block mb-2 text-sm font-medium text-gray-900">
          Date of the Sound Recording
        </label>
        <input
          type="date"
          id="currentDate"
          name="currentDate"
          value={formData.currentDate}
          onChange={handleChange}
          className={`  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
 ${
            errors.currentDate ? 'border-red-500' : ''
          }`}
        />
        {errors.currentDate && <p className="text-red-500 text-xs italic">{errors.currentDate}</p>}
      </div>
 
      <div className="mb-4">
        <label htmlFor="soundFile" className="block mb-2 text-sm font-medium text-gray-900">
          Sound File
        </label>
        <input
          type="file"
          id="soundFile"
          name="soundFile"
          onChange={handleChange}
          className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  file:border-0
          file:me-4
          file:py-3 file:px-4 file:bg-gray-900 file:text-white file:font-bold ${
            errors.soundFile ? 'border-red-500' : ''
          }`}
        />
        {errors.soundFile && <p className="text-red-500 text-xs italic">{errors.soundFile}</p>}
      </div> 
      

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
    </div>
  );
};

export default Form;