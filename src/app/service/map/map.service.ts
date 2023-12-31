import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { IMapOptions, IObjects } from 'src/app/interfaces/mapInterfaces';
import { IMarkerOptions } from 'src/app/interfaces/mapInterfaces';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _map: any = null;

  constructor() {

  }

  initMap({latitude, longitude, zoom}: IMapOptions, objects?: IObjects[]): void {

    if(this._map === null) {
      this._map = L.map('map').setView([ latitude, longitude ], zoom);
    }

    else {
      this._map.flyTo([latitude, longitude], zoom);
    }

    const icon: L.Icon<L.IconOptions> = L.icon({
      iconUrl: '../../../assets/marker.svg',
      iconSize: [38, 95]
  });

  const iconIsClicked: L.Icon<L.IconOptions> = L.icon({
    iconUrl: '../../../assets/marker-active.svg',
    iconSize: [38, 95]
  });

  if(objects) {
    objects.forEach((object) => {
      const markerOptions: IMarkerOptions = {
        icon: icon,
        title: object.name,
        clickable: true,
        draggable: true
      }
        const marker = L.marker([object.latitude, object.longitude], markerOptions).bindPopup(object.name)

        marker.on('click', (e: L.LeafletMouseEvent) => {
          let isClicked = e.target.options.icon.options.iconUrl === iconIsClicked.options.iconUrl
          e.target.setIcon(isClicked ? icon : iconIsClicked)
        })
        marker.addTo(this._map)
    })
  }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 10,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this._map)
  }

  get map() {
    return this._map
  }
};
