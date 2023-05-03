import { Injectable } from '@angular/core';
import { Job } from '../shared/models/Job';
import { sample_jobs } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor() { }


  getAllJobs(): Job[] {
    return sample_jobs;
  }

  getAllJobsBySearchTerm(searchTerm:string) {
    return this.getAllJobs().filter(job => job.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

}
