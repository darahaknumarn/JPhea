package jpheabackend

import com.hanuman.simplegeneric.JSONFormat
import com.hanuman.simplegeneric.SimpleGenericRestfulController
import grails.converters.JSON

class ImportHistoryController extends SimpleGenericRestfulController<ImportHistory>{
    ImportHistoryController(){
        super(ImportHistory)
    }

    def show(){
        def importHistory = queryForResource(params.id)
        render JSONFormat.respond(importHistory) as JSON
    }
}
