import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import { ModalModel } from '../../../_models/modal.model';
import { ButtonEmum, StyleEnum } from '../../../_enums';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnInit {
  public modal: ModalModel;
  public style = StyleEnum;
  public buttonType = ButtonEmum;

  constructor(private globalsService: GlobalsService) {}

  ngOnInit(): void {
    this.globalsService.modal
      .observe()
      .subscribe((modalData) => (this.modal = modalData));
  }

  public onCancel(): void {
    this.globalsService.modal.resultValue = 'canceled';
  }

  public onConfirm(): void {
    this.globalsService.modal.resultValue = 'confirmed';
  }
}
