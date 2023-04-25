import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthServiceService} from "../../services/auth-service.service";
import {loginRequest} from "../../models/loginRequest";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password : string = '';

  isSignedin = false;
  errorMessage = '';
  error: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthServiceService) {}

  form: any = {
    username: null,
    password: null
  };

  ngOnInit() {
    this.isSignedin = this.authService.isUserSignedin();

    if(this.isSignedin) {
      this.router.navigateByUrl('home');
    }
  }

  doSignin() {
    if(this.username !== '' && this.username !== null && this.password !== '' && this.password !== null) {
      const request: loginRequest = { username: this.username, password: this.password};

      this.authService.signin(request).subscribe((result)=> {
        //this.router.navigate(['/home']);
        this.router.navigateByUrl('home');
      }, () => {
        this.error = 'Either invalid credentials or something went wrong';
      });
    } else {
      this.error = 'Invalid Credentials';
    }
  }


  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.authService.saveUser(data);
        console.log("ok  login +data " +data );
        alert("ress is " + this.authService.getUser());



        this.isSignedin = true;
        // this.roles = this.storageService.getUser().roles;
        console.log(" \n this.storageService.getUser().roles" + this.authService.getUser());
       // this.reloadPage();
        this.router.navigateByUrl('profile');      },
      error: err => {
        this.errorMessage = err.error.message;
        // this.isLoginFailed = true;
      }
    });
  }

}
