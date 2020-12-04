import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signOutSuccess } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { getCandidateByEmail, logOut } from '../../utils/apiCall';
import { validateEmail } from '../../utils/utitlity';
import { fetchCandidateSuccess } from '../../redux/candidate/candidate.actions';
import './header.styles.css';

const Header = () => {
    const [searchText, setSearchText] = useState('');
    const [exc, setExc] = useState({});
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const history = useHistory();
    history.listen(() => {
        setExc({});
    });

    const handleClick = (e) => {
        e.preventDefault();
        if (exc.data) {
            dispatch(fetchCandidateSuccess(exc.data));
            history.push(`/details/${exc._id}`);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateEmail(searchText)) {
            const res = await getCandidateByEmail(searchText);
            if (res.error) {
                setExc({ _id: '#', name: 'Candidate not found' });
                return;
            }
            if (res.data.status === 'success') {
                const data = res.data.data;
                setExc({ _id: data._id, name: data.candidateName, data });
            }
        }
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
            <Link className="navbar-brand" to="/">
                <img src={`${window.location.origin}/logo.png`} width="30" height="30" alt="" loading="lazy" />
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    {currentUser && (
                        <>
                            <li className="nav-item">
                                <div
                                    className="nav-link logout"
                                    onClick={() => {
                                        logOut();
                                        dispatch(signOutSuccess());
                                        history.push('/');
                                    }}
                                >
                                    Log Out
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link">{currentUser.name}</div>
                            </li>
                        </>
                    )}
                </ul>
                {currentUser && (
                    <form className="form-inline my-2 my-lg-0 position-relative" onSubmit={handleSubmit}>
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                            Search
                        </button>
                        {Object.keys(exc).length ? (
                            <div className="w-100 d-flex flex-column justify-content-center search-result pl-3">
                                <li>
                                    Search Result: <Link onClick={handleClick}>{exc.name}</Link>
                                </li>
                            </div>
                        ) : null}
                    </form>
                )}
            </div>
        </nav>
    );
};

export default Header;
