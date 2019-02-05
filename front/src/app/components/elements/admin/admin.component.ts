import { Component, OnInit } from '@angular/core';
import { DataComunicationsService } from '../../../services/data-comunications.service';
import { Subscription } from '../../../../../node_modules/rxjs/internal/Subscription';
import { StoreService } from '../../../services/store.service';
import {  Validators, FormBuilder, FormGroup } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  submitted: boolean=false
  FormGroup: FormGroup;
  dataChangesSubscription: Subscription;
  categories: any=[]
  categoryMsg: string=""
  categoryname: any=[{name:""}]
  nameMsg: string= ""
  urlMsg: string=""


  product: any={}
  constructor(private data:DataComunicationsService, private request:StoreService, private _formBuilder: FormBuilder) { 

    this.request.getCategoryList().subscribe((data)=>{

      this.categories= data['categorylist']


    });
  }


  cleanForm(){
    this.categoryMsg=""
    this.submitted=false
    this.FormGroup.setValue({
      category:"",
      categoryid:"",
      price:"",
      name:"",
      picture:"",
      id: '',
    });
  }


  ngOnInit() {
    this.FormGroup = this._formBuilder.group({          
      category: [''],
      id: [''],
      name: ['',Validators.maxLength(50)],
      picture: ['',Validators.maxLength(100)],
      price: [''],
      categoryid:['']

    },  {validator:[this.validateCategoryName("category"),this.validateName("name"),this.validateUrl("picture")]})

 this.dataChangesSubscription= this.data.currentEditData.subscribe(data=>{

    if (data!=="" && this.categories.length!==0){

        this.product=data;
        this.categoryname=(this.categories.filter((obj)=> obj.id===this.product.categoryid))
        this.FormGroup.setValue({
          category:this.categoryname[0].name,
          id:this.product.id,
          price:this.product.price,
          name:this.product.name,
          picture:this.product.picture,
          categoryid:this.product.categoryid,

        });
    }
    })


  }
  validateName(name){
    return (orderFormGroup ) => {
      const control = orderFormGroup.controls[name];
      if (control.value.length>49){
        this.nameMsg="name is too long"
      }else{
        this.nameMsg=""
      }

    }
  }
  validateUrl(name){
    return (orderFormGroup ) => {
      const control = orderFormGroup.controls[name];
      if (control.value.length>100){
        this.urlMsg="link is too long"
      }else{
        this.urlMsg=""
      }

    }

  }


  validateCategoryName(name){
    
    return (orderFormGroup ) => {
    const control = orderFormGroup.controls[name];
    if (control.value ==="") {
     this.categoryMsg=""
      return;  
    }
    let obj=this.categories.map((obj)=>obj.name)
    if (obj.includes(control.value)){
      control.setErrors(null);
      this.categoryMsg=""
    }else{
        control.setErrors({validateCityName:true});
        this.categoryMsg="Please select a category from drop down"
    }
  }
  }  

  submit(){

  if (this.FormGroup.invalid || this.FormGroup.value.name===""|| this.FormGroup.value.price===null|| this.FormGroup.value.price===""|| this.FormGroup.value.picture==="" || this.FormGroup.value.category==="") {
     this.submitted=true;
    return;
  }

  this.submitted=false;
   if(this.FormGroup.value.id===""){
     let obj= this.categories.filter((obj)=>obj.name=== this.FormGroup.value.category)
     let objToSend= Object.assign({},this.FormGroup.value)
     objToSend.categoryid=obj[0].id

     delete objToSend.category
     delete objToSend.id
     this.request.addNewProduct(objToSend).subscribe((data)=>{
       objToSend.id=data['insertId']
       this.data.updateList({addNew:objToSend})
})

     this.cleanForm()
   }else{
     
     let obj= this.categories.filter((obj)=>obj.name=== this.FormGroup.value.category)
     let objToSend= Object.assign({},this.FormGroup.value)
     objToSend.categoryid=obj[0].id;
     
     delete objToSend.category
     this.data.updateList({addExisting:objToSend})
     this.request.updateAProduct(objToSend).subscribe((err)=>{})

     this.cleanForm()

     }
     

  }

ngOnDestroy(){
  this.dataChangesSubscription.unsubscribe()
}


}
