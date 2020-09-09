import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { QuestionControlService } from '../question/question-control.service';
import { QuestionBase } from '../question/question-base';

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
  totalQuestionsCount = 0;
  easyQuestionsRemainingCount = 0;
  mediumQuestionsRemainingCount = 0;
  hardQuestionsRemainingCount = 0;

  constructor(
    private http: HttpClient,
    private _questionService: QuestionControlService
  ) { }

  ngOnInit(): void {
    // this.questionService.currentQuestionData.subscribe(question => this.question = question);
    // console.log(this.question);
    this.checkQuestionsCount();
    this.getTotalQuestionsCount();
  }

  getNextQuestion(questionCategory) {

    console.log("Get Next Question...");

    let params = {
      "platform": "aws",
      "difficulty": questionCategory,
      "teamUuid": "wejum208"
    }

    let question = new QuestionBase<string>();

    this.http.post<any>(environment.serviceUrl + "/question/next", params).subscribe(data => {
      console.log(data);
      if (data.length > 0) {
        question.key = data[0]["cgw_aws_q_id"];
        question.label = data[0]["cgw_aws_q_text"];
        question.value = "Answer";
        question.required = true;
        question.type = data[0]["cgw_aws_q_type"];
        question.hint = data[0]["cgw_aws_q_hint"];
        question.order = data[0]["cgw_aws_q_id"];
        question.controlType = 'textbox';
        // console.dir(question);
        this._questionService.loadQuestionData(question);
      }
    })

    // console.dir(this.questionService.printQuestionData());

    // location.href = "/quiz";
  }

  checkQuestionsCount() {

    console.log("Getting All Questions...");

    let params = {
      "platform": "aws",      
      "teamUuid": "wejum208"
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
      "platform": "aws"      
    }

    this.http.post<any>(environment.serviceUrl + "/question/totalCount", params).subscribe(data => {
      // console.log(data[0].count);
      this.totalQuestionsCount = data[0].count
    })    
  }

}
