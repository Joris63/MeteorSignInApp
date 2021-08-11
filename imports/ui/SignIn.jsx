import React from 'react';
import { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useHistory } from "react-router-dom";
import { AccountsCollection } from '/imports/api/AccountsCollection';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import '../stylesheets/SignIn.css';
import log from '/imports/imgs/log.svg';
import register from '/imports/imgs/register.svg';

export const SignIn = (props) => {
    const history = useHistory();

    React.useEffect(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");

        sign_up_btn.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
            clearRegisterForm();
        });

        sign_in_btn.addEventListener("click", () => {
            container.classList.remove("sign-up-mode");
            clearLoginForm();
        });
    }, []);


    /*    ACCOUNT LOGIC    */


    /*  Form States  */
    const [registerFormData, setRegisterFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });


    /*  Clear forms  */
    const clearLoginForm = () => {
        setLoginFormData({ ...loginFormData, username: "", password: "" })
    }

    const clearRegisterForm = () => {
        setRegisterFormData({ ...registerFormData, username: "", email: "", password: "" })
    }


    /*  Find all existing accounts  */
    const accounts = useTracker(() => AccountsCollection.find({}).fetch());


    /* #region  Submission handlers  */
    const handleLoginSubmit = e => {
        e.preventDefault();

        if (!loginFormData.email || !loginFormData.password) return

        let account = null;
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].email.toLowerCase() == loginFormData.email.toLowerCase()) {
                account = accounts[i]
                break;
            }
        }

        if (account != null && account.password == loginFormData.password) {

            Swal.fire({
                title: 'Success!',
                text: 'Redirecting automatically.',
                icon: 'success',
                timer: 1500,
                timerProgressBar: true,
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    props.onAuthenticate(true);
                    history.push('/home');
                }
            });
        }
        else {
            Swal.fire({
                title: 'Error!',
                text: 'Your email and password combination does not match an existing account.',
                icon: 'error'
            })
        }
    }

    const handleRegisterSubmit = e => {
        e.preventDefault();

        if (!registerFormData.username || !registerFormData.email || !registerFormData.password) return

        // Check for existing email
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].email.toLowerCase() == registerFormData.email.toLowerCase()) {
                Swal.fire({
                    title: 'Email already exists!',
                    text: "Do you want to sign in with this email?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'No!',
                    confirmButtonText: 'Yes!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.querySelector(".container").classList.remove("sign-up-mode");
                        clearLoginForm();
                        setLoginFormData({ ...loginFormData, email: registerFormData.email })
                    }
                })
                return;
            }
        }

        AccountsCollection.insert({
            id: uuidv4(),
            username: registerFormData.username,
            email: registerFormData.email,
            password: registerFormData.password
        });

        Swal.fire({
            title: 'Successfully registered!',
            text: 'Redirecting automatically.',
            icon: 'success',
            timer: 1500,
            timerProgressBar: true,
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                props.onAuthenticate(true);
                history.push('/home');
            }
        });
    }
    /* #endregion */


    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form" id="loginForm" onSubmit={handleLoginSubmit}>
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" value={loginFormData.email || ''} placeholder="Email" onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" value={loginFormData.password || ''} placeholder="Password" onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })} />
                        </div>
                        <input type="submit" value="Login" className="btn solid" />
                        <p className="social-text">Or Sign in with social platforms</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                    <form action="#" className="sign-up-form" id="registerForm" onSubmit={handleRegisterSubmit}>
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" value={registerFormData.username || ''} placeholder="Username" onChange={(e) => setRegisterFormData({ ...registerFormData, username: e.target.value })} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" value={registerFormData.email || ''} placeholder="Email" onChange={(e) => setRegisterFormData({ ...registerFormData, email: e.target.value })} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" value={registerFormData.password || ''} placeholder="Password" onChange={(e) => setRegisterFormData({ ...registerFormData, password: e.target.value })} />
                        </div>
                        <input type="submit" className="btn" value="Sign up" />
                        <p className="social-text">Or Sign up with social platforms</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p> </p>
                        <button className="btn transparent" id="sign-up-btn">
                            Sign up
                        </button>
                    </div>
                    <img src={log} className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p> </p>
                        <button className="btn transparent" id="sign-in-btn">
                            Sign in
                        </button>
                    </div>
                    <img src={register} className="image" alt="" />
                </div>
            </div>
        </div>
    );
};