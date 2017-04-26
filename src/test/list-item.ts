//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import * as mongoose from 'mongoose';
let ListItem = require('../models/list-item');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('ListItems', () => {
    beforeEach((done) => { //Before each test we empty the database
        ListItem.remove({}, (err) => { 
           done();         
        });     
    });
/*
  * Test the /GET route
  */
  describe('/GET list-item', () => {
      it('it should GET all the list items', (done) => {
        chai.request(server)
            .get('/list-item')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });


/*
  * Test the /POST route
  */
  describe('/POST list-item', () => {
      it('it should not POST a list item without itemName field', (done) => {
        let item = {
            price: 3.40,
            quantity: 1
        }
        chai.request(server)
            .post('/list-item')
            .send(item)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('itemName');
                res.body.errors.itemName.should.have.property('kind').eql('required');
              done();
            });
      });

  });
  
});