import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  loggedinUser!: string | null;
  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  loggedin(){
    this.loggedinUser = localStorage.getItem('userName');
     return this.loggedinUser;

  }

  onLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.toastr.success('You are logged out!');
  }

}
