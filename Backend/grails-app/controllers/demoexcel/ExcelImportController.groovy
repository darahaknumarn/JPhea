package demoexcel

import grails.converters.JSON
import grails.events.annotation.Publisher
import grails.events.annotation.Subscriber
import org.apache.poi.xssf.usermodel.XSSFWorkbook


class ExcelImportController {
    def excelImportService

    @Publisher
    def uploadFile() {
        def file = params.filesName
            file.each {
                excelImportService.loadDataFromFile(it)
            }
            render("Upload Data success") as JSON
        }
}
