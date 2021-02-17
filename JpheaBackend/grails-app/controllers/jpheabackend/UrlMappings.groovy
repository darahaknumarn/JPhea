package jpheabackend

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        //file upload
        "/api/excel/upload"(controller: "fileUpload", action: "uploadFile")
        "/api/excel/export"(controller: "fileUpload", action: "exportFile")
        "/api/excel/siteTemplate"(controller: "fileUpload", action: "getSiteTemplate")
        "/api/excel"(resources: "fileUpload")
        //---

        //import history
        "/api/import"(resources: "importHistory")

    }
}
