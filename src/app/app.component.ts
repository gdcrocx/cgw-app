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

  gameClockTimeInMinutes = 0;
  // gameClockHours = "00";
  // gameClockMinutes = "00";
  // gameClockSeconds = "00";

  gameClockConfig = {
    leftTime: this.gameClockTimeInMinutes,
    format: "h:mm:ss",
    demand: false
  };

  constructor(
    private localStorage: LocalStorageService
  ){}

  ngOnInit() {
    this.gameClockTimeInMinutes = parseInt(this.localStorage.getFromCgwLocalStorage("totalTimeInMinutes"));
    this.gameClockConfig.leftTime = this.gameClockTimeInMinutes * 60;
    // console.log(this.counter.config);
    // this.setGameClockTimer(this.gameClockTimeInMinutes);
  }

  // setGameClockTimer(mins?) {
  //   this.gameClockHours = Math.floor(mins/60).toString();
  //   this.gameClockMinutes = (mins%60).toString();
  //   this.gameClockSeconds = "00";
  // }

  timerEvent(event) {
    console.log(event);
  }

  startGameTimer() {

  }

  // let eventDeadline;
  // let eventTimeValue = 90;

  // // if there's a cookie with the name currentTimerCutOff, use that value as the deadline
  // if (document.cookie && document.cookie.match('currentEventTimerCutOff')) {
  //     // get deadline value from cookie    
  //     eventDeadline = document.cookie.match(/(^|;)currentEventTimerCutOff=([^;]+)/)[2];
  // } else {
  //     eventDeadline = setEventTimer(eventTimeValue);
  //     document.cookie = 'currentEventTimerCutOff=' + eventDeadline + '; samesite=strict;';    
  // }

  // function setEventTimer(mins = 90) {
  //     console.log("--- Reset Event Timer ---");
  //     let currentTime = Date.parse(new Date());
  //     let milliseconds = mins * 60 * 1000;
  //     newTime = new Date(currentTime + milliseconds);
  //     console.log(newTime);
  //     document.cookie = 'currentEventTimerCutOff=' + newTime + '; samesite=strict;';
  //     document.cookie = 'currentEventTimerTime=' + milliseconds + '; samesite=strict;';
  //     return newTime;
  // }

  // function killEventTimer() {
  //     let currentEventTime = new Date();
  //     document.cookie = 'currentEventTimerCutOff=' + currentEventTime + '; samesite=strict; expires=' + currentEventTime + ';';
  // }

  // function updateEventTimerBackend(currentEventTimerTime) {
  //     document.cookie = 'currentEventTimerTime=' + currentEventTimerTime + '; samesite=strict;';
  // }

  // function initializeEventClock(eventTimeValue = 90) {

  //     eventEndtime = setEventTimer(eventTimeValue);
      
  //     let eventHoursSpan = document.getElementById('eventHours');
  //     let eventMinutesSpan = document.getElementById('eventMinutes');
  //     let eventSecondsSpan = document.getElementById('eventSeconds');

  //     function updateEventClock() {
  //         let et = getEventTimeRemaining(eventEndtime);

  //         updateEventTimerBackend(et.total);        
          
  //         eventHoursSpan.innerHTML = ('0' + et.hours).slice(-2);
  //         eventMinutesSpan.innerHTML = ('0' + et.minutes).slice(-2);
  //         eventSecondsSpan.innerHTML = ('0' + et.seconds).slice(-2);

  //         if (et.total <= 0) {
  //             killEventTimer();
  //             clearInterval(eventTimeinterval);
  //         }
  //     }

  //     updateEventClock();
  //     let eventTimeinterval = setInterval(updateEventClock, 1000);
  // }

  // function getEventTimeRemaining(eventEndtime) {
  //     let total = Date.parse(eventEndtime) - Date.parse(new Date());
  //     let seconds = Math.floor((total / 1000) % 60);
  //     let minutes = Math.floor((total / 1000 / 60) % 60);
  //     let hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  //     // let days = Math.floor(total / (1000 * 60 * 60 * 24));

  //     return {
  //         total,
  //         // days,
  //         hours,
  //         minutes,
  //         seconds
  //     };
  // }
}
