import { EventEmitter, Input, Output } from '@angular/core';
import { ComponentBaseClass } from './component-base.class';
import { IconEnum } from '../_enums';

export class ItemClass extends ComponentBaseClass {
  @Input() title: string;
  @Input() imageUrl: string;
  @Input() category: string;
  @Input() id: string;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  public iconName = IconEnum;
}
