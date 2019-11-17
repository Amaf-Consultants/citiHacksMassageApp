import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/user-service";
import { Subject, ObjectUnsubscribedError } from "rxjs";
import * as uuid from "uuid";
import { Message } from './models/message';



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private subject: Subject<any>;
  private userRegisterSubject: Subject<any>;
  private userCheckSubject: Subject<any>;
  private msgSubject: Subject<any>;

  public registeredBtn: Boolean = true;
  public userDataFlag: Boolean = true;
  public questionbox: Boolean = true;
  public hideRegTitle: Boolean = true;

  public events: any[] = [];
  public selectedLocation: string = null;
  public selectedDepartment: string = null;
  public selectedEvent: string = null;
  public userName: string = null;
  public userId: string = null;
  public eventName: string = null;
  public userQuestion: string = null;
  public userMessages: Message[];

  public showSnackBar: Boolean = false;
  public snackBarMessage: string = null;



  locations = [
    { id: 1, label: "Canada" },
    { id: 2, label: "USA" },
    { id: 3, label: "Singapore" },
    { id: 4, label: "London" },
    { id: 5, label: "Tempa" },
    { id: 6, label: "India" },
    { id: 7, label: "Dubai" },
    { id: 8, label: "Japan" },
    { id: 9, label: "China" }
  ];

  departments = [
    { id: 1, label: "Engineering" },
    { id: 2, label: "Management" },
    { id: 3, label: "Bussiness" },
    { id: 4, label: "Admin" },
    { id: 5, label: "Security" }
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subject = this.userService.pullEventData();
    this.subject.subscribe(data => {
      const eventsObject: any[] = JSON.parse(data.data);
     if (!eventsObject.hasOwnProperty('msgId')) {

      eventsObject.forEach(d => {
        console.log('Data', d);
        this.events.push({ eventId: d.eventId, eventName: d.eventName });
       this.registeredBtn = this.userDataFlag ? false : true;
       this.questionbox = !this.registeredBtn;
       this.hideRegTitle = this.registeredBtn;
      });
    }
      console.log(eventsObject);
    });

    this.userRegisterSubject = this.userService.pushUserData();
    this.userRegisterSubject.subscribe(data => {
        console.log('User data has been saved', data);
        this.registeredBtn = true;
        this.questionbox = !this.registeredBtn;

      });

      this.msgSubject = this.userService.pushMessageData();
      this.msgSubject.subscribe(data => {
          console.log('Message has been sent..', data);
          this.userQuestion = null;
          this.snackBarMessage = 'Message has been sent....';
          this.showSnackeBar();
        });


  }


  getEvents() {
    if (this.events.length === 0) {
      this.subject.next('pullEvent');
      this.subject.unsubscribe();
    }
  }

  mapObject(data: any) {}

  onClickRegister() {

 const user = {
    id: this.userId, //uuid.v4(),
    name: this.userName,
    siteLocation: this.selectedLocation,
    department: this.selectedDepartment,
    createDate: new Date().toDateString()
  };

   this.userRegisterSubject.next(user);
  }

  onSendMessage() {

   const  sentMessage = {
      msgId: uuid.v4(),
      eventId: parseInt(this.selectedEvent),
      userId: this.userId,
      message: this.userQuestion,
      msgAppType: "Mobile",
      msgAttachement: "",
      msgCreateDate: new Date().toDateString(),
      msgQuality: 2,
      msgStatus: "Read",
      msgUpdateDate: new Date().toDateString(),
    };

    this.userMessages.push(sentMessage);

    this.msgSubject.next(sentMessage);
  }

  checkUserId() {
    if (this.userId) {
      this.userCheckSubject = this.userService.pullUserByUserId(this.userId);
      this.userCheckSubject.subscribe(resp => {
        console.log('this is the error');
        const d = JSON.parse(resp.data);
        console.log('this is the error', d);
        if (d.hasOwnProperty('msgId')) {
          if (this.userMessages.indexOf(d.msgId)) {
            this.snackBarMessage = 'Message Status ::' + d.msgStatus;
            this.showSnackeBar();
          }
          console.log('Check User send', JSON.parse(resp.data));
        } else {
          this.userDataFlag = d.id ? false : true;
        }
        });
        setTimeout(() => {
          this.userCheckSubject.next('pullEvent');
          this.getEvents();
        }, 1000);
   } else {
    this.snackBarMessage = 'Please enter user Id';
    this.showSnackeBar();
   }

  }

  showSnackeBar() {
    this.showSnackBar = true;
    setTimeout(() => {
      this.showSnackBar = false;
    }, 10000);
  }
}
