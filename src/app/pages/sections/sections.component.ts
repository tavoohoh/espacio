import { Component } from '@angular/core';
import { ItemsClass } from '../../_classes';
import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalsService } from '../../services/globals.service';
import { ItemNameEnum } from '../../_enums';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.sass'],
})
export class SectionsComponent extends ItemsClass {
  constructor(
    public afs: AngularFirestore,
    public globalsService: GlobalsService
  ) {
    super(afs, globalsService, ItemNameEnum.sections);
  }

  afterFetchItems() {}
}
