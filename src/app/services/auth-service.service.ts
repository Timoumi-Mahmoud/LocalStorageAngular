import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import {loginRequest} from "../models/loginRequest";
// import { Request } from '/src/app/models/request';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  private BASE_URL = 'http://localhost:8888/';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  signin(loginRequest: loginRequest): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'public/login', loginRequest, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(map((resp) => {
      sessionStorage.setItem('user', loginRequest.username );
      sessionStorage.setItem('token', 'HTTP_TOKEN ' + resp.token);
      return resp;
    }));
  }


  signup(request: Request): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'public/register', Request,
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


}
