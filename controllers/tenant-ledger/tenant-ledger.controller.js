const tenantLeaseService = require('../../services/tenant-ledger/tenant-ledger.service');
const tenantLeadgerRequestValidator = require('../../validators/tenant-ledger-request.validator');

exports.getLeaseLeadger = (req, res) => {
    try {
        const params = req.query;

        let validations = tenantLeadgerRequestValidator.tenantRequestValidator(params);

        if(validations) {
            res.status(400).send({
                success: false,
                message: "Failed",
                data: validations,
            });
        } else {
            let tenantLeadgerData = tenantLeaseService.getTenantLeadgerDetails(
                params.start_date,
                params.end_date,
                params.frequency,
                params.weekly_rent,
                params.timezone
            );
            if (tenantLeadgerData) {
                res.status(200).send({
                    success: true,
                    message: "Success",
                    data: tenantLeadgerData,
                });
            } else {
                res.status(200).send([]);
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
};