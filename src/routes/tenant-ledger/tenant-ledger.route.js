module.exports = (app) => {
    const tenantLeadgerCtrl = require("../../controllers/tenant-ledger/tenant-ledger.controller");

    app.route("/api/lease/ledger").get(tenantLeadgerCtrl.getLeaseLeadger);
};
