import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPanelComponent } from './map-panel.component';

describe('MapPanelComponent', () => {
  let component: MapPanelComponent;
  let fixture: ComponentFixture<MapPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapPanelComponent]
    });
    fixture = TestBed.createComponent(MapPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
