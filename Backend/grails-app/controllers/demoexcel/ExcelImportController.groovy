package demoexcel

import corebackend.simplegenericrestfulcontroller.generic.JSONFormat
import corebackend.simplegenericrestfulcontroller.generic.PaginationCommand
import corebackend.simplegenericrestfulcontroller.generic.SimpleGenericRestfulController
import corebackend.simplegenericrestfulcontroller.generic.StatusCode
import grails.converters.JSON
import pl.touk.excel.export.WebXlsxExporter


class ExcelImportController extends SimpleGenericRestfulController<DemoExcel> {

    ExcelImportController(){
        super(DemoExcel)
    }
    def excelImportService


    def uploadFile() {
        def file = params.filesName

        println file.getClass()
        ArrayList<Map> listSummireFileUpload = new ArrayList<>()

        file.each {
            listSummireFileUpload.add(excelImportService.loadDataFromFile(it))

        }
        ImportHistory history = new ImportHistory()
        history.importBy = authenticatedUser.username
        history.fileName = listSummireFileUpload


        render JSONFormat.respond(listSummireFileUpload) as JSON
    }

    def exportFile(PaginationCommand pagination){

        Integer adminCode = params.int("adminCode")
        String officialSiteName = params.officialSiteName

        def resultList = excelImportService.listData(pagination,adminCode,officialSiteName)

        if (resultList) {
            String fileName = "Site Report - ${new Date().format("YYYY-MM-DD")}.xlsx"
            Integer row = 5
            Integer no = 1
            double total = 0
            WebXlsxExporter exporter = new WebXlsxExporter()
            exporter.with {
                setResponseHeaders(response, fileName)
                putCellValue(1, 0, "adminCode:")
                putCellValue(1, 1, adminCode.toString())
                putCellValue(2, 0, "officialSiteName:")
                putCellValue(2, 1, officialSiteName)


                putCellValue(4, 0, "No")
                putCellValue(4, 1 ,"Official Site Name")
                putCellValue(4, 2 ,"SRAN Name")
                putCellValue(4, 3 ,"BTS Name No Tech")
                putCellValue(4, 4 ,"Admin Code")
                putCellValue(4, 5 ,"Edotco Name")
                putCellValue(4, 6 ,"Product Type")
                putCellValue(4, 7 ,"Site Category")
                putCellValue(4, 8 ,"Longitude")
                putCellValue(4, 9 ,"Latitude")
                putCellValue(4, 10 ,"IBS Site")
                putCellValue(4, 11 ,"Critical Site")
                putCellValue(4, 12 ,"VIP")
                putCellValue(4, 13 ,"e/iMacro BBU Name")
                putCellValue(4, 14 ,"Donner Site")
                putCellValue(4, 15 ,"e/iMacro RRU")
                putCellValue(4, 16 ,"Subcon")
                putCellValue(4, 17 ,"TCU")
                putCellValue(4, 18 ,"NetEco")
                putCellValue(4, 19 ,"Province")
                putCellValue(4, 20 ,"Area  Location")
                putCellValue(4, 21 ,"Priority categories")
                putCellValue(4, 22 ,"Guard")
                putCellValue(4, 23 ,"Guard Phnone")
                putCellValue(4, 24 ,"Tower Type")
                putCellValue(4, 25 ,"Tower Height")
                putCellValue(4, 26 ,"Building Height")
                putCellValue(4, 27 ,"Site Type")
                putCellValue(4, 28 ,"Grid")
                putCellValue(4, 29 ,"On air Status")
                putCellValue(4, 30 ,"Site Owner")
                putCellValue(4, 31 ,"Fiber Ring Info")
                putCellValue(4, 32 ,"UniRan/SRAN ID")
                putCellValue(4, 33 ,"S1UIP")
                putCellValue(4, 34 ,"GWS1UIP")
                putCellValue(4, 35 ,"S1UVLANID")
                putCellValue(4, 36 ,"S1CIP")
                putCellValue(4, 37 ,"GWS1CIP")
                putCellValue(4, 38 ,"S1CVLANID")
                putCellValue(4, 39 ,"MMEIP(S1C)")
                putCellValue(4, 40 ,"3GID")
                putCellValue(4, 41 ,"3GIP")
                putCellValue(4, 42 ,"GW3GIP")
                putCellValue(4, 43 ,"3GVLANID")
                putCellValue(4, 44 ,"RNCIP")
                putCellValue(4, 45 ,"RNCName")
                putCellValue(4, 46 ,"2GID")
                putCellValue(4, 47 ,"2GIP")
                putCellValue(4, 48 ,"GW2GIP")
                putCellValue(4, 49 ,"2GVLANID")
                putCellValue(4, 50 ,"BSCIP")
                putCellValue(4, 51 ,"BSCName")
                putCellValue(4, 52 ,"OMIP")
                putCellValue(4, 53 ,"GWOMIP")
                putCellValue(4, 54 ,"OMVLANID")


                resultList.each {
                    putCellValue(row, 0, no.toString())

                    putCellValue(row,1 ,it.adminCode)
                    putCellValue(row,2 ,it.officialSiteName)
                    putCellValue(row,3 ,it.sRANName)
                    putCellValue(row,4 ,it.bTSNameNoTech)
                    putCellValue(row,5 ,it.edotcoName)
                    putCellValue(row,6 ,it.productType)
                    putCellValue(row,7 ,it.siteCategory)
                    putCellValue(row,8 ,it.longitude)
                    putCellValue(row,9 ,it.latitude)
                    putCellValue(row,10 ,it.ibsSite)
                    putCellValue(row,11 ,it.criticalSite)
                    putCellValue(row,12 ,it.vip)
                    putCellValue(row,13 ,it.e_iMacroBBUName)
                    putCellValue(row,14 ,it.donnerSite)
                    putCellValue(row,15 ,it.e_iMacroRRU)
                    putCellValue(row,16 ,it.subcon)
                    putCellValue(row,17 ,it.tcu)
                    putCellValue(row,18 ,it.netEco)
                    putCellValue(row,19 ,it.province)
                    putCellValue(row,20 ,it.areaLocation)
                    putCellValue(row,21 ,it.priorityCategories)
                    putCellValue(row,22 ,it.guard)
                    putCellValue(row,23 ,it.guardPhnone)
                    putCellValue(row,24 ,it.towerType)
                    putCellValue(row,25 ,it.towerHeight)
                    putCellValue(row,26 ,it.buildingHeight)
                    putCellValue(row,27 ,it.siteType)
                    putCellValue(row,28 ,it.grid)
                    putCellValue(row,29 ,it.onAirStatus)
                    putCellValue(row,30 ,it.siteOwner)
                    putCellValue(row,31 ,it.fiberRingInfo)
                    putCellValue(row,32 ,it.uniRan_SRAN_ID)
                    putCellValue(row,33 ,it.s1UIP)
                    putCellValue(row,34 ,it.gws1UIP)
                    putCellValue(row,35 ,it.s1UVLANID)
                    putCellValue(row,36 ,it.s1CIP)
                    putCellValue(row,37 ,it.gwS1CIP)
                    putCellValue(row,38 ,it.s1CVLANID)
                    putCellValue(row,39 ,it.mMEIP_S1C)
                    putCellValue(row,40 ,it._3GID)
                    putCellValue(row,41 ,it._3GIP)
                    putCellValue(row,42 ,it.gw3GIP)
                    putCellValue(row,43 ,it._3GVLANID)
                    putCellValue(row,44 ,it.rncIP)
                    putCellValue(row,45 ,it.rncName)
                    putCellValue(row,46 ,it._2GID)
                    putCellValue(row,47 ,it._2GIP)
                    putCellValue(row,48 ,it.gw2GIP)
                    putCellValue(row,49 ,it._2GVLANID)
                    putCellValue(row,50 ,it.bscIP)
                    putCellValue(row,51 ,it.bscName)
                    putCellValue(row,52 ,it.omIP)
                    putCellValue(row,53 ,it.gwOMIP)
                    putCellValue(row,54 ,it.omVLANID)

                    row++
                    no++
                }
                putCellValue(row, 5, "Total:")
                putCellValue(row, 6, total.toString())
                save(response.outputStream)
            }
        } else
            render JSONFormat.respond(null, StatusCode.Invalid, "Data filter is requride") as JSON
    }

    @Override
    def index(PaginationCommand pagination){
        println params.id

        Integer adminCode = params.int("adminCode")
        String officialSiteName = params.officialSiteName

        def resultList = excelImportService.listData(pagination,adminCode,officialSiteName)

//        ArrayList<Map> result = new ArrayList<>()
//        resultList.each {
//            result.add(excelImportService.mapData(it))
//        }
        render JSONFormat.respond(resultList) as JSON
    }

    @Override
    def show(){
        def demoExcel = queryForResource(params.id)
        render JSONFormat.respond(demoExcel) as JSON
    }
}
