const moment = require("moment");

const dateConverter = require("../../util/converters/date-converter");
const frequency = require("../../util/enums/frequency.enum");

exports.getTenantLeadgerDetails = (
    startDateISO,
    endDateISO,
    frequency,
    weeklyRent,
    timezone
) => {
    return this.calculateDateRangesByFrequency(
        dateConverter.isoToTimezoneDateConverter(startDateISO, timezone),
        dateConverter.isoToTimezoneDateConverter(endDateISO, timezone),
        frequency,
        weeklyRent
    );
};

exports.calculateDateRangesByFrequency = (
    leadgerStartDate,
    leadgerEndDate,
    freq,
    weeklyRent
) => {
    if (moment(leadgerEndDate).isSameOrBefore(moment(leadgerStartDate))) {
        console.log(
            "Validation Error -> TenantLeadgerService::calculateDateRangesByFrequency - End date should be on the same day or after the start date"
        );
        return;
    }
    return this.splitByWeek(leadgerStartDate, leadgerEndDate, weeklyRent, freq);
};

exports.splitByWeek = (startDate, endDate, weeklyRent, freq) => {
    let leadgerDetails = [];

    let leadgerStartDate = moment(startDate);
    let leadgerEndDate = moment(endDate);
    let totalDays = moment
        .duration(leadgerEndDate.diff(leadgerStartDate))
        .asDays();

    let count = 0;
    let start = leadgerStartDate.clone();

    while (count < totalDays) {
        let lineItem = {};
        let amount = 0;
        let diffDays = 0;

        let lineItemStartDate = start;
        let lineItemEndDate;

        if (freq && freq.toLowerCase() === frequency.WEEKLY) {
            lineItemEndDate = moment(lineItemStartDate.clone())
                .add(1, "weeks")
                .subtract(1, "days");
            amount = weeklyRent * 1;
        } else if (freq && freq.toLowerCase() === frequency.FORTNIGHTLY) {
            lineItemEndDate = moment(lineItemStartDate.clone())
                .add(2, "weeks")
                .subtract(1, "days");
            amount = weeklyRent * 2;
        } else if (freq && freq.toLowerCase() === frequency.MONTHLY) {
            lineItemEndDate = moment(lineItemStartDate.clone())
                .add(1, "months")
                .subtract(1, "days");
            amount = weeklyRent * 4;
        }

        if (lineItemEndDate.isSameOrBefore(leadgerEndDate)) {
            diffDays =
                moment.duration(lineItemEndDate.diff(lineItemStartDate)).asDays() + 1;
        } else {
            let noOfDays = moment
                .duration(leadgerEndDate.diff(lineItemStartDate))
                .asDays();
            diffDays = noOfDays;
            amount = (weeklyRent / 7) * (noOfDays + 1);
            lineItemEndDate = moment(lineItemStartDate.clone()).add(diffDays, "days");
        }

        const dateOutputFormat = "MMMM Do, YYYY";

        lineItem.startDate = lineItemStartDate.format(dateOutputFormat);
        lineItem.endDate = lineItemEndDate.format(dateOutputFormat);
        lineItem.amount = parseFloat(amount).toFixed(2);

        leadgerDetails.push(lineItem);

        count += diffDays;
        start = lineItemEndDate.add(1, "days");
    }
    return leadgerDetails;
};
