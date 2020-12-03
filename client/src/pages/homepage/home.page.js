import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

import { fetchCandidateSuccess, createCandidateSuccess, removeCandidate } from '../../redux/candidate/candidate.actions';

import {
    selectCandidateEducation,
    selectCandidateNoticePeriod,
    selectCandidateStatus,
    selectCandidateInterviewStatus,
    selectCandidateJoinStatus,
    selectCandidateChangeReason
} from '../../redux/candidateList/candidate.selectors';
import { selectStates } from '../../redux/location/location.selectors';
import { selectCandidate } from '../../redux/candidate/candidate.selectors';

import IsAuthenticated from '../../components/is-authenticated-hoc/is-authenticated-hoc.component';
import FormInput from '../../components/form-input/form-input.component';
import FormSelect from '../../components/form-select/form-select.component';
import ExistingCandidateBox from '../../components/existing-candidate-box/existing-candidate-box.component';
// import DynamicFormField from '../../components/dynamic-form-field/dynamic-form-field.component';

import { skillData } from '../../redux/skills/skills.data';

import { validateEmail, clearFormState } from '../../utils/utitlity';
import { getCandidateByEmail, createNewCandidate } from '../../utils/apiCall';
import { showAlert } from '../../utils/showMessages';

import './home.styles.css';

const HomePage = () => {
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

    const [utils, setUtils] = useState({ foundMail: false, isLoading: false, success: null, error: null });
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
        dispatch(removeCandidate());
    }, []);

    const handleChangeSkill = (skills) => {
        const skillList = skills.replace(/,\s*$/g, '').split(',').sort();
        setCandidateData({ ...candidateData, skills: skillList });
    };

    const handleChangeEmail = (e) => {
        const { value, name } = e.target;
        if (validateEmail(value)) {
            setTimeout(async () => {
                const res = await getCandidateByEmail(value);
                if (res.error) {
                    dispatch(fetchCandidateSuccess(null));
                    return;
                }
                if (res.data.status === 'success') {
                    setUtils({ ...utils, foundMail: true });
                    const exc = res.data.data;
                    dispatch(fetchCandidateSuccess(exc));
                }
            }, 1000);
        }
        setCandidateData({ ...candidateData, [name]: value });
    };

    const handleChange = (e) => {
        setUtils({ isLoading: false, success: null, error: null });
        const { value, name } = e.target;
        setCandidateData({ ...candidateData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { ...candidateData };
        setUtils({ isLoading: true, success: null, error: null });
        const res = await createNewCandidate(data);
        if (res.error) {
            setUtils({ isLoading: false, success: null, error: 'Failed to save! Either details filled incorrectly or server error' });
            return;
        } else if (res.data.status === 'success') {
            const exc = res.data.data;
            dispatch(createCandidateSuccess(exc));
            setUtils({ isLoading: false, error: null, success: 'Candidate successfully saved' });
            setCandidateData(clearFormState());
        }
    };

    return (
        <div className="row">
            {utils.isLoading && showAlert('info', 'Loading....', 3)}
            {utils.error && showAlert('danger', utils.error, 5)}
            {utils.success && showAlert('success', utils.success, 5)}
            {utils.foundMail && existingCandidate ? <ExistingCandidateBox candidate={existingCandidate} /> : null}

            <div className="col-md-8 order-md-1">
                <h4 className="mb-3">Enter Candidate Details</h4>
                <form className="needs-validation" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <FormInput label="Email" name="email" type="email" value={email} placeholder="ex. charliebrown@mail.com" handleChange={handleChangeEmail} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <FormInput label="Phone Number" name="phoneNumber" type="number" value={phoneNumber} placeholder="ex. 5566778890" handleChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <FormInput label="Candidate Name" name="candidateName" type="text" value={candidateName} placeholder="ex. Charlie Brown" handleChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <FormInput
                                label="Current Designation"
                                name="currentDesignation"
                                type="text"
                                value={currentDesignation}
                                placeholder="ex. Node.js Developer"
                                handleChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 mb-3">
                            <FormInput label="Current Company" name="currentCompany" type="text" value={currentCompany} placeholder="ex. xyz ltd." handleChange={handleChange} required />
                        </div>

                        <div className="col-md-3 mb-3">
                            <FormSelect label="Education" name="education" values={educationOptions} selectedValue={education} handleChange={handleChange} required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <FormInput label="Client Name" name="clientName" type="text" value={clientName} placeholder="ex. John Doe" handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormInput label="Total Experience" name="totalExperience" type="number" value={totalExperience} placeholder="ex. 3" handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormInput label="Relevant Experience" name="relevantExperience" type="number" value={relevantExperience} placeholder="ex. 2" handleChange={handleChange} required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label>Skills</label>
                        <TextInput trigger="" spacer="," name="skills" options={skillData} defaultValue={skills.join(',')} onChange={handleChangeSkill} className="form-control" />
                    </div>

                    <hr className="mb-4" />
                    <div className="mb-3">
                        <FormInput label="Address Locality" name="area" type="text" value={area} placeholder="ex. 1234 Main St, opo. King's Hall" handleChange={handleChange} />
                    </div>

                    <div className="row">
                        <div className="col-md-5 mb-3">
                            <FormInput label="City" name="city" type="text" value={city} placeholder="ex. Ahemdabad" handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormSelect label="State" name="state" values={stateOptions} selectedValue={state} handleChange={handleChange} required />
                        </div>
                    </div>
                    <hr className="mb-4" />
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <FormInput label="Current CTC" name="currentCTC" type="number" value={currentCTC} placeholder="ex. 30000" handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <FormInput label="Expected CTC" name="expectedCTC" type="number" value={expectedCTC} placeholder="ex. 43000" handleChange={handleChange} required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-4 mb-3">
                            <FormSelect label="Notice Period" name="noticePeriod" values={noticePeriodOptions} selectedValue={noticePeriod} placeholder="ex. 1" handleChange={handleChange} required />
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
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default IsAuthenticated(HomePage);