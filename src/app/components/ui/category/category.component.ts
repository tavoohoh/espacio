import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass'],
})
export class CategoryComponent implements OnChanges {
  @Input() categories: Array<string>;
  @Input() activeCategory: string;
  @Output() clicked = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.categories && changes.categories.currentValue) {
      this.categories = changes.catagories.currentValue;
    }
  }
}
