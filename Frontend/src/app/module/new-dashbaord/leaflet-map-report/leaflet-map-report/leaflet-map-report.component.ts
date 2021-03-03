import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, MapOptions, LayerGroup, marker} from 'leaflet';
import { SiteService } from 'app/services/site.service';

@Component({
  selector: 'app-leaflet-map-report',
  templateUrl: './leaflet-map-report.component.html',
  styleUrls: ['./leaflet-map-report.component.scss']
})
export class LeafletMapReportComponent implements OnInit {

  lat: number = 11.562108; 
  lng: number = 104.888535;
  mapOptions: MapOptions;
  listDataMaps: any[] = [];

  constructor( private siteService: SiteService) { }

  ngOnInit(): void {
    this.initializeMapOptions();

    this.siteService.list().subscribe(res => {
      // add layer for circle
      this.addLayer(res['data'])
    })
  }

  // Init leaflet map report in cambodia.
  private initializeMapOptions() {
    this.mapOptions = {
      // Init Cambodia
      center: latLng([ this.lat, this.lng ]),
      zoom: 6,
      layers: [
         // view map layer
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 18
        })
      ],
    };
  }

  layers = this.listDataMaps;

  // Add layer of circle in leaflet map report
  private addLayer( mapInfo: any[] ) {
    if (!mapInfo) {
      return;
    }

    //populate map from map info
    for (var i in mapInfo) {
      let info = mapInfo[i];
      let circles = circle([ info.latitude, info.longitude ], { radius: mapInfo[i].uniRan_SRAN_ID, color: "blue" }).bindPopup(info.siteOwner).openPopup()
      this.listDataMaps.push(circles)
    }
    
  }

}