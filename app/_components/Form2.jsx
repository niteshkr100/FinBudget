"use client"

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner'; 

 const Form2 = () => {

  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,  // Updates the formData state correctly
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.message) {
      newErrors.message = "Message is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoader(true);//to show downloading

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setLoader(false);//to show downloading
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
      
      // Send email only if form is valid
      emailjs.sendForm(
        process.env.NEXT_PUBLIC_YOUR_SERVICE_ID, 
        process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID, 
        form.current, 
        process.env.NEXT_PUBLIC_YOUR_PUBLIC_KEY
      ).then(
        () => {
          console.log('SUCCESS!');
          // Clear form fields after submission
          setFormData({
            email: "",
            message: "",
          });
          setLoader(false);//to show downloading
          toast("Email Send!")
        },
        (error) => {
          console.log('FAILED...', error.text);
          setLoader(false);//to show downloading
          toast("under maintaince!")
        }
      );
    }
  };

   return (
  <section className="bg-gray-50">
    <div className="p-8 md:p-12 lg:px-16 lg:py-24">

      <div className="mx-auto max-w-lg text-center">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
           Ask Your Query
        </h2>
        <p className="hidden text-gray-500 sm:mt-4 sm:block">
        Have questions about our budget plans? Ask now to find the perfect fit for your needs and goals!
        </p>
      </div>
  
      <div className="mx-auto mt-8 max-w-xl">
      <form ref={form} onSubmit={handleSubmit} className="sm:flex-col flex sm:justify-center sm:gap-4 flex-col">
        <div className="sm:flex-1 mb-1">
         
          <input
            type="email"
            id="email"
            name="email"  // Changed to "email" to match formData structure
            value={formData.email}  // Now the value is controlled by formData.email
            onChange={handleChange}  // Updates formData on change
            className={`w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <textarea
            id="message"
            name="message"
             placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}  // Updates formData on change
            className={`w-full mb-2 rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
           
          />
          {errors.message && (
            <p className="text-red-600 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <div className="flex justify-center">
        <button
        type="submit"
        className="group flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400  ">
        <span className="text-sm font-medium">
 
         {loader?(
            <span>Submitting</span>
          ):(
            <span>Submit</span>
          )}
         </span>
        <svg
          className="size-5 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
        </button>
      </div>
      </form>
      </div>

    </div>
  </section>
   )
 }
 
 export default Form2
 