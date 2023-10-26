import { TestBed } from '@angular/core/testing';

import { ObjectService } from './object.service';
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

const example = [{
  id: 1,
  name: 'Ваз',
  longitude: 1001,
  latitude: 1000
}]

describe('Сервис объекта ', () => {
  let service: ObjectService;
  const fakeHttpClient = jasmine.createSpyObj('fakeHttpClient', ['get'])

  beforeEach(() => {
    fakeHttpClient.get.and.returnValue(of(example))
    TestBed.configureTestingModule({
      providers: [{
        provide: HttpClient, useValue: fakeHttpClient
      }]
    });
    service = TestBed.inject(ObjectService);
  });

  it('Должен создавать экземпляр класса', () => {
    expect(service).toBeTruthy();
  });

  it('getAll должен вовращать Observable', () => {
    expect(service.getAll()).toEqual(fakeHttpClient.get());
  });

  it('emitData должен записывать новые данные в Subject', done=> {
    let objects = {}
    service.observer.subscribe((data) => {
      objects = data
    })
    service.emitData(example)
    expect(objects).toEqual(example)
    done()
  });
});
