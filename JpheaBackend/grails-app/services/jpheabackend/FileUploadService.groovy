package jpheabackend

import com.hanuman.simplegeneric.PaginationCommand
import grails.gorm.transactions.Transactional
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import org.hibernate.StatelessSession
import org.hibernate.Transaction
import org.springframework.transaction.annotation.Propagation

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
        importHistoryService.save(history,result)

        return result
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
