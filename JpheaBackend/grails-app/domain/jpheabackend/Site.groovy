package jpheabackend

class Site {

    Integer adminCode
    String officialSiteName
    String sRANName
    String bTSNameNoTech
    String edotcoName
    String productType
    String siteCategory
    Double longitude
    Double latitude
    String ibsSite
    String criticalSite
    String vip
    String e_iMacroBBUName
    String donnerSite
    String e_iMacroRRU
    String subcon
    String tcu
    String netEco
    String province
    String areaLocation
    String priorityCategories
    String guard
    String guardPhnone
    String towerType
    Double towerHeight
    Double buildingHeight
    String siteType
    String grid
    String onAirStatus
    String siteOwner
    String fiberRingInfo
    Integer uniRan_SRAN_ID
    String s1UIP
    String gws1UIP
    String s1UVLANID
    String s1CIP
    String gwS1CIP
    String s1CVLANID
    String mMEIP_S1C
    Integer _3GID
    String _3GIP
    String gw3GIP
    String _3GVLANID
    String rncIP
    String rncName
    Integer _2GID
    String _2GIP
    String gw2GIP
    Integer _2GVLANID
    String bscIP
    String bscName
    String omIP
    String gwOMIP
    String omVLANID
    String hubSite
    Integer importHistoryId


    static constraints = {
        adminCode nullable: false

        officialSiteName nullable: true
        sRANName nullable: true
        bTSNameNoTech nullable: true
        edotcoName nullable: true
        productType nullable: true
        siteCategory nullable: true
        longitude nullable: true
        latitude nullable: true
        ibsSite nullable: true
        criticalSite nullable: true
        vip nullable: true
        e_iMacroBBUName nullable: true
        donnerSite nullable: true
        e_iMacroRRU nullable: true
        subcon nullable: true
        tcu nullable: true
        netEco nullable: true
        province nullable: true
        areaLocation nullable: true
        priorityCategories nullable: true
        guard nullable: true
        guardPhnone nullable: true
        towerType nullable: true
        towerHeight nullable: true
        buildingHeight nullable: true
        siteType nullable: true
        grid nullable: true
        onAirStatus nullable: true
        siteOwner nullable: true
        fiberRingInfo nullable: true
        uniRan_SRAN_ID nullable: true
        s1UIP nullable: true
        gws1UIP nullable: true
        s1UVLANID nullable: true
        s1CIP nullable: true
        gwS1CIP nullable: true
        s1CVLANID nullable: true
        mMEIP_S1C nullable: true
        _3GID nullable: true
        _3GIP nullable: true
        gw3GIP nullable: true
        _3GVLANID nullable: true
        rncIP nullable: true
        rncName nullable: true
        _2GID nullable: true
        _2GIP nullable: true
        gw2GIP nullable: true
        _2GVLANID nullable: true
        bscIP nullable: true
        bscName nullable: true
        omIP nullable: true
        gwOMIP nullable: true
        omVLANID nullable: true
        hubSite nullable: true

    }


    static mapping = {
        dynamicUpdate true

    }

/*    static {
        JSON.registerObjectMarshaller(this){
            Map<String,jpheabackend.Site> site = new LinkedHashMap<>(it.properties)
            site.id = it.id
            site.siteOwner = it.siteOwner
            site.adminCode = it.adminCode
            site.sRANName = it.sRANName
            site.bTSNameNoTech = it.bTSNameNoTech
            site.siteCategory = it.siteCategory
            site.latitude = it.latitude
            site.longitude = it.longitude

            return site
        }
    }*/
}
