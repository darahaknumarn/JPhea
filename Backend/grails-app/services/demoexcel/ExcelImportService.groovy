package demoexcel

import grails.gorm.transactions.Transactional
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import org.hibernate.StatelessSession
import org.hibernate.Transaction

@Transactional
class ExcelImportService {
    def sessionFactory

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

    private static DemoExcel bindData(DemoExcel obj, def data) {
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
        return obj
    }


    def loadDataFromFile(def file) {

        def workbook = new XSSFWorkbook(file.getInputStream())
        def sheet = workbook.getSheetAt(0)

        Map fileProperties = [:]
        fileProperties.orginalFileName = file.getOriginalFilename()
        fileProperties.sheetName = sheet.sheetName

        //column header
        def sheetheader = []
        for (cell in sheet.getRow(0).cellIterator()) {
            sheetheader << cell.stringCellValue
        }

        //column data
        def values = []

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

        //split data for insert and update to 2 list
        def listAdminCode = DemoExcel.findAllByAdminCodeInList(values['Admin Code'] as List<Integer>)*.adminCode
        ArrayList<Map> rawDataForUpdate = new ArrayList<>()
        ArrayList<Map> rawDataForInsert = new ArrayList<>()


        values.each { rawData ->

            //if contains we replace old value
            if (listAdminCode.contains(rawData['Admin Code'] as Integer)) {
                rawDataForUpdate.add(rawData)

            } else {
                rawDataForInsert.add(rawData)
            }
        }


        //save to Database
        println "im insert ${rawDataForInsert}"
        println "im update ${rawDataForUpdate}"

        Map resultOFInsert=[totalInsert: 0, totalFail: 0]
        Map resultOFUpdate=[totalUpdate: 0, totalFail: 0]

        if (rawDataForInsert){
            resultOFInsert = InsertRecords(rawDataForInsert)
        }
        if (rawDataForUpdate){
            resultOFUpdate = updateRecords(rawDataForUpdate)
        }

        Map result = [:]
        result.fileInfo = fileProperties
        result.insertInfo = resultOFInsert
        result.updateInfo = resultOFUpdate

        return result
    }

    def InsertRecords(def values) {
        Map insertInfo = [totalInsert: 0, totalFail: 0]

        StatelessSession session = sessionFactory.openStatelessSession()
        Transaction tx = session.beginTransaction()


        values.each { mapData ->
            try {

                session.insert(bindData(new DemoExcel(), mapData))
                insertInfo.totalInsert++


            } catch (IOException e) {
                insertInfo.totalFail++
                log.error(e.message)
            }
        }
        tx.commit()
        session.close()

        return insertInfo
    }

    def updateRecords(ArrayList<Map> listDataUpdate) {
        Map updateInfo = [totalUpdate: 0, totalFail: 0]

        StatelessSession session = sessionFactory.openStatelessSession()
        Transaction tx = session.beginTransaction()
        def demoExcel = DemoExcel.findAllByAdminCodeInList(listDataUpdate['Admin Code'] as List<Integer>)


        for (int i = 0; i < demoExcel.size(); i++) {
            try {
                session.update(bindData(demoExcel[i],listDataUpdate[i]))
                updateInfo.totalUpdate++

            } catch (IOException e) {
                updateInfo.totalFail++
                log.error(e.message)
            }
        }
        tx.commit()
        session.close()

        return updateInfo

    }
}
