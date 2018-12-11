// eslint-disable-next-line no-unused-vars 
var app = require('../../app'); 
let Orders = require('../../models/order');
let Users = require('../../models/user');
let Dishes = require('../../models/dish');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
// eslint-disable-next-line no-unused-vars 
let _ = require('lodash');
chai.use(require('chai-things'));
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMzQ1NkBnbWFpbC5pZSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1NDEyMzg4MTZ9.sxkDtrXmml4b_qrie9MSoigsQ9sDR8-ZJI_vOvDd4W4';


describe('Order', function () {
    before(function (done) {
        var users = new Users({
            email: '12345@gmail.ie',
            password: '12345'
        });
        // eslint-disable-next-line no-unused-vars 
        users.save(function (err) {
            var dishes = new Dishes({
                name: 'chicken & mushroom soup',
                category: 'soup',
                description: 'chicken breast,mushroom,egg,garlic,onions',
                price: 8
            });
            // eslint-disable-next-line no-unused-vars 
            dishes.save(function (err) {
                done();
            });
        });
    });
    // describe('when it has no permission', function () {
    //     it('should return a message', function (done) {
    //         chai.request(server)
    //             .get('/orders')
    //             .end((err, res) => {
    //                 console.log('>>>>>>>>>>',res.body);
    //                 expect(res).to.have.status(200);
    //                 expect(res.body).to.equal("Token not provided");
    //                 done();
    //             });
    //     });
    // });
    describe('when it has permission', function () {
        beforeEach(function (done) {
            Users.find({}, function (err, users) {
                Dishes.find({}, function (err, dishes) {
                    var orders = new Orders({
                        customer: users[0]._id,
                        dishes: [
                            {
                                dish: dishes[0]._id,
                                quantity: 1
                            }
                        ]
                    });
                    // eslint-disable-next-line no-unused-vars 
                    orders.save(function (err, order) {
                        done();
                    });
                });
            });
        });
        describe('GET /orders', () => {
            it('should return all orders in an array', function (done) {
                chai.request(server)
                    .get('/orders')
                    .set('Authorization', token)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body.length).to.equal(1);
                        done();
                    });
            });
            after(function (done) {
                Orders.collection.drop();
                done();
            });
        });
        describe('POST/orders', () => {
            it('should add one order successfully', function (done) {
                Users.find({}, function (err, users) {
                    Dishes.find({}, function (err, dishes) {
                        var order = {
                            customer: users[0]._id,
                            dishes: [
                                {
                                    dish: dishes[0]._id,
                                    quantity: 2
                                }
                            ]
                        };
                        chai.request(server)
                            .post('/orders')
                            .set('Authorization', token)
                            .send(order)
                            .end((err, res) => {
                                expect(res).to.have.status(200);
                                done();
                            });
                    });
                });
            });
            after(function (done) {
                chai.request(server)
                    .get('/orders')
                    .set('Authorization', token)
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body.length).to.equal(2);
                        Orders.collection.drop();
                        done();
                    });
            });
        });  
        describe('DELETE/orders/:id', function () {
            it('should return true and the order deleted', function (done) {
                chai.request(server)
                    .get('/orders')
                    .set('Authorization', token)
                    .end(function(err, res) {
                        const orderId = res.body[0].dishDetails._id;
                        chai.request(server)
                            .delete('/orders/'+ orderId)
                            .set('Authorization', token)
                            .end(function(err, res) {
                                expect(res).to.have.status(200);
                                expect(res.body).to.equal(true);
                                done();
                            });
                    }); 
            }); 
            after(function  (done) {
                chai.request(server)
                    .get('/orders')
                    .set('Authorization', token)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                     //   expect(res.body.length).to.equal(0);
                        done();
                    });
            }); 
        });
        describe('GET /orders/:id', function () {
            it('should return the order by id', function(done) {
                chai.request(server)
                    .get('/orders')
                    .set('Authorization', token)
                    .end(function(err, res) {
                        const orderId = res.body[0].dishDetails._id;
                        chai.request(server)
                            .get('/orders/' + orderId)
                            .set('Authorization', token)
                            .end(function(err, res) {
                                expect(res).to.have.status(200);
                                done();
                            });
                    });
            });
            after(function (done) {
                Orders.collection.drop();
                done();
            });
        });
        describe('PUT /orders/:id', function () {
            it('should update the order information successfully', function(done) {
                var order = {
                    dishes: [
                        { 
                            quantity: 2
                        }
                    ]
                };
                chai.request(server)
                    .get('/orders')
                    .set('Authorization', token)
                    .end(function(err, res){
                        const orderId = res.body[0].dishDetails._id;
                        chai.request(server)
                            .put('/orders/' + orderId)
                            .send(order)
                            .set('Authorization', token)
                            .end(function(err, res) {
                                expect(res).to.have.status(200);
                                done();
                            });
                    });
            });
            after(function (done) {
                Orders.collection.drop();
                done();
            });
        });
    });
    after(function (done) {
        Users.collection.drop();
        Dishes.collection.drop();
        done();
    });
});













