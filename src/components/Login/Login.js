import React, {Component} from 'react';
import {Container} from 'semantic-ui-react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {firebase, auth} from '../../services/firebase/firebase'

const uiConfig = {
    // Popup sign-in flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/home',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ]
};

class Login extends Component {
    render() {
        return (
            <Container>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
            </Container>
        )
    }
}

export default Login