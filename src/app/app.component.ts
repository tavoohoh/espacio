import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet (activate)="onActivate($event)"></router-outlet>`,
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

  onActivate(event) {
    // const scrollToTop = window.setInterval(() => {
    //   const pos = window.pageYOffset;
    //   if (pos > 0) {
    //     window.scrollTo(0, pos - 20);
    //   } else {
    //     window.clearInterval(scrollToTop);
    //   }
    // }, 16);
  }
}
