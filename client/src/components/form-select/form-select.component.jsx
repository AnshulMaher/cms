import React from 'react';

const FormSelect = ({
  values = [1, 2, 3],
  handleChange,
  label,
  selectedValue,
  ...otherProps
}) => {
  return (
    <>
      <label>{label}</label>
      <select
        className="custom-select d-block w-100"
        onChange={handleChange}
        value={selectedValue}
        {...otherProps}
      >
        <option value="">Choose...</option>
        {values.map((state, idx) => (
          <option key={idx} value={state}>
            {state}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">Please provide a valid {label}.</div>
    </>
  );
};

export default FormSelect;
