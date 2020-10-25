import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonEmum, IconEnum, StyleEnum} from '../../../_enums';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {
  @Input() type: ButtonEmum;
  @Input() style: StyleEnum;
  @Input() text: string;
  @Input() textArgs: { [key: string]: string };

  /**
   * Only when type is `ButtonEmum.Link` | `ButtonEmum.Highlighted` | `ButtonEmum.Action`
   */
  @Input() iconName: IconEnum;

  /**
   * Only when type is not `ButtonEmum.Highlighted`
   */
  @Input() route: string;

  @Output() clicked = new EventEmitter<boolean>();

  public props = {
    type: ButtonEmum
  };
}
