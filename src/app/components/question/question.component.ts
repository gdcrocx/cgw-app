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
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-question',
  template: `
      <app-dynamic-form [question]="question$"></app-dynamic-form>    
  `,
  providers:  [QuestionService]
})
export class QuestionComponent {
  question$: QuestionBase<any>;

  constructor(service: QuestionService) {
    this.question$ = service.getAwsQuestions();
    // console.dir("Service - " + this.question$);
  }
}
