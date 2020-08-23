const tenantLeaseService = require('../../services/tenant-ledger/tenant-ledger.service');

exports.getLeaseLeadger = (req, res) => {
    try {
        const params = req.query;
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
                leadger_data: tenantLeadgerData,
            });
        } else {
            res.status(200).send([]);
        }
    } catch (err) {
        res.status(500).send(err);
    }
};