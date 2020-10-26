import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    let userLanguage = 'es';

    if (window.localStorage.getItem('userLanguage')) {
      userLanguage = window.localStorage.getItem('userLanguage');
    } else {
      window.localStorage.setItem('userLanguage', userLanguage);
    }

    this.translate.setDefaultLang(userLanguage);
    this.translate.use(userLanguage);
  }
}
