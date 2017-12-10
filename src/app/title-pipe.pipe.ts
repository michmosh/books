import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlePipe'
})
export class TitlePipePipe implements PipeTransform {
  transform(str: string, args?: any): string {
      str = str.replace(/[^a-z0-9\s]+/gi, '');
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

}
