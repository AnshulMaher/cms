import React, { useState } from 'react';
import { forgotPassword, resetPassword } from '../../utils/apiCall';
import { showAlert } from '../../utils/showMessages';
import './reset-password.styles.css';

const ResetPasswordPage = ({ history }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const { email, password, passwordConfirm } = userCredentials;
  const [utils, setUtils] = useState({ isLoading: false, success: null, error: null });

  const handleChange = (e) => {
    setUtils({ isLoading: false, success: null, error: null });
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      alert("passwords don't match");
      return;
    }
    const res = await forgotPassword({ email });
    if (res.error) return;
    if (res.data.status === 'success') {
      const resetToken = res.data.data;
      console.log('resettoken', resetToken);
      const res2 = await resetPassword(resetToken, { password, passwordConfirm });
      if (res2.error) return;
      if (res2.data.status === 'success') {
        setUtils({ isLoading: false, error: null, success: 'Password reset successful' });
        setTimeout(() => {
          history.push('/');
        }, 3000);
      }
    }
  };

  return (
    <form className="form-reset-password" onSubmit={handleSubmit}>
      {utils.isLoading && showAlert('info', 'Loading....', 5)}
      {utils.error && showAlert('danger', utils.error, 5)}
      {utils.success && showAlert('success', utils.success, 5)}
      <h3 className="display-5">Reset Password</h3>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input type="email" className="form-control" name="email" id="email" value={email} onChange={handleChange} aria-describedby="emailHelp" />
      </div>
      <div className="form-group">
        <label htmlFor="password">New password</label>
        <input type="password" className="form-control" name="password" value={password} onChange={handleChange} id="password" />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirm">Confirm new password</label>
        <input type="password" className="form-control" name="passwordConfirm" value={passwordConfirm} onChange={handleChange} id="passwordConfirm" />
      </div>
      <button type="submit" className="btn btn-primary">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordPage;
