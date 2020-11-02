import { Component, OnInit } from '@angular/core';
import { ItemsClass } from '../../_classes';
import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalsService } from '../../services/globals.service';

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
    super(afs, globalsService, 'sections');
  }

  afterFetchItems() {}
}
