import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateCandidateSuccess } from '../../redux/candidate/candidate.actions';

import { selectCandidateStatus, selectCandidateInterviewStatus, selectCandidateJoinStatus, selectCandidateChangeReason } from '../../redux/candidateList/candidate.selectors';
import FormInput from '../../components/form-input/form-input.component';
import FormSelect from '../../components/form-select/form-select.component';
import { updateCandidate } from '../../utils/apiCall';
import { showAlert } from '../../utils/showMessages';
import IsAuthenticated from '../../components/is-authenticated-hoc/is-authenticated-hoc.component';
import WithCandidate from '../../components/with-candidate-hoc/with-candidate-hoc.component';

const CandidateSecondFormPage = ({ history, existingCandidate }) => {
    const [candidateData, setCandidateData] = useState({
        dob: '',
        status: '',
        joinStatus: '',
        changeReason: '',
        interviewProcess: ''
    });

    const [utils, setUtils] = useState({ isLoading: false, success: null, error: null });

    const dispatch = useDispatch();

    const statusOptions = useSelector(selectCandidateStatus);
    const joinStatusOptions = useSelector(selectCandidateJoinStatus);
    const interviewStatusOptions = useSelector(selectCandidateInterviewStatus);
    const changeReasonOptions = useSelector(selectCandidateChangeReason);

    const { dob, status, joinStatus, changeReason, interviewProcess } = candidateData;

    const handleChange = (e) => {
        setUtils({ success: null, error: null, isLoading: false });
        const { value, name } = e.target;
        setCandidateData({ ...candidateData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUtils({ success: null, error: null, isLoading: true });
        const res = await updateCandidate({ ...existingCandidate, ...candidateData });
        if (res.error) {
            setUtils({ isLoading: false, success: null, error: 'Failed to update! Either details filled incorrectly or server error' });
            return;
        } else if (res.data.status === 'success') {
            const exc = res.data.data;
            dispatch(updateCandidateSuccess(exc));
            setUtils({ isLoading: false, error: null, success: 'Candidate details successfully updated' });
            setTimeout(() => {
                history.push('/');
            }, 1500);
        }
    };

    return (
        <div className="row">
            {utils.isLoading && showAlert('info', 'Saving Please Wait', 2)}
            {utils.error && showAlert('danger', utils.error, 5)}
            {utils.success && showAlert('success', utils.success, 5)}

            <div className="col-md-8 order-md-1">
                <h5 className="mb-4">Optional Fields (press save button if you don't want to fill)</h5>
                <form className="needs-validation" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <FormInput label="Birth Date" name="dob" type="date" value={dob} handleChange={handleChange} />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormSelect label="Candidate Feedback" name="status" values={statusOptions} selectedValue={status} handleChange={handleChange} />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormSelect label="Join Status" name="joinStatus" values={joinStatusOptions} selectedValue={joinStatus} handleChange={handleChange} />
                        </div>
                    </div>
                    <hr className="mb-4" />
                    <div className="row mt-3">
                        <div className="col-md-4 mb-3">
                            <FormSelect label="Interview Process" name="interviewProcess" values={interviewStatusOptions} selectedValue={interviewProcess} handleChange={handleChange} />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormSelect label="Reason For Change" name="joinStatus" values={changeReasonOptions} selectedValue={changeReason} handleChange={handleChange} />
                        </div>
                    </div>
                    <hr className="mb-4" />
                    <button className="btn btn-primary btn-lg btn-block" type="submit">
                        Save Candidate Details
                    </button>
                </form>
            </div>
        </div>
    );
};

export default IsAuthenticated(WithCandidate(CandidateSecondFormPage));
