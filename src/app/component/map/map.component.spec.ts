import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ObjectService } from 'src/app/service/object/object.service';
import { MapService } from 'src/app/service/map/map.service';
import { of } from "rxjs";
import { mapOptions } from "../../utils/const";
import {IObjects} from "../../interfaces/mapInterfaces";

const example = [{
  id: 1,
  name: 'Ваз',
  longitude: 1001,
  latitude: 1000
}]
describe('MapComponent ', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  const fakeObjectService = jasmine.createSpyObj('fakeObjectService', ['getAll', 'emitData']);
  const fakeMapService = jasmine.createSpyObj('fakeMapService', ['initMap']);

  beforeEach(() => {
    fakeObjectService.getAll.and.returnValue(of(example))
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      providers: [{
        provide: ObjectService, useValue: fakeObjectService,
      },
        {
          provide: MapService, useValue: fakeMapService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('Должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('ObjectService getAll должен вызываться при инициализации', () => {
    fakeObjectService.getAll.calls.reset()
    component.ngOnInit()
    expect(fakeObjectService.getAll).toHaveBeenCalled()
  });

  it('ObjectService emitData должен вызываться при инициализации и в качестве аргумента передавать полученные объекты', () => {
    fakeObjectService.emitData.calls.reset()
    component.ngOnInit()
    expect(fakeObjectService.emitData).toHaveBeenCalledWith(example)
  });

  it('MapService initMap должен вызываться при инициализации и в качестве аргумента передавать полученные объекты', () => {
    fakeMapService.initMap.calls.reset()
    component.ngOnInit()
    expect(fakeMapService.initMap).toHaveBeenCalledWith(mapOptions, example)
  });

  it('ObjectService должен получать объекты', done => {
    fakeObjectService.getAll().subscribe((objects: any) => {
      component.objects = objects
      expect(component.objects).toEqual(example)
      done()
    })
  });
});
