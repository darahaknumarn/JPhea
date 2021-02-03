package demoexcel

import grails.events.annotation.Publisher
import grails.events.annotation.Subscriber
import grails.gorm.transactions.Transactional
import org.apache.poi.xssf.usermodel.XSSFWorkbook

@Transactional
class ExcelImportService {

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

    @Publisher
    def loadDataFromFile(def file){

        def workbook = new XSSFWorkbook(file.getInputStream())
        def sheet = workbook.getSheetAt(0)

        //column header
        def sheetheader = []
        for (cell in sheet.getRow(0).cellIterator()) {
            sheetheader << cell.stringCellValue
        }
        def headerFlag = true


        //column data
        def values = []
        for (row in sheet.rowIterator()) {

            //annoy row header
            if (headerFlag) {
                headerFlag = false
                continue
            }


            def value = ''
            def map = [:]
            for (cell in row.cellIterator()) {
/*                    if (cell.cellType==0){
                        value = cell.numericCellValue
                    }else {
                        value = cell.stringCellValue
                    }
                    map["${excelImportService.validateHeader(DemoExcel.declaredFields, sheetheader[cell.columnIndex] as String)}"] = value*/
                switch (cell.cellType) {
                    case 1:
                        value = cell.stringCellValue
                        map["${sheetheader[cell.columnIndex]}"] = value
                        break
                    case 0:
                        value = cell.numericCellValue
                        map["${sheetheader[cell.columnIndex]}"] = value
                        break
                    default:
                        value = ''
                }
            }
            if (map)
            values.add(map)
        }
        return values
    }

    @Subscriber
    void loadDataFromFile(List<Map> mapList){
        mapList.each { mapData->
            DemoExcel demoExcel = DemoExcel.findByAdminCode(mapData['Admin Code'] as Integer)
            if (!demoExcel) {
                demoExcel = new DemoExcel()
            }
            bindData(demoExcel,mapData)
            demoExcel.save flush: true, failOnError: true
        }
    }
}
