// import { Component, OnInit } from '@angular/core';

// import { QuestionService } from '../question.service';

// @Component({
//   selector: 'app-quiz',
//   templateUrl: './quiz.component.html',
//   providers: [QuestionService],
//   styleUrls: ['./quiz.component.css']
// })
// export class QuizComponent implements OnInit {


//   constructor() { }

//   ngOnInit(): void {
//   }

//   getInstanceId = () => {
    
//   }

// }

import { Component, OnInit } from '@angular/core';

import { QuestionService } from './question.service';
import { QuestionBase } from './question-base';
import { LocalStorageService } from 'src/app/services/local-storage.service';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-question',
  template: `
      <app-dynamic-form [question]="question$"></app-dynamic-form>    
  `,
  providers:  [QuestionService]
})
export class QuestionComponent implements OnInit {

  question$: QuestionBase<any>;

  constructor(
    private questionService: QuestionService,
    private localStorage: LocalStorageService
  ) {
    // console.dir("Service - " + this.question$);
  }

  ngOnInit() {
    if (!this.localStorage.keyExists("teamUuid") || !this.localStorage.keyExists("platform")) {
      location.href = "/login"
    }
    // this.question$ = this.questionService.getAwsQuestions();
  }
}
