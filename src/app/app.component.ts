import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { covidInfo } from './covidInfo';
import { CovidInfoService } from './covidInfo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public covidData: covidInfo[] = [];
  listData: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  headElements: string[] = [
    'pays',
    'date',
    'infections',
    'deces',
    'guerisons',
    'tauxDeces',
    'tauxGuerison',
    'tauxInfection',
  ];

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  searchKey!: string;
  constructor(private covidInfoService: CovidInfoService) {}
  ngOnInit() {
    this.getCovidData();
  }

  public getCovidData(): void {
    this.covidInfoService.getCovidData().subscribe(
      (response: covidInfo[]) => {
        this.covidData = response;
        this.listData = new MatTableDataSource<any>(this.covidData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

        console.log('this is listdata', this.listData);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  public onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
}
