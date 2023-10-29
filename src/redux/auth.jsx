import { createSlice } from "@reduxjs/toolkit"

const Auth = createSlice({
    name: "Token",
    initialState: {
        Token: "0",
        Balance:0,
    },
    reducers: {
        addToken: (state, action) => {
            state.Token = action.payload.token;
        },
        addBalance:(state,action)=>{
            state.Balance=action.payload.balance
        }
    }
})

export const { addToken,addBalance} = Auth.actions;
export default Auth.reducer;