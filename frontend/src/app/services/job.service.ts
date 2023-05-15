import { Injectable } from '@angular/core';
import { Job } from '../shared/models/Job';
import { sample_jobs, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tags';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JOBS_BY_ID_URL, JOBS_BY_SEARCH_URL, JOBS_BY_TAG_URL, JOBS_TAGS_URL, JOBS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http:HttpClient) { }


  getAllJobs(): Observable<Job[]>{
    return this.http.get<Job[]>(JOBS_URL);
  }

  getAllJobsBySearchTerm(searchTerm:string) {
    return this.http.get<Job[]>(JOBS_BY_SEARCH_URL + searchTerm)
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(JOBS_TAGS_URL);
  }

  getAllJobsByTag(tag: string): Observable <Job[]>{
    return tag == 'All' ?
    this.getAllJobs():
    this.http.get<Job[]>(JOBS_BY_TAG_URL + tag)
  }

  getJobById(jobId: string): Observable <Job>{
    return this.http.get<Job>(JOBS_BY_ID_URL + jobId)
  }
}
