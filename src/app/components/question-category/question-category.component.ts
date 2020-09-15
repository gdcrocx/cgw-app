import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { QuestionControlService } from '../question/question-control.service';
import { QuestionBase } from '../question/question-base';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-question-category',
  templateUrl: './question-category.component.html',
  styleUrls: ['./question-category.component.css'],
  providers: [QuestionControlService]
})
export class QuestionCategoryComponent implements OnInit {

  question: QuestionBase<string>;

  easyBtn = true;
  mediumBtn = true;
  hardBtn = true;

  easyTotalQuestionsCount = 0;
  mediumTotalQuestionsCount = 0;
  hardTotalQuestionsCount = 0;

  easyQuestionsRemainingCount = 0;
  mediumQuestionsRemainingCount = 0;
  hardQuestionsRemainingCount = 0;

  constructor(
    private http: HttpClient,
    private _questionService: QuestionControlService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    if (!this.localStorage.keyExists("teamUuid") || !this.localStorage.keyExists("platform")) {
      location.href = "/login"
    }
    // this.questionService.currentQuestionData.subscribe(question => this.question = question);
    // console.log(this.question);
    this.checkQuestionsCount();
    this.getTotalQuestionsCount();
    this.updateCurrentTimeSnapshot();
  }

  // getNextQuestion(questionCategory) {

  //   console.log("Get Next Question...");

  //   let params = {
  //     "platform": this.localStorage.getFromCgwLocalStorage("platform"),
  //     "difficulty": questionCategory,
  //     "teamUuid": this.localStorage.getFromCgwLocalStorage("teamUuid"),
  //   }

  //   let question = new QuestionBase<string>();

  //   this.http.post<any>(environment.serviceUrl + "/question/next", params).subscribe(data => {
  //     console.log(data);
  //     if (data.length > 0) {
  //       question.key = data[0]["cgw_aws_q_id"];
  //       question.label = data[0]["cgw_aws_q_text"];
  //       question.value = "Answer";
  //       question.required = true;
  //       question.type = data[0]["cgw_aws_q_type"];
  //       question.hint = data[0]["cgw_aws_q_hint"];
  //       question.order = data[0]["cgw_aws_q_id"];
  //       question.controlType = 'textbox';
  //       // console.dir(question);
  //       // this._questionService.loadQuestionData(question);
  //     }
  //   })

  //   // console.dir(this.questionService.printQuestionData());

  //   location.href = "/quiz";
  // }

  setNextQuestionCategory(questionCategory) {
    this.localStorage.storeOnCgwLocalStorage("currentQuestionDiff", questionCategory);
    location.href = "/quiz";
  }

  checkQuestionsCount() {

    console.log("Getting All Questions...");

    let params = {
      "platform": this.localStorage.getFromCgwLocalStorage("platform"),
      "teamUuid": this.localStorage.getFromCgwLocalStorage("teamUuid")
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
              this.easyBtn = false;
              this.easyQuestionsRemainingCount = item.count;
          }
          else if (item.cgw_aws_q_diff == "medium") {
            if (item.count > 0)
              this.mediumBtn = false;
              this.mediumQuestionsRemainingCount = item.count;
          }
          else if (item.cgw_aws_q_diff == "hard") {
            if (item.count > 0)
              this.hardBtn = false;
              this.hardQuestionsRemainingCount = item.count;
          }
        });
      }      
    })
  }

  getTotalQuestionsCount() {

    console.log("Getting All Questions Count...");

    let params = {
      "platform": this.localStorage.getFromCgwLocalStorage("platform")      
    }

    this.http.post<any>(environment.serviceUrl + "/question/totalCount", params).subscribe(data => {
      // console.log(data);      
      if (data.length > 0) {
        data.forEach(item => {
          if (item.cgw_aws_q_diff == "easy") {
            if (item.count > 0)              
              this.easyTotalQuestionsCount = item.count;
          }
          else if (item.cgw_aws_q_diff == "medium") {
            if (item.count > 0)              
              this.mediumTotalQuestionsCount = item.count;
          }
          else if (item.cgw_aws_q_diff == "hard") {
            if (item.count > 0)              
              this.hardTotalQuestionsCount = item.count;
          }
        });
      }  
    })    
  }

  updateCurrentTimeSnapshot() {
    this.localStorage.storeOnCgwLocalStorage("currentTimeSnapshot", moment().format());    

    let params = {
      "user_team_uuid": this.localStorage.getFromCgwLocalStorage("teamUuid"),
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

}
