import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { ResumeAPIService } from '../../services/resume-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  resumeList

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Skills'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {data: [300], label: 'Docker'},
    {data: [500], label: 'Angular'},
    {data: [200], label: 'AWS'},
    {data: [250], label: 'SQL'},
    {data: [0], label: ''},
  ];

    // Pie
    public pieChartOptions: ChartOptions = {
      responsive: true,
    };
    public pieChartLabels: Label[] = ['2 yr', '3 yr', '5 yr'];
    public pieChartData: SingleDataSet = [30, 50, 10];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];
  
  
  constructor(
    private resumeAPI: ResumeAPIService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.subscription = this.resumeAPI.getAll().subscribe(data => {
        this.resumeList = data
        console.log(data)
    })
  }
  
  ngOnDestroy() {
     this.subscription.unsubscribe();
  }

  calculateSkills(resumeList){
      
  }
}
