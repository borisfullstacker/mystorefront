import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import moment from 'moment';
import { DataComunicationsService } from '../../../services/data-comunications.service';
import { Subscription } from '../../../../../node_modules/rxjs/internal/Subscription';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
dataChangesSubscription: Subscription;
valueChanges: Subscription
userData: any={}
cartData: any={receipt:[],price:0}
initCounter: any =1 
cartBtns: any = false // hides btn
order: boolean=false;
@Output() messageEvent = new EventEmitter<boolean>();
@Output() messageEventAdmin = new EventEmitter<boolean>();
@Input('productToMark') productName: string;



constructor(private request:StoreService, private data:DataComunicationsService) { }



  ngOnInit() {
  
    this.initializeCart() 
   

    this.dataChangesSubscription= this.data.currentReceipt.subscribe(data=>{
      if (this.initCounter>1){
        this.cartController(data)
      }
      this.initCounter++;
   
    })

  }


  cartController(data){
     if(data!==""){
      let flag=true
      for (let i=0; i<this.cartData.receipt.length;i++){
             if (this.cartData.receipt[i].productid===data.productid){
              this.cartData.receipt[i].quantity+=data.quantity;
              this.cartData.receipt[i].price+=data.price;
              this.cartData.price+=data.price
               flag=false
               this.updateCartItem(this.cartData.receipt[i])
             }
      }
      if (flag){
        this.cartData.receipt.push(data)
        this.cartData.price+=data.price
        this.addCartItem(data)
      }    
    }
    this.cartBtns=true; 

  }


  updateCartItem(data){
    

    let objectToUpdateCart={ // obj to send via post request

      cartid: this.userData.res.cartdetails.id,
      productid: data.productid,
      quantity: data.quantity,
      price: data.price
    }

    this.request.addExistingProductToCart(objectToUpdateCart).subscribe(()=>{}); 
  }

  addCartItem(data){
    
    let objectToAddToCart={ // obj to send via post request
      cartid: this.userData['res'].cartdetails.id,
      productid: data.id,
      quantity: data.quantity,
      price: data.price
    }

    this.request.addNewProductToCart(objectToAddToCart).subscribe(()=>{
    }); 
  }

  async initializeCart(){
    
      var data= await this.request.getUserData()
      this.userData=data;
      if (this.userData["res"].admin) this.messageEventAdmin.emit(true)
      await this.openCart();
      this.data.changeMessage(this.userData)  // updates user details in header
      await this.request.getReceipt(this.userData['res'].cartdetails.id).subscribe(data=>{ 
      if (data['receipt']===null) data['receipt']=[];  
      if (data['price']===null) data['price']=0;  

      this.cartData= data
    })

  }


  openCart(){
    
    let DateTime= moment().format("YYYY/MM/DD HH:mm:ss")

    let newCart={
      cartdate:DateTime,
      customerid:this.userData['res'].userdetails.id,
    }

    
    new Promise ((resolve,reject)=>{
      this.request.openNewCart(newCart).subscribe(data=>{
        if (data['insertId']!==undefined){
        this.userData['res'].cartdetails.id=data['insertId']
        resolve("resolve")
        }
      })
    });

  }


  ngOnDestroy(){
    this.dataChangesSubscription.unsubscribe()
  }


  deleteCartItemById(product,i){
         let  cartid=this.userData["res"].cartdetails.id;
         let  productid= product.productid;
         this.request.deleteCartItemBiyId(cartid,productid).subscribe(()=>{
         })
         this.cartData.price-=product.price;
         this.cartData.receipt.splice(i,1);   

  }


  deleteAll(){
    let cartid= this.userData["res"].cartdetails.id
    this.request.deleteCart(cartid).subscribe(()=>{
    })
    this.cartData.receipt=[];
    this.cartData.price=0;
    this.cartBtns=false
  }


  activateOrder(){
    
    this.order=true;
    this.messageEvent.emit(this.order)
    this.data.updateOrderPage({cartData:this.cartData,userData:this.userData.res})
  }

  backToShop(){
    this.productName=""
    this.order=false
    this.messageEvent.emit(this.order)

  }
  
}
