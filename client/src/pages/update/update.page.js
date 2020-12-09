import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextInput from 'react-autocomplete-input';
import IsAuthenticated from '../../components/is-authenticated-hoc/is-authenticated-hoc.component';
import FormInput from '../../components/form-input/form-input.component';
import FormSelect from '../../components/form-select/form-select.component';
import { skillData } from '../../redux/skills/skills.data';
import { updateCandidate } from '../../utils/apiCall';
import { showAlert } from '../../utils/showMessages';
import WithCandidate from '../../components/with-candidate-hoc/with-candidate-hoc.component';
import { formatDate, validateNumber } from '../../utils/utitlity';
import { selectCandidate } from '../../redux/candidate/candidate.selectors';
import {
    selectEducationChoices,
    selectNoticePeriodChoices,
    selectStateChoices,
    selectChangeReasonChoices,
    selectInterviewStatusChoices,
    selectJoinStatusChoices,
    selectStatusChoices
} from '../../redux/choices/choices.selectors';
import { updateCandidateSuccess } from '../../redux/candidate/candidate.actions';
import 'react-autocomplete-input/dist/bundle.css';

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
        city: '',
        state: '',
        email: '',
        currentCTC: '',
        expectedCTC: '',
        noticePeriod: '',
        status: '',
        joinStatus: '',
        birthDate: '',
        changeReason: '',
        interviewProcess: ''
    });

    const [utils, setUtils] = useState({ isLoading: false, success: null, error: null });

    const dispatch = useDispatch();

    const existingCandidate = useSelector(selectCandidate);
    const educationOptions = useSelector(selectEducationChoices);
    const stateOptions = useSelector(selectStateChoices);
    const noticePeriodOptions = useSelector(selectNoticePeriodChoices);
    const statusOptions = useSelector(selectStatusChoices);
    const joinStatusOptions = useSelector(selectJoinStatusChoices);
    const interviewStatusOptions = useSelector(selectInterviewStatusChoices);
    const changeReasonOptions = useSelector(selectChangeReasonChoices);

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
        city,
        state,
        currentCTC,
        expectedCTC,
        noticePeriod,
        status,
        joinStatus,
        birthDate,
        changeReason,
        interviewProcess
    } = candidateData;

    useEffect(() => {
        setCandidateData(existingCandidate);
        window.scrollTo(0, 0);
    }, [existingCandidate]);

    const handleChangeSkill = (skills) => {
        setUtils({ isLoading: false, success: null, error: null });
        const skillList = skills.replace(/,\s*$/g, '').split(',').sort();
        setCandidateData({ ...candidateData, skills: skillList });
    };

    const handleChange = (e) => {
        setUtils({ isLoading: false, success: null, error: null });
        const { value, name, type } = e.target;
        let v = value;
        if (type === 'number') v = v ? Number(value) : '';
        if (name === 'phoneNumber') v = validateNumber(value);
        setCandidateData({ ...candidateData, [name]: v });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUtils({ success: null, error: null, isLoading: true });
        const res = await updateCandidate(candidateData);
        if (res.error) return setUtils({ isLoading: false, success: null, error: res.message });
        else if (res.data.status === 'success') {
            const exc = res.data.data;
            dispatch(updateCandidateSuccess(exc));
            setUtils({ isLoading: false, error: null, success: 'Candidate details successfully updated' });
            setTimeout(() => history.push(`/details/${existingCandidate._id}`), 1000);
        }
    };

    return (
        <div className="row">
            {utils.isLoading && showAlert('info', 'Updating Please Wait', 2)}
            {utils.error && showAlert('danger', utils.error, 5)}
            {utils.success && showAlert('success', utils.success, 5)}

            <div className="col-md-8 order-md-1">
                <h1 className="h3 mb-3 font-weight-normal">Update candidate details</h1>
                <form className="needs-validation" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <FormInput label="Email" name="email" type="email" value={email} placeholder="ex. charliebrown@mail.com" handleChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <FormInput label="Phone Number" name="phoneNumber" type="number" value={phoneNumber} placeholder="ex. 5566778890" handleChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <FormInput label="Candidate Name" name="candidateName" type="text" value={candidateName} placeholder="ex. Charlie Brown" handleChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
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
                        <div className="col-md-5">
                            <FormInput label="Current Company" name="currentCompany" type="text" value={currentCompany} placeholder="ex. xyz ltd." handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <FormInput label="Client Name" name="clientName" type="text" value={clientName} placeholder="ex. abc inc." handleChange={handleChange} required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label>Skills</label>
                        <TextInput trigger="" spacer="," name="skills" options={skillData} defaultValue={skills.join(',')} onChange={handleChangeSkill} className="form-control" />
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <FormSelect label="Education" name="education" values={educationOptions} selectedValue={education} handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <FormInput
                                label="Total Experience"
                                name="totalExperience"
                                min={0}
                                max={30}
                                type="number"
                                value={totalExperience}
                                placeholder="ex. 3"
                                handleChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInput
                                label="Relevant Experience"
                                name="relevantExperience"
                                min={0}
                                max={30}
                                type="number"
                                value={relevantExperience}
                                placeholder="ex. 2"
                                handleChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <FormInput label="City" name="city" type="text" value={city} placeholder="ex. Ahemdabad" handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <FormSelect label="State" name="state" values={stateOptions} selectedValue={state} handleChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <FormInput label="Current CTC" name="currentCTC" type="text" value={currentCTC} placeholder="ex. 30k or 3.6lpa" handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <FormInput label="Expected CTC" name="expectedCTC" type="text" value={expectedCTC} placeholder="ex. 40k or 4.8lpa" handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <FormSelect label="Notice Period" name="noticePeriod" values={noticePeriodOptions} selectedValue={noticePeriod} placeholder="ex. 1" handleChange={handleChange} required />
                        </div>
                    </div>

                    <h4 className="mb-2">Optional Fields</h4>
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
                    <div className="row">
                        <div className="col-md-4">
                            <FormSelect label="Interview Process" name="interviewProcess" values={interviewStatusOptions} selectedValue={interviewProcess} handleChange={handleChange} />
                        </div>
                        <div className="col-md-4">
                            <FormSelect label="Reason For Change" name="changeReason" values={changeReasonOptions} selectedValue={changeReason} handleChange={handleChange} />
                        </div>
                    </div>

                    <button className="btn btn-primary btn-lg btn-block mt-3" type="submit">
                        Update Details
                    </button>
                </form>
            </div>
        </div>
    );
};

export default IsAuthenticated(WithCandidate(UpdatePage));
