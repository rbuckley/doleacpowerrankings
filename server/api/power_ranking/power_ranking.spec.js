'use strict';

/*jshint expr: true*/
var should = require('chai').should();
var app = require('../../app');
var request = require('supertest');
var powerRanking = require('./power_ranking.model');

describe('GET /api/power_rankings', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/power_rankings')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('submit rankings', function() {
   var rankings = null;
   beforeEach(function() {
      rankings = new powerRanking({'league_id': '12345'});
   });
   it ('should allow a submission of a ranking', function(done) {
      request(app)
         .post('/api/power_rankings', rankings)
         .expect(201)
         .end(function(err, res) {
            if (err) return done(err);
            res.body.should.be.equal.to(rankings);
         });
   });
   it('should only accept one submission per owner per period', function(done) {
      
   });

   it('should return an good error when more than one submission per week is made', function(done){});
});

describe('retrieve rankings', function() {
   it('should be able to retrieve all rankings for a period', function(done){});
   it('should be able to retrieve all rankings for an owner', function(done){});
});
