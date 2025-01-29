import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }
  private notificationSubject = new Subject<{ from: any; align: any; alertType: 'success' | 'danger'; }>();

  // Observable que le NotificationsComponent peut souscrire pour recevoir les notifications
  notifications$ = this.notificationSubject.asObservable();

 
}
