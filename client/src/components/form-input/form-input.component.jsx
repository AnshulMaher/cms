import { validateCTC, validateEmail } from '../../utils/utitlity';

const FormInput = ({ handleChange, label, ...props }) => {
    const { name, value } = props;
    let msg;
    if (name === 'currentCTC' || name === 'expectedCTC') msg = value ? (validateCTC(value) ? null : 'Put a valid salary') : null;
    if (name === 'email') msg = value ? (validateEmail(value) ? null : 'Put a valid email') : null;

    return (
        <>
            <label>{label}</label>
            <input className="form-control" onChange={handleChange} {...props} />
            <div className="text-danger" style={{ height: '24px' }}>
                {msg}
            </div>
        </>
    );
};

export default FormInput;
