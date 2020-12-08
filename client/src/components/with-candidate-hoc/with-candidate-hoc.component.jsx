import React from 'react';
import { useSelector } from 'react-redux';
import { selectCandidate } from '../../redux/candidate/candidate.selectors';

const WithCandidate = (WrappedComponent) => {
    const WithCandidateComponent = ({ ...otherProps }) => {
        const existingCandidate = useSelector(selectCandidate);
        return existingCandidate ? (
            otherProps.currentUser._id === existingCandidate.recruiter ? (
                <WrappedComponent existingCandidate={existingCandidate} {...otherProps} />
            ) : (
                <h1 className="h3 mb-3 font-weight-normal">This candidate is not submitted by you.</h1>
            )
        ) : (
            <h1 className="h3 mb-3 font-weight-normal">You cannot load page this way. Search for the candidate first.</h1>
        );
    };
    return WithCandidateComponent;
};
export default WithCandidate;
