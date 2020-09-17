import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

// import { Question } from '../question/question.component';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
    console.log(moment().format());
    this.getCurrentTimeSnapshot(this.teamName);
  }

  login() {
    this.errorMessage = "";
    this.errorMessageText = "";  
    console.log("Oh-oh! User is now logging in... ¯\\_(ツ)_/¯");

    let params = {      
      "user_team_uuid": this.teamName.value,
      "user_pass": this.password.value
    }

    this.http.post<any>(environment.serviceUrl + "/users/login", params).subscribe(data => {
      // console.log(data);  
      let err = 0;
      if (data.length > 0) {   
        this.localStorage.storeOnCgwLocalStorage('startTime', moment().format());
        this.localStorage.storeOnCgwLocalStorage('totalTimeInMinutes', environment.totalSessionTimeInMinutes.toString());     
        this.localStorage.storeOnCgwLocalStorage('endTime', moment().add(environment.totalSessionTimeInMinutes, 'minutes').format());
        if ('user_team_uuid' in data[0]) {
          this.localStorage.storeOnCgwLocalStorage("teamUuid", data[0].user_team_uuid);
          this.getCurrentTimeSnapshot(data[0].user_team_uuid);
          location.href = "/category";
        } else {
          err = 1;
        }
        if ('user_platform' in data[0]) {
          this.localStorage.storeOnCgwLocalStorage("platform", data[0].user_platform);
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

  getCurrentTimeSnapshot(teamName) {
    let params = {
      "user_team_uuid": teamName
    }    

    this.http.post<any>(environment.serviceUrl + "/users/getTimeSnapshot", params).subscribe(data => {
      // console.log(data[0]);
      if (data.length > 0) {        
        if ('cgw_user_snapshot' in data[0]) {
          console.log(data[0].cgw_user_snapshot);
          this.localStorage.storeOnCgwLocalStorage("cgw_storage", data[0].cgw_user_snapshot);
        }
      }
    })
  }

}
