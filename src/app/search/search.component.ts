import { WebService } from '../../services/web.service';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
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
  private dataService: DataService
  public destinations: string[] = []
  public airlines: string[] = []
  public flightClass: string[] = []

  public sDestination: string | null = null
  public sAirline: string | null = null
  public sFlightClass: string | null = null
  public sReturn: boolean | null = null

  constructor(private route: ActivatedRoute) {
    this.webService = new WebService()
    this.dataService = new DataService()
  }

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
        title: 'Something went wrong',
        text: 'Make sure to select a destination first',
        icon: 'error',
        confirmButtonText: 'I understand'
      })
      return
    }
    this.webService.getFlightsByDestination(this.sDestination!).subscribe(rsp=>console.log(rsp))
    console.log(this.sDestination, this.sAirline, this.sFlightClass, this.sReturn)
  }

}
