import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from "../services/trip-data.service";

@Component({
  selector: "app-delete-trip",
  templateUrl: "./delete-trip.component.html",
  styleUrls: ["./delete-trip.component.css"],
})
export class DeleteTripComponent implements OnInit {
  submitted = false;
  constructor(private router: Router, private tripService: TripDataService) {}

  ngOnInit() {
    // retrieve stashed tripId
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate([""]);
      return;
    }

    console.log("DeleteTripComponent#onInit found tripCode " + tripCode);
    if (window.confirm("Are sure you want to delete this item ?")) {
      //put your delete method logic here
      this.tripService.deleteTrip(tripCode).then((data) => {
        console.log(data);
        this.router.navigate([""]);
      });
    } else {
      this.router.navigate([""]);
    }
  }
}
