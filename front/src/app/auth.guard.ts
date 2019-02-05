import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterModule } from '@angular/router';
import { StoreService } from './services/store.service'
import { DataComunicationsService } from './services/data-comunications.service';
import { Subscription } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  dataChangesSubscription: Subscription;

  constructor(private authGuard:StoreService, private router:Router, private data:DataComunicationsService){
  
  }
  async canActivate (){
  let flag= await this.authGuard.authGuard()
    if (flag){
      return true;
    }else{
      this.router.navigate([''])
      return false;

    }
  }

  ngOnDestroy(){
    this.dataChangesSubscription.unsubscribe();
  }
}
