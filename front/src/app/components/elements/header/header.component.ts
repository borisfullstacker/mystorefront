import { Component, OnInit } from '@angular/core';
import { DataComunicationsService } from '../../../services/data-comunications.service';
import { Subscription } from '../../../../../node_modules/rxjs/internal/Subscription';
import { StoreService } from '../../../services/store.service';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
dataChangesSubscription: Subscription;
showLogout: boolean= false;

 constructor(private data:DataComunicationsService, private request:StoreService,private nav:Router)  { }
 userDetails:any={}



ngOnInit() {
this.dataChangesSubscription= this.data.currentMessage.subscribe(data=>{
      if (data!==""){ this.userDetails=data["res"].userdetails;
      this.showLogout=true

    }
      else if (data===""){
         this.userDetails=data;
          this.showLogout=false
      }
  
    })
}

logout(){
  this.request.logout().subscribe((data)=>
 { 
  this.nav.navigate(['/'])
  this.data.changeMessage('');

}
)}

ngOnDestroy(){
  this.dataChangesSubscription.unsubscribe()
}


}
