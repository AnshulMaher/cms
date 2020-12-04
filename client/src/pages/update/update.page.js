import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

import { updateCandidateSuccess } from '../../redux/candidate/candidate.actions';

import {
    selectCandidateStatus,
    selectCandidateInterviewStatus,
    selectCandidateJoinStatus,
    selectCandidateEducation,
    selectCandidateNoticePeriod,
    selectCandidateChangeReason
} from '../../redux/candidateList/candidate.selectors';
import { selectStates } from '../../redux/location/location.selectors';
import { selectCandidate } from '../../redux/candidate/candidate.selectors';
import IsAuthenticated from '../../components/is-authenticated-hoc/is-authenticated-hoc.component';
import FormInput from '../../components/form-input/form-input.component';
import FormSelect from '../../components/form-select/form-select.component';
import { skillData } from '../../redux/skills/skills.data';
import { updateCandidate } from '../../utils/apiCall';
import { showAlert } from '../../utils/showMessages';
import WithCandidate from '../../components/with-candidate-hoc/with-candidate-hoc.component';

const UpdatePage = ({ history }) => {
    const [candidateData, setCandidateData] = useState({
        clientName: '',
        currentDesignation: '',
        candidateName: '',
        education: '',
        skills: [],
        currentCompany: '',
        totalExperience: '',
        relevantExperience: '',
        phoneNumber: '',
        area: '',
        city: '',
        state: '',
        email: '',
        currentCTC: '',
        expectedCTC: '',
        noticePeriod: '',
        status: '',
        joinStatus: '',
        dob: '',
        changeReason: '',
        interviewStatus: ''
    });

    const [utils, setUtils] = useState({ isLoading: false, success: null, error: null });

    const dispatch = useDispatch();

    const existingCandidate = useSelector(selectCandidate);
    const educationOptions = useSelector(selectCandidateEducation);
    const stateOptions = useSelector(selectStates);
    const noticePeriodOptions = useSelector(selectCandidateNoticePeriod);
    const statusOptions = useSelector(selectCandidateStatus);
    const joinStatusOptions = useSelector(selectCandidateJoinStatus);
    const interviewStatusOptions = useSelector(selectCandidateInterviewStatus);
    const changeReasonOptions = useSelector(selectCandidateChangeReason);

    const {
        clientName,
        currentDesignation,
        candidateName,
        education,
        skills,
        currentCompany,
        totalExperience,
        relevantExperience,
        phoneNumber,
        email,
        area,
        city,
        state,
        currentCTC,
        expectedCTC,
        noticePeriod,
        status,
        joinStatus,
        dob,
        changeReason,
        interviewStatus
    } = candidateData;

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        const data = { ...existingCandidate };
        setCandidateData(data);
    };

    const handleChangeSkill = (skills) => {
        const skillList = skills.replace(/,\s*$/g, '').split(',').sort();
        setCandidateData({ ...candidateData, skills: skillList });
    };

    const handleChange = (e) => {
        setUtils({ success: null, error: null, isLoading: false });
        const { value, name } = e.target;
        setCandidateData({ ...candidateData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUtils({ success: null, error: null, isLoading: true });
        const res = await updateCandidate(candidateData);
        if (res.error) {
            setUtils({ isLoading: false, success: null, error: 'Failed to update! Either details filled incorrectly or server error' });
            return;
        } else if (res.data.status === 'success') {
            const exc = res.data.data;
            dispatch(updateCandidateSuccess(exc));
            setUtils({ isLoading: false, error: null, success: 'Candidate details successfully updated' });
            setTimeout(() => {
                history.push('/#top');
            }, 3000);
        }
    };

    return (
        <div className="row">
            {utils.isLoading && showAlert('info', 'Loading....', 3)}
            {utils.error && showAlert('danger', utils.error, 5)}
            {utils.success && showAlert('success', utils.success, 5)}

            <div className="col-md-8 order-md-1">
                <h4 className="mb-3">Change Candidate Details</h4>
                <form className="needs-validation" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <FormInput label="Email" name="email" type="email" value={email} handleChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <FormInput label="Phone Number" name="phoneNumber" type="number" value={phoneNumber} handleChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <FormInput label="Candidate Name" name="candidateName" type="text" value={candidateName} handleChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <FormInput label="Current Designation" name="currentDesignation" type="text" value={currentDesignation} handleChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 mb-3">
                            <FormInput label="Current Company" name="currentCompany" type="text" value={currentCompany} handleChange={handleChange} required />
                        </div>

                        <div className="col-md-3 mb-3">
                            <FormSelect label="Education" name="education" values={educationOptions} selectedValue={education} handleChange={handleChange} required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <FormInput label="Client Name" name="clientName" type="text" value={clientName} handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormInput label="Total Experience" name="totalExperience" type="number" value={totalExperience} handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormInput label="Relevant Experience" name="relevantExperience" type="number" value={relevantExperience} handleChange={handleChange} required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label>Skills</label>
                        <TextInput trigger="" spacer="," name="skills" options={skillData} defaultValue={skills.join(',')} onChange={handleChangeSkill} className="form-control" />
                    </div>

                    <hr className="mb-4" />
                    <div className="mb-3">
                        <FormInput label="Address Locality" name="area" type="text" value={area} handleChange={handleChange} />
                    </div>

                    <div className="row">
                        <div className="col-md-5 mb-3">
                            <FormInput label="City" name="city" type="text" value={city} handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormSelect label="State" name="state" values={stateOptions} selectedValue={state} handleChange={handleChange} required />
                        </div>
                    </div>
                    <hr className="mb-4" />
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <FormInput label="Current CTC" name="currentCTC" type="number" value={currentCTC} handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormInput label="Expected CTC" name="expectedCTC" type="number" value={expectedCTC} handleChange={handleChange} required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-4 mb-3">
                            <FormSelect label="Notice Period" name="noticePeriod" values={noticePeriodOptions} selectedValue={noticePeriod} handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormSelect label="Status" name="status" values={statusOptions} selectedValue={status} handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormSelect label="Join Status" name="joinStatus" values={joinStatusOptions} selectedValue={joinStatus} handleChange={handleChange} required />
                        </div>
                    </div>
                    <hr className="mb-4" />
                    <h4 className="mb-2">Optional Fields</h4>
                    <div className="row mt-3">
                        <div className="col-md-4 mb-3">
                            <FormInput label="Birth Date" name="dob" type="date" value={dob} handleChange={handleChange} />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormSelect label="Reason For Change" name="joinStatus" values={changeReasonOptions} selectedValue={changeReason} handleChange={handleChange} />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormSelect label="Interview Process" name="interviewStatus" values={interviewStatusOptions} selectedValue={interviewStatus} handleChange={handleChange} />
                        </div>
                    </div>
                    <hr className="mb-4" />
                    <button className="btn btn-primary btn-lg btn-block" type="submit">
                        Update Details
                    </button>
                </form>
            </div>
        </div>
    );
};

export default IsAuthenticated(WithCandidate(UpdatePage));
