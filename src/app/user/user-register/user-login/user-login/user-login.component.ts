import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';
import { UserForLogin } from 'src/app/model/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService, private toastr: ToastrService,
     private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm){

    this.authService.authUser(loginForm.value).subscribe(
      (response: UserForLogin) => {
        console.log(response);
        const user = response;
        if(user){
           localStorage.setItem('token', user.token);
           localStorage.setItem('userName', user.userName);
           this.toastr.success('Login Successful');
           this.router.navigate(['/']);
        }
      }
    )

  }

}
