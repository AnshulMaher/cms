import React, { useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import UnAuthenticated from '../../components/un-authenticated-hoc/un-authenticated-hoc.component';
import { resetPassword } from '../../utils/apiCall';
import { showAlert } from '../../utils/showMessages';

const ResetPasswordPage = ({ match, history }) => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const { password, passwordConfirm } = userCredentials;
    const [utils, setUtils] = useState({ isLoading: false, success: null, error: null });

    const handleChange = (e) => {
        setUtils({ isLoading: false, success: null, error: null });
        const { name, value } = e.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== passwordConfirm) {
            return alert("passwords don't match");
        }
        const resetToken = match.params.resetToken;
        setUtils({ success: null, error: null, isLoading: true });
        const res = await resetPassword(resetToken, { password, passwordConfirm });
        if (res.error) return setUtils({ isLoading: false, success: null, error: res.message });
        if (res.data.status === 'success') {
            setUtils({ isLoading: false, error: null, success: 'Password reset successful. Please log in again with new password' });
            setTimeout(() => history.push('/'), 1500);
        }
    };

    return (
        <form style={{ width: '100%', maxWidth: '330px', padding: '15px', margin: '0 auto' }} onSubmit={handleSubmit}>
            {utils.isLoading && showAlert('info', 'Please Wait', 2)}
            {utils.error && showAlert('danger', utils.error, 5)}
            {utils.success && showAlert('success', utils.success, 5)}
            <h1 className="h3 mb-3 font-weight-normal">Reset Password</h1>
            <div className="form-group">
                <FormInput label="New Password" type="password" className="form-control" name="password" value={password} onChange={handleChange} />
            </div>
            <div className="form-group">
                <FormInput label="Confirm New Password" type="password" className="form-control" name="passwordConfirm" value={passwordConfirm} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-sm btn-primary">
                Reset Password
            </button>
        </form>
    );
};

export default UnAuthenticated(ResetPasswordPage);
