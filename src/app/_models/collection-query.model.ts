export class CollectionQueryModel {
  fieldPath: string;
  optStr: '>' | '>=' | '<' | '<=' | '==' | '!=';
  value: string | number;
}
