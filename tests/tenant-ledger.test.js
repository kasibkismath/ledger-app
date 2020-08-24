const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const app = require('../app');

const weeklyData = require('./mocks/happy/weekly-tenant-ledger.json');
const fortnightlyData = require('./mocks/happy/fortnightly-tenant-ledger.json');
const monthlyData = require('./mocks/happy/monthly-tenant-ledger.json');

const startDateRequiredValidationJSON = require('./mocks/unhappy/start-date-required-validation.json');
const endDateRequiredValidationJSON = require('./mocks/unhappy/end-date-required-validation.json');
const startDateISOValidationJSON = require('./mocks/unhappy/start-date-iso-validation.json');
const endDateISOValidationJSON = require('./mocks/unhappy/end-date-iso-validation.json');

chai.use(chaiHttp);

describe('Preparing tenant ledger test cases', function() {
    describe('GET /api/lease/ledger VALIDATIONS', function() {
        it('Required start_date validation', (done) => {
            chai.request(app)
            .get('/api/lease/ledger')
            .query({
             end_date: "2020-05-27T07:23:31.066Z", 
             frequency: "WEEKLY", 
             weekly_rent: 555, 
             timezone: "Australia/Melbourne"})
            .end((err, res) => {
                expect(res.status).equals(400);
                expect(res.body).to.be.deep.equal(startDateRequiredValidationJSON);
                done();
            });
        });

        it('start_date ISO format validation', (done) => {
            chai.request(app)
            .get('/api/lease/ledger')
            .query({start_date: "2020-03-28 12:23:31",
             end_date: "2020-05-27T07:23:31.066Z", 
             frequency: "WEEKLY", 
             weekly_rent: 555, 
             timezone: "Australia/Melbourne"})
            .end((err, res) => {
                expect(res.status).equals(400);
                expect(res.body).to.be.deep.equal(startDateISOValidationJSON);
                done();
            });
        });

        it('Required end_date validation', (done) => {
            chai.request(app)
            .get('/api/lease/ledger')
            .query({
                start_date: "2020-03-28T12:23:31.066Z",
                frequency: "WEEKLY", 
                weekly_rent: 555, 
                timezone: "Australia/Melbourne"})
            .end((err, res) => {
                expect(res.status).equals(400);
                expect(res.body).to.be.deep.equal(endDateRequiredValidationJSON);
                done();
            });
        });
        it('end_date ISO format validation', (done) => {
            chai.request(app)
            .get('/api/lease/ledger')
            .query({start_date: "2020-03-28T07:23:31.066Z",
             end_date: "2020-05-27T07:23:31.066", 
             frequency: "WEEKLY", 
             weekly_rent: 555, 
             timezone: "Australia/Melbourne"})
            .end((err, res) => {
                expect(res.status).equals(400);
                expect(res.body).to.be.deep.equal(endDateISOValidationJSON);
                done();
            });
        });
    });

    describe('GET /api/lease/ledger', function() {
        it('Fetch weekly ledger details', (done) => {
            chai.request(app)
            .get('/api/lease/ledger')
            .query({start_date: "2020-03-28T12:23:31.066Z",
             end_date: "2020-05-27T07:23:31.066Z", 
             frequency: "WEEKLY", 
             weekly_rent: 555, 
             timezone: "Australia/Melbourne"})
            .end((err, res) => {
                expect(res.status).equals(200);
                expect(res.body).to.be.deep.equal(weeklyData);
                done();
            });
        });

        it('Fetch fortnightly ledger details', (done) => {
            chai.request(app)
            .get('/api/lease/ledger')
            .query({start_date: "2020-03-28T12:23:31.066Z",
             end_date: "2020-05-27T07:23:31.066Z", 
             frequency: "FORTNIGHTLY", 
             weekly_rent: 555, 
             timezone: "Australia/Melbourne"})
            .end((err, res) => {
                expect(res.status).equals(200);
                expect(res.body).to.be.deep.equal(fortnightlyData);
                done();
            });
        });

        it('Fetch monthly ledger details', (done) => {
            chai.request(app)
            .get('/api/lease/ledger')
            .query({start_date: "2020-03-28T12:23:31.066Z",
             end_date: "2020-05-27T07:23:31.066Z", 
             frequency: "MONTHLY", 
             weekly_rent: 555, 
             timezone: "Australia/Melbourne"})
            .end((err, res) => {
                expect(res.status).equals(200);
                expect(res.body).to.be.deep.equal(monthlyData);
                done();
            });
        });
    });
});