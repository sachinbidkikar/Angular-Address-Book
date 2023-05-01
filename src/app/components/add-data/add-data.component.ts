import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/service/user-service.service';


@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {

  public user: User = new User();
  usersFormGroup: FormGroup;
  id: number = this.route.snapshot.params['id']

  constructor(private formbuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserServiceService, private snackbar: MatSnackBar) {

    this.usersFormGroup = this.formbuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl(),
      address: new FormControl(),
      email: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      pincode: new FormControl()

    })
  }

  states: Array<any> = [
    { name: 'MH' },
    { name: 'KA' },
  ]

  /**
    * To Show  error 
    */
  public myError = (controlName: string, errorName: string) => {
    return this.usersFormGroup.controls[controlName].hasError(errorName)
  }

  onSubmit() {
    if (this.usersFormGroup.valid) {
      // updating employee data by calling http method :-
      this.user = this.usersFormGroup.value;
      if (this.id != undefined) {
        this.userService.updateUserData(this.id, this.user).subscribe(response => {
          console.log("DATA UPDATED "+response);
          this.snackbar.open("Data Updated for: " + response.object.name, "ok");
          this.router.navigateByUrl("/home-page");
        });
      } else {
        // adding employee data by calling http method :-
        this.user = this.usersFormGroup.value;
        this.userService.addUserData(this.user).subscribe(response => {
          console.log("USER::: " + this.user);
          console.log("RESPONSE::: " + response.value);
          this.snackbar.open("New User Added", "ok");
          this.router.navigateByUrl("/home-page");
        });
      }
    }
  }

  ngOnInit(): void {
    console.log("ID OF"+this.id);
    if (this.id != undefined) {
      this.userService.currentUser.subscribe(userData => {
        this.usersFormGroup.get('name')?.setValue(userData.name);
        this.usersFormGroup.get('phone')?.setValue(userData.phone);
        this.usersFormGroup.get('address')?.setValue(userData.address);
        this.usersFormGroup.get('email')?.setValue(userData.email);
        this.usersFormGroup.get('city')?.setValue(userData.city);
        this.usersFormGroup.get('state')?.setValue(userData.state);
        this.usersFormGroup.get('pincode')?.setValue(userData.pincode);

      });
    }

  }

}
