const express = require('express');

const router = require("express").Router();

const ProjectsData = require("../data/helpers/projectModel.js");

//*********** GET ************\\

// get(): resolves to an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if one is found.
router.get("/:id",validateProjectId, (req, res) => {
    ProjectsData.get(req.params.id)
        .then(project => {
            if(project){
                res.status(200).json({project})
            } else {
                res.status(404).json({errorMessage: "Project not found"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({errorMessage: "error retrieving the project info"})
        })
})

// The projectModel.js helper includes an extra method called getProjectActions() that takes a project id as it's only argument and returns a list of all the actions for the project.
router.get("/:id/actions",validateProjectId, (req, res) => {
    ProjectsData.getProjectActions(req.params.id)
        .then(action => {
            if(action){
                res.status(200).json(action)
            } else {
                res.status(404).json({errorMessage: "the project id does not exist"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({errorMessage: "request can not be completed"})
        })
})

//*********** POST ************\\

// insert(): calling insert passing it a resource object will add it to the database and return the newly created resource.
router.post("/",validateProject, (req, res) => {
    ProjectsData.insert(req.body)
        .then(resource => {
            res.status(200).json(resource)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({errorMessage: " error posting project info"})
        })
})

//*********** PUT ************\\

// update(): accepts two arguments, the first is the id of the resource to update, and the second is an object with the changes to apply. It returns the updated resource. If a resource with the provided id is not found, the method returns null.
router.put("/:id",validateProjectId, (req, res) => {
    ProjectsData.update(req.params.id, req.body)
        .then(project => {
            if(project){
                res.status(200).json(project)
            } else {
                res.status(404).json({errorMessage: "the project with the id does not exist"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({errorMessage: "Project can not be deleted"})
        })
})

//*********** DELETE ************\\

// remove(): the remove method accepts a/n id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
router.delete("/:id",validateProjectId, (req, res) => {
    ProjectsData.remove(req.params.id)
        .then(count => {
            if(count > 0){
                res.status(200).json(count)
            } else {
                res.status(404).json({message: "the project with the id does not exist so can not be deleted"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({errorMessage: "project can not be completed"})
        })
})


//*********** CUSTOM MIDDLEWARE ************\\
function validateProject(req, res, next) {
    const { name, description } = req.body

    if(!name || !description) {
        res.status(400).json({message: "Please provide name and description (validation message)"})
    }else {
        next()
    }
}

function  validateProjectId(req, res, next) {
    ProjectsData.get(req.params.id)
    .then(project => {
        if(project){
            project = req.project
            next()
        }else {
            res.status(404).json({errorMessage: "Project with the ID does not exist (validation message)"})
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage: "request can not be completed"})
    })
}



module.exports = router;