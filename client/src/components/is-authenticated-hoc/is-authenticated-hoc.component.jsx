import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const IsAuthenticated = (WrappedComponent) => {
    const IsAuthenticatedComponent = ({ ...otherProps }) => {
        const currentUser = useSelector(selectCurrentUser);
        return currentUser ? (
            <WrappedComponent currentUser={currentUser} {...otherProps} />
        ) : (
            <h1 className="h3 mb-3 font-weight-normal">You are not logged in. Please sign in to access this page.</h1>
        );
    };
    return IsAuthenticatedComponent;
};
export default IsAuthenticated;
