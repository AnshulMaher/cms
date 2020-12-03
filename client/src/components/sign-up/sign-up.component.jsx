import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../utils/apiCall';

import { signUpSuccess } from '../../redux/user/user.actions';
import { showAlert } from '../../utils/showMessages';

import './sign-up.styles.css';

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

        if (password !== passwordConfirm) {
            alert("passwords don't match");
            return;
        }
        console.log('run');
        const res = await signUp(userCredentials);
        if (res.error) {
            setUtils({ isLoading: false, success: null, error: 'Failed to sign up! Either details filled incorrectly or server error' });
            return;
        } else if (res.data.status === 'success') {
            const user = res.data.data;
            setUtils({ isLoading: false, error: null, success: 'Sign Up success. You will be logged in automatically' });
            dispatch(signUpSuccess(user));
            setTimeout(() => {
                history.push('/homepage');
            }, 2000);
        }
    };

    return (
        <form className="form-signup" onSubmit={handleSubmit}>
            {utils.isLoading && showAlert('info', 'Loading....', 5)}
            {utils.error && showAlert('danger', utils.error, 5)} {utils.success && showAlert('success', utils.success, 5)}
            <h3 className="display-5">Sign Up</h3>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" name="name" id="name" onChange={handleChange} value={name} aria-describedby="nameHelp" required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" name="email" id="email" onChange={handleChange} value={email} aria-describedby="emailHelp" required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" onChange={handleChange} value={password} id="password" required />
            </div>
            <div className="form-group">
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input type="password" className="form-control" name="passwordConfirm" onChange={handleChange} value={passwordConfirm} id="passwordConfirm" required />
            </div>
            <button type="submit" className="btn btn-primary">
                Sign Up
            </button>
        </form>
    );
};

export default SignUp;
