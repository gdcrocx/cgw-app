import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';

import { environment } from '../environments/environment';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cgw-app';
  showConformityLink = environment.showConformityLink;

  @ViewChild('countdown', { static: false }) private counter: CountdownComponent;

  endGame = true;

  gameClockTimeInMinutes = 0;
  gameClockTimeInMicroseconds = 0;

  gameClockConfig = {
    leftTime: this.gameClockTimeInMicroseconds,
    format: "h:mm:ss",
    demand: false,
    notify: 0
  };

  constructor(
    private localStorage: LocalStorageService
  ){}

  ngOnInit() {
    this.counter.stop();
    console.log(location.pathname);
    // if (location.pathname in ["/category", "/quiz"]) {
      if (this.localStorage.keyExists("currentGameTimerTick")) {
        console.log("Game Timer Tick found.");
        this.gameClockTimeInMicroseconds = parseInt(this.localStorage.getFromCgwLocalStorage("currentGameTimerTick"))/1000;
        console.log("TimeOnLocalStorage - " + this.localStorage.getFromCgwLocalStorage("currentGameTimerTick"));
        this.gameClockConfig.leftTime = this.gameClockTimeInMicroseconds
      } else {
        console.log("No Game Timer Tick found.");
        this.gameClockTimeInMinutes = parseInt(this.localStorage.getFromCgwLocalStorage("totalTimeInMinutes"));
        this.gameClockConfig.leftTime = this.gameClockTimeInMinutes * 60; // Conversion to seconds, for leftTime uses seconds as its unit of time
        // console.log(this.counter.config);
        // this.setGameClockTimer(this.gameClockTimeInMinutes);
      }
    // }
  }

  // setGameClockTimer(mins?) {
  //   this.gameClockHours = Math.floor(mins/60).toString();
  //   this.gameClockMinutes = (mins%60).toString();
  //   this.gameClockSeconds = "00";
  // }

  updateLocalStorageTimer(event) {
    console.log(event.left);
    this.localStorage.storeOnCgwLocalStorage("currentGameTimerTick", event.left);
    // if (event.left == 0) {
    //   this.endGame = true;
    // }
  }
}