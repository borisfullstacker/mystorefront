import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../../../node_modules/rxjs';
import { DataComunicationsService } from '../../../services/data-comunications.service';
import saveAs from 'file-saver';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-downloadorder',
  templateUrl: './downloadorder.component.html',
  styleUrls: ['./downloadorder.component.css']
})
export class DownloadorderComponent implements OnInit {
  currentCartData: any={}

  dataChangesSubscription: Subscription;
  constructor(private data:DataComunicationsService,private route:Router) {


  }

  ngOnInit() {
    
    this.dataChangesSubscription= this.data.currentOrderData.subscribe((data)=>{
      if (data!==""){
        this.currentCartData=data;
  
      }

    });
  }

  download(){

    let buff=""
    buff=  `${this.currentCartData.userData.userdetails.name} ${this.currentCartData.userData.userdetails.lastname}\r\n\r\n`
    for (let i=0; i<this.currentCartData.cartData.receipt.length; i++){
            buff+= `product: ${this.currentCartData.cartData.receipt[i].name}  quantity: ${this.currentCartData.cartData.receipt[i].quantity} price: ${this.currentCartData.cartData.receipt[i].price}`
            buff+='\r\n'
    }
    buff+="--------------------------------------"
    buff+='\r\n'
    buff+=`total: ${this.currentCartData.cartData.price}`


    var blob = new Blob ([buff],{type:"text/plain;charset=utf-8"})

    saveAs(blob,"MyStore Receipt")
    
  }

  ngOnDestroy(){
    this.dataChangesSubscription.unsubscribe()
  }
}
