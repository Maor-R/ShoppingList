const FormRow = ({ type, name, maxLength, value, placeholder, handleChange, handleBlur, error, message, disabled = false, style = {} }) => {
  return (
    <>

      <div className={`form-row ${error && 'error'}`}>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          maxLength = {maxLength}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-input ${error && 'error'}`}
          disabled ={disabled}
          style={style}
        />
      </div>
      {error && <small>{message}</small>}
    </>
  );
};
export default FormRow;
