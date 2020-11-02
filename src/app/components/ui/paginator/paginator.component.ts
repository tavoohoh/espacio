import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { IconEnum } from '../../../_enums';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass'],
})
export class PaginatorComponent implements OnChanges {
  @Input() public currentPage: number;
  @Input() public totalOfPages: number;

  public icon = IconEnum;
  public pageOfArgs: {
    currentPage: number;
    totalOfPages: number;
  };

  @Output() changePage = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes.currentPage && changes.currentPage.currentValue) {
        this.currentPage = changes.currentPage.currentValue;
      }

      if (changes.totalOfPages && changes.totalOfPages.currentValue) {
        this.totalOfPages = changes.totalOfPages.currentValue;
      }
    }

    this.pageOfArgs = {
      currentPage: this.currentPage,
      totalOfPages: this.totalOfPages,
    };
  }

  public canNavigatePrev(): boolean {
    return !(this.currentPage > 1);
  }

  public canNavigateNext(): boolean {
    return !(this.currentPage < this.totalOfPages);
  }
}
