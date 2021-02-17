package jpheabackend

class ImportHistory {
    String importBy
    Date created
    String fileName
    String sheetName
    Integer totalRecodeInsert
    Integer totalInsertRecodeFail
    Integer totalRecodeUpdate
    Integer totalRecodeUpdateFail


    static constraints = {
        fileName nullable: true
        sheetName nullable: true
        totalRecodeInsert nullable: true
        totalInsertRecodeFail nullable: true
        totalRecodeUpdate nullable: true
        totalRecodeUpdateFail nullable: true
        importBy nullable: true
    }
}
