import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import { Job } from 'src/app/shared/models/Job';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jobs:Job[] = [];
  constructor(private jobService:JobService, activatedRoute:ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        this.jobs = this.jobService.getAllJobsBySearchTerm(params.searchTerm);
      else if (params.tag)
        this.jobs = this.jobService.getAllJobsByTag(params.tag)
      else
        this.jobs = jobService.getAllJobs()
  })
  }

  ngOnInit(): void { }
}
