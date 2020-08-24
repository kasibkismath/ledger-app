const express = require('express');
const request = require('supertest');
const expect = require('chai').expect;

const tenantLeadgerCtrl = require('../app/controllers/tenant-ledger/tenant-ledger.controller');

const weeklyData = require('./mocks/weekly-tenant-ledger.json');

describe('Executing cash in hand test cases', function() {
    let cashInHand;

    before(function(done) {
        this.cashInHand = 50;
        done();
    });

    it('Check more cash in hand', function(done) {
        const shirtPrice = 20;
        const shoePrice = 20;

        if(shirtPrice + shoePrice > cashInHand) {
            expect(this.cashInHand).lessThan(shirtPrice + shoePrice);
        } else {
            done();
        }
    });

    it('Check less cash in hand', function(done) {
        const shirtPrice = 40;
        const shoePrice = 20;

        if(shirtPrice + shoePrice > cashInHand) {
            expect(this.cashInHand).lessThan(shirtPrice + shoePrice);
        } else {
            done();
        }
    });
});

describe('Preparing tenant ledger test cases', function() {
    function initServer() {
        let server = express();

        const router = express.Router();
        router.route('/api/lease/ledger').get(function(req, res) {
            return res.send(res.body);
        });

        server.use(router);

        return server;
    }

    describe('Executing tenant ledger test cases', function() {
        let app;
        let listen;

        before(function(done) {
            app = initServer();
            listen = app.listen(4000, function(err) {
                if(err) {
                    return done(err);
                }
                done();
            });
        });

        it('Check weekly ledger details', async() => {
            await
            request(app)
            .get('/api/lease/ledger')
            .query({
                    start_date: "2020-03-28T12:23:31.066Z",
                    end_date: "2020-05-27T07:23:31.066Z",
                    frequency: "WEEKLY",
                    weekly_rent: 555,
                    timezone: "Australia/Melbourne"
                })
            .expect(200, function(err, res) {
                console.log(err);
                expect(res.body).to.equal(weeklyData);
            });
        });

        after(done => {
            listen.close(done);
        });
    });
});