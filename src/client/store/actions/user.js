import axios from 'axios';
import jwt from 'jsonwebtoken';

import { globalMessageReceived, OK_MESSAGE } from './application';
import { JWT_TOKEN_KEY } from '../../common';
import { handleError } from './common';

/*
 * Action Type Constants
 */

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const USER_CREATED = 'USER_CREATED';
export const USER_UPDATED = 'USER_UPDATED';
export const USER_ARTICLES_FETCHED = 'USER_ARTICLES_FETCHED';
export const USER_TRADES_FETCHED = 'USER_TRADES_FETCHED';

/*
 * Action Creators
 */

export const userLoggedIn = (theUser) => ({
    type: USER_LOGGED_IN,
    user: theUser
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const userCreated = (theUser) => ({
    type: USER_CREATED,
    user: theUser
});

export const userUpdated = (theUser) => ({
    type: USER_UPDATED,
    user: theUser
});

export const userArticlesFetched = (theArticles) => ({
    type: USER_ARTICLES_FETCHED,
    articles: theArticles
});

export const userTradesFetched = (theTrades) => ({
    type: USER_TRADES_FETCHED,
    trades: theTrades
});

/*
 * Thunk Actions
 */

export const login = (user) => dispatch =>
    axios.post('/api/users/auth', { user })
        .then(response => onTokenReceived(response.data.token, dispatch, userLoggedIn))
        .catch(err => handleError(err, dispatch));

export const logout = () => dispatch => {
    removeToken(dispatch);
};

export const createUser = (user) => dispatch =>
    axios.post('/api/users', { user })
        .then(response => onTokenReceived(response.data.token, dispatch, userCreated))
        .catch(err => handleError(err, dispatch));

export const updateUser = (user) => dispatch =>
    axios.put(`/api/users/${user._id}`, { user })
        .then(response => onTokenReceived(response.data.token, dispatch, userUpdated))
        .catch(err => handleError(err, dispatch));

export const loadUserArticles = (theUserId) => dispatch =>
    axios.get(`/api/users/${theUserId}/articles`)
        .then(response => dispatch(userArticlesFetched(response.data.articles)))
        .catch(err => handleError(err, dispatch));

export const loadUserTrades = (theUserId) => dispatch =>
    axios.get(`/api/users/${theUserId}/trades`)
        .then(response => dispatch(userTradesFetched(response.data.trades)))
        .catch(err => handleError(err, dispatch));

/*
 * Actions
 */

const onTokenReceived = (token, dispatch, actionCreator) => {
    localStorage.setItem(JWT_TOKEN_KEY, token);
    sessionStorage.setItem(JWT_TOKEN_KEY, token);
    setToken(token, dispatch, actionCreator);
};

export const setToken = (token, dispatch, actionCreator) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const user = jwt.decode(token);
    dispatch(actionCreator(user));
};

export const removeToken = (dispatch) => {
    localStorage.removeItem(JWT_TOKEN_KEY);
    sessionStorage.removeItem(JWT_TOKEN_KEY);
    delete axios.defaults.headers.common['Authorization'];
    dispatch(userLoggedOut());
    dispatch(globalMessageReceived({
        messageText: 'Erfolgreich abgemeldet.',
        messageType: OK_MESSAGE
    }));
};