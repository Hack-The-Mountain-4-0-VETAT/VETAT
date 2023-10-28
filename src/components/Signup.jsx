import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { signup } from '../firebase/auth';
import { addToken } from '../redux/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const dispatch = useDispatch();

    const clicked = async (e) => {
        e.preventDefault();
        try {
            const data = await signup({ email: email, password: pass, returnSecureToken: true });
            dispatch(addToken({ token: data.data.idToken }))
            navigate('/main')
        } catch (error) {
            console.log(error);
        }
    }
    const token = useSelector((state) => state.Token.Token);
    return (
        <>
            <div style={{ display: "flex", height: "80vh", alignItems: "center", justifyContent: "center" }}>
                {/* <h1>{token}</h1> */}
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
                    <a onClick={() => { navigate("/Login") }}>already have an account? Login</a>
                </form>
            </div>
        </>
    )
}
