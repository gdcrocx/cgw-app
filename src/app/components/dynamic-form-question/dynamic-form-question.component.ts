import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

import { QuestionBase } from '../question/question-base';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent implements OnInit, AfterViewInit {
  
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;
  // get isValid() { return this.form.controls[this.question.key].valid; }

  @ViewChild('questionCountdown', { static: true }) private questionCounter: CountdownComponent;
  
  showHint: boolean = true;
  showHintText: boolean = false;
  showSkip: boolean = false;  
  showNextQuestion: boolean = true;

  teamUuid = "";
  userAnswer = "";

  easyQuestionsRemainingCount = 0;
  easyQuestionsTotalCount = 0;
  mediumQuestionsRemainingCount = 0;
  mediumQuestionsTotalCount = 0;
  hardQuestionsRemainingCount = 0;
  hardQuestionsTotalCount = 0;

  totalScore = 0;

  q_key = "";
  q_diff = "";
  q_label = "";
  q_allottedTime = 0;
  q_allottedScore = 0;
  q_currentScore = 0;
  q_placeholder = "";
  q_required = false;
  q_type = "";
  q_hint = "";
  // q_order = "";
  q_controlType = "";

  errorMessage = "";
  errorMessageText = "";  
  successMessage = "";
  successMessageText = "";

  questionClockTimeInMinutes = 0;
  questionClockTimeInMicroseconds = 0

  questionClockConfig: CountdownConfig = {
    leftTime: this.questionClockTimeInMicroseconds,
    format: "mm:ss",
    demand: true,
    notify: 0
  };

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { 
    this.teamUuid = this.localStorage.getFromCgwLocalStorage("teamUuid");
  }

  ngOnInit() {
    this.q_diff = this.getQuestionCategory();    
    // console.log(this.q_diff);
    this.getNextQuestion(this.q_diff)

    this.checkQuestionsCount();
    this.getTotalQuestionsCount();
    this.getTotalScore();
    this.updateCurrentTimeSnapshot();
  }

  ngAfterViewInit(): void {
    this.questionCounter.begin();
  }

  toggleHintOn(questionId) {
    console.log("One hint for Question " + questionId + " coming right up...");
    this.showHintText = true;
    this.showSkip = true;
    this.q_currentScore = this.q_allottedScore/2;
  }

  toggleSkipOn() {
    console.log("Enabled Skip...");
    // alert("Hello Skipper!");
    this.showSkip = true;
  }

  skipQuestion() {
    // this.unlockQuestion();
    // location.href = "/category";
    let params = {
      questionId: this.q_key,
      teamUuid: this.localStorage.getFromCgwLocalStorage("teamUuid")
    }    

    this.http.post<any>(environment.serviceUrl + "/question/skip", params).subscribe(data => {
      // console.log(data[0]);
      if (data.length == 0) {
        location.href = "/category";
      }
      if (data.length > 0) {        
        if ('cgw_q_skip_status' in data[0]) {
          if (data[0].cgw_q_skip_status == 1) {
            this.getNextQuestion(this.q_diff);
          } else {
            console.log("Error 444: Could not unlock question.")
          }
        }
      }
    })
    this.getNextQuestion(this.localStorage.getFromCgwLocalStorage("teamUuid"));
  }

  // unlockQuestion() {
  //   let params = {
  //     "questionId": this.q_key,
  //     "teamUuid": this.teamUuid
  //   }

  //   this.http.put<any>(environment.serviceUrl + "/question/unlock", params).subscribe(data => {
  //     console.log(data);
  //     if (data.length == 0) {
  //       location.href = "/category";
  //     }
  //     if (data.length > 0) {        
  //       if ('cgw_q_lock_status' in data[0]) {
  //         if (data[0].cgw_q_lock_status == 0) {
  //           this.getNextQuestion(this.q_diff);
  //         } else {
  //           console.log("Error 444: Could not unlock question.")
  //         }
  //       }
  //     }
  //   })
  // }

  // lockQuestion() {
  //   let params = {
  //     "questionId": this.q_key,
  //     "teamUuid": this.teamUuid
  //   }

  //   this.http.post<any>(environment.serviceUrl + "/question/lock", params).subscribe(data => {
  //     console.log(data[0]);
  //     if (data.length == 0) {
  //       location.href = "/category";
  //     }
  //     if (data.length > 0) {        
  //       if ('cgw_q_lock_status' in data[0]) {
  //         if (data[0].cgw_q_lock_status == 1) {
  //           console.log("Success: Question Locked.");
  //         } else {
  //           console.log("Error 444: Could not unlock question.");
  //         }
  //       }
  //     }
  //   })
  // }

  nextQuestion() {
    location.href = '/category';
  }

  checkAnswer() {
    this.errorMessage = "";
    this.errorMessageText = "";
    this.successMessage = "";
    this.successMessageText = "";

    console.log("Checking answer...");

    let params = {
      "platform": this.localStorage.getFromCgwLocalStorage("platform"),
      "cgw_aws_q_id": this.q_key,
      "teamUuid": this.teamUuid,
      "user_answer": this.userAnswer,
      "cgw_q_score": this.q_currentScore
    }

    this.http.post<any>(environment.serviceUrl + "/question/checkAnswer", params).subscribe(data => {
      console.log(data[0]);  
      if (data.length == 0) {
        // this.easyQuestionsRemainingCount = 0;
        // this.mediumQuestionsRemainingCount = 0;
        // this.hardQuestionsRemainingCount = 0;
        location.href = "/category";
      }
      // console.log(params);
      if (data.length > 0) {        
        if ('response' in data[0]) {
          if (data[0].response == 1) {
            this.showHint = false;
            this.showSkip = false;
            this.showNextQuestion = true;
            this.successMessage = "Congratulations!";
            this.successMessageText = " You are one step closer to a safer and secure environment";
            this.getNextQuestion(this.q_diff);
          } else {
            this.errorMessage = "Incorrect!";
            this.errorMessageText = " Try again.";
          }
        }
      }
    })   
    // location.href = '/category'; 
  }

  getQuestionCategory(): string {
    return this.localStorage.getFromCgwLocalStorage("currentQuestionDiff");
  }

  getNextQuestion(questionCategory): any {

    // console.log("Get Next Question...");

    let params = {
      "platform": this.localStorage.getFromCgwLocalStorage("platform"),
      "difficulty": questionCategory,
      "teamUuid": this.teamUuid
    }

    this.http.post<any>(environment.serviceUrl + "/question/next", params).subscribe(data => {
      console.log(data);
      if (data.length == 0) {        
        // location.href = "/category";
      }
      if (data.length > 0) {

        // console.log(this);
        // console.log(typeof(this));

        this.q_key = data[0]["cgw_aws_q_id"];
        this.q_label = data[0]["cgw_aws_q_text"];
        this.q_allottedTime = parseInt(data[0]["cgw_aws_q_allottedTime"]);
        this.q_allottedScore = this.q_currentScore = parseInt(data[0]["cgw_aws_q_score"]);
        this.q_placeholder = "Answer";
        this.q_required = true;
        this.q_type = data[0]["cgw_aws_q_type"];
        this.q_hint = data[0]["cgw_aws_q_hint"];
        // this.q_order = data[0]["cgw_aws_q_id"];
        this.q_controlType = 'textbox';

        // console.log(this);
        // console.log(typeof(this));

        // this.lockQuestion();
        this.resetQuestionForm();
        // console.log("Q Clock - " + this.questionClockTimeInMinutes);
        // console.log(this.questionCounter.config);
        // // console.log(this.questionClockConfig);
        // // console.log(this.questionCounter);
        return data;
      }
    });
    // , (function() {
    //   console.log(data);
    //   var data = data; // j is a copy of i only available to the scope of the inner function
    //   return function() {
    //     console.log(data[0]["cgw_aws_q_id"]);
    //     // if (this.localStorage.keyExists("Q"+ this.q_key)) {
    //     //   console.log("Question Timer Tick found.");
    //     //   let localQuestionObj = JSON.parse(this.localStorage.getFromCgwLocalStorage("Q"+ this.q_key))
    //     //   console.log(localQuestionObj);
    //     //   this.questionClockTimeInMicroseconds = localQuestionObj["q_currentTimeTick"];
    //     //   console.log("Microseconds - " + this.questionClockTimeInMicroseconds);

    //     //   this.questionClockConfig.leftTime = this.questionClockTimeInMicroseconds;
    //     //   // this.questionCounter.config.leftTime = this.questionClockTimeInMicroseconds;
    //     //   // this.questionCounter.left = this.questionClockTimeInMicroseconds;
    //     // } else {
    //     //   console.log("No Question Timer Tick found.");
    //     //   this.questionClockTimeInMinutes = this.q_allottedTime;
    //     //   console.log(this.q_allottedTime);
    //     //   this.questionClockConfig.leftTime = this.questionClockTimeInMinutes * 60; // Conversion to seconds, for leftTime uses seconds as its unit of time
    //     //   // this.questionCounter.config.leftTime = this.questionClockTimeInMinutes * 60; ;
    //     //   // this.questionCounter.left = this.questionClockTimeInMinutes * 60; ;

    //     //   let question: Object = {
    //     //     q_key: this.q_key,
    //     //     q_currentTimeTick: this.q_allottedTime * 60 * 1000
    //     //   }
    //     //   this.localStorage.storeOnCgwLocalStorage("Q"+ this.q_key, JSON.stringify(question));
    //     //   console.log("Get from storage - " + this.localStorage.getFromCgwLocalStorage("Q"+ this.q_key));
    //     // }
    //   }
    // })());

    // API.doSthWithCallbacks( (function() {
    //   var j = i; // j is a copy of i only available to the scope of the inner function
    //   return function() {
    //     array[j].something = 42;
    //   }
    // })() );
  }

  checkQuestionsCount() {

    // console.log("Getting All Questions...");

    let params = {
      "platform": this.localStorage.getFromCgwLocalStorage("platform"),
      "teamUuid": this.teamUuid
    }

    this.http.post<any>(environment.serviceUrl + "/question/count", params).subscribe(data => {
      // console.log(data);
      // data = [
      //   {
      //     cgw_aws_q_diff: "easy",
      //     count: 0
      //   },
      //   {
      //     cgw_aws_q_diff: "medium",
      //     count: 9
      //   },
      //   {
      //     cgw_aws_q_diff: "hard",
      //     count: 1
      //   }
      // ]
      if (data.length > 0) {
        data.forEach(item => {
          if (item.cgw_aws_q_diff == "easy") {
            if (item.count > 0)              
              this.easyQuestionsRemainingCount = item.count;
          }
          else if (item.cgw_aws_q_diff == "medium") {
            if (item.count > 0)
              this.mediumQuestionsRemainingCount = item.count;
          }
          else if (item.cgw_aws_q_diff == "hard") {
            if (item.count > 0)
              this.hardQuestionsRemainingCount = item.count;
          }
        });
      }      
    })
  }

  getTotalQuestionsCount() {

    // console.log("Getting All Questions Count...");

    let params = {
      "platform": this.localStorage.getFromCgwLocalStorage("platform")      
    }

    this.http.post<any>(environment.serviceUrl + "/question/totalCount", params).subscribe(data => {
      // console.log(data);      
      if (data.length > 0) {
        data.forEach(item => {
          if (item.cgw_aws_q_diff == "easy") {
            if (item.count > 0)              
              this.easyQuestionsTotalCount = item.count;
          }
          else if (item.cgw_aws_q_diff == "medium") {
            if (item.count > 0)              
              this.mediumQuestionsTotalCount = item.count;
          }
          else if (item.cgw_aws_q_diff == "hard") {
            if (item.count > 0)              
              this.hardQuestionsTotalCount = item.count;
          }
        });
      }  
    })    
  }

  getTotalScore() {
    let params = {
      "user_team_uuid": this.teamUuid      
    }

    this.http.post<any>(environment.serviceUrl + "/users/totalScore", params).subscribe(data => {
      // console.log(data);
      if (data.length > 0) {        
        if ('totalScore' in data[0]) {
          this.totalScore = data[0].totalScore;
        }
      }
    })    
  }

  resetQuestionForm() {
    this.showHint = true;
    this.showHintText = false;
    // this.showNextQuestion = false;
    this.userAnswer = "";
  }

  updateCurrentTimeSnapshot() {
    this.localStorage.storeOnCgwLocalStorage("currentTimeSnapshot", moment().format());    

    let params = {
      "user_team_uuid": this.teamUuid,
      "user_time_snapshot": JSON.stringify(this.localStorage.getFromCgwLocalStorage())
    }    

    this.http.post<any>(environment.serviceUrl + "/users/saveTimeSnapshot", params).subscribe(data => {
      // console.log(data[0]);
      if (data.length > 0) {        
        if ('cgw_uuid' in data[0]) {
          console.log("Success: Local Time Snapshot saved successfully in the backend.");
        }
      }
    })
  }

  updateLocalStorageQuestionTimer(event) {
    // console.log(event);
    if (event.left !== NaN) {
      this.localStorage.storeOnCgwLocalStorage("currentQuestionTimerTick", event.left);
      if (this.localStorage.keyExists("Q" + this.q_key)) {
        // console.log("Question: - " + this.localStorage.getFromCgwLocalStorage("Q" + this.q_key));
        let localQuestionObj = JSON.parse(this.localStorage.getFromCgwLocalStorage("Q" + this.q_key));
        // console.log(JSON.stringify(localQuestionObj));
        localQuestionObj["q_currentTimeTick"] = event.left;
        this.localStorage.storeOnCgwLocalStorage("Q" + this.q_key, JSON.stringify(localQuestionObj));
      }
    } else {
      let question: Object = {
        q_key: this.q_key,
        q_currentTimeTick: this.q_allottedTime
      }
      this.localStorage.storeOnCgwLocalStorage("Q"+ this.q_key, JSON.stringify(question));
    }
  }
    
}