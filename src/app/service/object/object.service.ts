import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IObjects } from 'src/app/interfaces/mapInterfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  observer: Subject<IObjects[]> = new Subject();
  public subscriber$: Observable<IObjects[]> = this.observer.asObservable();
  constructor(private http: HttpClient) {
    
  }

  getAll(): Observable<IObjects[]> {
    return this.http.get<IObjects[]>('https://raw.githubusercontent.com/waliot/test-tasks/master/assets/data/frontend-1-dataset.json')
  };

  emitData(data: IObjects[]) {
    this.observer.next(data);
  }
}
