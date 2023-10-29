import { createSlice } from "@reduxjs/toolkit"

const Auth = createSlice({
    name: "Token",
    initialState: {
        Token: "0"
    },
    reducers: {
        addToken: (state, action) => {
            state.Token = action.payload.token;
        }
    }
})

export const { addToken } = Auth.actions;
export default Auth.reducer;