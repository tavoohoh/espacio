import { Component, OnInit } from '@angular/core';
import { ItemFormClass } from '../../_classes';
import { GlobalsService } from '../../services/globals.service';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemNameEnum } from '../../_enums';

@Component({
  selector: 'app-sections-add',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.sass'],
})
export class SectionFormComponent extends ItemFormClass {
  constructor(
    public globalsService: GlobalsService,
    public formBuilder: FormBuilder,
    public afs: AngularFirestore,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(
      globalsService,
      formBuilder,
      afs,
      route,
      router,
      ItemNameEnum.sections
    );
  }
}
