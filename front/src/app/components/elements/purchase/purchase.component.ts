import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '../../../../../node_modules/@angular/forms';
import { DataComunicationsService } from '../../../services/data-comunications.service';
import { Subscription } from '../../../../../node_modules/rxjs/internal/Subscription';
import moment from 'moment';
import { StoreService } from '../../../services/store.service';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
 PaymentErrorMsg:string=""
  showLoader:boolean=false
  today: any= new Date
  dataChangesSubscription: Subscription;
  userData: any={}
  currentCartData: any={}
  orderFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  cities: any= ['Tel Aviv',"Kefar Saba","Herzeliya","Raanana","Heifa", "Jerusalem", "Ramat Gan", "Netanya", "Eilat", "Beer Sheva"]
  cardMsg: any=""
  cityMsg: any =""
  submitted: boolean=false
  datesToBLock: any=[]
  payment: boolean=false;
  @Output() messageEvent = new EventEmitter<boolean>();
  

  constructor(private _formBuilder: FormBuilder,private _data:DataComunicationsService, private request:StoreService) { 



  }
  dateFilter = (d: Date): boolean => {
    let counter=0;
     for (let i=0; i<this.datesToBLock.length; i++){
           let dayToBlock= new Date(this.datesToBLock[i].deliverydate)
           if (d.getDate()===dayToBlock.getDate() && d.getMonth()=== dayToBlock.getMonth()){
            counter++
          }
          if(counter===3) return false;  

     }
     return true



 
    }


  ngOnInit() {


    this.request.getAllDeliveryDates().subscribe((data)=>this.datesToBLock=data)
   

    this.dataChangesSubscription= this._data.currentOrderData.subscribe((data)=>{
                  if (data!==""){
                    this.userData=data.userData;
                    this.currentCartData=data.cartData
                  }

    });
 
    this.orderFormGroup = this._formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      deliverydate: ['', Validators.required],
      card: ['', Validators.required],
    },{
      validator:[this.validateCityName("city"),this.validateCard("card")]
    
  });

  }


  submit(){
  
  if (this.orderFormGroup.invalid) {
      this.submitted=true;
      return;
  }
  this.PaymentErrorMsg=""
    this.showLoader=true
    let DateTime= moment().format("YYYY/MM/DD HH:mm:ss")
    let card= this.orderFormGroup.value.card
    let objToSend={
      customerid:this.userData.userdetails.id,
      cartid:this.userData.cartdetails.id,
      finalprice:this.currentCartData.price,
      city:this.orderFormGroup.value.city,
      street:this.orderFormGroup.value.street,
      deliverydate:moment(this.orderFormGroup.value.deliverydate).format("YYYY/MM/DD HH:mm:ss"),
      purchasedate:DateTime,
      card: card.substr(card.length-4,4),
    }

    
     this.request.addPayment(objToSend).subscribe(
       (data)=>{
        if (data["err"]) {
          this.showLoader=false
          this.PaymentErrorMsg=data["err"]
        }else{
          this.showLoader=false
          this.payment=true;
  
          this.messageEvent.emit(this.payment)
        }

      }
      )
  }

  inputUserData(){
    this.orderFormGroup.setValue({
      city:this.userData.userdetails.address.city, 
      street:this.userData.userdetails.address.street,
      deliverydate:this.orderFormGroup.value.deliverydate,
      card:this.orderFormGroup.value.card
    });
  }
  ngOnDestroy(){
    this.dataChangesSubscription.unsubscribe()
  }
  

  validateCityName(city){
    return (orderFormGroup ) => {
    const control = orderFormGroup.controls[city];

    
    if (control.value ==="") return;  
    if (this.cities.includes(control.value)){
   
      control.setErrors(null);
      this.cityMsg=""
    }else{
  
         control.setErrors({validateCityName:true});

      this.cityMsg="Please select a city from drop down"
    }
  }
  }  



  validateCard(card){
    return (orderFormGroup ) => {
      const control = orderFormGroup.controls[card];
    if (control.value ==="") return;  
    let regex=  /^(?:4\d{3}|5[1-5]\d{2}|6011|3[47]\d{2})([- ]?)\d{4}\1\d{4}\1\d{4}$/
    let valid=regex.test(control.value)
    if (!valid)   {
      
      control.setErrors({validateCard:true});
      this.cardMsg="Make sure card number is currect (visa/master)"

    }else{

      control.setErrors(null);
      this.cardMsg=""
    }



  }
}
  
  

}
