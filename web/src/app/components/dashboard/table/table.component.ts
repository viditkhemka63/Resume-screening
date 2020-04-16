import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  email: string;
  phoneNo: number;
  performance: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Vidit Khemka', email: 'viditkhemka63@gmail.com', phoneNo: 8800714404, performance: 100},
  {position: 2, name: 'Anchal Gupta', email: 'viditkhemka63@gmail.com', phoneNo: 8800714404 , performance: 80},
  {position: 3, name: 'Shweta Mamgain', email: 'viditkhemka63@gmail.com', phoneNo: 8800714404, performance: 0},
  {position: 4, name: 'Bharat bhalla', email: 'viditkhemka63@gmail.com', phoneNo: 8800714404, performance: 20}  
];


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() Data;
  displayedColumns: string[] = ['position', 'name', 'email', 'phoneNo', 'performance'];
  dataSource;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    console.log(this.Data);
    this.filterData();
    this.dataSource.sort = this.sort;
  }

  filterData(){
    let temp = []
    let count = 1
    this.Data.forEach(element => {
        temp.push({
          position: count,
          name: element.name,
          email: element.name + '@gmail.com',
          phoneNo: parseInt(element.total_experience) || 0,
          performance: element.score * 100
        })
        count++;
    });
    this.Data =temp;
    this.dataSource = new MatTableDataSource(this.Data);
  }

}
