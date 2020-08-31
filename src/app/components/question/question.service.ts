import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';

import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { isNgTemplate } from '@angular/compiler';

@Injectable()
export class QuestionService {

  response: any;

  constructor(
    private http: HttpClient
  ) {}

  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questions: QuestionBase<string>[] = [

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        hint: "Hint 1",        
        order: 1
      }),
      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        hint: "Hint 2",
        order: 2
      }),
      new TextboxQuestion({
        key: 'Question 1',
        label: 'Yama??',
        type: 'number',
        hint: "Hint 3",
        order: 3
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  getAwsQuestions() {
    
    let questions: QuestionBase<string>[] = [];

    this.http.get<any>("http://192.168.2.41:3000/question/aws/all").subscribe(data => {
      console.log(data);
      // this.response = data;

      data.forEach(
        function (item) {
          // console.log("Items - " + item);
          // console.dir(item);
          console.log("Item - " + item["cgw_aws_q_id"])
          // if (item["cgw_aws_q_type"] === "text") {
          questions.push(
            new TextboxQuestion({
              key: item["cgw_aws_q_id"],
              label: item["cgw_aws_q_text"],
              type: item["cgw_aws_q_type"],
              hint: item["cgw_aws_q_hint"],
              order: 1
            })
          )
        }        
      )         
    })

    // console.dir(response);
    // console.log(response);

    

  //       // {
  //       //   key : "cgw_aws_q_id",
  //       //   label : "cgw_aws_q_text",
  //       //   value : "",
  //       //   required : true,
  //       //   order : 1,
  //       //   controlType: "textbox",
  //       //   type: "number",
  //       //   options: []
  //       // }
  //     }
  //   )
    return of(questions.sort((a, b) => a.order - b.order));   
  }
}
