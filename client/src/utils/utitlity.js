export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const clearFormState = () => {
    const obj = {
        clientName: '',
        currentDesignation: '',
        candidateName: '',
        education: '',
        skills: [],
        currentCompany: '',
        totalExperience: '',
        relevantExperience: '',
        phoneNumber: '',
        area: '',
        city: '',
        state: '',
        email: '',
        currentCTC: '',
        expectedCTC: '',
        noticePeriod: '',
        status: '',
        joinStatus: '',
        dob: '',
        changeReason: '',
        interviewStatus: ''
    };
    return obj;
};
