import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import background from '../assets/displaydata.jpg'
const DisplayData = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const goHome=()=>{
    navigate('/')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/display-data/${id}`);
        setFormData(response.data);
      } catch (err) {
        navigate('*')
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='flex items-center justify-center min-h-screen' style={{backgroundImage:`url(${background})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
      
    <div className=" md:w-full lg:w-1/2 xl:1/3 relative overflow-x-auto shadow-md sm:rounded-lg" style={{backgroundColor:'white'}}>
      <h2 className="text-lg font-bold mb-4 p-4">Submitted Data</h2>
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th className="px-6 py-3">Field</th>
            <th className="px-6 py-3">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Doctor's Name</th>
            <td className="px-6 py-3">{formData.doctorName}</td>
          </tr>
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Patient's Name</th>
            <td className="px-6 py-3">{formData.patientName}</td>
          </tr>
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Patient's Age</th>
            <td className="px-6 py-3">{formData.patientAge}</td>
          </tr>
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Date of the Sound Recording</th>
            <td className="px-6 py-3">{formData.recordingDate}</td>
          </tr>
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Sound File</th>
            <td className="px-6 py-3">
              <audio controls>
                <source src={`http://localhost:5000/audio/${id}`} type="audio/mpeg" />
              </audio>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="inline-flex m-2 rounded-md shadow-sm" role="group">
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>goHome()}>Return to Form</button>
</div>
    </div>
    </div>
  );
};

export default DisplayData;