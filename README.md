#  LabJournal

This software aims to store data and make it easily accessible for analysis and presentation. It is based on a HTTP server (node.js w/ express) for easy access and a mongoDB in the back for flexibility of data structure.

# INSTALL

Requires:
	- node
	- npm

Then just copypasta:

	npm install .

# API
These are the API entry points:
## GET

## POST
	- ./saveData : push post-body data (json) to the database
	- ./queryData : search for post-body data (json) in the data base

# Datamodel

## Data

    date:{type:Date, default: Date.now},
    author: String,
    parameters:[{type: Schema.Types.Mixed}],
    data: [{type:Schema.Types.Mixed}],
    files: [String],
    project: String

## Analysis

# Notes

 - inline latex can be rendered after ":>"

# ToDo
- Implement analysis collection
- query for parameter sets does not work
