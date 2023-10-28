import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from '../firebase/auth';
import { addToken } from '../redux/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const dispatch = useDispatch();

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
            console.log(data.data.idToken);   //////////
            navigate('/main')
        } catch (error) {
            console.log(error);
        }
    }
    const token = useSelector((state) => state.Token.Token); 
    console.log(token);   //////////
    return (
        <>
            <div style={{ display: "flex", height: "80vh", alignItems: "center", justifyContent: "center" }}>
                {/* <h1>{token}</h1> */}
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
                    <p style={{ marginLeft: 20 }} onClick={() => { navigate("/") }}>Don't have an account? Create one</p>

                </form>
            </div>
        </>
    )
}
