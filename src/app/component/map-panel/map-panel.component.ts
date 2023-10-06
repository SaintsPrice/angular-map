import { Component, OnInit } from '@angular/core';
import { IMapOptions, IObjects } from 'src/app/interfaces/mapInterfaces';
import { MapService } from 'src/app/service/map/map.service';
import { ObjectService } from 'src/app/service/object/object.service';

@Component({
  selector: 'app-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.css']
})
export class MapPanelComponent implements OnInit {

  objects: IObjects[] = [];
  text: string = '';
  select: number = -1

  constructor(private objectService: ObjectService, private mapService: MapService) {

  }

  ngOnInit(): void {
    this.objectService.subscriber$.subscribe(data => {
      this.objects = data
    })
  }

  handleIsActive(id: number): void {
    id === this.select ? this.select = -1 : this.select = id
    const object: IObjects = this.objects.filter(obj => obj.id === id)[0]
    const newMapOptions: IMapOptions = {
      latitude: object.latitude,
      longitude: object.longitude,
      zoom: 10
    }
    this.mapService.initMap(newMapOptions, this.objects)
  }

}
