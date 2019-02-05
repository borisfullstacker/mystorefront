import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';




@Pipe({
  name: 'marker'
})

export class MarkerPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}


  transform(value, valueToSearch) {
    if (!valueToSearch) {
      return value;
    }
    const re = new RegExp(valueToSearch, 'gi');
    const match = value.match(re);
    
    // If there's no match, just return the original value.
    if (!match) { 
      return value;
    }

    value = value.replace(re, "<mark style='background-color:darkorange; padding:0'>" + match[0] + "</mark>")
    return this.sanitizer.bypassSecurityTrustHtml(value)

  
  }



}
