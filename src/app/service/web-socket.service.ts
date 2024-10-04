import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient: any;
  private messageSubject: Subject<string> = new Subject<string>();

  connect(): Observable<string> {
    const socket = new SockJS('/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/updates', (message: any) => {
        this.messageSubject.next(message.body);
      });
    });

    return this.messageSubject.asObservable();
  }

  sendMessage(code: string) {
    this.stompClient.send('/app/codeChange', {}, code);
  }
}
