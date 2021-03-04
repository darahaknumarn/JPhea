package demoexcel


import grails.converters.JSON
import hanuman.simplegenericrestfulcontroller.generic.JSONFormat
import hanuman.simplegenericrestfulcontroller.generic.SimpleGenericRestfulController


class ImportHistoryController extends SimpleGenericRestfulController<ImportHistory> {
    ImportHistoryController(){
        super(ImportHistory)
    }

    def show(){
        def importHistory = queryForResource(params.id)
        render JSONFormat.respond(importHistory) as JSON
    }
}
