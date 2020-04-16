import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { ResumeAPIService } from '../../services/resume-api.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  requirementForm: FormGroup;
  skills;
  resumeList;
  expList

  isdataFetch:boolean = false;
  isrequirementFetch: boolean = false;
  nothingtoShow: boolean = true;

  

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Skills'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] =[]
    // Pie
  public pieChartOptions: ChartOptions = {
      responsive: true,
  };
  public pieChartLabels: Label[] = []
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  
  
  constructor(
    private resumeAPI: ResumeAPIService,
    private fb: FormBuilder
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {

    this.requirementForm = this.fb.group({
      requirement: ['', Validators.required],
      noOfResume:  ['', Validators.required]
    })
    
  }
  

  onSubmit(){
    if (this.requirementForm.valid){
      this.nothingtoShow = false;
      this.isdataFetch = false;
      this.isrequirementFetch = true;
      console.log(this.requirementForm.value)
      this.resumeAPI.predict(this.requirementForm.value).subscribe(data => {
        console.log(data)
        this.skills = data.skills;
        this.expList = data.Experience;
        this.resumeList = data.result
        this.update()
      })
    }
  }
  
  update(){
      this.isrequirementFetch = false;
      this.isdataFetch = true;
      this.updateBarChart();
      this.updatePieChart();

  }

  updateBarChart(){
    this.barChartData = []
    this.skills.forEach(element => {
      this.barChartData.push({
        data: [element.value],
        label: element.key 
      })
    });
    this.barChartData.push({
      data:[0],
      label: ''
    })
    console.log(this.barChartData);
  }

  updatePieChart(){
    this.pieChartLabels = []
    this.pieChartData = []
    this.expList.forEach(element => {
        this.pieChartLabels.push(element.key + " Yr")
        this.pieChartData.push(element.value)
    });
  }

  ngOnDestroy() {
    if (this.subscription !== undefined){
      this.subscription.unsubscribe();
    }
     
  }

  calculateSkills(resumeList){
      
  }
}
