export interface SvgIconModel {
  paths?: Array<string>;
  circles?: Array<{
    cx: number;
    cy: number;
    r: number;
  }>;
}
