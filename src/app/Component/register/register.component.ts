import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Register} from "../../models/register";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(private authService: AuthServiceService , private  router: Router) { }

  username: string = '';
  password: string = '';
  email:string='';
  firstName:string='';
  lastName:string='';
  occupation:string='';
  birthDate=new Date();

  user_roles: any = [
    {name:'User', value:'ROLE_USER', selected: false},
    {name:'Admin', value:'ROLE_ADMIN', selected: false},
    {name:'Anonymous', value:'ROLE_ANONYMOUS', selected: false},
  ]

  selectedRoles: string[] = [];

  error: string = '';
  success: string = '';

  ngOnInit(): void {
  }

  onChangeCategory(event: any, role: any) {
    this.selectedRoles.push(role.value);
  }

  doSignup() {
    if(this.username !== '' && this.username !== null && this.password !== '' && this.password !== null  /* && this.selectedRoles.length > 0*/) {
      const request: Register = { username: this.username, password: this.password /*, roles: this.selectedRoles*/, email:this.email, firstName:this.firstName
      ,lastName:this.lastName, occupation:this.occupation, birthDate:this.birthDate};

      this.authService.signup(request).subscribe((result)=> {
        //console.log(result);
        //this.success = 'Signup successful';
        this.success = result;
        console.log("the email is "+ this.email);
        this.authService.SendVificationEmail(this.email).subscribe(
          sec=>{alert("email have been sent !!")
            this.router.navigate(['/login'])
          },

          err=>{
            alert("somme error ")
          })
      }, (err) => {
        //console.log(err);
        this.error = 'Something went wrong during signup';
      });
    } else {
      this.error = 'All fields are mandatory';
    }
  }





  // username:string='';
  // password:string='';
  // firstName:string='';
  // lastName:string='';
  // occupation:string='';
  // birthDate=new Date();
  // phone:string='';
  //

  //
  //
  // // user: User[] = [];
  // constructor(private  authService: AuthServiceService, private route: ActivatedRoute, private router: Router) {
  // }
  // ngOnInit(): void {
  // }
  //
  // doRegister(){
  //   // let user:User = {
  //   //   firstName:null,
  //   //   lastName: null!,
  //   //   passowrd: 0,
  //   //   username: null
  //   // };
  //   //
  //   if(this.username !== '' && this.username !== null && this.password !== '' && this.password !== null && this.firstName!==null) {
  //   const userA:User  = { username: this.username, passowrd: this.password, firstName: this.firstName /*, lastName:this.lastName, occupation:this.occupation, phone:this.phone, birthDate:this.birthDate*/};
  //
  //
  //   this.authService.signup(userA).subscribe((result)=> {
  //     //console.log(result);
  //     //this.success = 'Signup successful';
  //     console.log(result+ "\n");
  //     // this.success = result;
  //     console.log("kkkkkk"+ result+ "\n");
  //
  //     // this.user.push(result);
  //
  //   }, (err) => {
  //     //console.log(err);
  //     alert('Something went wrong during signup');
  //   });
  // }else {
  //   alert("nulll value")}
  // }


}
