import axios from 'axios';
import catchAsyncError from './catchAsyncError';
axios.defaults.withCredentials = true;

// const API = `http://localhost:8000/api/v1`;

export const isLoggedIn = catchAsyncError(() => {
    return axios.get(`/users/isLoggedIn`);
});
export const signIn = catchAsyncError((useraCredentials) => {
    return axios.post(`/users/login`, useraCredentials);
});
export const signUp = catchAsyncError((useraCredentials) => {
    return axios.post(`/users/signup`, useraCredentials);
});
export const logOut = catchAsyncError(() => {
    return axios.get(`/users/logout`);
});
export const getCandidateByEmail = catchAsyncError((email) => {
    return axios.get(`/candidate/${email}`);
});
export const createNewCandidate = catchAsyncError((candidateData) => {
    return axios.post(`/candidate`, candidateData);
});
export const updateCandidate = catchAsyncError((candidateData) => {
    delete candidateData.__v;
    return axios.put(`/candidate/${candidateData._id}`, candidateData);
});
export const forgotPassword = catchAsyncError((email) => {
    return axios.post(`/users/forgotPassword`, email);
});
export const resetPassword = catchAsyncError((resetToken, newPasswords) => {
    return axios.patch(`/users/resetPassword/${resetToken}`, newPasswords);
});
