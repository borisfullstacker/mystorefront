import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataComunicationsService {

private messageSource = new BehaviorSubject<any>('')
currentMessage= this.messageSource.asObservable()

private products = new BehaviorSubject<any>('')
currentProducts= this.products.asObservable()

private receipt = new BehaviorSubject<any>('')
currentReceipt= this.receipt.asObservable()

private cartdata = new BehaviorSubject<any>('')
currentOrderData= this.cartdata.asObservable()

private editData = new BehaviorSubject<any>('')
currentEditData= this.editData.asObservable()





constructor() { }

// changes name and last name in header
changeMessage(data){
  this.messageSource.next(data);
}

// updates products component
updateList(data){
  
  this.products.next(data);
}

//updates cart (receipt) component
updateReceipt(data){
  this.receipt.next(data);
}

//update cartData in order page
updateOrderPage(data){
  this.cartdata.next(data);
}

updateEditPage(data){
  
  this.editData.next(data)
}


}