import { Authenticator } from '@aws-amplify/ui-react';
import { useAppDispatch } from '../../redux/hooks';
import { setJwtToken, setSignOut, setUser } from '../../redux/slice/UserSlice';
import { LoginImpl } from './LoginImpl';
import './Login.scss'

const Login: React.FC = ()=>{
    const dispatch = useAppDispatch();
    
   return ( <Authenticator className='login'>
      {({ signOut, user }) => {
        //set current user name in state
        dispatch(setUser(user?.username));
        dispatch(setSignOut(signOut));
        //set the jwt token to the state
        dispatch(
          setJwtToken(user?.getSignInUserSession()?.getIdToken()?.getJwtToken())
        );
        return <LoginImpl />;
      }}
    </Authenticator>)
}
export default Login;
