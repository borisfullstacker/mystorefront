

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Subscription } from 'node_modules/rxjs';
import { DataComunicationsService } from '../../../services/data-comunications.service';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import { AmountModalComponent } from '../amount-modal/amount-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products: any= [] // view (also filtterd)
fullProductList: any=[] // full array
dataChangesSubscription: Subscription;
filtered : boolean =false
SearchMsg: string=""


@Input("showEditBtn") private isShown: boolean; 
@Output() activateAdmin = new EventEmitter<any>();


  constructor(private request:StoreService, private data:DataComunicationsService, public dialog: MatDialog) { 

 
  }

  openDialog(product) {
    this.dialog.open(AmountModalComponent,{data: {
      data: product
    }
  });
  }

  ngOnInit() {
      
    this.SearchMsg=""

     this.request.getAllStoreProducts().subscribe(data=>{
       this.fullProductList=data['products']

     this.products=Object.assign([],this.fullProductList);


    })

    this.dataChangesSubscription= this.data.currentProducts.subscribe(data=>{

      this.SearchMsg=""

      if (data.products!==undefined &&  data['products'].length===0){
        this.SearchMsg="No search results"
      }

      if (data.filtered!== undefined) this.filtered=data.filtered
      if (data!==""){
        let action = Object.keys(data)
        switch(action[0])
        {
          // Object.assign([],this.fullProductList)
        case("addNew"):

            this.fullProductList.push(data.addNew);
           
           if(this.products.length===0||data.addNew.categoryid===this.products[0].categoryid ){
                this.products.push(data.addNew)

           }else if(!this.filtered){
                 this.products.push(data.addNew)
           }
   
       
            break;

        case("addExisting"):
            let updated= this.products.map(product=>{
                   let obj=Object.assign({},product);
         
                   if (obj.id===data.addExisting.id && obj.categoryid!==data.addExisting.categoryid && this.filtered){
          
                        return obj.de="delete";
                   }else if(obj.id===data.addExisting.id){
                       obj=data.addExisting
                  }

                   return obj
              })
              if (updated.indexOf("delete")!==-1) updated.splice(updated.indexOf("delete"),1)
              this.products=Object.assign([],updated);
                 
              break;
        default :
              this.products=data.products
        }
              
      } 
   
      else{
        this.filtered=false
        this.request.getAllStoreProducts().subscribe((data)=>this.products=data['products'])

          }
    })
  }

  sendDataToAppAdmin(product){
        this.activateAdmin.emit()

        this.data.updateEditPage(product)
  }


  ngOnDestroy(){
    this.dataChangesSubscription.unsubscribe()
  }
  

  }

