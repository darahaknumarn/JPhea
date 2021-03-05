package demoexcel

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/api/excel"(resources: "fileUpload")
        "/api/import"(resources: "ImportHistory")

        "/api/excel/upload"(controller: "fileUpload", action: "uploadFile")
        "/api/excel/export"(controller: "fileUpload", action: "exportFile")

        "/api/excel/siteTemplate"(controller: "fileUpload", action: "getSiteTemplate")
        "/api/excel/report/RptSiteInfo"(controller: "fileUpload", action: "exportRptInfoSiteReport")
        "/api/excel/report/RptSiteDown"(controller: "fileUpload", action: "exportRptSiteDownReport")
    }
}
