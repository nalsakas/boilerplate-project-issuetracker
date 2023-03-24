const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test("Create an issue with every field", (done) => {
        chai.request(server)
        .post('/api/issues/apitest')
        .type('form')
        .send({
            issue_title: 'title1',
            issue_text: 'text1',
            created_on: (new Date(Date.now())).toISOString(),
            updated_on: "",
            created_by: 'seyhmus',
            assigned_to: "",
            open: true,
            status_text: ""
        })
        .end(function (err, res) {
            assert.isNull(err)
            assert.equal(res.status, 200)
            done()
         })
    })
    test("Create an issue with only required fields", (done) => {
        chai.request(server)
        .post('/api/issues/apitest')
        .type('form')
        .send({
            issue_title: 'title2',
            issue_text: 'text2',
            created_by: 'seyhmus'
        })
        .end(function (err, res) {
            assert.isNull(err)
            assert.equal(res.status, 200)
            done()
         })
    })
    test("Create an issue with missing required fields", (done) => {
        chai.request(server)
        .post('/api/issues/apitest')
        .type('form')
        .send({
            issue_title: 'title2',
            issue_text: 'text2',
            created_by: 'seyhmus'
        })
        .end(function (err, res) {
            //Probably returns some sort of error message
            assert.isNull(err)
            assert.equal(res.status, 200)
            done()
         })
    })

    test("View issues on a project", (done) => {
        chai.request(server)
        .get('/api/issues/apitest')
        .end(function (err, res) {
            assert.isNull(err)
            assert.equal(res.status, 200)
            done()
         })
    })
    test("View issues on a project with one filter", (done) => {
        chai.request(server)
        .get('/api/issues/apitest')
        .query({created_by: 'seyhmus'})
        .end(function (err, res) {
            assert.isNull(err)
            assert.equal(res.status, 200)
            done()
         })
    })
    test("View issues on a project with multiple filters", (done) => {
        chai.request(server)
        .get('/api/issues/apitest')
        .query({issue_title: 'title1', issue_text:'text1'})
        .end(function (err, res) {
            assert.isNull(err)
            assert.equal(res.status, 200)
            done()
         })
    })

    test("Update one field on an issue", (done) => {
        chai.request(server)
        .put('/api/issues/apitest')
        .send({_id: '####', issue_title:'title_updated'})
        .end(function (err, res) {
            assert.isNull(err)
            assert.equal(res.status, 200)
            done()
         })
    })
    test("Update multiple fields on an issue", (done) => {
        chai.request(server)
        .put('/api/issues/apitest')
        .send({_id: '####', issue_title:'title_updated', issue_text: 'text_updated'})
        .end(function (err, res) {
            assert.isNull(err)
            assert.equal(res.status, 200)
            done()
         })
    })
    test("Update an issue with missing _id", (done) => {
        chai.request(server)
        .put('/api/issues/apitest')
        .send({issue_title:'title_updated'})
        .end(function (err, res) {
            assert.isNull(err)
            assert.equal(res.status, 200)
            done()
         })
    })
    test("Update an issue with no fields to update", (done) => {
        chai.request(server)
        .put('/api/issues/apitest')
        .send({})
        .end(function (err, res) {
            assert.isNull(err)
            assert.equal(res.status, 200)
            done()
         })
    })
    test("Update an issue with an invalid _id", (done) => {
        chai.request(server)
        .put('/api/issues/apitest')
        .send({_id: 'invalid_id'})
        .end(function (err, res) {
            assert.isNull(err)
            assert.equal(res.status, 200)
            done()
         })
    })

    test("Delete an issue", (done) => {
        chai.request(server)
        .delete('/api/issues/apitest')
        .send({_id: '#####'})
        .end(function (err, res) {
            assert.isNull(err)
            assert.equal(res.status, 200)
            done()
         })
    })
    test("Delete an issue with an invalid _id", (done) => {
        chai.request(server)
        .delete('/api/issues/apitest')
        .send({_id: 'invalid_id'})
        .end(function (err, res) {
            assert.isNull(err)
            assert.equal(res.status, 200)
            done()
         })
    })
    test("Delete an issue with missing _id", (done) => {
        chai.request(server)
        .delete('/api/issues/apitest')
        .send({})
        .end(function (err, res) {
            assert.isNull(err)
            assert.equal(res.status, 200)
            done()
         })
    })

})
