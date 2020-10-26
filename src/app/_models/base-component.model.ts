import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class BaseComponentModel implements OnDestroy {
  public $destroyed = new Subject();

  ngOnDestroy() {
    this.$destroyed.next();
    this.$destroyed.complete();
  }
}
