import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { CitiHacksService } from './citi-hacks.service';

 // const SOCKET_URL = 'ws://127.0.0.1:8080/citihacks/endpoint/2'; // Local Connection
 // const SOCKET_URL = 'ws://citihacks123.azurewebsites.net//citihacks-0.0.1-SNAPSHOT/endpoint/1?push=EventUpdates';


@Injectable()
export class UserService {
  public messages: Subject<any>;
  private url_suffix: String = 'ws://citihacks123.azurewebsites.net//citihacks-0.0.1-SNAPSHOT/';
  private local_url_suffix: String = 'ws://127.0.0.1:8080/citihacks/';
  private socket_url: String = '';

  constructor(private citiHacksService: CitiHacksService) { }

  public pushEventData(): Subject<any> {
    this.socket_url  = this.local_url_suffix + 'endpoint/1'; // Local Connection
  //  this.socket_url = this.url_suffix + 'endpoint/1';
   return  this.citiHacksService.connect(this.socket_url);
 }

  public pullEventData(): Subject<any> {
     this.socket_url  = this.local_url_suffix + 'endpoint/1?pull=Events'; // Local Connection
   //  this.socket_url = this.url_suffix + 'endpoint/1';
    return  this.citiHacksService.connect(this.socket_url);
  }

  public subscribeEventData(): Subject<any> {
    this.socket_url  = this.local_url_suffix + 'endpoint/1?push=EventUpdates'; // Local Connection
    // this.socket_url = this.url_suffix + 'endpoint/1?push=EventUpdates';
   return <Subject<any>> this.citiHacksService.connect(this.socket_url );
  }


  public pullUserData(eventId: String): Subject<any> {
    this.socket_url  = this.local_url_suffix + 'endpoint/2?pull=User&eventI=' + eventId ; // Local Connection
  //  this.socket_url = this.url_suffix + 'endpoint/2';

    return  <Subject<any>> this.citiHacksService.connect(this.socket_url );

  }

  public pullUserByUserId(userId: String): Subject<any> {
    this.socket_url  = this.local_url_suffix + 'endpoint/2?pull=UserById&userId=' + userId; // Local Connection
  //  this.socket_url = this.url_suffix + 'endpoint/2';

    return  <Subject<any>> this.citiHacksService.connect(this.socket_url );

  }

  public pushUserData(): Subject<any> {
    this.socket_url  = this.local_url_suffix + 'endpoint/2'; // Local Connection
  //  this.socket_url = this.url_suffix + 'endpoint/2';

    return  <Subject<any>> this.citiHacksService.connect(this.socket_url );

  }

  public subscribeUserData(): Subject<any> {
    this.socket_url  = this.local_url_suffix +  'endpoint/2?push=UserUpdates'; // Local Connection
   // this.socket_url = this.url_suffix + 'endpoint/2?push=UserUpdates';

    return <Subject<any>> this.citiHacksService.connect(this.socket_url );
  }


  public pullMessageData(eventId: String ): Subject<any> {
    this.socket_url  = this.local_url_suffix +  'endpoint/3?pull=Messages&eventId=' +  eventId; // Local Connection
  //  this.socket_url = this.url_suffix + 'endpoint/3';

    return <Subject<any>> this.citiHacksService.connect(this.socket_url );
  }

  public pullMessageByUserId(userId: String): Subject<any> {
    this.socket_url  = this.local_url_suffix +  'endpoint/3?pull=MessagesById&userId' + userId; // Local Connection
  //  this.socket_url = this.url_suffix + 'endpoint/3';

    return <Subject<any>> this.citiHacksService.connect(this.socket_url );
  }

  public pushMessageData(): Subject<any> {
    this.socket_url  = this.local_url_suffix +  'endpoint/3'; // Local Connection
  //  this.socket_url = this.url_suffix + 'endpoint/3';

    return <Subject<any>> this.citiHacksService.connect(this.socket_url );
  }

  public subscribeMessageData(): Subject<any> {
    this.socket_url  = this.local_url_suffix +  'endpoint/3?push=MessageUpdates';  // Local Connection
   // this.socket_url = this.url_suffix + 'endpoint/3?push=MessageUpdates';

   return <Subject<any>> this.citiHacksService.connect(this.socket_url );

  }

  // public getDashBoardData(): Subject<any> {
  //   this.socket_url  = this.local_url_suffix +  'endpoint/4'; // Local Connection
  //  // this.socket_url = this.url_suffix + 'endpoint/4';

  //   return <Subject<any>> this.citiHacksService.connect(this.socket_url );

  // }

  // public subscribeDashBoardData(): Subject<any> {
  //   this.socket_url  = this.local_url_suffix +  'endpoint/4?push=DashBoardUpdates&eventId=2'; // Local Connection
  //  // this.socket_url = this.url_suffix + 'endpoint/1?push=DashBoardUpdates';

  //  return <Subject<any>> this.citiHacksService.connect(this.socket_url );

  // }

  //  public unSubscribeDashBoardData(): Subject<any> {
  //   this.socket_url  = this.local_url_suffix +  'endpoint/4?push=NoUpdates&eventId=2'; // Local Connection
  //  // this.socket_url = this.url_suffix + 'endpoint/1?push=DashBoardUpdates';

  //  return <Subject<any>> this.citiHacksService.connect(this.socket_url );
  // }

}

