import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Tag } from 'src/app/shared/models/Tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit{
  tags?: Tag[];
  constructor(jobService: JobService) {
    this.tags = jobService.getAllTags()
  }
  ngOnInit(): void {}

}
