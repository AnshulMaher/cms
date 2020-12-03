import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const IsAuthenticated = (WrappedComponent) => {
    const IsAuthenticatedComponent = ({ ...otherProps }) => {
        const currentUser = useSelector(selectCurrentUser);
        return currentUser ? <WrappedComponent currentUser={currentUser} {...otherProps} /> : <h4>Please Sign In to get access to this page</h4>;
    };
    return IsAuthenticatedComponent;
};
export default IsAuthenticated;
