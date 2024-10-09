import { WebService } from '../../services/web.service';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FlightModel } from '../../models/flight.model';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    NgIf,
    NgFor,
    RouterLink
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  private webService: WebService
  public dataService: DataService
  public destinations: string[] = []
  public airlines: string[] = []
  public flightClass: string[] = []

  public sDestination: string | null = null
  public sAirline: string | null = null
  public sFlightClass: string | null = null
  public sReturn: boolean | null = null

  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor(private route: ActivatedRoute) {
    this.webService = new WebService()
    this.dataService = new DataService()
  }
  
  public displayedColumns: string[] = ['number', 'destination', 'scheduled', 'action'];
  public dataSource: MatTableDataSource<FlightModel> | null = null
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sDestination = params['destination']
      this.sAirline = params['airline']
      this.sFlightClass = params['class']
      this.sReturn = params['return']
    })

    this.webService.getAvailableDestinations().subscribe(rsp => this.destinations = rsp)
    this.airlines = this.dataService.getAirlines()
    this.flightClass = this.dataService.getFlightClass()
  }

  public doSearch() {
    if (this.sDestination == null){
      // @ts-ignore
      Swal.fire({
        title: 'No destination?',
        text: 'Make sure to select the destination first',
        icon: 'error',
        confirmButtonText: 'I understand'
      })
      return
    }
    this.webService.getFlightsByDestination(this.sDestination!).subscribe(rsp=>{
      console.log(rsp.content)
      this.dataSource = new MatTableDataSource<FlightModel>(rsp.content)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    console.log(this.sDestination, this.sAirline, this.sFlightClass, this.sReturn)
  }

    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }

}
