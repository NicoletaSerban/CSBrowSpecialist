import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JobService } from 'src/app/services/job.service';
import { Job } from 'src/app/shared/models/Job';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jobs:Job[] = [];
  constructor(private jobService: JobService, activatedRoute: ActivatedRoute) {
    let jobsObservable: Observable<Job[]>
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
      jobsObservable = this.jobService.getAllJobsBySearchTerm(params.searchTerm);
      else if (params.tag)
      jobsObservable = this.jobService.getAllJobsByTag(params.tag)
      else
        jobsObservable = jobService.getAllJobs()

      jobsObservable.subscribe((serverJobs) => {
          this.jobs = serverJobs
        })
  })
  }

  ngOnInit(): void { }
}
