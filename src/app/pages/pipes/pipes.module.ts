import { NgModule } from '@angular/core';
import { DateFormatPipe } from './date-format.pipe';
import { CurrencyFormatPipe } from './currency-format.pipe';

@NgModule({
  declarations: [DateFormatPipe, CurrencyFormatPipe],
  exports: [DateFormatPipe, CurrencyFormatPipe]
})
export class PipeModule {}