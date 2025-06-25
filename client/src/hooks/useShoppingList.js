import { useState, useEffect } from "react";
import useInput from "./useInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {

  BASE_URL_SERVER,
  PRODUCTION_BASE_URL_SERVER,
  CHOOSE_CATEGORY_ERROR_MSG,
} from "../constants";
const useShoppingList = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);

  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const baseUrl = process.env.NODE_ENV === "development"?BASE_URL_SERVER:PRODUCTION_BASE_URL_SERVER;

  useEffect(() => {
    const getCategoriesListHandle = async () => {
       await axios
        .get(`${baseUrl}/ShoppingList`)

        .then((res) => {
          setCategoriesList(res.data);
        })
        .catch((err) => {
          console.err(err);
        });
    };
    getCategoriesListHandle();
  }, []);

  const {
    value: selectCategory,
    setValue: setValueCategoryList,
    error: categoryListError,
    handleChange: handleSelectCategoryChange,
    handleBlur: handleSelectCategoryBlur,
  } = useInput(CHOOSE_CATEGORY_ERROR_MSG, setError);

  const handleSubmit = async (event) => {
     event.preventDefault();

    if (!selectCategory) {
      setError(true);
      handleSelectCategoryBlur();
      return;
    } else {
      setIsDisabled(true);
      navigate(`/make_order`);

    }
  };

  return {
    categoriesList,
    selectCategory,
    categoryListError,
    handleSelectCategoryChange,
    handleSelectCategoryBlur,
    handleSubmit,
    isDisabled,
    error,
  };
};

export default useShoppingList;
