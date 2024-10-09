import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    NgIf,
    NgFor
  ],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.css'
})
export class SearchContainerComponent {

  @Input() destinations: string[] | undefined
  @Input() airlines: string[] | undefined
  @Input() flightClass: string[] | undefined
  public sDestination: string | null = null
  public sAirline: string | null = null
  public sFlightClass: string | null = null
  public sReturn: boolean | null = null

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  public onChange() {

  }

  public doSearch() {
    if (this.router.url != "/search") {
      this.router.navigate(['/search'], { relativeTo: this.activeRoute })
    }

    console.log(this.sDestination, this.sAirline, this.sFlightClass, this.sReturn)
  }
}
