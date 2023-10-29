import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from '../firebase/auth';
import { addToken } from '../redux/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login() {

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
    // const reset = async (e) => {
    //     // e.preventDefault();
    //     try {
    //         await ;
    //         // alert("reset password mail send")
    //     } catch (error) {
    //         console.log(error);
    //         // alert("reset password failed")
    //     }
    // }
    const clicked = async (e) => {
        e.preventDefault();
        try {
            const data = await login({ email: email, password: pass, returnSecureToken: true });
            dispatch(addToken({ token: data.data.idToken }))
            console.log(data.data);   //////////
            Cookies.set('token', data.data.idToken, { expires: 30 });
            navigate('/main')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {/* <div style={{ display: "flex", height: "80vh", alignItems: "center", justifyContent: "center" }}>
                <form style={{ width: "70%" }}>
                    <h1>Login</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <p>fill in the Email for password reset</p>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input value={pass} onChange={(e) => { setPass(e.target.value) }} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button style={{ marginLeft: 20 }} onClick={(e) => { e.preventDefault(); reset({ requestType: "PASSWORD_RESET", email: email }) }}>reset password</button>
                    <button type="submit" onClick={clicked} className="btn btn-primary">Submit</button>
                    <p style={{ marginLeft: 20 }} onClick={() => { navigate("/Login") }}>Don't have an account? Create one</p>

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
                                    <span onClick={clicked} class="button__text">Login</span>
                                    <i class="button__icon fas fa-chevron-right"></i>
                                </button>
                            </form>
                            <div class="social-login">
                                <h4>Don't have an account?</h4>
                                <b><p  style={{color:"blue"}} onClick={() => { navigate("/login") }}>Sign up</p></b>


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
