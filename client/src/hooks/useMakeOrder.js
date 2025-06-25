import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendDataToApi } from "../store/shoppingListStore";
import useInput from "./useInput";
import { validateEmail } from "../utils";
 
import {
  FULL_NAME_FIELD_ERROR,
  ADDRESS_FIELD_ERROR,
  EMAIL_FIELD_ERROR,
} from "../constants";

const useMakeOrder = () => {
   const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
  });

  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const { loading, successMessage } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
 
  const {
    value: fullName,
    setValue: setValueFullName,
    error: fullNameError,
    handleChange: handleFullNameChange,
    handleBlur: handleFullNameBlur,
  } = useInput(FULL_NAME_FIELD_ERROR, setError);

  const {
    value: address,
    setValue: setValueAddress,
    error: addressError,
    handleChange: handleAddressChange,
    handleBlur: handleAddressBlur,
  } = useInput(ADDRESS_FIELD_ERROR, setError);

  const {
    value: email,
    setValue: setValueEmail,
    error: emailError,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
  } = useInput(EMAIL_FIELD_ERROR, setError, validateEmail);

  const handleSubmit = async (event) => {
    event.preventDefault();
 
   const retVal = dispatch(
     sendDataToApi({
       name: fullName,
       address: address,
       email: email,
       data: getItem("shoppingList"),
     })

   );

    if(retVal){
      navigate("/order_done");
    }
 

    if (!fullName || !email || fullNameError.isError || emailError.isError) {
      setError(true);
      handleFullNameBlur();
      handleEmailBlur();
      return;
    } else {
      setIsDisabled(true);

      setFormData({
        ...formData,
        fullName: fullName,
        address: address,
        email: email,
      });

      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return {
    fullName,
    fullNameError,
    handleFullNameChange,
    handleFullNameBlur,
    address,
    addressError,
    handleAddressChange,
    handleAddressBlur,
    emailError,
    handleEmailChange,
    handleEmailBlur,
    handleSubmit,
    isDisabled,
    formData,
    error,
  };
};

export default useMakeOrder;
export const getItem = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};
