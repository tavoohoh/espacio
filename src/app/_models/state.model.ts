import { BehaviorSubject, Observable } from 'rxjs';

export class StateElementModel {
  private element: BehaviorSubject<any>;

  constructor(private elementInitializer: BehaviorSubject<any>) {
    this.element = elementInitializer;
  }

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
