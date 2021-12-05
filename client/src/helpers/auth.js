import { setCookie, getCoookie } from "./cookies";
import { setLocalStorage, getLocalStorage } from "./localStorage"

export const setAuthentication = (token, user) => {
    setCookie('token', token);
    setLocalStorage('user', user);

};

// user from local storage & cookie 
export const isAuthenticated = () => {
    if (getCoookie('token') && getLocalStorage('user')) {
        return getLocalStorage('user');
    } else {
        return false;
    }
};