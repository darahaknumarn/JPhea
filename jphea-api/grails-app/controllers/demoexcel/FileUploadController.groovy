package demoexcel


import grails.converters.JSON
import hanuman.simplegenericrestfulcontroller.generic.JSONFormat
import hanuman.simplegenericrestfulcontroller.generic.PaginationCommand
import hanuman.simplegenericrestfulcontroller.generic.RespondDTO
import hanuman.simplegenericrestfulcontroller.generic.SimpleGenericRestfulController
import hanuman.simplegenericrestfulcontroller.generic.StatusCode


class FileUploadController extends SimpleGenericRestfulController<Site> {

    FileUploadController() {
        super(Site)
    }
    def fileUploadService

    @Override
    def index(PaginationCommand pagination) {
        String adminCode = params.adminCode
        Integer importHistoryId = params.int("importHistoryId")
        String officialSiteName = params.officialSiteName
        String hubSite = params.hubSite


        def resultList = fileUploadService.listSite(pagination, adminCode, officialSiteName, hubSite, importHistoryId)
        render JSONFormat.respond(resultList) as JSON
    }

    @Override
    def show() {
        def demoExcel = queryForResource(params.id)
        render JSONFormat.respond(demoExcel) as JSON
    }


//---------------------------------------
    def uploadFile() {
        def file = params.filesName
        RespondDTO dto = new RespondDTO()

        if (file) {
            String orginalFileName = file.getOriginalFilename()

            List<Map> rawData = fileUploadService.loadDataFromFile(file,dto)

            if (rawData){
                ImportHistory uploadInfo = fileUploadService.saveToSite(rawData, orginalFileName as String)
                render JSONFormat.respond(uploadInfo) as JSON
                return
            }
            else
            {
                render JSONFormat.respond(null,StatusCode.Invalid, "List of site must be in sheet 1 of File. ${dto.message}") as JSON
                return
            }
        }
        else
        {
            render JSONFormat.respond(null, "File not found") as JSON
        }
    }

    def exportFile() {

        Integer adminCode = params.int("adminCode")
        String officialSiteName = params.officialSiteName
        String hubSite = params.hubSite

        def resultList = fileUploadService.listSite(adminCode, officialSiteName, hubSite)

        if (resultList) {
            String fileName = "Site Report.xlsx"
            fileUploadService.exportExcel(fileName, response, adminCode, officialSiteName, hubSite, resultList)
        } else {
            render JSONFormat.respond(null, StatusCode.RecordNotFound, StatusCode.RecordNotFound.description) as JSON
        }
    }

    def getSiteTemplate() {
        fileUploadService.siteTemplate(response, "Site excel template.xlsx")
    }


//Report---------------------------------
    def exportRptInfoSiteReport() {
        Integer adminCode = params.int("adminCode")
        String fileName = "Report RPT Site Info.xlsx"

        def resultList = fileUploadService.listSiteByAdminCode(adminCode)

        if (resultList.filter.adminCode != null) {
            fileUploadService.exportRPTInfoSite(adminCode, resultList.filter, resultList.resultList, fileName, response)
        }
        else {
            render JSONFormat.respond(null, StatusCode.RecordNotFound, StatusCode.RecordNotFound.description) as JSON
        }
    }

    def exportRptSiteDownReport() {
        String hubSites = params.hubSites

        List<String> listHubSites
        if (hubSites) {
            if (hubSites.contains(",")) {
                listHubSites = hubSites.split(',')
            } else {
                listHubSites = [hubSites]
            }


            String fileName = "Report RPT Site Down.xlsx"
            def resultList = fileUploadService.listSiteByHubSites(listHubSites)
            if (resultList) {
                fileUploadService.exportRPTSiteDown(listHubSites, resultList, fileName, response)
            }
        }
        render JSONFormat.respond(null, StatusCode.RecordNotFound, StatusCode.RecordNotFound.description) as JSON
    }
}
