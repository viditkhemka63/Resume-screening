import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { ResumeAPIService } from '../../services/resume-api.service';
import { Subscription } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  email: string;
  experience: number;
}



@Component({
  selector: 'app-show-resume',
  templateUrl: './show-resume.component.html',
  styleUrls: ['./show-resume.component.css']
})
export class ShowResumeComponent implements OnInit, OnDestroy {

  show: boolean = true;
  subscription: Subscription;
  resumeList
  DATA: PeriodicElement[] = [];

  displayedColumns: string[] = ['position', 'name', 'email', 'experience'];
  dataSource 

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private resumeAPI: ResumeAPIService) { }

  ngOnInit() {
    
    this.subscription = this.resumeAPI.getAll().subscribe(data => {
      this.resumeList = data;
      console.log(data)
      this.filterData(this.resumeList)
      this.dataSource = new MatTableDataSource(this.DATA)
      this.show = false;
    })
  }

  ngOnDestroy() {
    if (this.subscription !== undefined){
      this.subscription.unsubscribe();
    }
  }

  isLoading(){
    return this.show;
  }

  filterData(resumeList){
     let count = 1;

     resumeList.forEach(ele => {
        let tempName = ele.name || 'test'
        let myobj = {
          position: count,
          name: tempName,
          email: tempName  + '@gmail.com',
          experience: parseInt(ele.total_experience) || 0,
        }

      this.DATA.push(myobj);
      count++;
     });
    console.log(this.DATA)
  }
  
}


