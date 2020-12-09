import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { getClients, isLoggedIn } from './utils/apiCall';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectIsClientFetching } from './redux/choices/choices.selectors';
import { fetchClientsSuccess } from './redux/choices/choices.actions';

import './App.css';

const HomePage = lazy(() => import('./pages/homepage/home.page'));
const CandidateSecondFormPage = lazy(() => import('./pages/candidate-second-form/candidate-second-form.page'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-up-sign-in/sign-up-sign-in.page'));
const DetailPage = lazy(() => import('./pages/detail/detail.page'));
const UpdatePage = lazy(() => import('./pages/update/update.page'));
const ForgotPasswordPage = lazy(() => import('./pages/forgot-password/forgot-password.page'));
const ResetPasswordPage = lazy(() => import('./pages/reset-password/reset-password.page'));

const App = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isClientFetching = useSelector(selectIsClientFetching);
    const dispatch = useDispatch();

    useEffect(() => {
        const getloggedInUser = async () => {
            const res = await isLoggedIn();
            if (res.error) return dispatch(checkUserSession(null));
            else if (res.data.status === 'success') dispatch(checkUserSession(res.data.data));
        };
        const fetchClients = async () => {
            const res = await getClients();
            if (res.error) return;
            else if (res.data.status === 'success') dispatch(fetchClientsSuccess(res.data.data));
        };
        if (!currentUser) getloggedInUser();
        if (!isClientFetching) fetchClients();
    }, [currentUser, isClientFetching]);

    return (
        <div className="App container py-4">
            <Header />
            <Switch>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <Route exact path="/" render={() => (currentUser ? <Redirect to="/homepage" /> : <SignInAndSignUpPage />)} />
                        <Route exact path="/homepage" render={({ history }) => (isClientFetching ? <Spinner /> : <HomePage history={history} />)} />
                        <Route exact path="/complete-candidate-submit" component={CandidateSecondFormPage} />
                        <Route exact path="/details/:id" component={DetailPage} />
                        <Route exact path="/update/:id" component={({ history }) => (isClientFetching ? <Spinner /> : <UpdatePage history={history} />)} />
                        <Route exact path="/forgotPassword/" component={ForgotPasswordPage} />
                        <Route exact path="/resetPassword/:resetToken" component={ResetPasswordPage} />
                    </Suspense>
                </ErrorBoundary>
            </Switch>
        </div>
    );
};

export default App;
