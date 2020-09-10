import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// import { Question } from '../question/question.component';
import { environment } from '../../../environments/environment';

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
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.errorMessage = "";
    this.errorMessageText = "";  
    console.log("Oh-oh! User is now logging in... ¯\\_(ツ)_/¯");

    let params = {      
      "user_team_uuid": "cgw-" + this.teamName.value,
      "user_pass": this.password.value
    }

    this.http.post<any>(environment.serviceUrl + "/users/login", params).subscribe(data => {
      // console.log(data[0]);  
      if (data.length > 0) {
        location.href = "/category";
      } else {
        this.errorMessage = "Login Invalid."
        this.errorMessageText = " Try again. Contact Team for more info";
      }
    })    
  }

}
