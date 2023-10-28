import { configureStore } from "@reduxjs/toolkit"
import auth from "./auth";

const Store = configureStore({
    reducer: {
        Token: auth
    }
})

export default Store;