package demoexcel

import grails.gorm.transactions.Transactional

@Transactional
class ImportHistoryService {
    def springSecurityService


    ImportHistory saveDefault(ImportHistory history) {
        history.created = new Date()
        history.importBy = springSecurityService.principal.username
        history.save(flush: true)
    }

    ImportHistory saveForInsert(ImportHistory history, Map uploadInfo) {
        history.totalRecodeInsert = uploadInfo.totalInsert as Integer
        history.totalInsertRecodeFail = uploadInfo.totalFail as Integer
        history.save(flush: true)
    }

    ImportHistory saveForUpdate(ImportHistory history, Map uploadInfo){
        history.totalRecodeUpdate = uploadInfo.totalUpdate as Integer
        history.totalRecodeUpdateFail = uploadInfo.totalFail as Integer
        history.save(flush: true)
    }

    ImportHistory save(ImportHistory history, Map uploadInfo){
        history.fileName = uploadInfo.fileInfo
        history.totalRecodeInsert = uploadInfo.insertInfo.totalInsert as Integer
        history.totalInsertRecodeFail = uploadInfo.insertInfo.totalFail as Integer
        history.totalRecodeUpdate = uploadInfo.updateInfo.totalUpdate as Integer
        history.totalRecodeUpdateFail = uploadInfo.updateInfo.totalFail as Integer
        history.save(flush: true)
    }
}
