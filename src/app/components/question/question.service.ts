import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of, Observable } from 'rxjs';

import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { isNgTemplate } from '@angular/compiler';

import { environment } from '../../../environments/environment';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable()
export class QuestionService implements OnInit {

  response: any;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    if (!this.localStorage.keyExists("teamUuid") || !this.localStorage.keyExists("platform")) {
      location.href = "/login"
    }
  }

  // TODO: get from a remote source of question metadata
  // getQuestions() : QuestionBase<string> {

  //   const question: QuestionBase<string> = {
  //       "key": "firstName",
  //       "label": "First name",
  //       "value": "Bombasto",
  //       "required": true,
  //       "hint": "Hint 1",        
  //       "order": 1,
  //       "controlType": "textbox",
  //       "type": "text",
  //       "options": []
  //     }
  //     // ,
  //     // new TextboxQuestion({
  //     //   key: 'emailAddress',
  //     //   label: 'Email',
  //     //   type: 'email',
  //     //   value: "Email",
  //     //   required: true,
  //     //   hint: "Hint 2",
  //     //   order: 2
  //     // }),
  //     // new TextboxQuestion({
  //     //   key: 'number',
  //     //   label: 'Number??',
  //     //   type: 'number',
  //     //   value: '99999',
  //     //   required: true,
  //     //   hint: "Hint 3",
  //     //   order: 3
  //     // })

  //   // ];
  //   // return of(questions.sort((a, b) => a.order - b.order));
  //   return question;
  // }

  // getAwsQuestions() {
    
  //   let question = new QuestionBase<string>();

  //   // console.log(this.localStorage.keyExists("teamUuid"));

  //   let params = {
  //     "teamUuid": this.localStorage.getFromCgwLocalStorage("teamUuid"),
  //     "difficulty": "easy",
  //     "platform": this.localStorage.getFromCgwLocalStorage("platform")
  //   }

  //   this.http.post<any>(environment.serviceUrl + "/question/next", params).subscribe(data => {
  //     // console.log(data[0]);
  //     question.key = data[0]["cgw_aws_q_id"];
  //     question.label = data[0]["cgw_aws_q_text"],
  //     question.value = "Answer",
  //     question.required = true,
  //     question.type = data[0]["cgw_aws_q_type"],
  //     question.hint = data[0]["cgw_aws_q_hint"],
  //     question.order = data[0]["cgw_aws_q_id"]
  //     question.controlType = 'textbox'
  //         // console.log("Items - " + item);
  //         // console.dir(item);
  //         // console.log("Item - " + item["cgw_aws_q_id"])
  //         // if (item["cgw_aws_q_type"] === "text") {
  //         // question.push(
  //         //   new TextboxQuestion({
  //         //     key: data["cgw_aws_q_id"],
  //         //     label: data["cgw_aws_q_text"],
  //         //     value: "Answer",
  //         //     required: true,
  //         //     type: data["cgw_aws_q_type"],
  //         //     hint: data["cgw_aws_q_hint"],
  //         //     order: data["cgw_aws_q_id"]
  //         //   })
  //         // )      
  //   })
  // // console.dir(response);
  // // console.log(response);
  // //       // {
  // //       //   key : "cgw_aws_q_id",
  // //       //   label : "cgw_aws_q_text",
  // //       //   value : "",
  // //       //   required : true,
  // //       //   order : 1,
  // //       //   controlType: "textbox",
  // //       //   type: "number",
  // //       //   options: []
  // //       // }
  // //     }
  // //   )

  //   // console.log("Questions - " + question);
  //   return question; //of(questions.sort((a, b) => a.order - b.order));   
  // }
}
