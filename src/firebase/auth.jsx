import axios from "axios"

export const signup = async (req) => {
    try {
        const data = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwrhlv2YPnc-9Vib8dizzf_EOC3Bx89Zw", req)
        return data
    } catch (error) {
        alert("failed")
    }
}
export const login = async (req) => {
    try {
        const data = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwrhlv2YPnc-9Vib8dizzf_EOC3Bx89Zw", req)
        return data
    } catch (error) {
        alert("failed")
    }
}
export const reset = async (req) => {
    try {
        await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDwrhlv2YPnc-9Vib8dizzf_EOC3Bx89Zw", req)
        alert("reset lik send")
    } catch (error) {
        alert("failed")
    }
}
export const emailVerificationCode = async (req) => {
    try {
        await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDwrhlv2YPnc-9Vib8dizzf_EOC3Bx89Zw", req)
        alert("verification code send")
    } catch (error) {
        alert("failed")
    }
}
export const ConfirmEmailVerificationCode = async (req) => {
    try {
        await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDwrhlv2YPnc-9Vib8dizzf_EOC3Bx89Zw", req)
        alert("Email Verified")
    } catch (error) {
        alert("Failed")
    }
}
