import ChoicesActionTypes from './choices.types';

export const fetchClientsStart = () => ({
    type: ChoicesActionTypes.FETCH_CLIENTS_START
});

export const fetchClientsSuccess = (payload) => ({
    type: ChoicesActionTypes.FETCH_CLIENTS_SUCCESS,
    payload
});
