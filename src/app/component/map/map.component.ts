import { OnInit, Component} from '@angular/core';
import { IObjects } from 'src/app/interfaces/mapInterfaces';
import { MapService } from 'src/app/service/map/map.service';
import { ObjectService } from 'src/app/service/object/object.service';
import { mapOptions } from 'src/app/utils/const';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  objects: IObjects[] = [];
  loading: boolean = false;

  constructor(private objectService: ObjectService, private mapService: MapService) {

  }

  ngOnInit(): void {
    this.loading = true
    this.objectService.getAll().subscribe((objects) => {
      this.objects = objects
      this.objectService.emitData(objects)
      this.mapService.initMap(mapOptions, this.objects)
      this.loading = false
    })
  }
}

