package jpheabackend


import grails.converters.JSON
import simplegenericrestful.JSONFormat
import simplegenericrestful.SimpleGenericRestfulController

class ImportHistoryController extends SimpleGenericRestfulController<ImportHistory> {
    ImportHistoryController(){
        super(ImportHistory)
    }

    def show(){
        def importHistory = queryForResource(params.id)
        render JSONFormat.respond(importHistory) as JSON
    }
}
