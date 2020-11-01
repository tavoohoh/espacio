import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import { FieldClass } from '../../../_classes';

@Component({
  selector: 'app-image-field',
  templateUrl: './image-field.component.html',
  styleUrls: ['./image-field.component.sass'],
})
export class ImageFieldComponent extends FieldClass {
  @Input() imagePreviewUrl: string;
  @Output() imageUrl = new EventEmitter<string>();

  public error: any;

  constructor(private storage: AngularFireStorage) {
    super();
  }

  public async uploadImage($event: any): Promise<void> {
    if (!$event.target.files || !$event.target.files[0]) {
      return;
    }

    const file: File = $event.target.files[0];
    const fileRef = this.storage.ref(file.name);
    const uploadImageTask = this.storage.upload(file.name, file);
    uploadImageTask
      .snapshotChanges()
      .pipe(
        finalize(() =>
          fileRef.getDownloadURL().subscribe((fileUrl) => {
            this.imagePreviewUrl = fileUrl;
            this.imageUrl.emit(fileUrl);
            this.formGroup.controls[this.fieldName].patchValue(fileUrl);
            this.formGroup.controls[this.fieldName].updateValueAndValidity();
          })
        )
      )
      .subscribe(
        () => null,
        (error) => {
          this.error = error;
          console.error(error, 'ImageFieldComponent.uploadImage');
        }
      );
  }
}
