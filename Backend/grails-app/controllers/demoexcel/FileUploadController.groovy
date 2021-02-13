package demoexcel

import corebackend.simplegenericrestfulcontroller.generic.JSONFormat
import corebackend.simplegenericrestfulcontroller.generic.PaginationCommand
import corebackend.simplegenericrestfulcontroller.generic.SimpleGenericRestfulController
import corebackend.simplegenericrestfulcontroller.generic.StatusCode
import grails.converters.JSON
import pl.touk.excel.export.WebXlsxExporter


class FileUploadController extends SimpleGenericRestfulController<Site>{

    FileUploadController(){
        super(Site)
    }
    def fileUploadService


    def uploadFile() {
        def file = params.filesName

        if (file){
            String orginalFileName = file.getOriginalFilename()

            List<Map> rawData = fileUploadService.loadDataFromFile(file)
            Map uploadInfo = fileUploadService.saveToSite(rawData, orginalFileName as String)

            render JSONFormat.respond(uploadInfo) as JSON

        }
    }

    def exportFile(PaginationCommand pagination){

        Integer adminCode = params.int("adminCode")
        Integer importHistoryId = params.int("importHistoryId")
        String officialSiteName = params.officialSiteName
        String hubSite = params.hubSite

        def resultList = fileUploadService.listSite(pagination,adminCode,officialSiteName,hubSite,importHistoryId)

        if (resultList) {
            String fileName = "Site Report - ${new Date().format("YYYY-MM-DD")}.xlsx"
            Integer row = 7
            Integer headerRow = 6
            Integer no = 1
            WebXlsxExporter exporter = new WebXlsxExporter()
            exporter.with {
                setResponseHeaders(response, fileName)
                putCellValue(1, 0, "adminCode:")
                putCellValue(1, 1, adminCode?:"")
                putCellValue(2, 0, "officialSiteName:")
                putCellValue(2, 1, officialSiteName?:"")
                putCellValue(3, 0, "hubSite:")
                putCellValue(3, 1, hubSite?:"")
                putCellValue(4, 0, "importHistoryId:")
                putCellValue(4, 1, importHistoryId?:"")


                putCellValue(headerRow, 0, "No")
                putCellValue(headerRow, 1 ,"Official Site Name")
                putCellValue(headerRow, 2 ,"SRAN Name")
                putCellValue(headerRow, 3 ,"BTS Name No Tech")
                putCellValue(headerRow, 4 ,"Admin Code")
                putCellValue(headerRow, 5 ,"Edotco Name")
                putCellValue(headerRow, 6 ,"Product Type")
                putCellValue(headerRow, 7 ,"Site Category")
                putCellValue(headerRow, 8 ,"Longitude")
                putCellValue(headerRow, 9 ,"Latitude")
                putCellValue(headerRow, 10 ,"IBS Site")
                putCellValue(headerRow, 11 ,"Critical Site")
                putCellValue(headerRow, 12 ,"VIP")
                putCellValue(headerRow, 13 ,"e/iMacro BBU Name")
                putCellValue(headerRow, 14 ,"Donner Site")
                putCellValue(headerRow, 15 ,"e/iMacro RRU")
                putCellValue(headerRow, 16 ,"Subcon")
                putCellValue(headerRow, 17 ,"TCU")
                putCellValue(headerRow, 18 ,"NetEco")
                putCellValue(headerRow, 19 ,"Province")
                putCellValue(headerRow, 20 ,"Area  Location")
                putCellValue(headerRow, 21 ,"Priority categories")
                putCellValue(headerRow, 22 ,"Guard")
                putCellValue(headerRow, 23 ,"Guard Phnone")
                putCellValue(headerRow, 24 ,"Tower Type")
                putCellValue(headerRow, 25 ,"Tower Height")
                putCellValue(headerRow, 26 ,"Building Height")
                putCellValue(headerRow, 27 ,"Site Type")
                putCellValue(headerRow, 28 ,"Grid")
                putCellValue(headerRow, 29 ,"On air Status")
                putCellValue(headerRow, 30 ,"Site Owner")
                putCellValue(headerRow, 31 ,"Fiber Ring Info")
                putCellValue(headerRow, 32 ,"UniRan/SRAN ID")
                putCellValue(headerRow, 33 ,"S1UIP")
                putCellValue(headerRow, 34 ,"GWS1UIP")
                putCellValue(headerRow, 35 ,"S1UVLANID")
                putCellValue(headerRow, 36 ,"S1CIP")
                putCellValue(headerRow, 37 ,"GWS1CIP")
                putCellValue(headerRow, 38 ,"S1CVLANID")
                putCellValue(headerRow, 39 ,"MMEIP(S1C)")
                putCellValue(headerRow, 40 ,"3GID")
                putCellValue(headerRow, 41 ,"3GIP")
                putCellValue(headerRow, 42 ,"GW3GIP")
                putCellValue(headerRow, 43 ,"3GVLANID")
                putCellValue(headerRow, 44 ,"RNCIP")
                putCellValue(headerRow, 45 ,"RNCName")
                putCellValue(headerRow, 46 ,"2GID")
                putCellValue(headerRow, 47 ,"2GIP")
                putCellValue(headerRow, 48 ,"GW2GIP")
                putCellValue(headerRow, 49 ,"2GVLANID")
                putCellValue(headerRow, 50 ,"BSCIP")
                putCellValue(headerRow, 51 ,"BSCName")
                putCellValue(headerRow, 52 ,"OMIP")
                putCellValue(headerRow, 53 ,"GWOMIP")
                putCellValue(headerRow, 54 ,"OMVLANID")
                putCellValue(headerRow, 56 ,"Hub Site")


                resultList.each {
                    putCellValue(row, 0, no.toString())

                    putCellValue(row,1 ,it.adminCode?:"")
                    putCellValue(row,2 ,it.officialSiteName?:"")
                    putCellValue(row,3 ,it.sRANName?:"")
                    putCellValue(row,4 ,it.bTSNameNoTech?:"")
                    putCellValue(row,5 ,it.edotcoName?:"")
                    putCellValue(row,6 ,it.productType?:"")
                    putCellValue(row,7 ,it.siteCategory?:"")
                    putCellValue(row,8 ,it.longitude?:"")
                    putCellValue(row,9 ,it.latitude?:"")
                    putCellValue(row,10 ,it.ibsSite?:"")
                    putCellValue(row,11 ,it.criticalSite?:"")
                    putCellValue(row,12 ,it.vip?:"")
                    putCellValue(row,13 ,it.e_iMacroBBUName?:"")
                    putCellValue(row,14 ,it.donnerSite?:"")
                    putCellValue(row,15 ,it.e_iMacroRRU?:"")
                    putCellValue(row,16 ,it.subcon?:"")
                    putCellValue(row,17 ,it.tcu?:"")
                    putCellValue(row,18 ,it.netEco?:"")
                    putCellValue(row,19 ,it.province?:"")
                    putCellValue(row,20 ,it.areaLocation?:"")
                    putCellValue(row,21 ,it.priorityCategories?:"")
                    putCellValue(row,22 ,it.guard?:"")
                    putCellValue(row,23 ,it.guardPhnone?:"")
                    putCellValue(row,24 ,it.towerType?:"")
                    putCellValue(row,25 ,it.towerHeight?:"")
                    putCellValue(row,26 ,it.buildingHeight?:"")
                    putCellValue(row,27 ,it.siteType?:"")
                    putCellValue(row,28 ,it.grid?:"")
                    putCellValue(row,29 ,it.onAirStatus?:"")
                    putCellValue(row,30 ,it.siteOwner?:"")
                    putCellValue(row,31 ,it.fiberRingInfo?:"")
                    putCellValue(row,32 ,it.uniRan_SRAN_ID?:"")
                    putCellValue(row,33 ,it.s1UIP?:"")
                    putCellValue(row,34 ,it.gws1UIP?:"")
                    putCellValue(row,35 ,it.s1UVLANID?:"")
                    putCellValue(row,36 ,it.s1CIP?:"")
                    putCellValue(row,37 ,it.gwS1CIP?:"")
                    putCellValue(row,38 ,it.s1CVLANID?:"")
                    putCellValue(row,39 ,it.mMEIP_S1C?:"")
                    putCellValue(row,40 ,it._3GID?:"")
                    putCellValue(row,41 ,it._3GIP?:"")
                    putCellValue(row,42 ,it.gw3GIP?:"")
                    putCellValue(row,43 ,it._3GVLANID?:"")
                    putCellValue(row,44 ,it.rncIP?:"")
                    putCellValue(row,45 ,it.rncName?:"")
                    putCellValue(row,46 ,it._2GID?:"")
                    putCellValue(row,47 ,it._2GIP?:"")
                    putCellValue(row,48 ,it.gw2GIP?:"")
                    putCellValue(row,49 ,it._2GVLANID?:"")
                    putCellValue(row,50 ,it.bscIP?:"")
                    putCellValue(row,51 ,it.bscName?:"")
                    putCellValue(row,52 ,it.omIP?:"")
                    putCellValue(row,53 ,it.gwOMIP?:"")
                    putCellValue(row,54 ,it.omVLANID?:"")
                    putCellValue(row,55 ,it.hubSite?:"")
                    row++
                    no++
                }
                save(response.outputStream)
            }
        } else
            render JSONFormat.respond(null, StatusCode.Invalid, "Data filter is ") as JSON
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
