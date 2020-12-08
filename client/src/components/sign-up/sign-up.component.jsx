import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../utils/apiCall';
import { signUpSuccess } from '../../redux/user/user.actions';
import { showAlert } from '../../utils/showMessages';
import FormInput from '../form-input/form-input.component';

const SignUp = () => {
    const [userCredentials, setUserCredentials] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const { name, email, password, passwordConfirm } = userCredentials;
    const [utils, setUtils] = useState({ isLoading: false, success: null, error: null });
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (event) => {
        setUtils({ isLoading: false, success: null, error: null });
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== passwordConfirm) return alert("passwords don't match");

        const res = await signUp(userCredentials);
        if (res.error) return setUtils({ isLoading: false, success: null, error: res.message });
        else if (res.data.status === 'success') {
            const user = res.data.data;
            setUtils({ isLoading: false, error: null, success: 'Sign Up success. You will be logged in automatically' });
            dispatch(signUpSuccess(user));
            setTimeout(() => history.push('/homepage'), 2000);
        }
    };

    return (
        <form style={{ width: '100%', maxWidth: '330px', padding: '15px', margin: '0 auto' }} onSubmit={handleSubmit}>
            {utils.isLoading && showAlert('info', 'Loading....', 2)}
            {utils.error && showAlert('danger', utils.error, 5)} {utils.success && showAlert('success', utils.success, 5)}
            <h3 className="h3 mb-3 font-weight-normal">Sign Up Form</h3>
            <div className="form-group mb-0">
                <FormInput label="Name" type="text" className="form-control" name="name" handleChange={handleChange} value={name} required />
            </div>
            <div className="form-group mb-0">
                <FormInput label="Email Address" type="email" className="form-control" name="email" handleChange={handleChange} value={email} required />
            </div>
            <div className="form-group mb-0">
                <FormInput label="Password" type="password" className="form-control" name="password" handleChange={handleChange} value={password} required />
            </div>
            <div className="form-group mb-0">
                <FormInput label="Confirm Password" type="password" className="form-control" name="passwordConfirm" handleChange={handleChange} value={passwordConfirm} required />
            </div>
            <button type="submit" className="btn btn-sm btn-primary">
                Sign Up
            </button>
        </form>
    );
};

export default SignUp;
