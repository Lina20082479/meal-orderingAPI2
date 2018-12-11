// eslint-disable-next-line no-unused-vars 
var app = require('../../app'); 
let Users = require('../../models/user');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));
describe('User', function (){
    beforeEach(function(done){  
        var users = new Users({
            email: '12345@gmail.ie',
            password: '12345'
        });
        // eslint-disable-next-line no-unused-vars 
        users.save(function(err){
            done();
        });
    });
    describe('GET /users',  () => {
        it('should return all users in an array', function(done) {
            chai.request(server)
                .get('/users')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (user) => {
                        return { email: user.email,
                            password : user.password };
                    });
                    expect(result).to.include[ {  email:'12345@gmail.ie', password:'12345'} ];
                    done();
                });
        });
        after(function  (done) {
            Users.collection.drop();
            done();
        });
    });
    
    describe('GET /users/:id', function () {
        it('should return the user by id', function(done) {
            chai.request(server)
                .get('/users')
                .end(function(err, res) {
                    const userId = res.body[0]._id;
                    chai.request(server)
                        .get('/users/' + userId)
                        .end(function(err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body.email).to.eql('12345@gmail.ie');
                            done();
                        });
                });
        });
        after(function  (done) {
            Users.collection.drop();
            done();
        });
    });
    describe('POST /users', function () {
        // describe('when posted user is invalid', function () {
        //     it('should return error', function(done) {
        //         let user = { 
        //             email: "12345678@gmail.ie"
        //         };
        //         chai.request(server)
        //         .post('/users')
        //         .send(user)
        //         .end(function(err, res) {
        //             expect(res).to.have.status(404);
        //             done();
        //         });
        //     });
        //     after(function  (done) {
        //         Users.collection.drop();
        //         done();
        //     });
        // });
        describe('when posted user is valid', function () {
            it('should add one user successfully', function(done) {
                let user = { 
                    email:'12345678@gmail.ie',
                    password:'12345678'
                };
                chai.request(server)
                    .post('/users')
                    .send(user)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            after(function  (done) {
                chai.request(server)
                    .get('/users')
                    .end(function(err, res) {
                        expect(res.body).to.be.a('array');
              //          expect(res.body.length).to.equal(2);
                        let result = _.map(res.body, (user) => {
                            return { email: user.email ,
                                password:user.password};
                        });
                        expect(result).to.include[ { email:'12345678@gmail.ie', password:'12345678'} ];
                        Users.collection.drop();
                        done();
                    });
            }); 
        });
    });
    describe('DELETE /users/:id', function () {
        it('should return true and the user deleted ', function(done) {
            chai.request(server)
                .get('/users')
                .end(function(err, res) {
                    const userId = res.body[0]._id;
                    chai.request(server)
                        .delete('/users/' + userId )
                        .end(function(err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.equal(true); 
                            done();
                        }); 
                }); 
        }); 
        after(function  (done) {
            chai.request(server)
                .get('/users')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
           //         expect(res.body.length).to.equal(0);
                    let result = _.map(res.body, (user) => {
                        return { email: user.email ,
                            password:user.password}; 
                    });
                    expect(result).to.not.include( { email:'12345@gmail.ie', password:'12345' } );
                    done();
                });
        });
    });
    describe('PUT /users/:id', function () {
        describe('when id is invalid', function () {
            it('should return error', function(done) {
                let user = { 
                    password: 123456
                };
                chai.request(server)
                    .put('/users/wrong_id')
                    .send(user)
                    .end(function(err, res) {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            after(function  (done) {
                Users.collection.drop();
                done();
            });
        });
        describe('when id is valid', function () {
            it('should update the user information successfully', function(done) {
                let user = { 
                    password: 123456
                };
                chai.request(server)
                    .get('/users')
                    .end(function(err, res){
                        const userId = res.body[0]._id;
                        chai.request(server)
                            .put('/users/' + userId)
                            .send(user)
                            .end(function(err, res) {
                                expect(res).to.have.status(200);
                                expect(res.body).to.include( { email:'12345@gmail.ie', password:'123456'} );
                                done();
                            });
                    });
            });
            after(function  (done) {
                Users.collection.drop();
                done();
            });
        });
    });
});