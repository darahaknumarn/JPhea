package jpheabackend

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/api/excel/upload"(controller: "fileUpload", action: "uploadFile")
        "/api/excel/export"(controller: "fileUpload", action: "exportFile")
        "/api/excel"(resources: "fileUpload")
    }
}
