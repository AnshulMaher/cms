import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { isLoggedIn } from './utils/apiCall';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';
import candidateSecondFormPage from './pages/candidate-second-form/candidate-second-form.page';

const HomePage = lazy(() => import('./pages/homepage/home.page'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-up-sign-in/sign-up-sign-in.page'));
const DetailPage = lazy(() => import('./pages/detail/detail.page'));
const UpdatePage = lazy(() => import('./pages/update/update.page'));
const ResetPasswordPage = lazy(() => import('./pages/reset-password/reset-password.page'));

const App = () => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const getloggedInUser = async () => {
            const res = await isLoggedIn();
            if (res.error) return;
            if (res.data.status === 'success') dispatch(checkUserSession(res.data.data));
        };
        if (!currentUser) getloggedInUser();
    }, []);

    return (
        <div className="App container py-4">
            <Header />
            <Switch>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <Route exact path="/" render={() => (currentUser ? <Redirect to="/homepage" /> : <SignInAndSignUpPage />)} />
                        <Route exact path="/homepage" component={HomePage} />
                        <Route exact path="/complete-candidate-submit" component={candidateSecondFormPage} />
                        <Route exact path="/details/:id" component={DetailPage} />
                        <Route exact path="/update/:id" component={UpdatePage} />
                        <Route exact path="/resetPassword/" component={ResetPasswordPage} />
                    </Suspense>
                </ErrorBoundary>
            </Switch>
        </div>
    );
};

export default App;
