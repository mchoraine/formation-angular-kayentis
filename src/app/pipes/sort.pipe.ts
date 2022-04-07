import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../model/product';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: Product[] | null, sortKey: keyof Product): Product[] | null {
    return value && [...value].sort((p1, p2) => {
      return p1[sortKey].toString().localeCompare(p2[sortKey].toString())
    });
  }
}
