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

describe('Restaurant List Result', function () {
    var requestResult;
    var response;

    before(function (done) {
        chai.request("http://localhost:8080")
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
        expect(response.body).to.have.length.above(2);
        expect(response).to.have.headers;
    });

    it('The elements in the array have the expecte properties', function(){
        expect(response.body).to.satisfy(
            function (body) {
                for (var i = 0; i < body.length; i++) {
                    expect(body[i]).to.have.property('name');
                    expect(body[i]).to.have.property('address');
                    expect(body[i]).to.have.property('city');
                    expect(body[i]).to.have.property('state');
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