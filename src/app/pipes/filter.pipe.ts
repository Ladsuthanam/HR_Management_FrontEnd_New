import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;  
    }
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item =>
      item.studentId.toString().toLowerCase().includes(searchTerm) ||
      item.firstName.toLowerCase().includes(searchTerm) ||
      (item.date && item.date.toLocaleDateString().toLowerCase().includes(searchTerm))
    );
  }
}
