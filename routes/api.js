'use strict';
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash')

const issues = []

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      try {
        let project = req.params.project;
        let queries = Object.keys(req.query)

        const projectIssues = issues[project]
        
        let projects = projectIssues
        if (queries.length) {
          projects = projectIssues.filter(val => {
            return queries.every(k => val[k] == req.query[k])
          })
        } 
        
        res.json(projects) 
      } catch (error) {
        res.end(error.message)
      }    
    })
    
    .post(function (req, res){
      try {
        let project = req.params.project;
        
        if (!issues[project]) issues[project] = []

        let newObj = {
          _id: uuidv4(),
          issue_title: "",
          issue_text: "",
          created_on: "",
          updated_on: "",
          created_by: "",
          assigned_to: "",
          open: true,
          status_text: ""
        }
        const updated = _.assign(newObj, req.body)
        issues[project].push(updated)
        res.end()
      } catch (error) {
        res.end(error.message)
      }
    })
    
    .put(function (req, res){
      try {
        let project = req.params.project;
        const projectsIssues = issues[project]
        const [issue] = projectsIssues.filter(v => v._id == req.body._id)
        if (issue) _.assign(issue, req.body)
        res.end()
      } catch (error) {
        res.end(error.message)
      }
    })
    
    .delete(function (req, res){
      try {
        let project = req.params.project;
        const projectIssues = issues[project]
        const idx = projectIssues.findIndex(v => v._id == req.body._id)
        if (idx != -1) projectIssues.splice(idx, 1)
        res.end() 
      } catch (error) {
        res.end(error.message)
      }
    })
}
