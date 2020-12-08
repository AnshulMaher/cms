import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import './existing-candidate-box.styles.css';

const ExistingCandidateBox = ({ candidate }) => {
    const history = useHistory();
    const currentUser = useSelector(selectCurrentUser);
    const { _id, candidateName, email } = candidate;
    const data = {
        id: _id,
        name: candidateName,
        email
    };
    return (
        <div className="col-md-4 order-md-2 mb-4 py-4">
            <h3 className="h3 mb-3 font-weight-normal">Candidate already exists</h3>
            <ul className="list-group mb-3">
                {Object.keys(data).map((key, idx) => (
                    <li className="list-group-item d-flex justify-content-between lh-condensed" key={idx}>
                        <div className="list-group-inner">
                            <span className="text-muted">{key}</span>
                            <span className="text-muted">{data[key]}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="input-group-append">
                {currentUser._id === candidate.recruiter ? (
                    <>
                        <button className="btn btn-sm btn-secondary mr-2" onClick={() => history.push(`/details/${_id}`)}>
                            View
                        </button>
                        <button className="btn btn-sm btn-info mr-2" onClick={() => history.push(`/update/${_id}`)}>
                            Update
                        </button>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default ExistingCandidateBox;
