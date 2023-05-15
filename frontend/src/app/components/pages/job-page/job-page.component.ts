import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { JobService } from 'src/app/services/job.service';
import { Job } from 'src/app/shared/models/Job';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.css']
})
export class JobPageComponent implements OnInit{
  job!: Job;
  constructor(activatedRoute: ActivatedRoute, jobService:JobService, private cartService:CartService, private router:Router) {
    activatedRoute.params.subscribe((params) => {

      if (params.id)
        jobService.getJobById(params.id).subscribe(serverJob => {
          this.job = serverJob;
         })

    })
  }
  ngOnInit(): void {}

  // this method add the job we are seeing to the cart
  addToCart() {
    this.cartService.addToCart(this.job);

    // we redirect the user to the cart part everytime he push the addToCart button
this.router.navigateByUrl('/cart')
  }
}
