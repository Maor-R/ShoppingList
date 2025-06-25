import { React, useState } from "react";
import { FormRow } from "../components";
import useMakeOrder from "../hooks/useMakeOrder";
  import {

  ORDER_DETAILS_NAV,
  WAITING_BUTTON,
   EMAIL_FIELD,
  FULL_NAME_FIELD,
  ADDRESS_FIELD,
  CONFIRM_ORDER_BUTTON
 
} from "../constants";
function MakeOrder() {
  const {
 
    fullName,
    fullNameError,
    handleFullNameChange,
    handleFullNameBlur,
    address,
    addressError,
    handleAddressChange,
    handleAddressBlur,
    email,
    emailError,
    handleEmailChange,
    handleEmailBlur,
    handleSubmit,
    isDisabled,
  } = useMakeOrder();
  const [products, setProducts] = useState(getItem("shoppingList"));
 

  return (
    <>
      <div className="form-add-item card text-center   ">
        <h2 className="text-center p-b m-1">{ORDER_DETAILS_NAV}</h2>
        <form onSubmit={handleSubmit}>
          {/* fullName field */}
          <FormRow
            error={fullNameError.isError}
            type="text"
            name="fullName"
            id="fullName"
            maxLength="400"
            placeholder={FULL_NAME_FIELD}
            value={fullName}
            handleChange={handleFullNameChange}
            handleBlur={handleFullNameBlur}
            message={fullNameError.message}
          />

          {/* address field */}
          <FormRow
            error={addressError.isError}
            type="text"
            name="address"
            id="address"
            maxLength="400"
            placeholder={ADDRESS_FIELD}
            value={address}
            handleChange={handleAddressChange}
            handleBlur={handleAddressBlur}
            message={addressError.message}
          />

          {/* email field */}
          <FormRow
            error={emailError.isError}
            type="email"
            name="email"
            id="email"
            maxLength="40"
            placeholder={EMAIL_FIELD}
            value={email}
            handleChange={handleEmailChange}
            handleBlur={handleEmailBlur}
            message={emailError.message}
          />

          <div>
            {products.length > 0 && <h3> הפריטים שהוזמנו: </h3>}
            {products?.map((p) => (
              <p key={p.id} value={p.id}>
                {p.name} &nbsp; - {p.quantity}
              </p>
            ))}
          </div>

          <button
            className={`btn btn-success m-t-1   ${
              isDisabled ? "disabled" : ""
            } `}
            onClick={handleSubmit}
            name="submit"
            type="submit"
            style={{ paddingLeft: "4rem", paddingRight: "4rem" }}
          >
            {isDisabled ? WAITING_BUTTON : CONFIRM_ORDER_BUTTON}
          </button>
        </form>
      </div>
    </>
  );
}

export default MakeOrder;

export const getItem = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};
