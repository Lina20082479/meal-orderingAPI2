eslint-disable-next-line no-unused-vars
var app = require('../../app');
let Users = require('../../models/user');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));

// describe('Authentication', function (){
//     describe('POST /register', function () {
//          it('should return error', function(done) {
//     //         let user = {
//     //             email: "123456@gmail.ie"
//     //        };
//     //        chai.request(server)
//     //        .post('/register')
//     //        .send(user)
//     //        .end(function(err, res) {
//     //            expect(res).to.have.status(404);
//     //            done();
//     //        });
//         });
//         it('should register successfully and create a new user', function(done) {
//     //         let user = {
//     //             email:'123456@gmail.ie',
//     //             password:'123456'
//     //         };
//     //         chai.request(server)
//     //             .post('/register')
//     //             .send(user)
//     //             .end(function(err, res) {
//     //                 expect(res).to.have.status(200);
//     //                 done();
//     //             });
//     //     });
//     //     after(function  (done) {
//     //         chai.request(server)
//     //             .get('/users')
//     //             .end(function(err, res) {
//     //                 expect(res).to.have.status(200);
//     //                 expect(res.body).to.be.a('array');
//     //                 expect(res.body.length).to.equal(2);
//     //                 let result = _.map(res.body, (user) => {
//     //                     return { email: user.email ,
//     //                         password:user.password};
//     //                 });
//     //                 expect(result).to.include[ { email:'123456@gmail.ie', password:'123456'} ];
//     //                 done();
//     //             });
//          });
//         });
//        describe('POST /login', function () {
//          describe('when user is valid',function() {
//             it('should login successfully and give a token', function(done) {
//     //             chai.request(server)
//     //                 .get('/users')
//     //                 .end(function(err, res) {
//     //                     const user = res.body[0];
//     //                     chai.request(server)
//     //                         .post('/login')
//     //                         .send(user)
//     //                         .end(function(err, res) {
//     //                             expect(res.body.token.length > 0).to.be.true;
//     //                             done();
//     //                         });
//     //                });
//              });
//          });
//           describe('when user is invalid',function() {
//              it('should login failed and return a message', function(done) {
//         //         chai.request(server)
//         //         .get('/users')
//         //         .end(function(err, res) {
//         //             const user = res.body[0];
//         //             user.password = "wrong password";
//         //             chai.request(server)
//         //             .post('/login')
//         //             .send(user)
//         //             .end(function(err, res) {
//         //                 expect(res).to.have.status(401);
//         //                 expect(res.body).to.equal('email or password incorrect!' );
//         //                 done();
//         //             });
//
//         //         });
//              });
//              it('should return error', function(done) {
//         //         let user = {
//         //             email: "123456@gmail.ie"
//         //        };
//         //        chai.request(server)
//         //        .post('/login')
//         //        .send(user)
//         //        .end(function(err, res) {
//         //            expect(res).to.have.status(401);
//         //            done();
//         //        });
//              });
//          });
//     });
//     after(function  (done) {
//         Users.collection.drop();
//         done();
//     });
// });
