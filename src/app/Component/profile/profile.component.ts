import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  currentUser: any;

  constructor(private  auth :AuthServiceService) {
  }

  ngOnInit() {
    this.currentUser = this.auth.getUser();
  }
}
