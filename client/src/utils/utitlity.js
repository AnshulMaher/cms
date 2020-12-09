export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const validateNumber = (number) => {
    let num = number.replace(/\s/g, '');
    if (num.length > 10) num = num.slice(-10);
    return parseInt(num);
};

export const validateCTC = (ctc) => {
    let pattern = /^[0-9]{1,2}?(\.[0-9][0-9]?)?(lpa|k)$/i;
    return pattern.test(ctc);
};

export const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    mm = mm < 10 ? `0${mm}` : mm;
    dd = dd < 10 ? `0${dd}` : dd;
    return `${d.getFullYear()}-${mm}-${dd}`;
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
