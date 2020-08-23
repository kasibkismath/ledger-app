const moment = require("moment");
const momentTimezone = require("moment-timezone");

const dateTimeFormat = "YYYY-MM-DD";

exports.isoToTimezoneDateConverter = (isoDate, timezone) => {
    return moment(isoDate).tz(timezone).format(dateTimeFormat);
};
