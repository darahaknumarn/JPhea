import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle } from 'leaflet';

@Component({
  selector: 'app-leaflet-map-report',
  templateUrl: './leaflet-map-report.component.html',
  styleUrls: ['./leaflet-map-report.component.scss']
})
export class LeafletMapReportComponent implements OnInit {

  lat: number = 11.540324
  lng: number = 104.90128910000001

  mapList: any[] = [{radius: 3000}, {radius: 10000}]
  constructor() { }

  ngOnInit(): void {
  }

  options = {
    layers: [
      // view map layer
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        detectRetina: true,
        maxZoom: 18
      })
    ],
    zoom: 6,
    center: latLng([ this.lat, this.lng ])
  }

  layers = [ 
    circle([ this.lat, this.lng ], { radius: 5000, color: "red" }).bindPopup("<b>Welcome</b> <br/> Cuty").openPopup(),
    circle([ 10.594242, 104.164032], { radius: 1000, color: "red" }).bindPopup("<b>Welcome</b> <br/> Kitty").openPopup()
  ];
  
}
