import { Component, Input } from '@angular/core';
import { ItemClass } from '../../../_classes';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.sass'],
})
export class SectionComponent extends ItemClass {
  @Input() description: string;
}
