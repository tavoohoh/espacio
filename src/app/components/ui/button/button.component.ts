import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonEmum, IconEnum, StyleEnum } from '../../../_enums';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent {
  @Input() public type: ButtonEmum;
  @Input() public style: StyleEnum;
  @Input() public text: string;
  @Input() public textArgs: { [key: string]: string };
  @Input() public disabled: boolean;

  /**
   * Only when type is `ButtonEmum.Link` | `ButtonEmum.Highlighted` | `ButtonEmum.Action`
   */
  @Input() public iconName: IconEnum;

  /**
   * Only when type is not `ButtonEmum.Highlighted`
   */
  @Input() public route: string;

  @Output() public clicked = new EventEmitter<void>();

  public props = {
    type: ButtonEmum,
  };
}
