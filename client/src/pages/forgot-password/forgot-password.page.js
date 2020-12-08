import React, { useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import UnAuthenticated from '../../components/un-authenticated-hoc/un-authenticated-hoc.component';
import { forgotPassword } from '../../utils/apiCall';
import { showAlert } from '../../utils/showMessages';
import { validateEmail } from '../../utils/utitlity';

const ForgotPasswordPage = ({ history }) => {
    const [email, setEmail] = useState('');

    const [utils, setUtils] = useState({ isLoading: false, success: null, error: null });

    const handleChange = (e) => {
        setUtils({ isLoading: false, success: null, error: null });
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            setUtils({ isLoading: true, success: null, error: null });
            const res = await forgotPassword({ email });
            if (res.error) return setUtils({ isLoading: false, success: null, error: res.message });
            if (res.data.status === 'success') setUtils({ isLoading: false, error: null, success: 'A reset link has been sent to this email, you can close this window' });
        }
    };

    return (
        <form style={{ width: '100%', maxWidth: '330px', padding: '15px', margin: '0 auto' }} onSubmit={handleSubmit}>
            {utils.isLoading && showAlert('info', 'Please Wait', 2)}
            {utils.error && showAlert('danger', utils.error, 5)}
            {utils.success && showAlert('success', utils.success, 5)}
            <h1 className="h3 mb-3 font-weight-normal">Forgot Password</h1>
            <div className="form-group">
                <FormInput placeholder="Enter your email" type="email" className="form-control" name="email" value={email} handleChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-sm btn-primary">
                Forgot Password
            </button>
        </form>
    );
};

export default UnAuthenticated(ForgotPasswordPage);
