import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { QuestionBase } from '../question/question-base';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent implements OnInit {
  
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;
  // get isValid() { return this.form.controls[this.question.key].valid; }
  
  showHint: boolean = true;
  showHintText: boolean = false;
  showSkip: boolean = false;  
  showNextQuestion: boolean = false;

  userAnswer = new FormControl();
  questionDiff = "easy";

  easyQuestionsRemainingCount = 0;
  easyQuestionsTotalCount = 0;
  mediumQuestionsRemainingCount = 0;
  mediumQuestionsTotalCount = 0;
  hardQuestionsRemainingCount = 0;
  hardQuestionsTotalCount = 0;

  q_key = "";
  q_label = "";
  q_value = "";
  q_required = false;
  q_type = "";
  q_hint = "";
  q_order = "";
  q_controlType = "";

  // question.key = data[0]["cgw_aws_q_id"];
  // question.label = data[0]["cgw_aws_q_text"];
  // question.value = "Answer";
  // question.required = true;
  // question.type = data[0]["cgw_aws_q_type"];
  // question.hint = data[0]["cgw_aws_q_hint"];
  // question.order = data[0]["cgw_aws_q_id"];
  // question.controlType = 'textbox';

  errorMessage = "";
  errorMessageText = "";  
  successMessage = "";
  successMessageText = "";  

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.questionDiff = this.getQuestionCategory();    
    // this.getNextQuestion(this.questionDiff);
  }

  toggleHintOn(questionId) {
    console.log("One hint for Question " + questionId + " coming right up...");
    this.showHintText = true;
    this.showSkip = true;
  }

  toggleSkipOn() {
    console.log("Enabled Skip...");
    // alert("Hello Skipper!");
    this.showSkip = true;
  }

  skipQuestion() {
    location.href = '/category';
  }

  nextQuestion() {
    location.href = '/category';
  }

  checkAnswer() {
    this.errorMessage = "";
    this.errorMessageText = "";
    this.successMessage = "";
    this.successMessageText = "";

    console.log("Checking answer...");
    // console.log(this.userAnswer.value);

    let params = {
      "platform": this.localStorage.getFromCgwLocalStorage("platform"),
      "cgw_aws_q_id": this.question.key,
      "user_answer": this.userAnswer.value
    }

    this.http.post<any>(environment.serviceUrl + "/question/checkAnswer", params).subscribe(data => {
      // console.log(data[0]);  
      // console.log(params);
      if (data.length > 0) {        
        if ('response' in data[0]) {
          if (data[0].response == 1) {
            this.successMessage = "Congratulations!"
            this.successMessageText = " You are one step closer to having a secure environment."
            this.showHint = false;
            this.showSkip = false;
            this.showNextQuestion = true;            
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

  getNextQuestion(questionCategory) {

    console.log("Get Next Question...");

    let params = {
      "platform": this.localStorage.getFromCgwLocalStorage("platform"),
      "difficulty": questionCategory,
      "teamUuid": this.localStorage.getFromCgwLocalStorage("teamUuid"),
    }

    let question = new QuestionBase<string>();

    // this.http.post<any>(environment.serviceUrl + "/question/next", params).subscribe(data => {
    //   console.log(data);
    //   if (data.length > 0) {
    //     this.q_key = data[0]["cgw_aws_q_id"];
    //     this.q_label = data[0]["cgw_aws_q_text"];
    //     this.q_value = "Answer";
    //     this.q_required = true;
    //     this.q_type = data[0]["cgw_aws_q_type"];
    //     this.q_hint = data[0]["cgw_aws_q_hint"];
    //     this.q_order = data[0]["cgw_aws_q_id"];
    //     this.q_controlType = 'textbox';
    //     // console.dir(question);
    //     // this._questionService.loadQuestionData(question);
    //   }
    // })

    // console.dir(this.questionService.printQuestionData());

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
    
}