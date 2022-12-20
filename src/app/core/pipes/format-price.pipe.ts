import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'formatPriceGarant'
})
export class FormatPriceGarantPipe implements PipeTransform {
    transform(value: any, args?: any): string | null {
        if (!value) {
            return null;
        }
        return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    };
}
