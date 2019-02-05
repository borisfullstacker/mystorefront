import { Component, OnInit, ViewChild} from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { NgForm } from '@angular/forms';
import { DataComunicationsService } from '../../../services/data-comunications.service';
import {MatDialog} from '@angular/material';
import {RegisterComponent} from '../register/register.component'
import { Subscription } from '../../../../../node_modules/rxjs/internal/Subscription';
import { Router } from '../../../../../node_modules/@angular/router';


@Component({

  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})


export class AComponent implements OnInit {
@ViewChild(NgForm) form: NgForm;


pictureClass:string=""
msg:string=`Click me to start shopping`
showMsg:boolean=false
img:string="";
credentials:any={id:"",password:""}
err:string=""
showError:boolean=false
formChangesSubscription: any;
dataChangesSubscription: Subscription;



  constructor(private request:StoreService, private data:DataComunicationsService, private dialog: MatDialog, private router:Router) { }

  ngOnInit() {



    this.formChangesSubscription = this.form.valueChanges.subscribe(() => {
      this.showError=false;
    })

    this.dataChangesSubscription=this.data.currentMessage.subscribe(data=>{
       this.manageDom(data);
    })
    
    this.request.auth().subscribe((data)=>{
      if (data["res"]){
         this.data.changeMessage(data)
      }else{
        this.data.changeMessage("")
      }
      this.manageDom(data); 
    })
 
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);
    
    dialogRef.afterClosed().subscribe(result => {

    });
  }


  login(){
    if (this.credentials.id===""||this.credentials.password==="") {
     this.err="Please complete all fields";
     this.showError=true;
    }
    else{

      this.request.login(this.credentials).subscribe((data)=>{
        if (data['res'])  this.data.changeMessage(data)
        this.manageDom(data);

      })
      this.credentials.id=""
      this.credentials.password=""
    }
  }

  manageDom(data){
    let action = Object.keys(data)
    switch(action[0]){             
       case("err"):
            this.err= data["err"]
            this.showError=true;
          break;
       case("res"):
       
          if(data['res'].admin==true){
            this.msg="Welcome Admin"
            this.pictureClass="start"

          } 
          else if(data["res"].cartdetails.totalprice===null){
              this.msg ="Start shopping!"
              this.pictureClass="start"

          } else {
              this.msg ="Resume shopping"
              this.pictureClass="resume"
          } 
           this.showMsg=true;
              break;

        default:
           this.showMsg=false;
           this.pictureClass="start"

      }

  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
    this.dataChangesSubscription.unsubscribe();


  }

  navigateToStore(){
    this.router.navigate(['store'])
  }


}







