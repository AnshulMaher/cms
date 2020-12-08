import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextInput from 'react-autocomplete-input';
import { selectCandidate } from '../../redux/candidate/candidate.selectors';
import IsAuthenticated from '../../components/is-authenticated-hoc/is-authenticated-hoc.component';
import FormInput from '../../components/form-input/form-input.component';
import FormSelect from '../../components/form-select/form-select.component';
import ExistingCandidateBox from '../../components/existing-candidate-box/existing-candidate-box.component';
import { skillData } from '../../redux/skills/skills.data';
import { validateEmail, validateNumber } from '../../utils/utitlity';
import { getCandidateByEmail, createNewCandidate } from '../../utils/apiCall';
import { showAlert } from '../../utils/showMessages';
import { selectEducationChoices, selectNoticePeriodChoices, selectStateChoices } from '../../redux/choices/choices.selectors';
import { fetchCandidateSuccess, createCandidateSuccess, removeCandidate } from '../../redux/candidate/candidate.actions';
import 'react-autocomplete-input/dist/bundle.css';

const HomePage = ({ history }) => {
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
        noticePeriod: ''
    });

    const [utils, setUtils] = useState({ foundMail: false, isLoading: false, error: null });

    const dispatch = useDispatch();

    const existingCandidate = useSelector(selectCandidate);
    const educationOptions = useSelector(selectEducationChoices);
    const stateOptions = useSelector(selectStateChoices);
    const noticePeriodOptions = useSelector(selectNoticePeriodChoices);

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
        noticePeriod
    } = candidateData;

    useEffect(() => {
        dispatch(removeCandidate());
        window.scrollTo(0, 0);
    }, []);

    const handleChangeSkill = (skills) => {
        setUtils({ isLoading: false, error: null });
        const skillList = skills.replace(/,\s*$/g, '').split(',').sort();
        setCandidateData({ ...candidateData, skills: skillList });
    };

    const handleChangeEmail = (e) => {
        const { value } = e.target;
        if (validateEmail(value)) {
            setTimeout(async () => {
                const res = await getCandidateByEmail(value);
                if (res.error) return dispatch(fetchCandidateSuccess(null));
                if (res.data.status === 'success') {
                    setUtils({ ...utils, foundMail: true });
                    const exc = res.data.data;
                    dispatch(fetchCandidateSuccess(exc));
                }
            }, 1000);
        }
        setCandidateData({ ...candidateData, email: value });
    };

    const handleChange = (e) => {
        setUtils({ isLoading: false, error: null });
        const { value, name, type } = e.target;
        let v = value;
        if (type === 'number') v = v ? Number(value) : '';
        if (name === 'phoneNumber') v = validateNumber(value);
        setCandidateData({ ...candidateData, [name]: v });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUtils({ isLoading: true, error: null });
        const res = await createNewCandidate(candidateData);
        if (res.error) return setUtils({ isLoading: false, error: res.message });
        else if (res.data.status === 'success') {
            const exc = res.data.data;
            dispatch(createCandidateSuccess(exc));
            setUtils({ isLoading: false, error: null });
            history.push('/complete-candidate-submit');
        }
    };

    return (
        <div className="row">
            {utils.isLoading && showAlert('info', 'Saving Please Wait', 2)}
            {utils.error && showAlert('danger', utils.error, 5)}
            {utils.foundMail && existingCandidate ? <ExistingCandidateBox candidate={existingCandidate} /> : null}

            <div className="col-md-8 order-md-1">
                <h1 className="h3 mb-3 font-weight-normal">Enter candidate details (all fields are required)</h1>
                <form className="needs-validation" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <FormInput label="Email" name="email" type="email" value={email} placeholder="ex. charliebrown@mail.com" handleChange={handleChangeEmail} required />
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
                        <div className="col-md-5 ">
                            <FormInput label="Current Company" name="currentCompany" type="text" value={currentCompany} placeholder="ex. xyz ltd." handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 ">
                            <FormInput label="Client Name" name="clientName" type="text" value={clientName} placeholder="ex. abc inc." handleChange={handleChange} required />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label>Skills</label>
                        <TextInput trigger="" spacer="," name="skills" options={skillData} defaultValue={skills.join(',')} onChange={handleChangeSkill} className="form-control" />
                    </div>
                    <div className="row">
                        <div className="col-md-4 ">
                            <FormSelect label="Education" name="education" values={educationOptions} selectedValue={education} handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 ">
                            <FormInput
                                label="Total Experience"
                                name="totalExperience"
                                type="number"
                                min={0}
                                max={30}
                                value={totalExperience}
                                placeholder="ex. 3"
                                handleChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4 ">
                            <FormInput
                                label="Relevant Experience"
                                name="relevantExperience"
                                type="number"
                                min={0}
                                max={30}
                                value={relevantExperience}
                                placeholder="ex. 2"
                                handleChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-5 ">
                            <FormInput label="City" name="city" type="text" value={city} placeholder="ex. Ahemdabad" handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 ">
                            <FormSelect label="State" name="state" values={stateOptions} selectedValue={state} handleChange={handleChange} required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 ">
                            <FormInput label="Current CTC" name="currentCTC" type="text" value={currentCTC} placeholder="ex. 30k or 3.6lpa" handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 ">
                            <FormInput label="Expected CTC" name="expectedCTC" type="text" value={expectedCTC} placeholder="ex. 40k or 4.8lpa" handleChange={handleChange} required />
                        </div>
                        <div className="col-md-4 ">
                            <FormSelect label="Notice Period" name="noticePeriod" values={noticePeriodOptions} selectedValue={noticePeriod} placeholder="ex. 1" handleChange={handleChange} required />
                        </div>
                    </div>
                    <button className="btn btn-primary btn-lg btn-block" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default IsAuthenticated(HomePage);
