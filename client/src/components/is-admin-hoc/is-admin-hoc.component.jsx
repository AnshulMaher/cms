import React from 'react';

const IsAdmin = (WrappedComponent) => {
    const IsAdminComponent = ({ currentUser, ...otherProps }) =>
        currentUser.role === 'admin' ? <WrappedComponent {...otherProps} /> : <h1 className="h3 mb-3 font-weight-normal">This page is only for admin.</h1>;

    return IsAdminComponent;
};
export default IsAdmin;
