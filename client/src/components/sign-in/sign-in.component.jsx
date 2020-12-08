import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from '../../utils/apiCall';
import { signInSuccess } from '../../redux/user/user.actions';
import { showAlert } from '../../utils/showMessages';
import FormInput from '../form-input/form-input.component';

const SignIn = () => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });

    const [utils, setUtils] = useState({ isLoading: false, success: null, error: null });

    const { email, password } = userCredentials;
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setUtils({ isLoading: false, success: null, error: null });
        const { name, value } = event.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUtils({ success: null, error: null, isLoading: true });
        const res = await signIn(userCredentials);
        if (res.error) {
            setUtils({ isLoading: false, success: null, error: res.message });
            return;
        }
        if (res.data.status === 'success') {
            setUtils({ isLoading: false, error: null, success: 'Sign In success' });
            dispatch(signInSuccess(res.data.data));
        }
    };

    return (
        <form style={{ width: '100%', maxWidth: '330px', padding: '15px', margin: '0 auto' }} onSubmit={handleSubmit}>
            {utils.isLoading && showAlert('info', 'Loading....', 2)}
            {utils.error && showAlert('danger', utils.error, 5)}
            {utils.success && showAlert('success', utils.success, 5)}
            <h3 className="h3 mb-3 font-weight-normal">Sign In Form</h3>
            <div className="form-group mb-0">
                <FormInput label="Email Address" type="email" className="form-control" name="email" handleChange={handleChange} value={email} required />
            </div>
            <div className="form-group mb-0">
                <FormInput label="Password" type="password" className="form-control" name="password" handleChange={handleChange} value={password} required />
            </div>
            <button type="submit" className="btn btn-sm btn-primary">
                Sign In
            </button>
            <button className="btn btn-sm btn-warning">
                <Link to="/forgotPassword" className="text-white">
                    Forgot Password
                </Link>
            </button>
        </form>
    );
};

export default SignIn;
