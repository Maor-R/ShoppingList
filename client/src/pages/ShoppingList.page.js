import { useState, useEffect } from "react";
import axios from "axios";

import {AutocompleteWithQuantity} from "../components";

import {
  WELCOME_TITLE,
  CHOOSE_YOUR_CATEGORY,
  CONTINUE_BUTTON,
  EMAIL_ERROR_MSG,
  BASE_URL_SERVER,
} from "../constants";
import useShoppingList from "../hooks/useShoppingList";

const ShoppingList = () => {
 
  const [products, setProducts] = useState([]);

  const {
    selectCategory,
    categoryList,
    categoryListError,
     handleSelectCategoryChange,
    handleSelectCategoryBlur,
    handleSubmit,
    isDisabled,
    categoriesList,
  } = useShoppingList();

  useEffect(() => {
    const baseUrl =
    BASE_URL_SERVER;
    
     const getCategoryListHandle = async () => {
      await axios
        .get(`${baseUrl}/ShoppingList/${selectCategory}`)

        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.err(err);
        });
    };

    if (selectCategory.length > 0) {getCategoryListHandle();}
  }, [selectCategory]);

  return (
    <div className="full-page">
      <div
        className="form-add-item card text-center"
        style={{ width: "70%", margin: "auto", marginTop: "5%" }}
      >
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="text-center p-b m-1  login-welcome">
            {WELCOME_TITLE}
          </h2>

          <div className={`form-row ${categoryListError.isError && "error"}`}>
            {/* selectCategory field */}
            <select
              name="selectCategory"
              id="selectCategory"
              value={selectCategory}
              onBlur={handleSelectCategoryBlur}
              onChange={handleSelectCategoryChange}
              className={`form-input ${categoryListError.isError && "error"}`}
              style={{ textAlign: "center", marginBottom: "1rem" }}
              error={selectCategory.isError}
            >
              <option value="">{CHOOSE_YOUR_CATEGORY}</option>
              {categoriesList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {categoryListError.isError && (
              <div>
                <small>{categoryListError.message}</small>
              </div>
            )}
          </div>

          <div>
            {products.length > 0 && <h3> הקלד מוצר מתוך הרשימה המוצעת: </h3>}
            {products?.map((product) => (
              <p key={product.id} value={product.id}>
                {product.name}
              </p>
            ))}
            {selectCategory.length > 0 && products && (
              <AutocompleteWithQuantity availableItems={products} />
            )}
          </div>

          <input
            type="submit"
            className="btn-success btn-block p m-t"
            disabled={isDisabled}
            value={CONTINUE_BUTTON}
            style={{ marginTop: "1.4rem" }}
          />
        </form>
      </div>
    </div>
  );
};

export default ShoppingList;
