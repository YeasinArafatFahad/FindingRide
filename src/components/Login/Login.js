
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { UserContext } from '../../App'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom'


firebase.initializeApp(firebaseConfig)
function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    })

    const { setLoggedInUser } = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const provider = new firebase.auth.GoogleAuthProvider();
    var gitProvider = new firebase.auth.GithubAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, photoURL, email } = res.user
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser)
                setLoggedInUser(signedInUser)
                history.replace(from);
                console.log(displayName, photoURL, email)
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }


    const handleOnBlur = (e) => {
        // console.log(e.target.name, e.target.value);

        let isFieldValid = true;

        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.+/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber
        }
        if (isFieldValid) {

            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user.name, user.password)
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in 
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true
                    newUserInfo.isSignedIn = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo)
                    history.replace(from);

                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    // ..
                });

        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo)
                    history.replace(from);
                    // ...
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        // 

    }
    const handleGithubSignIn = () => {

        firebase
            .auth()
            .signInWithPopup(gitProvider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                console.log('gh user', user);
                setUser(user)

            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorMessage, errorCode, email)
            });

    }

    return (
        <div className="App">
            {
                user.isSignedIn && <div>
                    <p>Welcome {user.name}</p>
                    <p>gmail:{user.email}</p>
                </div>
            }
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="5">

                        <form style={{ marginTop: "200px", marginLeft: '500px', width: '50%' }} onSubmit={handleSubmit} action="">
                            <div class="form-group">
                                {newUser && <input type="text" className="form-control" name="name" onBlur={handleOnBlur} placeholder="name" />
                                }
                                <input type="email" className="form-control" name="email" onBlur={handleOnBlur} placeholder="email" />
                                <input type="password" className="form-control" name="password" onBlur={handleOnBlur} placeholder="password" />

                                {/* {newUser && <MDBInput label="Your name" icon="user" name="name" onBlur={handleOnBlur} group type="text" validate error="wrong"
                                    success="right" />}


                                <MDBInput label="Your email" icon="envelope" name="email" onBlur={handleOnBlur} group type="email" validate error="wrong"
                                    success="right" /> */}
                                {/* <MDBInput type="text" className="form-control" name="email" onBlur={handleOnBlur} placeholder="email address" /> */}
                                {/* <MDBInput label="Your password" icon="lock" name="password" onBlur={handleOnBlur} group type="password" validate /> */}
                            </div>
                            <input type="submit"></input>
                            <br />

                            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                            <label htmlFor="newUser">Create New Account</label>
                        </form>
                        {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} Successfully</p>}
                        

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="d-flex justify-content-center ml-6">
                            <MDBBtn color="primary" onClick={handleGoogleSignIn}>Sign In with Google</MDBBtn>
                            <br />

                            {/* <button className="btn-success" onClick={handleGithubSignIn}>Sign In With GitHub</button>  */}
                            <MDBBtn color="success" onClick={handleGithubSignIn}>Sign In With GitHub</MDBBtn>
                        </div>

        </div>
    );
}

export default Login;
