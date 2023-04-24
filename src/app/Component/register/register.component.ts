import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  user: User[] = [];
  constructor(private  authService: AuthServiceService) {
  }
  ngOnInit(): void {
  }

  doRegister(){
    this.authService.signup(this.notebooks).subscribe((result)=> {
      const request: Request = { userName: this.username, userPwd: this.password, roles: this.selectedRoles};
      //console.log(result);
      //this.success = 'Signup successful';
      this.success = result;
    }, (err) => {
      //console.log(err);
      this.error = 'Something went wrong during signup';
    });
  } else {
  this.error = 'All fields are mandatory';
}
  }

}
