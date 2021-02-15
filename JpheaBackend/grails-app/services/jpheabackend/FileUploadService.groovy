package jpheabackend

import com.hanuman.simplegeneric.PaginationCommand
import grails.gorm.transactions.Transactional
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import org.hibernate.StatelessSession
import org.hibernate.Transaction
import org.springframework.transaction.annotation.Propagation
import pl.touk.excel.export.WebXlsxExporter

@Transactional(propagation = Propagation.REQUIRES_NEW)
class FileUploadService {
    def sessionFactory
    def importHistoryService

//######### sub service #########
    def validateHeader(def domainProperty, String fileHeader) {

        domainProperty.find {
            String domainPropertyTrim = it.name
            it.name.replaceAll('_', '')
            fileHeader.replaceAll(' ', '')

            if (it.name.toUpperCase() == fileHeader.toUpperCase()) {
                return domainPropertyTrim
            }
        }
    }
    Map mapData(Site site){
        Map map = [:]
        map.siteOwner = site.siteOwner
        map.adminCode = site.adminCode
        map.sRANName = site.sRANName
        map.bTSNameNoTech = site.bTSNameNoTech
        map.siteCategory = site.siteCategory
        map.latitude = site.latitude
        map.longitude = site.longitude

        return map
    }
    private static Map bindData(Map data, Integer importHistoryId) {
        def obj =[:]
        obj.adminCode = data['Admin Code']
        obj.officialSiteName = data['Official Site Name']
        obj.sRANName = data['SRAN Name']
        obj.bTSNameNoTech = data['BTS Name No Tech']
        obj.edotcoName = data['Edotco Name']
        obj.productType = data['Product Type']
        obj.siteCategory = data['Site Category']
        obj.longitude = data['Longitude']
        obj.latitude = data['Latitude']
        obj.ibsSite = data['IBS Site']
        obj.criticalSite = data['Critical Site']
        obj.vip = data['VIP']
        obj.e_iMacroBBUName = data['e/iMacro BBU Name']
        obj.donnerSite = data['Donner Site']
        obj.e_iMacroRRU = data['e/iMacro RRU']
        obj.subcon = data['Subcon']
        obj.tcu = data['TCU']
        obj.netEco = data['NetEco']
        obj.province = data['Province']
        obj.areaLocation = data['Area  Location']
        obj.priorityCategories = data['Priority categories']
        obj.guard = data['Guard']
        obj.guardPhnone = data['Guard Phnone']
        obj.towerType = data['Tower Type']
        obj.towerHeight = data['Tower Height']
        obj.buildingHeight = data['Building Height']
        obj.siteType = data['Site Type']
        obj.grid = data['Grid']
        obj.onAirStatus = data['On air Status']
        obj.siteOwner = data['Site Owner']
        obj.fiberRingInfo = data['Fiber Ring Info']
        obj.uniRan_SRAN_ID = data['UniRan/SRAN ID']
        obj.s1UIP = data['S1UIP']
        obj.gws1UIP = data['GWS1UIP']
        obj.s1UVLANID = data['S1UVLANID']
        obj.s1CIP = data['S1CIP']
        obj.gwS1CIP = data['GWS1CIP']
        obj.s1CVLANID = data['S1CVLANID']
        obj.mMEIP_S1C = data['MMEIP(S1C)']
        obj._3GID = data['3GID']
        obj._3GIP = data['3GIP']
        obj.gw3GIP = data['GW3GIP']
        obj._3GVLANID = data['3GVLANID']
        obj.rncIP = data['RNCIP']
        obj.rncName = data['RNCName']
        obj._2GID = data['2GID']
        obj._2GIP = data['2GIP']
        obj.gw2GIP = data['GW2GIP']
        obj._2GVLANID = data['2GVLANID']
        obj.bscIP = data['BSCIP']
        obj.bscName = data['BSCName']
        obj.omIP = data['OMIP']
        obj.gwOMIP = data['GWOMIP']
        obj.omVLANID = data['OMVLANID']
        obj.hubSite = data['Hub_Site']

        if (importHistoryId){
            obj.importHistoryId = importHistoryId
        }
        return obj
    }
//----------------------------------------------------------



//######### upload-save service #########
    def loadDataFromFile(def file) {
        FileInputStream fs =file.getInputStream()
        def workbook = new XSSFWorkbook(fs)
        def sheet = workbook.getSheetAt(0)


        //column header
        def sheetheader = []
        for (cell in sheet.getRow(0).cellIterator()) {
            sheetheader << cell.stringCellValue
        }

        //column data
        def values = []

        //exclude row header
        for (row in sheet.rowIterator().drop(1)) {

            def value = ''
            def map = [:]
            for (cell in row.cellIterator()) {

                switch (cell.cellType) {
                    case 1:
                        value = cell.stringCellValue
                        map["${sheetheader[cell.columnIndex]}"] = value
                        break
                    case 0:
                        value = cell.numericCellValue
                        map["${sheetheader[cell.columnIndex]}"] = value
                        break
                }
            }
            if (map != [:]) {
                values.add(map)
            }
        }

        return values
    }
    def saveToSite(List<Map> values,String orginalfileName){
        //split data for insert and update to 2 list
        ArrayList<Map> rawDataForUpdate = new ArrayList<>()
        ArrayList<Map> rawDataForInsert = new ArrayList<>()

        def listAdminCode = Site.findAllByAdminCodeInList(values['Admin Code'] as List<Integer>)*.adminCode

        values.each { rawData ->

            //if contains we replace old value
            if (listAdminCode.contains(rawData['Admin Code'] as Integer)) {
                rawDataForUpdate.add(rawData)

            } else {
                rawDataForInsert.add(rawData)
            }
        }


        //save to Database
        Map resultOFInsert=[totalInsert: 0, totalFail: 0]
        Map resultOFUpdate=[totalUpdate: 0, totalFail: 0]

        ImportHistory history = importHistoryService.saveDefault(new ImportHistory())

        if (rawDataForInsert){
            resultOFInsert = InsertRecords(rawDataForInsert,history.id as Integer)
        }

        if (rawDataForUpdate) {
            resultOFUpdate = updateRecords(rawDataForUpdate)
        }

        Map result = [:]
        result.fileInfo = orginalfileName
        result.insertInfo = resultOFInsert
        result.updateInfo = resultOFUpdate

        return importHistoryService.save(history,result)
    }
    def InsertRecords(List<Map> values,Integer importId) {
        Map insertInfo = [totalInsert: 0, totalFail: 0]

        Site.withStatelessSession {
//            StatelessSession session = sessionFactory.openStatelessSession()
//            Transaction tx = session.beginTransaction()
            values.each { mapData ->
                //bindData(new Site(), mapData,importId).save(flush:true)
                Site.newInstance(bindData(mapData,importId)).save(flush:true)
                insertInfo.totalInsert++
            }
//            tx.commit()
//            session.close()
        }

        return insertInfo
    }
    def updateRecords(ArrayList<Map> listDataUpdate) {
        Map updateInfo = [totalUpdate: 0, totalFail: 0]

        def sites = Site.findAllByAdminCodeInList(listDataUpdate['Admin Code'] as List<Integer>)
        Integer i=0

        Site.withStatelessSession {

            sites.each {
               it.properties=  bindData(listDataUpdate[i],null)
                it.save(flush:true)
                updateInfo.totalUpdate++
                i++
            }


        }
        return updateInfo

    }
//---------------------------------------------------------

    def exportExcel(String fileName,def response,Integer adminCode,Integer importHistoryId,String officialSiteName,String hubSite,def resultList){

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
                putCellValue(headerRow, 55 ,"Hub Site")


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
    }



//######### sub service #########
    def listSite(PaginationCommand pagination, Integer adminCode, String officialSiteName, String hubSite, Integer importHistoryId){
        def resultList = Site.createCriteria().list (pagination.params) {
            or {
                if (adminCode){
                    eq("adminCode",adminCode)
                }
                if (officialSiteName){
                    ilike("officialSiteName","%${officialSiteName}%")
                }
                if (hubSite){
                    ilike("hubSite","%${hubSite}%")
                }
                if (importHistoryId){
                    eq("importHistoryId",importHistoryId)
                }
            }
        }
        return resultList
    }
}
