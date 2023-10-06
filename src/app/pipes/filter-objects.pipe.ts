import { Pipe, PipeTransform } from '@angular/core';
import { IObjects } from 'src/app/interfaces/mapInterfaces';

@Pipe({
  name: 'filterObjects'
})
export class FilterObjectsPipe implements PipeTransform {

  transform(objects: IObjects[], search: string): IObjects[] {
    return objects.filter(object => object.name.toLowerCase().includes(search.toLowerCase()))
  }
}
