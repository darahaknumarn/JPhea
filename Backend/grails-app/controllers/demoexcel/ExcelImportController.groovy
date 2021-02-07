package demoexcel

import grails.converters.JSON




class ExcelImportController {
    def excelImportService


    def uploadFile() {
        def file = params.filesName

        println file.getClass()
        ArrayList<Map> listSummireFileUpload = new ArrayList<>()
            file.each {
                listSummireFileUpload.add(excelImportService.loadDataFromFile(it))
            }
            render(listSummireFileUpload) as JSON
    }

}
