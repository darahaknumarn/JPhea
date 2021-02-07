package demoexcel

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

//        "/"(view:"/index")
//        "500"(view:'/error')
//        "404"(view:'/notFound')

        "/api/excel/upload"(controller: "excelImport", action: "uploadFile")
        "/api/excel/export"(controller: "excelImport", action: "exportFile")
        "/api/excel"(resources: "excelImport")
    }
}
