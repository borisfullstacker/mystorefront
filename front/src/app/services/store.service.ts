import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, retry } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})

export class StoreService {
link: string="api"
userData: any={}



constructor(private http:HttpClient) { }

//gets inital user data
auth() {
  return this.http.get(this.link+"/userdata") 
  .pipe(
    retry(3), // retry a failed request up to 3 times
    tap(data=>this.userData=data),
  )
}

// authentication; returns true if sesseon exisits else false
authGuard (){
  return new Promise((resolve,reject)=>{
   this.http.get(this.link+'/authguard').pipe(retry(3)).subscribe(data=>{resolve(data['res'])}) 
  })
}

//login
login(obj){
  return this.http.post(this.link+"/login",obj, httpOptions).pipe(
    retry(3), // retry a failed request up to 3 times
    tap(data=>this.userData=data)
  )
}

// products and sales count
storeCount(){
  return this.http.get(this.link+"/").pipe(
    retry(3), // retry a failed request up to 3 times
  )
}

//validates if id is available
validateId(obj){
  return this.http.post(this.link+"/validateid", obj, httpOptions).pipe(
    retry(3), // retry a failed request up to 3 times
  )
}

register(obj){
  return this.http.post(this.link+"/register",obj, httpOptions).pipe(
    retry(3), // retry a failed request up to 3 times
  )
}
// gets the full products list
getAllStoreProducts(){
  return this.http.get(this.link+"/store/cart").pipe(retry(3))
}

// gets all user information 
getUserData(){
  return new Promise ((resolve,reject)=>{
    if (this.userData.res===undefined){
         this.auth().subscribe(data=>{
         this.userData=data
         resolve(this.userData);
         })
    }else{
      resolve(this.userData)
    }
  })
}
// get last known receipt
getReceipt(id){
  return this.http.get(this.link+`/store/receipt/${id}`)
}

// openes new cart
openNewCart(newCart){
   return this.http.post(this.link+`/store/cart`, newCart, httpOptions).pipe(
    retry(3),
  )
}

// gets full category list

getCategoryList(){
  return this.http.get(this.link+`/store/categories`)
}

getCategoryListById(id){
  return this.http.get(this.link+`/store/categories/${id}`)
}

// searches product by name
searchProduct(name){
  return this.http.get(this.link+`/store/${name}`)
}

// new product to cart
addNewProductToCart(item){
  return this.http.post(this.link+`/store/cartitem`, item, httpOptions).pipe(
    retry(3),
 )
}

// add a product that is already in cart
addExistingProductToCart(obj){
  return this.http.put(this.link+`/store/cartitem`, obj, httpOptions).pipe(
    retry(3),
 )
}
//deletes item by id from cart
deleteCartItemBiyId(cartid,productid){
  return this.http.delete(this.link+`/store/cartitem/${cartid}/${productid}`, httpOptions).pipe(
     retry(3),
  )

}
// deletes all products from cart
deleteCart(cartid){
  return this.http.delete(this.link+`/store/cartitem/${cartid}/all`, httpOptions).pipe(
    retry(3),
 )
}
//adds payment to orders db and closes cart
addPayment(order)
{
return this.http.post(this.link+`/store/order`, order, httpOptions).pipe(
  retry(3),
)
}

// gets all delivery dates. 
getAllDeliveryDates(){
  return this.http.get(this.link+`/deliverydates`)
}

//add new product to db autenticated only for admin
addNewProduct(obj){
  return this.http.post(this.link+`/admin`, obj, httpOptions).pipe(
    retry(3),
  )
}


// updates a product by id


updateAProduct(obj){
  return this.http.put(this.link+`/admin/${obj.id}`, obj, httpOptions).pipe(
    retry(3),
  )
}
//logout 

logout(){
  return this.http.get(this.link +'/logout').pipe(
    retry(3),
  )
}




}
