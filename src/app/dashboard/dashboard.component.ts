import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import {QuizService} from '../quiz.service';
// import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  // user: SocialUser;
  public questions: any = [];
// public questions: any = [
//   {
//     "id": "1",
//     "questions":"India is a federal union comprising twenty-nine states and how many union territories?",
//     "options": [
//       "6",
//       "7",
//       "8",
//       "9"
//     ],
//     "answer": "7"
//   },
//   {
//     "id": "2",
//     "questions":"Which of the following is the capital of Arunachal Pradesh?",
//     "options": [
//       "Itanagar",
//       "Dispur",
//       "Imphal",
//       "Shillong"
//     ],
//     "answer": "Itanagar"
//   },
//   {
//     "id": "3",
//     "questions":"What are the major languages spoken in Andhra Pradesh?",
//     "options": [
//       "English and Telugu",
//       "Telugu and Urdu",
//       "Telugu and Kannada",
//       "All of the above languages"
//     ],
//     "answer": "Telugu and Urdu"
//   },
//   {
//     "id": "4",
//     "questions":"Which of the following states is not located in the North?",
//     "options": [
//       "Jammu and Kashmir",
//       "Himachal Pradesh",
//       "Haryana",
//       "Jharkhand"
//     ],
//     "answer": "Jharkhand"
//   },
//   {
//     "id": "5",
//     "questions":"Which state has the largest area?",
//     "options": [
//       "Maharashtra",
//       "Madhya Pradesh",
//       "Uttar Pradesh",
//       "Rajasthan"
//     ],
//     "answer": "Rajasthan"
//   }
// ];
public step= 1;
public correct_answer:number;
public fullMarks:boolean = false;
public submitted:boolean = false;
public timeLeft:number=120;
public _time_start:any;
public timeup:boolean= false;
public alldone:boolean= false;
public percentage:number;
public show:boolean=false;
public current_time:any;
public time_taken:number;
public given_time:number;
public exam_time:number= 0;
public minutes:number=0;
public seconds:number=0;
public total_minutes:number= 0;
public total_seconds:number= 0;
public values:any=[];
public topic:string;
public skip:boolean= true;
// public values: any = [
//   "Set1",
//   "Set2",
//   "Set3"
// ];
public selectedSet: string = "";

public enabledButton:boolean= false;


  constructor(public quiz_data: QuizService) { }

  ngOnInit() {
    // this.timerStart()
    //minutes
    this.minutes = Math.floor(this.timeLeft / 60)
    //seconds
    this.seconds = this.timeLeft - this.minutes * 60
    this.given_time = this.timeLeft;

    this.get_set();
  }

  timerStart() {
    this._time_start = setInterval(() => {
      this.timer(this.timeLeft);
      this.current_time=this.timeLeft;

      //minutes
      this.minutes = Math.floor(this.timeLeft / 60)
      //seconds
      this.seconds = this.timeLeft - this.minutes * 60

      //console.log(this.timeLeft)
      if(this.timeLeft == 0) {
        this.timeStop()
        if(this.step == this.questions.length) {
          // console.log("You have done")
          // console.log(this.given_time, this.current_time, this.step-1)
          this.time_taken = this.given_time-parseInt(this.current_time);
          //console.log(this.time_taken)
          this.questions[this.step-1].question_time = this.time_taken;
          console.log(this.questions);
          this.timeup = true;
        } else {
          this.nextqsn(this.step)
        }
        
      }
    }, 1000) 
    
  }

  timeStop() {
    clearInterval(this._time_start);
  }

  timer(seconds:number) {
    //setInterval(function() {
      seconds -= 1;
      this.timeLeft = seconds
      //console.log(this.timeLeft)
    //}, 1000)
  }

  nextqsn(step:number){
    clearInterval(this._time_start);
    this.timeLeft=this.given_time;
    this.timerStart();
    this.step += 1;
    // console.log(this.questions)
    // console.log(step);
    // console.log(this.timeLeft, this.current_time)
    this.time_taken = this.timeLeft-parseInt(this.current_time);
    // console.log(time_taken)
    this.questions[step-1].question_time = this.time_taken;
    // console.log(this.questions);
    this.skip=true;

  }

  getAnswer(event:MatRadioChange, index) {
    //console.log(event.value, index);
    let _given_answer = event.value;
    //console.log(this.questions[index].answer)
    if(_given_answer === this.questions[index].answer) {
      console.log("correct")
      this.questions[index].your_answer = _given_answer;
      this.questions[index].correct = true;
    } else {
      // console.log("incorrect", this.questions[index].answer, _given_answer)
      this.questions[index].your_answer = _given_answer;
      this.questions[index].correct = false;
    }

    this.skip = false;

    console.log(this.questions)
  }

  showResult() {
    this.timeStop();

    //console.log(this.given_time, this.current_time, this.step-1)
    this.time_taken = this.given_time-parseInt(this.current_time);
    //console.log(this.time_taken)
    this.questions[this.step-1].question_time = this.time_taken;
    //console.log(this.questions);

    let _correct_ans= [];
    // this.exam_time = 0;
    for(let i=0; i<this.questions.length;i++) {
      var correct = this.questions[i].correct
      if(correct) {
        _correct_ans.push(i);
      }
      this.exam_time += parseInt(this.questions[i].question_time)
    }
    this.total_minutes = Math.floor(this.exam_time / 60);
    this.total_seconds = this.exam_time - this.total_minutes * 60;

    this.correct_answer = _correct_ans.length;

    //console.log("Total time taken ", this.exam_time, this.questions)
    //console.log("You got "+ this.correct_answer +" out of "+this.questions.length + '\n' + "Percentage: " + ((this.correct_answer/this.questions.length)*100).toFixed(2) + "%");
    if((this.correct_answer/this.questions.length)*100 == 100) {
      this.fullMarks = true
    }
     this.submitted = true;
     this.percentage = (this.correct_answer/this.questions.length)*100;
     //console.log(this.submitted);

     this.alldone = true; 
  }

  getmyStyle() {
    let myStyles = {
      'display':this.timeup  ? 'block' : '',
      'margin':this.timeup  ? '0 auto' : '',
      'width':this.timeup  ? 'auto' : ''

    };
    return myStyles;
  }

  strtqsn(){
    this.show = true;
    this.get_data(this.selectedSet);
    this.timerStart();
  }

  get_data(selectedSet){
    this.quiz_data.getData(selectedSet).subscribe((response) => {
      //console.log(response);
      this.questions = JSON.parse(response);
    })
  }

  set(){
    //console.log(this.selectedSet);
    if(this.selectedSet.length){
      this.enabledButton = true;
      var res = this.selectedSet.split('-').join(' ');
      this.topic = res;
    }
  }

  get_set(){
    this.quiz_data.getSet().subscribe((response) => {
      console.log(response);
      this.values = JSON.parse(response);
    })
  }

}
