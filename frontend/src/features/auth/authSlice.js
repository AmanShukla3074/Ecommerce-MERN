import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import setLogoutTimer from "../../Utils/JwtExpireVerify";
//actions 
export const registerUser=createAsyncThunk('registerUser',async(userData,thunkAPI)=>{
    try {
        const response= await axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/register`,userData);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const registerUserverify=createAsyncThunk('registerUserverify',async(userData,thunkAPI)=>{
    try {
        const response= await axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/verify-otp-register`,userData);
        const token = response.data.token;
        setLogoutTimer(thunkAPI.dispatch, token);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


export const loginUser=createAsyncThunk('loginUser',async(userData,thunkAPI)=>{
    try {
        const response= await axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/login`,userData);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const loginUserverify=createAsyncThunk('loginUserverify',async(userData,thunkAPI)=>{
    try {
        const response= await axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/verify-otp-login`,userData);
        const token = response.data.token;
        setLogoutTimer(thunkAPI.dispatch, token);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const changePassword=createAsyncThunk('changePassword',async(userData,thunkAPI)=>{
    try {
        const response= await axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/password-change`,userData);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const changePasswordOTPverify=createAsyncThunk('changePasswordOTPverify',async(userData,thunkAPI)=>{
    try {
        const response= await axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/verify-password-change-otp`,userData);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const loadUserFromLocalStorage = () => {
    const userJson = localStorage.getItem("user");
    
    if (userJson) {
        try {
            const user = JSON.parse(userJson);
            return { isAuthenticated: true, user };
        } catch (error) {
            console.error("Failed to parse user data:", error);
            return { isAuthenticated: false, user: null };
        }
    }
    return { isAuthenticated: false, user: null };
}

const initialState = {
    user: null,
    userCredentialsData: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
    jwt: null,
    ...loadUserFromLocalStorage()
};

const authReducer = createSlice({
    name:'auth',
    // initialState,
    initialState: { ...initialState, ...loadUserFromLocalStorage() },
    reducers:{
        logout(state){
            state.user=null;
            state.isAuthenticated=false;
            state.jwt = null;
            localStorage.removeItem('user')
        },
        userCredentials:(state,action)=>{
            state.userCredentialsData=action.payload
        },
        resetError:(state)=>{
            state.error=null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isAuthenticated=false;
            state.user=action.payload;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        })


        .addCase(registerUserverify.pending,(state)=>{
            state.isLoading=true;
        })

        .addCase(registerUserverify.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.jwt = action.payload.token;
            localStorage.setItem("user", JSON.stringify(action.payload));
            // setLogoutTimer(action.asyncThunk.dispatch, action.payload.token);
        })
        .addCase(registerUserverify.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        })

        
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isAuthenticated=false;
            state.user=action.payload;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        })
        
        .addCase(loginUserverify.pending,(state)=>{
            state.isLoading=true;
        })
       
        .addCase(loginUserverify.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.jwt = action.payload.token;
            localStorage.setItem("user", JSON.stringify(action.payload));
            // setLogoutTimer(action.asyncThunk.dispatch, action.payload.token);
        })
        .addCase(loginUserverify.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        })

        
        .addCase(changePassword.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(changePassword.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
        })
        .addCase(changePassword.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        })
        
        .addCase(changePasswordOTPverify.pending,(state)=>{
            state.isLoading=true;
        })
       
        .addCase(changePasswordOTPverify.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user=null;
            state.isAuthenticated=false;
        })
        .addCase(changePasswordOTPverify.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        })
    }
})

export const {logout,userCredentials,resetError}=authReducer.actions;
export default authReducer.reducer;