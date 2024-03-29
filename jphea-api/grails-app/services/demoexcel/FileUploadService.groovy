package demoexcel

import grails.gorm.transactions.Transactional
import hanuman.simplegenericrestfulcontroller.generic.PaginationCommand
import hanuman.simplegenericrestfulcontroller.generic.RespondDTO
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import org.springframework.transaction.annotation.Propagation
import pl.touk.excel.export.WebXlsxExporter


@Transactional(propagation = Propagation.REQUIRES_NEW)
class FileUploadService {
    def importHistoryService
    def loggerService




//######### upload-save service #########
    def loadDataFromFile(def file, RespondDTO dto) {

        if (file.isEmpty()){
            dto.message = "File is empty."
            return []
        }

        FileInputStream fs =file.getInputStream()
        def workbook = new XSSFWorkbook(fs)
        def sheet = workbook.getSheetAt(0)

        //check null data
        if (!sheet.getRow(0)){
            dto.message = "Site List Header is Invalid."
            return []
        }


        //column header
        def sheetheader = []
        for (cell in sheet.getRow(0).cellIterator()) {
            sheetheader << cell.stringCellValue.trim()
        }


        //check wrong Header
        List<String> tempList = new ArrayList<>()
        List<String> cloneSheetheader = sheetheader.clone()
        cloneSheetheader.sort()
        int i = 0
        listFileHeader().sort().each {
            if (it!=cloneSheetheader[i]){
                tempList.add("Colum Header \'${it}\' is not match with \'${cloneSheetheader[i]}\'")
            }
            i++
        }

        if (tempList.size()>0){
            dto.message = "Header is Invalid ${tempList.toString()}."
            return []
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

                        map["${sheetheader[cell.columnIndex]}"] = value.toString()
                        break
                    default:
                        if (cell.CELL_TYPE_BLANK){
                            //do nothing this cell empty
                        }else {
                            value = cell.richStringCellValue
                            map["${sheetheader[cell.columnIndex]}"] = value
                        }
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

        def listAdminCode = Site.findAllByAdminCodeInList(values['Admin Code'] as List<String>)*.adminCode

        values.each { rawData ->

            //if contains we replace old value
            if (listAdminCode.contains(rawData['Admin Code'] )) {
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
            resultOFUpdate = updateRecords(rawDataForUpdate,history.id as Integer)
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
            values.each { mapData ->

                Site site = Site.newInstance(bindData(mapData,importId))
                if (site.save(flush:true)){
                    insertInfo.totalInsert++
                }else {
                    insertInfo.totalFail++
                    loggerService.addError(this,"#### INSERT ERROR : ${site.errors.toString()} ####")
                }
            }
        }

        return insertInfo
    }
    def updateRecords(ArrayList<Map> listDataUpdate,Integer importId) {
        Map updateInfo = [totalUpdate: 0, totalFail: 0]

        def sites = Site.findAllByAdminCodeInList(listDataUpdate['Admin Code'] as List<String>)
        Integer i=0

        Site.withStatelessSession {

            sites.each {
                if (listDataUpdate[i]!=null){
                    it.properties = bindData(listDataUpdate[i],importId)

                    if (it.save(flush:true)){
                        updateInfo.totalUpdate++
                    }
                    else{
                        updateInfo.totalFail++
                        loggerService.addError(this,"#### UPDATE ERROR : ${it.errors.toString()} ####")
                    }
                }
                i++
            }
        }
        return updateInfo

    }


//-------------------list site------------------------------

    def listSite(PaginationCommand pagination, String adminCode, String officialSiteName, String hubSite, Integer importHistoryId, String siteName){
        def resultList = Site.createCriteria().list (pagination.params) {
            or {
                if (adminCode){
                    like("adminCode","%${adminCode}%")
                }
                if (officialSiteName){
                    ilike("officialSiteName","%${officialSiteName}%")
                }
                if (siteName){
                    ilike("siteName","%${siteName}%")
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

    def listSite(Integer adminCode, String officialSiteName, String hubSite){
        def resultList = Site.createCriteria().list() {
            or {
                if (adminCode && adminCode!="null"){
                    eq("adminCode",adminCode)
                }
                if (officialSiteName && officialSiteName!="null"){
                    ilike("officialSiteName","%${officialSiteName}%")
                }
                if (hubSite && hubSite!="null"){
                    ilike("hubSite","%${hubSite}%")
                }
            }
        }
        return resultList
    }

    def listSiteByAdminCode(Integer adminCode){
        Site site = Site.findByAdminCode(adminCode)
        Map searching = [officialSiteName:site?.officialSiteName,adminCode:site?.adminCode,hubSite:site?.hubSite]
        Map mapResult = [filter:searching,resultList:[]]


        //TODO try to change to use Criteria and projection for map data
        /*
        def sites = Site.withCriteria {
            eq("hubSite",site.hubSite)
            resultTransformer(Transformers.aliasToBean(AccountsOverview))
            resultTransformer(CriteriaSpecification.ALIAS_TO_ENTITY_MAP)
            projections {
                property('officialSiteName')
                property('adminCode')
                property('hubSite')
            }
            resultTransformer(CriteriaSpecification.ALIAS_TO_ENTITY_MAP)
            resultTransformer(AliasToEntityMapResultTransformer.INSTANCE)
        }
        mapResult.resultList = sites as List
        println sites*/


        if (site){
            List<Site> siteList = Site.findAllByHubSite(site.hubSite)
            mapResult.resultList = mapSites(siteList)
        }
        return mapResult
    }

    def listSiteByHubSites(List<String> hubSitesFilter){
        List<Site> siteList = Site.findAllByHubSiteInList(hubSitesFilter)

        if (siteList){
            return mapSites(siteList)
        }
        return []
    }


//--------------------Export excel---------------------------

    def exportExcel(String fileName,def response,Integer adminCode,String officialSiteName,String hubSite,def resultList){

        Integer headerRow = 5
        Integer row = headerRow+1
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


            putCellValue(headerRow, 0, "No")
            putCellValue(headerRow, 1 ,"Official Site Name")
            putCellValue(headerRow, 2 ,"SRAN Name")
            putCellValue(headerRow, 3 ,"Site Name")
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
            putCellValue(headerRow, 23 ,"Guard Phone")
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
            putCellValue(headerRow, 55 ,"Hub_Site")


            resultList.each {
                putCellValue(row, 0, no.toString())

                putCellValue(row,1 ,it.officialSiteName?:"")
                putCellValue(row,2 ,it.sRANName?:"")
                putCellValue(row,3 ,it.siteName?:"")
                putCellValue(row,4 ,it.adminCode?:"")
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
                putCellValue(row,23 ,it.guardPhone?:"")
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

    def siteTemplate(def response, String fileName){

        Integer headerRow = 0
        Integer row = headerRow+1
        Integer no = 1

        WebXlsxExporter exporter = new WebXlsxExporter()
        exporter.with {
            setResponseHeaders(response, fileName)

            putCellValue(headerRow, 0 ,"Official Site Name")
            putCellValue(headerRow, 1 ,"SRAN Name")
            putCellValue(headerRow, 2 ,"Site Name")
            putCellValue(headerRow, 3 ,"Admin Code")
            putCellValue(headerRow, 4 ,"Edotco Name")
            putCellValue(headerRow, 5 ,"Product Type")
            putCellValue(headerRow, 6 ,"Site Category")
            putCellValue(headerRow, 7 ,"Longitude")
            putCellValue(headerRow, 8 ,"Latitude")
            putCellValue(headerRow, 9 ,"IBS Site")
            putCellValue(headerRow, 10 ,"Critical Site")
            putCellValue(headerRow, 11 ,"VIP")
            putCellValue(headerRow, 12 ,"e/iMacro BBU Name")
            putCellValue(headerRow, 13 ,"Donner Site")
            putCellValue(headerRow, 14 ,"e/iMacro RRU")
            putCellValue(headerRow, 15 ,"Subcon")
            putCellValue(headerRow, 16 ,"TCU")
            putCellValue(headerRow, 17 ,"NetEco")
            putCellValue(headerRow, 18 ,"Province")
            putCellValue(headerRow, 19 ,"Area  Location")
            putCellValue(headerRow, 20 ,"Priority categories")
            putCellValue(headerRow, 21 ,"Guard")
            putCellValue(headerRow, 22 ,"Guard Phone")
            putCellValue(headerRow, 23 ,"Tower Type")
            putCellValue(headerRow, 24 ,"Tower Height")
            putCellValue(headerRow, 25 ,"Building Height")
            putCellValue(headerRow, 26 ,"Site Type")
            putCellValue(headerRow, 27 ,"Grid")
            putCellValue(headerRow, 28 ,"On air Status")
            putCellValue(headerRow, 29 ,"Site Owner")
            putCellValue(headerRow, 30 ,"Fiber Ring Info")
            putCellValue(headerRow, 31 ,"UniRan/SRAN ID")
            putCellValue(headerRow, 32 ,"S1UIP")
            putCellValue(headerRow, 33 ,"GWS1UIP")
            putCellValue(headerRow, 34 ,"S1UVLANID")
            putCellValue(headerRow, 35 ,"S1CIP")
            putCellValue(headerRow, 36 ,"GWS1CIP")
            putCellValue(headerRow, 37 ,"S1CVLANID")
            putCellValue(headerRow, 38 ,"MMEIP(S1C)")
            putCellValue(headerRow, 39 ,"3GID")
            putCellValue(headerRow, 40 ,"3GIP")
            putCellValue(headerRow, 41 ,"GW3GIP")
            putCellValue(headerRow, 42 ,"3GVLANID")
            putCellValue(headerRow, 43 ,"RNCIP")
            putCellValue(headerRow, 44 ,"RNCName")
            putCellValue(headerRow, 45 ,"2GID")
            putCellValue(headerRow, 46 ,"2GIP")
            putCellValue(headerRow, 47 ,"GW2GIP")
            putCellValue(headerRow, 48 ,"2GVLANID")
            putCellValue(headerRow, 49 ,"BSCIP")
            putCellValue(headerRow, 50 ,"BSCName")
            putCellValue(headerRow, 51 ,"OMIP")
            putCellValue(headerRow, 52 ,"GWOMIP")
            putCellValue(headerRow, 53 ,"OMVLANID")
            putCellValue(headerRow, 54 ,"Hub_Site")


            getDefaultSiteTemplateData().each {

                putCellValue(row,0 ,it.officialSiteName?:"")
                putCellValue(row,1 ,it.sRANName?:"")
                putCellValue(row,2 ,it.siteName?:"")
                putCellValue(row,3 ,it.adminCode?:"")
                putCellValue(row,4 ,it.edotcoName?:"")
                putCellValue(row,5 ,it.productType?:"")
                putCellValue(row,6 ,it.siteCategory?:"")
                putCellValue(row,7 ,it.longitude?:"")
                putCellValue(row,8 ,it.latitude?:"")
                putCellValue(row,9 ,it.ibsSite?:"")
                putCellValue(row,10 ,it.criticalSite?:"")
                putCellValue(row,11 ,it.vip?:"")
                putCellValue(row,12 ,it.e_iMacroBBUName?:"")
                putCellValue(row,13 ,it.donnerSite?:"")
                putCellValue(row,14 ,it.e_iMacroRRU?:"")
                putCellValue(row,15 ,it.subcon?:"")
                putCellValue(row,16 ,it.tcu?:"")
                putCellValue(row,17 ,it.netEco?:"")
                putCellValue(row,18 ,it.province?:"")
                putCellValue(row,19 ,it.areaLocation?:"")
                putCellValue(row,20 ,it.priorityCategories?:"")
                putCellValue(row,21 ,it.guard?:"")
                putCellValue(row,22 ,it.guardPhone?:"")
                putCellValue(row,23 ,it.towerType?:"")
                putCellValue(row,24 ,it.towerHeight?:"")
                putCellValue(row,25 ,it.buildingHeight?:"")
                putCellValue(row,26 ,it.siteType?:"")
                putCellValue(row,27 ,it.grid?:"")
                putCellValue(row,28 ,it.onAirStatus?:"")
                putCellValue(row,29 ,it.siteOwner?:"")
                putCellValue(row,30 ,it.fiberRingInfo?:"")
                putCellValue(row,31 ,it.uniRan_SRAN_ID?:"")
                putCellValue(row,32 ,it.s1UIP?:"")
                putCellValue(row,33 ,it.gws1UIP?:"")
                putCellValue(row,34 ,it.s1UVLANID?:"")
                putCellValue(row,35 ,it.s1CIP?:"")
                putCellValue(row,36 ,it.gwS1CIP?:"")
                putCellValue(row,37 ,it.s1CVLANID?:"")
                putCellValue(row,38 ,it.mMEIP_S1C?:"")
                putCellValue(row,39 ,it._3GID?:"")
                putCellValue(row,40 ,it._3GIP?:"")
                putCellValue(row,41 ,it.gw3GIP?:"")
                putCellValue(row,42 ,it._3GVLANID?:"")
                putCellValue(row,43 ,it.rncIP?:"")
                putCellValue(row,44 ,it.rncName?:"")
                putCellValue(row,45 ,it._2GID?:"")
                putCellValue(row,46 ,it._2GIP?:"")
                putCellValue(row,47 ,it.gw2GIP?:"")
                putCellValue(row,48 ,it._2GVLANID?:"")
                putCellValue(row,49 ,it.bscIP?:"")
                putCellValue(row,50 ,it.bscName?:"")
                putCellValue(row,51 ,it.omIP?:"")
                putCellValue(row,52 ,it.gwOMIP?:"")
                putCellValue(row,53 ,it.omVLANID?:"")
                putCellValue(row,54 ,it.hubSite?:"")
                row++
                no++
            }
            save(response.outputStream)
        }
    }

    def exportRPTInfoSite(Integer adminCode,def filter,def resultList,String fileName,def response){

        Integer headerRow = 8
        Integer row = headerRow+1
        Integer no = 1
        String totalSite

        WebXlsxExporter exporter = new WebXlsxExporter()
        exporter.with {
            setResponseHeaders(response, fileName)
            putCellValue(0, 0, "Searching")
            putCellValue(1, 0, "Admin Code") putCellValue(1, 1, adminCode)
            putCellValue(3, 0, "Official Site Name") putCellValue(3, 1,filter.officialSiteName?:"")
            putCellValue(4, 0, "Admin Code") putCellValue(4, 1, filter.adminCode?:"")
            putCellValue(5, 0, "Hub_Site") putCellValue(5, 1, filter.hubSite?:"")


            putCellValue(headerRow, 0, "No")
            putCellValue(headerRow, 1, "official Site Name")
            putCellValue(headerRow, 2, "Admin Code")
            putCellValue(headerRow, 3, "Hub_Site")

            resultList.each{
                putCellValue(row, 0, no)
                putCellValue(row, 1, it.officialSiteName?:"")
                putCellValue(row, 2, it.adminCode?:"")
                putCellValue(row, 3, it.hubSite?:"")
                no++
                row++
            }
            totalSite = "Total ${no-1} Sites"

            putCellValue(7, 0, totalSite)
            save(response.outputStream)
        }
    }

    def exportRPTSiteDown(List<String> hubSites,def resultList,String fileName,def response){
        Integer headerRow = 7
        Integer row = headerRow+1
        Integer no = 1
        String totalSite

        WebXlsxExporter exporter = new WebXlsxExporter()
        exporter.with {
            setResponseHeaders(response, fileName)
            putCellValue(1, 0, "Searching")
            putCellValue(2, 0, "Hub_Site") putCellValue(2, 1, hubSites.toString().substring(1,hubSites.toString().length()-1))

            putCellValue(headerRow, 0, "No")
            putCellValue(headerRow, 1, "official Site Name")
            putCellValue(headerRow, 2, "Admin Code")
            putCellValue(headerRow, 3, "Hub_Site")

            resultList.each{
                putCellValue(row, 0, no)
                putCellValue(row, 1, it.officialSiteName?:"")
                putCellValue(row, 2, it.adminCode?:"")
                putCellValue(row, 3, it.hubSite?:"")
                no++
                row++
            }
            totalSite = "Total ${no-1} Sites"
            putCellValue(6, 0, totalSite)
            save(response.outputStream)
        }
    }



//######### sub service #########
    private static Map bindData(Map data, Integer importHistoryId) {
        def obj =[:]
        obj.adminCode = data['Admin Code']
        obj.officialSiteName = data['Official Site Name']
        obj.sRANName = data['SRAN Name']
        obj.siteName = data['Site Name']
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
        obj.guardPhone = data['Guard Phone']
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
    private static List<Map> mapSites(List<Site> siteList){
        List<Map> resultList = new ArrayList<>()

        siteList.each {
            Map data = [:]
            data.officialSiteName = it.officialSiteName
            data.adminCode = it.adminCode
            data.hubSite = it.hubSite
            resultList.add(data)
        }

        return resultList
    }
    private static def getDefaultSiteTemplateData(){

        Map simpleData = [:]
        simpleData.officialSiteName = "PP338"
        simpleData.sRANName = "HSoPNH2416CCV"
        simpleData.siteName = "PNH2416CCV"
        simpleData.adminCode = "2416"
        simpleData.edotcoName = "PP338"
        simpleData.productType = "HUAWEI_SRAN"
        simpleData.siteCategory = "HUAWEI_SRAN"
        simpleData.longitude = "104.913"
        simpleData.latitude = "11.66"
        simpleData.ibsSite = ""
        simpleData.criticalSite = ""
        simpleData.vip = ""
        simpleData.e_iMacroBBUName = ""
        simpleData.donnerSite = ""
        simpleData.e_iMacroRRU = ""
        simpleData.subcon = "CTL"
        simpleData.tcu = ""
        simpleData.netEco = ""
        simpleData.province = "PHNOM PENH"
        simpleData.areaLocation = "Urban"
        simpleData.priorityCategories = "P2"
        simpleData.guard = "No site guard"
        simpleData.guardPhone = ""
        simpleData.towerType = "SST"
        simpleData.towerHeight = "12"
        simpleData.buildingHeight = "8"
        simpleData.siteType = "RT"
        simpleData.grid = "yes"
        simpleData.onAirStatus = "On air"
        simpleData.siteOwner = "Edotco"
        simpleData.fiberRingInfo = ""
        simpleData.uniRan_SRAN_ID = "1871"
        simpleData.s1UIP = "10.192.161.82"
        simpleData.gws1UIP = "10.192.161.81"
        simpleData.s1UVLANID = "2020"
        simpleData.s1CIP = "10.192.161.82"
        simpleData.gwS1CIP = "10.192.161.81"
        simpleData.s1CVLANID = "2020"
        simpleData.mMEIP_S1C = "10.136.67.230"
        simpleData._3GID = "537"
        simpleData._3GIP = "10.192.97.82"
        simpleData.gw3GIP = "10.192.97.81"
        simpleData._3GVLANID = "1520"
        simpleData.rncIP = "10.10.68.67"
        simpleData.rncName = "PNHRNC09"
        simpleData._2GID = "263"
        simpleData._2GIP = "10.192.33.82"
        simpleData.gw2GIP = "10.192.33.81"
        simpleData._2GVLANID = "1020"
        simpleData.bscIP = ""
        simpleData.bscName = "PNHBSC03"
        simpleData.omIP = "10.192.225.82"
        simpleData.gwOMIP = "10.192.225.81"
        simpleData.omVLANID = "2520"
        simpleData.hubSite = "3WAY"

        List<Map> result = new ArrayList<>()
        result.add(simpleData)
        result.add(simpleData)
        result.add(simpleData)
        result.add(simpleData)
        result.add(simpleData)

        return result

    }
    private static List<String> listFileHeader(){
        return  [
                "Admin Code",
                "Official Site Name",
                "SRAN Name",
                "Site Name",
                "Edotco Name",
                "Product Type",
                "Site Category",
                "Longitude",
                "Latitude",
                "IBS Site",
                "Critical Site",
                "VIP",
                "e/iMacro BBU Name",
                "Donner Site",
                "e/iMacro RRU",
                "Subcon",
                "TCU",
                "NetEco",
                "Province",
                "Area  Location",
                "Priority categories",
                "Guard",
                "Guard Phone",
                "Tower Type",
                "Tower Height",
                "Building Height",
                "Site Type",
                "Grid",
                "On air Status",
                "Site Owner",
                "Fiber Ring Info",
                "UniRan/SRAN ID",
                "S1UIP",
                "GWS1UIP",
                "S1UVLANID",
                "S1CIP",
                "GWS1CIP",
                "S1CVLANID",
                "MMEIP(S1C)",
                "3GID",
                "3GIP",
                "GW3GIP",
                "3GVLANID",
                "RNCIP",
                "RNCName",
                "2GID",
                "2GIP",
                "GW2GIP",
                "2GVLANID",
                "BSCIP",
                "BSCName",
                "OMIP",
                "GWOMIP",
                "OMVLANID",
                "Hub_Site"
        ]
    }
}
