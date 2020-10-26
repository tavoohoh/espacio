import { Component, Input, OnInit } from '@angular/core';
import { SvgIconConstant } from '../../../_constants';
import { SvgIconModel } from '../../../_models';

@Component({
  selector: 'app-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      *ngIf="svg"
      [style.fill]="color"
      [attr.height]="size"
      [attr.width]="size"
      [style.width]="size + 'px'"
      [style.heigth]="size + 'px'"
    >
      <path *ngFor="let path of svg.paths" [attr.d]="path" />
      <circle
        *ngFor="let circle of svg.circles"
        [attr.cx]="circle.cy"
        [attr.cy]="circle.cy"
        [attr.r]="circle.r"
      />
    </svg>
  `,
})
export class IconComponent implements OnInit {
  @Input() color = '';
  @Input() iconName: string;
  @Input() size = 24;

  public svg: SvgIconModel;

  ngOnInit() {
    if (this.iconName) {
      this.svg = SvgIconConstant[this.iconName];
    } else {
      console.error(
        'In order to show an icon its name most be provided. `iconName: IconNameEnum`'
      );
    }
  }
}
