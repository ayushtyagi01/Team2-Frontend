import { Authenticator } from '@aws-amplify/ui-react';
import { useAppDispatch } from '../../redux/hooks';
import { setEmail, setJwtToken, setSignOut, setUser } from '../../redux/slice/UserSlice';
import { LoginImpl } from './LoginImpl';
import './Login.scss'

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Authenticator className='login'>
      {({ signOut, user }) => {
        // set current user name and email in state
        dispatch(setUser(user?.username));
        dispatch(setEmail(user?.attributes?.email));
        dispatch(setSignOut(signOut));
        // set the JWT token to the state
        dispatch(
          setJwtToken(user?.getSignInUserSession()?.getIdToken()?.getJwtToken())
        );
        return <LoginImpl/>;
      }}
    </Authenticator>
  );
};
export default Login;
