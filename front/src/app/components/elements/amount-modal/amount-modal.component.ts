import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
import { DataComunicationsService } from '../../../services/data-comunications.service';
import { MatDialog } from '../../../../../node_modules/@angular/material/dialog';
import { Subscription } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'app-amount-modal',
  templateUrl: './amount-modal.component.html',
  styleUrls: ['./amount-modal.component.css']
})
export class AmountModalComponent implements OnInit {
quantity: any=1;
dataChangesSubscription: Subscription;
userData: any = {}

  constructor(@Inject(MAT_DIALOG_DATA)  private data: any, private _data:DataComunicationsService ,  private dialog: MatDialog) {}

  ngOnInit() {
    this.dataChangesSubscription=this._data.currentMessage.subscribe((user)=>this.userData=user)//gets user data.
  }

  addProduct(){
    
    let sum=0
    let objToSend={...this.data.data} 
   
    sum = this.quantity * this.data.data.price;
    objToSend.price=sum;
    objToSend.quantity=this.quantity;
    objToSend.productid=this.data.data.id;

      this._data.updateReceipt(objToSend);
      this.dialog.closeAll();
  
  }
  ngOnDestroy(){

    this.dataChangesSubscription.unsubscribe()
  }

}
