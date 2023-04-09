import { Component, OnInit, Input } from "@angular/core";
import { Trip } from "../models/trip";
import { Router } from "@angular/router";

@Component({
  selector: "app-trip-card",
  templateUrl: "./trip-card.component.html",
  styleUrls: ["./trip-card.component.css"],
})

export class TripCardComponent implements OnInit {

  @Input("trip") trip: Trip;
  
  constructor(private router:Router) {}

  private editTrip(trip:Trip): void{
    console.log("hello edit");
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']);
  }

  private deleteTrip(trip:Trip): void{
    console.log("hello delete");
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['delete-trip']);
  }

  ngOnInit(): void {}


}
