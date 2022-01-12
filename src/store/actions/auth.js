import instance from '../../axios/axios';
import * as actionTypes from './actionTypes';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            password: password
        };
        instance.post("/login", authData)
            .then(response => {
                console.log('Successful login')
                console.log(response)
                localStorage.setItem('token', response.headers.authorization);
                localStorage.setItem('expirationDate', response.headers.expiresAt);
                localStorage.setItem('username', username);
                dispatch(authSuccess(response.headers.authorization, username));
            })
            .catch(err => {
                console.log('Error: ')
                console.log(err)

                dispatch(authFail(err));
            });
    }
}

const authSuccess = (token, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        console.log("Checked token: " + token)
        if (!token || token === 'undefined') {
            console.log("Checked token logout.")
            dispatch(logout());
        } else {
            const expirationDate = localStorage.getItem('expirationDate')
            if (new Date().getTime() >= expirationDate) {
                dispatch(logout());
            } else {
                const username = localStorage.getItem('username');
                dispatch(authSuccess(token, username));
                dispatch(checkAuthTimeout(expirationDate))
            }
        }
    }
}

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime - new Date().getTime());
    }
}