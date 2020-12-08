import axios from 'axios';
import catchAsyncError from './catchAsyncError';
axios.defaults.withCredentials = true;

const API = `/api/v1`;

export const isLoggedIn = catchAsyncError(() => {
    return axios.get(`${API}/users/isLoggedIn`);
});
export const signIn = catchAsyncError((useraCredentials) => {
    return axios.post(`${API}/users/login`, useraCredentials);
});
export const signUp = catchAsyncError((useraCredentials) => {
    return axios.post(`${API}/users/signup`, useraCredentials);
});
export const logOut = catchAsyncError(() => {
    return axios.get(`${API}/users/logout`);
});
export const getCandidateByEmail = catchAsyncError((email) => {
    return axios.get(`${API}/candidate/${email}`);
});
export const createNewCandidate = catchAsyncError((candidateData) => {
    return axios.post(`${API}/candidate`, candidateData);
});
export const updateCandidate = catchAsyncError((candidateData) => {
    delete candidateData.__v;
    return axios.put(`${API}/candidate/${candidateData._id}`, candidateData);
});
export const deleteCandidate = catchAsyncError((_id) => {
    return axios.delete(`${API}/candidate/${_id}`);
});
export const forgotPassword = catchAsyncError((email) => {
    return axios.post(`${API}/users/forgotPassword`, email);
});
export const resetPassword = catchAsyncError((resetToken, newPasswords) => {
    return axios.patch(`${API}/users/resetPassword/${resetToken}`, newPasswords);
});
