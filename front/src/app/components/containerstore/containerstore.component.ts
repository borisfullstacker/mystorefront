import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { DataComunicationsService } from '../../services/data-comunications.service';
import { CartComponent } from "../elements/cart/cart.component";

@Component({
  selector: 'app-containerstore',
  templateUrl: './containerstore.component.html',
  styleUrls: ['./containerstore.component.css']
})
export class ContainerstoreComponent implements OnInit {
  @ViewChild(CartComponent) orderController
  @ViewChild("inp") nameField;

  showFinal: boolean=false
  productToSearch: any=""

  productToMark: any=""
  showIcon: boolean = false
  order: boolean = false;
  orderClass: string=""
  auth: boolean = false // admin autentication - responsiable for showing app-admin
  transition="hideAdmin" // hides and show elements within app-admin
  adminIcon=true // hides and show elements within app-admin
  constructor(private request:StoreService, private data:DataComunicationsService) { }

  ngOnInit() {

   if (!this.order) this.orderClass="col-lg-8"



  }

  showAdmin(){
  var cont= document.querySelector(".col-lg-12")
  
  if (cont!==null)  {
     this.transition="col-lg-4 showAdmin"
     this.adminIcon=false;
     cont.classList.replace("col-lg-12","col-lg-8")  
    }
  }


  hideAdmin(){
    this.transition="hideAdmin"
    var cont= document.querySelector(".col-lg-8")
    cont.classList.replace("col-lg-8","col-lg-12")

    this.adminIcon=true;
   
 }

  search(){
  if (this.productToSearch!==""){
    this.request.searchProduct(this.productToSearch).subscribe(data=> {this.data.updateList(data)
        this.productToSearch=""
    })
  }else{
    this.nameField.nativeElement.focus();
  }
  }


  close(){
    var cont= document.querySelector(".col-lg-4")
        cont['style'].display="none";
        var cont2= document.querySelector(".col-lg-8")
        cont2.classList.replace("col-lg-8","col-lg-12")
        this.showIcon=true

  }

  open(){
    var cont= document.querySelector(".col-lg-4")
        cont['style'].display="block";
        var cont2= document.querySelector(".col-lg-12")
        cont2.classList.replace("col-lg-12","col-lg-8")
        this.showIcon=false

  }

  purchase(){
    this.order=true;
    this.productToMark=""
  }


  receiveBoolFromChild($event) {
    
    if ($event) {
      this.orderClass="col-lg-8 order"

    }else{
      this.orderClass="col-lg-8"

    }
    this.productToMark=""
    this.order=($event);
  }

  showFinalPage($event){
    this.showFinal=($event);
  }

  authenticateAdmin($event){
    this.auth=$event
  }


  activateAdmin(){
    this.showAdmin();
  }
}
