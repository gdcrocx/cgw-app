import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

import { environment } from '../environments/environment';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'cgw-app';
  showConformityLink = environment.showConformityLink;

  // @ViewChild('gameCountdown', { static: true }) public gameCounter: CountdownComponent;

  // gameClockTimeInMinutes = 0;
  // gameClockTimeInMicroseconds = 0;

  // gameClockConfig: CountdownConfig = {
  //   leftTime: this.gameClockTimeInMicroseconds,
  //   // format: "h:mm:ss",
  //   demand: true,
  //   notify: 0
  // };

  constructor(
    private localStorage: LocalStorageService
  ){}

  ngOnInit() {
    // if (this.localStorage.keyExists("currentGameTimerTick")) {
    //   console.log("Game Timer Tick found.");
    //   this.gameClockTimeInMicroseconds = parseInt(this.localStorage.getFromCgwLocalStorage("currentGameTimerTick"))/1000;
    //   console.log("TimeOnLocalStorage - " + this.localStorage.getFromCgwLocalStorage("currentGameTimerTick"));
    //   this.gameClockConfig.leftTime = this.gameClockTimeInMicroseconds;
    // } else {
    //   console.log("No Game Timer Tick found.");
    //   this.gameClockTimeInMinutes = parseInt(this.localStorage.getFromCgwLocalStorage("totalTimeInMinutes"));
    //   this.gameClockConfig.leftTime = this.gameClockTimeInMinutes * 60; // Conversion to seconds, for leftTime uses seconds as its unit of time
    // }
  }

  ngAfterViewInit(): void {
    // this.gameCounter.begin();
  }

  // updateLocalStorageGameTimer(event) {
  //   // console.log(event);
  //   if (event.left !== NaN) {
  //     this.localStorage.storeOnCgwLocalStorage("currentGameTimerTick", event.left);
  //   }
  //   // if (location.pathname == "/category" || location.pathname == "/quiz") {
  //   //   this.gameCounter.resume();
  //   // } else {
  //   //   this.gameCounter.pause();
  //   // }
  //   // if (this.localStorage.getFromCgwLocalStorage("currentGameTimerTick") == 0) {
  //   //   location.href = "/category"
  //   // }
  // }
}