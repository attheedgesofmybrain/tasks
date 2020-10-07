import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any): any {
    let date: moment.Moment = moment(value, 'YYYY/MM/DD')
    return date.format('DD/MM/YYYY')
  }

}
