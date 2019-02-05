import { Component, OnInit } from '@angular/core';
import { DataComunicationsService } from '../../../services/data-comunications.service';
import { StoreService } from '../../../services/store.service';
import {Subscription } from '../../../../../node_modules/rxjs';
import moment from 'moment';

@Component({
  selector: 'app-c',
  templateUrl: './c.component.html',
  styleUrls: ['./c.component.css']
})
export class CComponent implements OnInit {
showMsg:boolean=false
state:number=0;
storeCount: any ={}
dataChangesSubscription: Subscription;

  constructor(private data:DataComunicationsService, private request:StoreService) { }

  ngOnInit() { 
    this.request.storeCount().subscribe((data)=>{this.storeCount=data});

    this.dataChangesSubscription=this.data.currentMessage.subscribe((data)=>{
     if (data!==""){ 
      this.showMsg=true; 
       this.manageDom(data);
     }else{
      document.querySelector('.msg').innerHTML=``
      this.showMsg=false; 
     }
    })
  }

  manageDom(data){
    let dateOpened=moment(data["res"].cartdetails.dateopened).format('MMMM Do YYYY, h:mm:ss a')
    let purchaseDate=moment(data["res"].userdetails.lastorder.purchasedate).format('MMMM Do YYYY, h:mm:ss a')

    if(data["res"].cartdetails.active==false && data["res"].userdetails.lastorder.finalprice===null){
       document.querySelector('.msg').innerHTML=`Welcome ${data["res"].userdetails.name} ${data["res"].userdetails.lastname} start shopping! `
    }else if(data["res"].cartdetails.active==true && data["res"].cartdetails.totalprice!==null){
      document.querySelector('.msg').innerHTML=`You have an open cart from :<br/> ${dateOpened} <br/> Total price: <span>${data["res"].cartdetails.totalprice} $</span>`

    }else if(data["res"].cartdetails.totalprice===null && data["res"].userdetails.lastorder.finalprice===null){
      document.querySelector('.msg').innerHTML=`Welcome ${data["res"].userdetails.name} ${data["res"].userdetails.lastname} start shopping! `

    }
     else{
      document.querySelector('.msg').innerHTML=`Welcome back! your last purchase was on:<br/> ${purchaseDate}`
    }
}

ngOnDestroy() {
  this.dataChangesSubscription.unsubscribe();

}



}

