const FormInput = ({ handleChange, label, ...props }) => (
  <>
    <label>{label}</label>
    <input className="form-control" onChange={handleChange} {...props} />
    <div className="invalid-feedback">{label} is required.</div>
  </>
);

export default FormInput;
