import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ButtonEmum} from '../../_enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnChanges {
  @Input() public title: string;
  @Input() public description: string;
  @Input() public action: {
    text: string;
    id: string;
  };

  @Output() public actionClicked = new EventEmitter<void>();

  public buttonType = ButtonEmum;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.title) {
      this.title = changes.title.currentValue || '';
    }

    if (changes.description) {
      this.description = changes.description.currentValue || '';
    }

    if (changes.action) {
      this.action = changes.action.currentValue || '';
    }
  }
}
