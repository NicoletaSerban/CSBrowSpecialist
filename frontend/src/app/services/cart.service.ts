import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Job } from '../shared/models/Job';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
// define to hold the Cart
private cart: Cart = this.getCartFromLocalStorage();
private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart) // initial value
  constructor() { }

  addToCart(job: Job): void{
    // console.log(job)
// we look in the cart to find a item that matches with our item
let cartItem = this.cart.items.find(item => item.job && item.job.id === job.id)
console.log(cartItem)
// if exist we return cartItem
if (cartItem) return;

// if dosen't exist we add that item
this.cart.items.push(new CartItem(job))
this.setCartToLocalStorage()
  }

  removeFromCart(jobId: string): void{
    this.cart.items = this.cart.items.filter(item => item.job.id != jobId);
     // for local storage
     this.setCartToLocalStorage();
  }

  changeQuantity(jobId: string, quantity: number) {
    let cartItem = this.cart.items.find(item => item.job.id === jobId);
    if (!cartItem) {
      console.error(`Could not find item with jobId ${jobId}`);
      return;
    }

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.job.price
     // for local storage
     this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
     // for local storage
     this.setCartToLocalStorage();
  }

  // so all the changes of the cart to be made only from the cart service
  getCartObservable(): Observable<Cart>{
    return this.cartSubject.asObservable()
  }

  getCart(): Cart{
    return this.cartSubject.value;
  }

  // to store in localStorage when we don't use backend
  private setCartToLocalStorage(): void{
    // sum of price
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);

    // // sum of quantity
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    // to notify all observables of the cart
    this.cartSubject.next(this.cart)
  }

  private getCartFromLocalStorage(): Cart{
    const cartJson = localStorage.getItem('Cart')
    return cartJson ? JSON.parse(cartJson) : new Cart();
}
}
