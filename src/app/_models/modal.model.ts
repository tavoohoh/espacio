import { BehaviorSubject, Observable } from 'rxjs';
import { StateElementModel } from './state.model';
import { StyleEnum } from '../_enums';

interface ModalStatusModel {
  status: 'confirmed' | 'canceled';
  context: any;
}

export class ModalModel {
  title: string;
  content: Array<string>;
  btnConfirm?: {
    text?: string;
    style?: StyleEnum;
    disabled?: boolean;
    hidden?: boolean;
  };
  btnCancel?: {
    text?: string;
    style?: StyleEnum;
    disabled?: boolean;
    hidden?: boolean;
  };
  context?: any;

  constructor(private props?: ModalModel) {
    this.title = props.title;
    this.content = props.content;
    this.context = props.context;
    this.btnConfirm = {
      text:
        props.btnConfirm && props.btnConfirm.text
          ? props.btnConfirm.text
          : 'GENERAL.CONFIRM',
      style:
        props.btnConfirm && props.btnConfirm.style
          ? props.btnConfirm.style
          : StyleEnum.success,
      disabled:
        props.btnConfirm && props.btnConfirm.disabled
          ? props.btnConfirm.disabled
          : false,
      hidden:
        props.btnConfirm && props.btnConfirm.hidden
          ? props.btnConfirm.hidden
          : false,
    };
    this.btnCancel = {
      text:
        props.btnCancel && props.btnCancel.text
          ? props.btnCancel.text
          : 'GENERAL.CANCEL',
      style:
        props.btnCancel && props.btnCancel.style
          ? props.btnCancel.style
          : StyleEnum.simple,
      disabled:
        props.btnCancel && props.btnCancel.disabled
          ? props.btnCancel.disabled
          : false,
      hidden:
        props.btnCancel && props.btnCancel.hidden
          ? props.btnCancel.hidden
          : false,
    };

    delete this.props;
  }
}

export class ModalStateModel extends StateElementModel {
  private result = new BehaviorSubject<ModalStatusModel>(null);

  constructor() {
    super(new BehaviorSubject<ModalModel>(null));
  }

  set value(value: ModalModel) {
    super.value = value;
  }

  /**
   * Modal result flow
   */
  set resultValue(status: 'confirmed' | 'canceled') {
    this.result.next({
      status,
      context: super.value.context,
    });

    super.value = null;
    this.result.next(null);
  }

  public observeModalResult(): Observable<ModalStatusModel> {
    return this.result.asObservable();
  }
}
