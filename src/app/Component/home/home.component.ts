import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthServiceService} from "../../services/auth-service.service";
import {GreetingService} from "../../services/greeting.service";
import {loginRequest} from "../../models/loginRequest";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string = '';
  password : string = '';

  isSignedin = false;

  error: string = '';




  signedinUser: string = '';

  greeting: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private authService: AuthServiceService, private greetingService: GreetingService) {}

  ngOnInit() {
    this.isSignedin = this.authService.isUserSignedin();


    this.isSignedin = this.authService.isUserSignedin();
    this.signedinUser = this.authService.getSignedinUser();
    //
    // if(!this.authService.isUserSignedin()) {
    //   this.router.navigateByUrl('signin');
    // }

    if(this.isSignedin) {
      this.greetingService.getByUserRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/user - You are not authorize'));
      this.greetingService.getByAdminRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/admin - You are not authorized'));
      this.greetingService.getByUserOrAdminRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/userOrAdmin - You are not authorized'));
      this.greetingService.getByAnonymousRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/anonymous - You are not authorized'));
    }
  }

  doSignout() {
    this.authService.signout();
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
}
