// eslint-disable-next-line no-unused-vars
var app = require('../../app'); 
let Dishes = require('../../models/dish');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));
describe('Dish', function (){
    beforeEach(function(done){  
        var dishes = new Dishes({
            name:'chicken & mushroom soup', 
            category : 'soup', 
            description : 'chicken breast,mushroom,egg,garlic,onions',
            price: 8
        });
        // eslint-disable-next-line no-unused-vars
        dishes.save(function(err){
            done();
        });
    });
    describe('GET /dishes',  () => {
        it('should return all dishes in an array', function(done) {
            chai.request(server)
                .get('/dishes')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
             //       expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (dish) => {
                        return { name: dish.name,
                            price: dish.price }; 
                    });
                    expect(result).to.include( { name:'chicken & mushroom soup', price: 8 } );
                    done();
                });
        });
        after(function (done) {
            Dishes.collection.drop();
            done();
        });
    });
    describe('GET /dishes/:id', function () {
        it('should return the dish by id', function(done) {
            chai.request(server)
                .get('/dishes')
                .end(function(err, res) {
                    const dishId = res.body[0]._id;
                    chai.request(server)
                        .get('/dishes/' + dishId)
                        .end(function(err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body.name).to.eql('chicken & mushroom soup');
                            done();
                        });
                });
        });
        after(function (done) {
            Dishes.collection.drop();
            done();
        });
    });
    describe('POST /dishes', function () {
        describe('when the posted dish is invalid', function() {
            it('should return error', function(done) {
                let dish = { 
                    price: 19
                };
                chai.request(server)
                    .post('/dishes')
                    .send(dish)
                    .end(function(err, res) {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            after(function (done) {
                Dishes.collection.drop();
                done();
            });
        });
        describe('when the posted dish is valid', function() {
            it('should add one dish successfully', function(done) {
                let dish = { 
                    name: 'Crispy Crab Meat Roll' , 
                    category:'starter',
                    description: 'spicy imitation crab paired with fresh avocado and cucumber', 
                    price: 6
                };
                chai.request(server)
                    .post('/dishes')
                    .send(dish)
                    .end(function(err, res) { 
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            after(function  (done) {
                chai.request(server)
                    .get('/dishes')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body.length).to.equal(2);
                        let result = _.map(res.body, (dish) => {
                            return { name: dish.name,
                                price: dish.price }; 
                        });
                        expect(result).to.include[{ name:'Crispy Crab Meat Roll', price: 6 } ];
                        Dishes.collection.drop();
                        done();
                    });
            }); 
        });
    });
    describe('DELETE /dishes/:id', function () {
        it('should return true and the dish deleted ', function(done) {
            chai.request(server)
                .get('/dishes')
                .end(function(err, res) {
                    const dishId = res.body[0]._id;
                    chai.request(server)
                        .delete('/dishes/'+dishId)
                        .end(function(err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.equal(true); 
                            done();
                        });
                }); 
        }); 
        after(function  (done) {
            chai.request(server)
                .get('/dishes')
                .end(function(err, res) {
                    expect(res.body).to.be.a('array');
                //  expect(res.body.length).to.equal(0);
                    expect(res).to.have.status(200);
                    let result = _.map(res.body, (dish) => {
                        return { name: dish.name,
                            price: dish.price }; 
                    });
                    expect(result).to.not.include( {name:'chicken & mushroom soup', price: 8 } );
                    done();
                });
        }); 
    });
    describe('PUT /dishes/:id', function () {
        describe('when id is invalid', function () {
            it('should return error', function(done) {
                let dish = { 
                    price: 19
                };
                chai.request(server)
                    .put('/dishes/wrong_id')
                    .send(dish)
                    .end(function(err, res) {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            after(function (done) {
                Dishes.collection.drop();
                done();
            });
        });
        describe('when id is valid', function () {
            it('should update the dish successfully', function(done) {
                let dish = { 
                    price: 18
                };
                chai.request(server)
                    .get('/dishes')
                    .end(function(err, res){
                        const dishId = res.body[0]._id;
                        chai.request(server)
                            .put('/dishes/' + dishId)
                            .send(dish)
                            .end(function(err, res) {
                                expect(res).to.have.status(200);
                                expect(res.body).to.include( { name:'chicken & mushroom soup',  price: 18 } );
                                done();
                            });
                    });
            });
            after(function  (done) {
                Dishes.collection.drop();
                done();
            });
        }); 
    });

    describe('search',function(){
        it('should return the dishes when the have key words in dish name  ', function(done) { 
            chai.request(server)
                .get('/dish-search/name/so')
                .end(function(err, res) {
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    expect(res).to.have.status(200);
                    let result = _.map(res.body, (dish) => {
                        return { name: dish.name,
                            price: dish.price }; 
                    });
                    expect(result).to.include[ {name:'chicken & mushroom soup', price: 8 } ];
                    done();
                });
        });
        after(function  (done) {
            Dishes.collection.drop();
            done();
        });
    });
});