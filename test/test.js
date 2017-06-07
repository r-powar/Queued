/**
 * Created by rpowar on 5/23/17.
 */
var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

var host = "http://queuedapp.azurewebsites.net";
//var host = "http://localhost:8080";

// List Test
describe('Restaurant List Test', function () {
    this.timeout(15000);
    var requestResult;
    var response;

    before(function (done) {
        chai.request(host)
            .get("/queued/restaurantList")
            .end(function (err, res) {
                requestResult = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should return an array object with more than 1 object', function (){
        expect(response).to.have.status(200);
        expect(response.body).to.be.an.object;
        expect(response.body).to.have.length.above(1);
        expect(response).to.have.headers;
    });

    it('The first entry in the array has known properties', function(){
        expect(requestResult[0]).to.include.keys('name');
        expect(requestResult[0]).to.have.property('id');
        expect(response.body).to.not.be.a.string;
    });

    it('The elements in the array have the expected properties', function(){
        expect(response.body).to.satisfy(
            function (body) {
                for (var i = 0; i < body.length; i++) {
                    expect(body[i]).to.have.property('name').that.is.a('string');
                    expect(body[i]).to.have.property('address').that.is.a('string');
                    expect(body[i]).to.have.property('city').that.is.a('string');
                    expect(body[i]).to.have.property('state').that.is.a('string');
                    expect(body[i]).to.have.property('phone').that.is.a('string');
                    expect(body[i]).to.have.property('budget').that.is.a('string');
                    expect(body[i]).to.have.property('cuisine').that.is.a('string');
                    expect(body[i]).to.have.property('lowWait').that.is.a('number');
                    expect(body[i]).to.have.property('highWait').that.is.a('number');
                    expect(body[i]).to.have.property('imageURL').that.is.a('string');
                }
                return true;
            });
    });


});

// Search Test
describe('Restaurant Search Test', function () {
    this.timeout(15000);
    var requestResult;
    var response;
    var searchTerms = '?city=Seattle&state=WA&cuisine=Chinese&budget=$10-30&wait=100';

    before(function (done) {
        chai.request(host)
            .get('/queued/restaurantList/search' + searchTerms)
            .end(function (err, res) {
                requestResult = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Returns an array object with at least 1 result', function (){
        expect(response).to.have.status(200);
        expect(response.body).to.be.an.object;
        expect(response.body).to.have.length.above(0);
        expect(response).to.have.headers;
    });

    it('First returned result has expected properties', function(){
        expect(requestResult[0]).to.include.keys('id');
        expect(requestResult[0]).to.have.property('name').that.is.a('string');
        expect(requestResult[0]).to.have.property('address').that.is.a('string');
        expect(requestResult[0]).to.have.property('city').that.is.a('string');
        expect(requestResult[0]).to.have.property('state').that.is.a('string');
        expect(requestResult[0]).to.have.property('phone').that.is.a('string');
        expect(requestResult[0]).to.have.property('budget').that.is.a('string');
        expect(requestResult[0]).to.have.property('cuisine').that.is.a('string');
        expect(requestResult[0]).to.have.property('lowWait').that.is.a('number');
        expect(requestResult[0]).to.have.property('highWait').that.is.a('number');
        expect(requestResult[0]).to.have.property('imageURL').that.is.a('string');
        expect(response.body).to.not.be.a.string;
    });

    it('All returned results match search terms', function(){
        expect(response.body).to.have.length.above(0);
        expect(response.body).to.satisfy(
            function (body) {
                for (var i = 0; i < body.length; i++) {
                    expect(body[i]).to.have.property('city').eql('Seattle');
                    expect(body[i]).to.have.property('state').eql('WA');
                    expect(body[i]).to.have.property('budget').eql('$10-30');
                    expect(body[i]).to.have.property('cuisine').eql('Chinese');
                    expect(body[i]).to.have.property('highWait').to.not.be.above(100);
                }
                return true;
            });
    });
});

// Post Test
describe('Restaurant Post Test', function(){
    this.timeout(15000);
    var response;
    var data = {
        user: "Guy Personman",
        lowWait: 34,
        highWait: 54
    };
    before(function (done) {
        chai.request(host)
            .post("/queued/restaurantList")
            .send(data)
            .end(function (err, res) {
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Post is successful', function(){
        expect(response).to.have.status(200);
        expect(response.body).to.be.an.object;
    });

    it('Response contains expected properties', function(){
        expect(response.body).to.have.property('owner').that.is.a('string');
        expect(response.body).to.have.property('lowWait').that.is.a('number');
        expect(response.body).to.have.property('highWait').that.is.a('number');
    });

    it('Response properties match submitted values', function(){
        expect(response.body).to.have.property('owner').eql(data.user);
        expect(response.body).to.have.property('lowWait').eql(data.lowWait);
        expect(response.body).to.have.property('highWait').eql(data.highWait);
    });
});

describe('Provider Guest List', function(){
    this.timeout(15000);
    var requestResult;
    var response;
    var search = 'Raj Powar';

    before(function (done) {
        chai.request(host)
            .get("/queued/restaurantList/" + search)
            .end(function (err, res) {
                requestResult = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Get is successful', function (){
        expect(response).to.have.status(200);
        expect(response.body).to.be.an.object;
        expect(response).to.have.headers;
    });

    it('The elements in the array have the expected properties', function(){
        expect(response.body).to.satisfy(
            function (body) {
                for (var i = 0; i < body.length; i++) {
                    expect(body[i]).to.have.property('guestName').that.is.a('string');
                    expect(body[i]).to.have.property('waitList').that.is.a('string');
                    expect(body[i]).to.have.property('groupSize').that.is.a('string');
                    expect(body[i]).to.have.property('userId').that.is.a('string');

                }
                return true;
            });
    });



});