import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ButtonEmum, StyleEnum } from '../_enums';

export class ComponentBaseClass implements OnDestroy, OnInit {
  public $destroyed = new Subject();
  public buttonType = ButtonEmum;
  public style = StyleEnum;

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
    this.$destroyed.complete();
    this.destroy();
  }

  public init(): void {}
  public destroy(): void {}
}
