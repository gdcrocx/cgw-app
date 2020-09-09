import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  projectName = new FormControl();
  teamName = new FormControl();
  password = new FormControl();

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  signUp() {
    console.log("Oh-oh! User signing up... ¯\\_(ツ)_/¯");
    // console.log(this.projectName.value);
    // console.log(this.teamName.value);
    // console.log(this.password.value);

    let params = {
      "user_name": this.projectName.value,
      "user_team_uuid": "cgw-" + this.teamName.value,
      "user_pass": this.password.value
    }

    this.http.post<any>(environment.serviceUrl + "/users/signup", params).subscribe(data => {
      // console.log(data[0]);  
      if (data.length > 0) {
        location.href = "/login";
      }
    })    
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