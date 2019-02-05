import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { StoreService } from '../../../services/store.service';
import { MatDialog } from '../../../../../node_modules/@angular/material/dialog';
import { DataComunicationsService } from '../../../services/data-comunications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errMsg: string=""

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  isOptional: boolean = false;
  submitted: boolean= false
  submitted2: boolean= false
  cityMsg: string=""
  asyncLoader: boolean = false
  spinner: any= {color:"black",width:"30"}
  idMsg: string=""
  deBounce: any
  cities: any= ['Tel Aviv',"Kefar Saba","Herzeliya","Raanana","Heifa", "Jerusalem", "Ramat Gan", "Netanya", "Eilat", "Beer Sheva"]
  asyncRegisterLoader: boolean = false;
  registerErrMsg:string=""
  startShopping: boolean = false
  closeDialog: boolean = false


  
MustMatch(controlName: string, matchingControlName: string) {
 return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];


      if (control.value !== matchingControl.value && this.submitted) {
        this.errMsg="Make sure passwords match"
    } else {
        this.errMsg=""

    }

  
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }
  
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
          this.errMsg="Make sure passwords match"
      } else {
          matchingControl.setErrors(null);
          this.errMsg=""

      }



  }
  }

  
  constructor(private _formBuilder: FormBuilder, private request:StoreService, private dialog: MatDialog, private data:DataComunicationsService) { }



ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({          
      id: ['', [Validators.required,this.mySyncValidators.bind(this),Validators.maxLength(15)]],
      email: ['',[ Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['',[ Validators.required, Validators.minLength(4)]],
  }, {
      validator: this.MustMatch('password', 'confirmPassword')
  });

    this.secondFormGroup = this._formBuilder.group({
      city: ['',[Validators.required, this.validateCityName.bind(this)]],
      name: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      street: ['',[Validators.required]],   
    });
  }

validateCityName(e){
  if (e.value ==="") return;  
  if (this.cities.includes(e.value)){
 
    this.secondFormGroup.controls["city"].setErrors(null);
    this.cityMsg=""
  }else{
    (setTimeout(() => {
       this.secondFormGroup.controls["city"].setErrors({validateCityName:true});
    }, 10))
    this.cityMsg="Please select a city from drop down"
  }

}  


mySyncValidators(e){
  
  if (e.value===""){
        this.idMsg=""
        return; 
  }else if(isNaN(e.value)){
    (setTimeout(() => {
        this.firstFormGroup.controls["id"].setErrors({mySyncValidators:true});
        this.idMsg="ID should contain only numbers"
    }, 10))
     return
  }
 
    clearTimeout(this.deBounce)
    this.deBounce= (setTimeout(() => {

    this.asyncLoader=true;
    this.request.validateId({id:e.value}).subscribe((res)=>{    
            this.asyncLoader=false
           if(e.value.length>14){
              this.firstFormGroup.controls["id"].setErrors({mySyncValidators:true});
              this.idMsg="ID should is too long"
          
            }else if (res["res"]==="ok" && this.firstFormGroup.value.id!=="") 
            { 
              this.firstFormGroup.controls["id"].setErrors(null);
              this.idMsg=""
            }
            else
            {
             this.firstFormGroup.controls["id"].setErrors({mySyncValidators:true});
             this.idMsg="ID is already in use"
            }
    });

  }, 400))
}



validate() {
    this.submitted = true;
    if (this.firstFormGroup.status==="VALID" ) {
       this.submitted = false;
    }
}

validate2() {
  this.submitted2 = true; 
  if(this.secondFormGroup.status==="VALID"){

    this.submitted2 = false;
  }
}

register(){
  this.asyncRegisterLoader=true;
  let obj= Object.assign(this.firstFormGroup.value,this.secondFormGroup.value)
  this.request.register(obj).subscribe(res=>
    {let action = Object.keys(res)
    switch(action[0]){
      case("err"):
         this.registerErrMsg=res["err"]
         this.asyncRegisterLoader=false;
        break
      case("res"):
      
         obj={
           id:this.firstFormGroup.value.id,
           password:this.firstFormGroup.value.password,
         }
          this.request.login(obj).subscribe(result=>{
          this.asyncRegisterLoader=false;
          this.startShopping=true;
          this.data.changeMessage(result)
          setTimeout(() => {
            this.dialog.closeAll()
           }, 1500);
         })
        break
    }
   
  })
}



get f() { return this.firstFormGroup.controls; }




}