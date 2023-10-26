import { TestBed } from '@angular/core/testing';
import { MapService } from './map.service';

describe('Сервис карты ', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapService);
  });

  it('Должен создавать экземпляр класса', () => {
    expect(service).toBeTruthy();
  });
});
