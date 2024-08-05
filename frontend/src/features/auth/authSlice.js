import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
//actions 
export const registerUser=createAsyncThunk('registerUser',async(userData,thunkAPI)=>{
    try {
        const response= await axios.post("http://localhost:5001/auth/register",userData);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const registerUserverify=createAsyncThunk('registerUserverify',async(userData,thunkAPI)=>{
    try {
        const response= await axios.post("http://localhost:5001/auth/verify-otp-register",userData);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


export const loginUser=createAsyncThunk('loginUser',async(userData,thunkAPI)=>{
    try {
        const response= await axios.post("http://localhost:5001/auth/login",userData);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const loginUserverify=createAsyncThunk('loginUserverify',async(userData,thunkAPI)=>{
    try {
        const response= await axios.post("http://localhost:5001/auth/verify-otp-login",userData);
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
        })
        .addCase(loginUserverify.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        })
    }
})

export const {logout,userCredentials,resetError}=authReducer.actions;
export default authReducer.reducer;