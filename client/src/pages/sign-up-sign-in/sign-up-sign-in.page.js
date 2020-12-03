import SignUp from '../../components/sign-up/sign-up.component';
import SignIn from '../../components/sign-in/sign-in.component';

const SignInAndSignUpPage = () => {
  return (
    <div className="d-flex">
      <SignUp />
      <SignIn />
    </div>
  );
};

export default SignInAndSignUpPage;
