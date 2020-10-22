import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="es-main">
      <app-sidebar></app-sidebar>
      <app-header></app-header>
      <div class="es-main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class MainComponent {
}
