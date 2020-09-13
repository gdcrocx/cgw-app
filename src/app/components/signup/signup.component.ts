import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  teamName = new FormControl();
  password = new FormControl();
  errorMessage = "";
  errorMessageText = "";  

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.localStorage.deleteCgwLocalStorage();
  }

  signUp() {
    console.log("Oh-oh! User signing up... ¯\\_(ツ)_/¯");
    // console.log(this.projectName.value);
    // console.log(this.teamName.value);
    // console.log(this.password.value);

    let params = {
      "user_name": "cgw-" + this.teamName.value,
      "user_team_uuid": this.teamName.value,
      "user_pass": this.password.value
    }

    this.http.post<any>(environment.serviceUrl + "/users/signup", params).subscribe(data => {
      // console.log(data);  
      let err = 0;
      if (data.length > 0) {
        if ('user_team_uuid' in data[0]) {
          console.log("Logging in...");
          location.href = "/login";
        } else {
          err = 1;
        }      
      } else {
        err = 1;
      }
      if (err == 1) {
        this.errorMessage = "Login Invalid."
        this.errorMessageText = " Try again. Contact Team for more info";
      }
    })    
  }

  skipToLogin() {
    location.href = "/login";
  }
}

/*
Time * # * People
5 * 6 = 30 mins * 2
10 *  2 = 20 mins * 1
20 * 2 = 40 mins * 1

120-140 mins

90 * 3 = 270 mins
*/