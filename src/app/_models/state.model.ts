import {BehaviorSubject, Observable} from 'rxjs';

export class StateElementModel {
  public element = new BehaviorSubject<any>(null);

  get value(): any {
    return this.element.value;
  }

  set value(value: any) {
    this.element.next(value);
  }

  public observe(): Observable<any> {
    return this.element.asObservable();
  }
}
