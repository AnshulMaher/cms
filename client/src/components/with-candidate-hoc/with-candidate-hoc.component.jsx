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
                <h4>This candidate is not submitted by you</h4>
            )
        ) : (
            <h4>Cannot access this candidate. Search for the candidate first</h4>
        );
    };
    return WithCandidateComponent;
};
export default WithCandidate;
