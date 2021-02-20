package jpheabackend

import com.hanuman.simplegeneric.JSONFormat
import com.hanuman.simplegeneric.PaginationCommand
import com.hanuman.simplegeneric.SimpleGenericRestfulController
import com.hanuman.simplegeneric.StatusCode
import grails.converters.JSON
import javafx.scene.control.Pagination


class FileUploadController extends SimpleGenericRestfulController<Site> {

    FileUploadController(){
        super(Site)
    }
    def fileUploadService

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


//---------------------------------------
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

    def exportFile(){

        Integer adminCode = params.int("adminCode")
        String officialSiteName = params.officialSiteName
        String hubSite = params.hubSite

        def resultList = fileUploadService.listSite(adminCode,officialSiteName,hubSite)

        if (resultList) {
            String fileName = "Site Report - ${new Date()}.xlsx"
            fileUploadService.exportExcel(fileName,response,adminCode,officialSiteName,hubSite,resultList)
        }else {
            render JSONFormat.respond(null,StatusCode.RecordNotFound,StatusCode.RecordNotFound.description) as JSON
        }
    }

    def getSiteTemplate(PaginationCommand pagination){
        def resultList = fileUploadService.listSite(pagination,null,null,null,null)

        if (resultList) {
            fileUploadService.siteTemplate(response,resultList,"Site excel template.xlsx")
        }
    }


//Report---------------------------------
    def exportRptInfoSiteReport(){
        Integer adminCode = params.int("adminCode")
        String fileName = "Report RPT Site Info.xlsx"

        def resultList = fileUploadService.listSiteByAdminCode(adminCode)

        if (resultList.filter.adminCode==null){
            render JSONFormat.respond(null,StatusCode.RecordNotFound,StatusCode.RecordNotFound.description) as JSON
        }else {
            fileUploadService.exportRPTInfoSite(adminCode,resultList.filter,resultList.resultList,fileName,response)
        }
    }

    def exportRptSiteDownReport(){

    }
}
