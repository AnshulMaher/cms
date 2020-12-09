import ChoicesActionTypes from './choices.types';

export const fetchClientsSuccess = (payload) => ({
    type: ChoicesActionTypes.FETCH_CLIENTS_SUCCESS,
    payload
});
