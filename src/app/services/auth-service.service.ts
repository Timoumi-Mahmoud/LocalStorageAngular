import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import {loginRequest} from "../models/loginRequest";
import {User} from "../models/user";
import {Register} from "../models/register";
// import { Request } from '/src/app/models/request';

const USER_KEY = 'bara123456789';
const BASE_URlL = 'http://localhost:8888/';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private BASE_URL = 'http://localhost:8888/';



  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  signin(loginRequest: loginRequest): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'public/login', loginRequest, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(map((resp) => {
      sessionStorage.setItem('user', loginRequest.username );
      console.log(sessionStorage+ "\n");
      console.log(this.getToken()+ "token \n");
      sessionStorage.setItem('token', 'HTTP_TOKEN ' + resp.token);
      return resp;
    }));
  }


  signup(register: Register): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'public/register', register,
      {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json'}).pipe(map((resp) => {
      return resp;
    }));
  }



  signout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

  isUserSignedin() {
    return sessionStorage.getItem('token') !== null;
  }

  getSignedinUser() {
    return sessionStorage.getItem('user') as string;
  }

  getToken() {
    let token = sessionStorage.getItem('token') as string;
    return token;
  }



  SendVificationEmail(email:string){  return this.http.post<any>(this.BASE_URL + 'public/user/sendVerification/?email='+email, email,
    {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json'}).pipe(map((resp) => {
    return resp;
  }));
  }


  AccepteVirficationEmail(email:string){ return this.http.post<any>(this.BASE_URL + 'public/user/verifyAccountLink/?email'+email, email,
    {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json'}).pipe(map((resp) => {
    return resp;
  }));
  }

// getData() {
//   if (sessionStorage.getItem(USER_KEY)) {
//     console.log(JSON.parse(sessionStorage.getItem(USER_KEY))); //converts to json object
//   } else {
//     console.log('key dose not exists');
//   }
// }


  getData() {
    const user = sessionStorage.getItem(USER_KEY);
    if (user !== null) {
      console.log(JSON.parse(user)); //converts to json object
    } else {
      console.log('key does not exist');
    }

    return user;
  }





  login(username: string, password: string): Observable<any> {
    return this.http.post(
      BASE_URlL + 'public/login',
      {
        username,
        password,
      },
      { withCredentials: true }
    );

  }


  public saveUser(user: any): void {
    // window.sessionStorage.removeItem(USER_KEY);
    console.log("storage user"+ user );

    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log("\n window.sessionStorage"+ window.sessionStorage );
    console.log("the connected user is "+ user)
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }



}
