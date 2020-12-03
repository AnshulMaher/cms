import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../../utils/apiCall';
import { signInSuccess } from '../../redux/user/user.actions';
import { showAlert } from '../../utils/showMessages';

import './sign-in.styles.css';

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
            setUtils({ isLoading: false, success: null, error: 'Failed to log in! Either credentials are wrong or server error' });
            return;
        }
        if (res.data.status === 'success') {
            setUtils({ isLoading: false, error: null, success: 'Sign In success' });
            dispatch(signInSuccess(res.data.data));
        }
    };

    return (
        <form className="form-signin" onSubmit={handleSubmit}>
            {utils.isLoading && showAlert('info', 'Loading....', 3)}
            {utils.error && showAlert('danger', utils.error, 5)}
            {utils.success && showAlert('success', utils.success, 5)}
            <h3 className="display-5">Sign In</h3>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" name="email" onChange={handleChange} value={email} id="exampleInputEmail1" aria-describedby="emailHelp" required />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" name="password" onChange={handleChange} value={password} id="exampleInputPassword1" required />
            </div>
            <button type="submit" className="btn btn-primary">
                Sign In
            </button>
        </form>
    );
};

export default SignIn;
