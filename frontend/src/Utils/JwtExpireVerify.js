import {jwtDecode} from 'jwt-decode';
import { logout } from '../features/auth/authSlice';

const setLogoutTimer = (dispatch, token) => {
    if (token) {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const timeLeft = expirationTime - currentTime;

        if (timeLeft > 0) {
            setTimeout(() => {
                dispatch(logout());
            }, timeLeft);
        } else {
            dispatch(logout());
        }
    }
};

export default setLogoutTimer;