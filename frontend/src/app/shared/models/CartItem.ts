import { Job } from "./Job";

export class CartItem{
  constructor(public job: Job) {}
  quantity: number = 1;
  price: number = this.job.price;
}
