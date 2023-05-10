import { Injectable } from '@angular/core';
import { Job } from '../shared/models/Job';
import { sample_jobs, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tags';

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

  getAllTags(): Tag[]{
    return sample_tags;
  }

  getAllJobsByTag(tag: string): Job[]{
    return tag == 'All' ?
    this.getAllJobs():
    this.getAllJobs().filter(job => job.tags?.includes(tag))
  }

  getJobById(jobId: string): Job{
    return this.getAllJobs().find(job => job.id == jobId) ?? new Job();
  }
}
