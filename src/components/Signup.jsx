import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { signup } from '../firebase/auth';
import { addToken } from '../redux/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./signup.css";

export default function Signup() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            dispatch(addToken({ token: token }));
            navigate('/main')
        }
    }, [])



    // const account = async (token) => {
    //     const response = await fetch("http://localhost:4000/api/login", {
    //         method: "POST",
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //         "user": token,
    //         }),
    //     });
    //     // console.log(e.target.value);
    //     const pardata=await response.json();
    //     console.log(pardata)
    // }

    const clicked = async (e) => {
        e.preventDefault();
        try {
            const data = await signup({ email: email, password: pass, returnSecureToken: true });
            dispatch(addToken({ token: data.data.idToken }))
            Cookies.set('token', data.data.idToken, { expires: 30 });
            // await fetch("http://localhost:4000/api/login", {
            //     method: "POST",
            //     headers: {
            //     "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //     "user": data.data.idToken,
            //     }),
            // });
            navigate('/main')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {/* <div style={{ display: "flex", height: "80vh", alignItems: "center", justifyContent: "center" }}>
                <form style={{ width: "70%" }}>
                    <h1>Signup</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input value={pass} onChange={(e) => { setPass(e.target.value) }} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" onClick={clicked} className="btn btn-primary">Submit</button>
                    <a onClick={() => { navigate("/") }}>already have an account? Login</a>
                </form>
            </div> */}

            <body>
                <div class="container8">
                    <div class="screen9">
                        <div class="screen__content">
                            <form class="login">
                                <div class="login__field">
                                    <i class="login__icon fas fa-user"></i>
                                    <input type="text" class="login__input" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="User Email"/>
                                </div>
                                <div class="login__field">
                                    <i class="login__icon fas fa-lock"></i>
                                    <input type="password" class="login__input" value={pass} onChange={(e) => { setPass(e.target.value) }} placeholder="Password"/>

                                </div>
                                <button class="button login__submit">
                                    <span onClick={clicked} class="button__text">Sign up Now</span>
                                    <i class="button__icon fas fa-chevron-right"></i>
                                </button>
                            </form>
                            <div class="social-login">
                                <h4>Already have an account?</h4>
                                <b><p onClick={() => { navigate("/") }}>Log In</p></b>


                            </div>

                        </div>
                        <div class="screen__background">
                            <span class="screen__background__shape screen__background__shape4"></span>
                            <span class="screen__background__shape screen__background__shape3"></span>
                            <span class="screen__background__shape screen__background__shape2"></span>
                            <span class="screen__background__shape screen__background__shape1"></span>
                        </div>
                    </div>
                </div>

            </body>
        </>
    )
}
