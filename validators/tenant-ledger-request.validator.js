const moment = require("moment");
const frequency = require('../util/enums/frequency.enum');

exports.tenantRequestValidator = (params) => {
    let errorsResp = {};
    let validations = [];

    if(params && !params.start_date) {
        let validationReq = {};
        validationReq.key = "start_date";
        validationReq.message = "start_date is required";
        validations.push(validationReq);
    } else if(params && !params.end_date) {
        let validationReq = {};
        validationReq.key = "end_date";
        validationReq.message = "end_date is required";
        validations.push(validationReq);
    } else if(params && !params.frequency) {
        let validationReq = {};
        validationReq.key = "frequency";
        validationReq.message = "frequency is required";
        validations.push(validationReq);
    } else if(params && !params.weekly_rent) {
        let validationReq = {};
        validationReq.key = "weekly_rent";
        validationReq.message = "weekly_rent is required";
        validations.push(validationReq);
    } else if(params && !params.timezone) {
        let validationReq = {};
        validationReq.key = "timezone";
        validationReq.message = "timezone is required";
        validations.push(validationReq);
    } else if(params && params.start_date) {
        let error = this.isoDateFormatValidator(params.start_date, "start_date");
        if(error) {
            validations.push(error);
        } else if(params && params.end_date) {
            let error = this.isoDateFormatValidator(params.end_date, "end_date");
            if(error) {
                validations.push(error);
            } else {
                return null;
            }
        } else {
            return null;
        }
    } else {
        return null;
    }

    errorsResp.errors = validations;
    return errorsResp;
}

exports.isoDateFormatValidator = (isoDate, key) => {
    if (!this.isISODateFormatValid(isoDate)) {
        let res = {};
        res.key = `${key}`;
        res.message = `Invalid fully qualified ISO date fromat given for ${key}`;
        return res;
    }
    return null;
}

const isoDateFormat = "YYYY-M-DTH:m:s.SSSZ";

exports.isISODateFormatValid = (isoDate) => {
    return moment(isoDate, isoDateFormat, true).isValid();
}

exports.frequencyValidator = (freq) => {
    if(!this.isValidFrequency(freq)) {
        let res = {};
        res.key = freq;
        res.message = `${freq} is not a valid frequency`;
        return res;
    }
    return null;
}

exports.isValidFrequency = (freq) => {
    if(freq.toLowerCase() != frequency.WEEKLY || freq.toLowerCase() != frequency.FORTNIGHTLY || freq.toLowerCase() != frequency.MONTHLY) {
        return false;
    }
}