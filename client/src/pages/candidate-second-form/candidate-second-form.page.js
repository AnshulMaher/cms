import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IsAuthenticated from '../../components/is-authenticated-hoc/is-authenticated-hoc.component';
import WithCandidate from '../../components/with-candidate-hoc/with-candidate-hoc.component';
import FormInput from '../../components/form-input/form-input.component';
import FormSelect from '../../components/form-select/form-select.component';
import { showAlert } from '../../utils/showMessages';
import { updateCandidate } from '../../utils/apiCall';
import { selectChangeReasonChoices, selectInterviewStatusChoices, selectJoinStatusChoices, selectStatusChoices } from '../../redux/choices/choices.selectors';
import { updateCandidateSuccess } from '../../redux/candidate/candidate.actions';
import { formatDate } from '../../utils/utitlity';

const CandidateSecondFormPage = ({ history, existingCandidate }) => {
    const [candidateData, setCandidateData] = useState({
        birthDate: '',
        status: '',
        joinStatus: '',
        changeReason: '',
        interviewProcess: ''
    });

    const [utils, setUtils] = useState({ isLoading: false, success: null, error: null });

    const dispatch = useDispatch();

    const statusOptions = useSelector(selectStatusChoices);
    const joinStatusOptions = useSelector(selectJoinStatusChoices);
    const interviewStatusOptions = useSelector(selectInterviewStatusChoices);
    const changeReasonOptions = useSelector(selectChangeReasonChoices);

    const { birthDate, status, joinStatus, changeReason, interviewProcess } = candidateData;

    const handleChange = (e) => {
        setUtils({ success: null, error: null, isLoading: false });
        const { value, name } = e.target;
        setCandidateData({ ...candidateData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUtils({ success: null, error: null, isLoading: true });
        const res = await updateCandidate({ ...existingCandidate, ...candidateData });
        if (res.error) return setUtils({ isLoading: false, success: null, error: res.message });
        else if (res.data.status === 'success') {
            const exc = res.data.data;
            dispatch(updateCandidateSuccess(exc));
            setUtils({ isLoading: false, error: null, success: 'Candidate successfully saved' });
            setTimeout(() => history.push('/'), 1000);
        }
    };

    return (
        <div className="row">
            {utils.isLoading && showAlert('info', 'Saving Please Wait', 2)}
            {utils.error && showAlert('danger', utils.error, 5)}
            {utils.success && showAlert('success', utils.success, 5)}

            <div className="col-md-8 order-md-1">
                <h1 className="h3 mb-3 font-weight-normal">Optional Form ( press save button, if you don't want to fill )</h1>
                <form className="needs-validation" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4">
                            <FormInput
                                label="Birth Date"
                                name="birthDate"
                                type="date"
                                min={formatDate(new Date(new Date().setFullYear(new Date().getFullYear() - 80)))}
                                max={formatDate(new Date(new Date().setFullYear(new Date().getFullYear() - 16)))}
                                value={formatDate(birthDate)}
                                handleChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <FormSelect label="Candidate Feedback" name="status" values={statusOptions} selectedValue={status} handleChange={handleChange} />
                        </div>
                        <div className="col-md-4">
                            <FormSelect label="Join Status" name="joinStatus" values={joinStatusOptions} selectedValue={joinStatus} handleChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <FormSelect label="Interview Process" name="interviewProcess" values={interviewStatusOptions} selectedValue={interviewProcess} handleChange={handleChange} />
                        </div>
                        <div className="col-md-4">
                            <FormSelect label="Reason For Change" name="joinStatus" values={changeReasonOptions} selectedValue={changeReason} handleChange={handleChange} />
                        </div>
                    </div>
                    <button className="btn btn-primary btn-lg btn-block mt-3" type="submit">
                        Save Candidate Details
                    </button>
                </form>
            </div>
        </div>
    );
};

export default IsAuthenticated(WithCandidate(CandidateSecondFormPage));
