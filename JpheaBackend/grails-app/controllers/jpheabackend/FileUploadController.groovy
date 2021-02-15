package jpheabackend

import com.hanuman.simplegeneric.JSONFormat
import com.hanuman.simplegeneric.PaginationCommand
import com.hanuman.simplegeneric.SimpleGenericRestfulController
import grails.converters.JSON


class FileUploadController extends SimpleGenericRestfulController<Site> {

    FileUploadController(){
        super(Site)
    }
    def fileUploadService


    def uploadFile() {
        def file = params.filesName

        if (file){
            String orginalFileName = file.getOriginalFilename()

            List<Map> rawData = fileUploadService.loadDataFromFile(file)
            ImportHistory uploadInfo = fileUploadService.saveToSite(rawData, orginalFileName as String)
            render JSONFormat.respond(uploadInfo) as JSON

        }else {
            render JSONFormat.respond(null,"File not found") as JSON
        }
    }

    def exportFile(PaginationCommand pagination){

        Integer adminCode = params.int("adminCode")
        Integer importHistoryId = params.int("importHistoryId")
        String officialSiteName = params.officialSiteName
        String hubSite = params.hubSite

        def resultList = fileUploadService.listSite(pagination,adminCode,officialSiteName,hubSite,importHistoryId)

        if (resultList) {
            String fileName = "Site Report - ${new Date()}.xlsx"
            fileUploadService.exportExcel(fileName,response,adminCode,importHistoryId,officialSiteName,hubSite,resultList)
        }
        else{
            render JSONFormat.respond(null, "Data filter is ") as JSON
        }
    }

    @Override
    def index(PaginationCommand pagination){
        Integer adminCode = params.int("adminCode")
        Integer importHistoryId = params.int("importHistoryId")
        String officialSiteName = params.officialSiteName
        String hubSite = params.hubSite


        def resultList = fileUploadService.listSite(pagination,adminCode,officialSiteName,hubSite,importHistoryId)
        render JSONFormat.respond(resultList) as JSON
    }

    @Override
    def show(){
        def demoExcel = queryForResource(params.id)
        render JSONFormat.respond(demoExcel) as JSON
    }
}
