import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-category',
  templateUrl: './question-category.component.html',
  styleUrls: ['./question-category.component.css']
})
export class QuestionCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getNextQuestion() {
    console.log("Get Next Question...");
  }

}
