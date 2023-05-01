import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  // public user: User = new User();
  userList: User[] = []


  constructor(private router: Router, private userServiceService: UserServiceService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userServiceService.getUserData().subscribe(response => {
      this.userList = response.object;
      console.log(response);
      console.log(this.userList);
    })
  }

  remove(id: number): void {
    console.log(id);
    this.userServiceService.removeUserData(id).subscribe(response => {
      console.log(response);
      this.ngOnInit();
      alert("Employee Data Has been Removed")
    })
  }

  update(user: any) {
    console.log(user);
    this.userServiceService.changeUser(user)
    this.router.navigate(['update/',user.id])


  }
}

