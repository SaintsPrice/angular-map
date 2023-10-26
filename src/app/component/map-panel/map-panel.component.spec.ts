import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPanelComponent } from './map-panel.component';
import {ObjectService} from "../../service/object/object.service";
import {MapService} from "../../service/map/map.service";
import {CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform} from "@angular/core";
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

const example = [{
  id: 1,
  name: 'Ваз',
  longitude: 1001,
  latitude: 1000
}]

describe('MapPanelComponent ', () => {
  let component: MapPanelComponent;
  let fixture: ComponentFixture<MapPanelComponent>;
  const fakeObjectService = jasmine.createSpyObj('fakeObjectService', ['emitData']);
  const fakeMapService = jasmine.createSpyObj('fakeMapService', ['initMap']);
  fakeObjectService.subscriber$ = of(example)

  @Pipe({name: 'filterObjects'})
  class fakeFilterObjectsPipe implements PipeTransform {
    transform(value: number): number {
      return value;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [MapPanelComponent, fakeFilterObjectsPipe],
      providers: [{
        provide: ObjectService, useValue: fakeObjectService
      },
        {
          provide: MapService, useValue: fakeMapService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(MapPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  it('При инициализации компонента должен при подписке получать объекты', () => {
    expect(component.objects).toEqual(example);
  });

  it('При клике на элемент должен вызываться метод handleIsActive', () => {
    const fakeHandleIsActive = spyOn(component, 'handleIsActive')
    fakeHandleIsActive.calls.reset()
    const element = fixture.debugElement.query(By.css('.map-panel__element'))
    element.nativeElement.click()
    expect(fakeHandleIsActive).toHaveBeenCalled()
  });

  it('При клике на элемент должен вызываться метод MapService - initMap', () => {
    fakeMapService.initMap.calls.reset()
    const element = fixture.debugElement.query(By.css('.map-panel__element'))
    element.nativeElement.click()
    expect(fakeMapService.initMap).toHaveBeenCalled()
  });

  it('При вызове handleIsActive с параметром id != this.select', () => {
    const fakeHandleIsActive = spyOn(component, 'handleIsActive')
    fakeHandleIsActive.and.callFake((id) => {
      id === component.select ? component.select = -1 : component.select = id
    })
    fakeHandleIsActive(1)
    expect(component.select).toBe(1)
    fakeHandleIsActive(5)
    expect(component.select).toBe(5)
  });

  it('При вызове handleIsActive с параметром id = this.select', () => {
    const fakeHandleIsActive = spyOn(component, 'handleIsActive')
    fakeHandleIsActive.and.callFake((id) => {
      id === component.select ? component.select = -1 : component.select = id
    })
    fakeHandleIsActive(5)
    expect(component.select).toBe(5)
    fakeHandleIsActive(5)
    expect(component.select).toBe(-1)
  });
});
