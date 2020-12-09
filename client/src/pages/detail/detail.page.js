import moment from 'moment';
import { useEffect } from 'react';
import IsAuthenticated from '../../components/is-authenticated-hoc/is-authenticated-hoc.component';
import WithCandidate from '../../components/with-candidate-hoc/with-candidate-hoc.component';

const DetailPage = ({ history, existingCandidate }) => {
    const {
        _id,
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
        date,
        birthDate,
        status,
        joinStatus,
        changeReason,
        interviewProcess
    } = existingCandidate;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="emp-profile">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    history.push(`/update/${_id}`);
                }}
            >
                <div className="row">
                    <div className="col-md-4">
                        <input type="submit" className="profile-edit-btn" name="editProfile" value="Edit Profile" />
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5>{candidateName}</h5>
                            <h6>Pofile: {currentDesignation}</h6>
                            <h6>Location: {`${city}, ${state}`}</h6>
                            <p className="proile-rating">
                                Date of calling : <span>{moment(date).format('DD-MM-YYYY')}</span>
                            </p>
                            <ul className="nav nav-tabs mt-4 mb-3" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                                        About
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
                                        Other
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="mb-4">
                            <p>CLIENT NAME</p>
                            <p className="text-info">{clientName}</p>
                        </div>
                        <div className="">
                            <p>SKILLS</p>
                            {skills.map((val, idx) => (
                                <div className="text-info" key={idx}>
                                    {val}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Name</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{candidateName}</p>
                                    </div>
                                </div>
                                {birthDate && (
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Birth Date</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{moment(birthDate).format('DD-MM-YYYY')}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Email</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{email}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Phone</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Education</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{education}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Relevant Experience</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{relevantExperience}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Notice Period</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{noticePeriod}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Total Experience</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{totalExperience}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Current Company</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{currentCompany}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Current Salary</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{currentCTC}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Expected Salary</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{expectedCTC}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Status</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{status}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Interview Process</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{interviewProcess}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Joining Status</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{joinStatus}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Change Reason</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{changeReason}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default IsAuthenticated(WithCandidate(DetailPage));
