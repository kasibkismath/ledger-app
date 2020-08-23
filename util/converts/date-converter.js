const moment = require("moment");
const momentTimezone = require("moment-timezone");

const dateTimeFormat = "YYYY-MM-DD";
const isoDateFormat = "YYYY-M-DTH:m:s.SSSZ";

exports.isoToTimezoneDateConverter = (isoDate, timezone) => {
    const isISODateValid = moment(isoDate, isoDateFormat, true).isValid();
    if (!isISODateValid) {
        console.log("Invalid fully qualified ISO date fromat : " + isoDate);
        return;
    }
    return moment(isoDate).tz(timezone).format(dateTimeFormat);
};
