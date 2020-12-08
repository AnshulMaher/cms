import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const UnAuthenticated = (WrappedComponent) => {
    const UnAuthenticatedComponent = ({ ...otherProps }) => {
        const currentUser = useSelector(selectCurrentUser);
        return !currentUser ? (
            <WrappedComponent currentUser={currentUser} {...otherProps} />
        ) : (
            <h1 className="h3 mb-3 font-weight-normal">Can't access this page. You are already logged in, Log out first.</h1>
        );
    };
    return UnAuthenticatedComponent;
};
export default UnAuthenticated;
