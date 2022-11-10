import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedLanguage: 'en' | 'es' | 'bn' = 'bn';

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {}

  onLanguageChange($event: Event) {
    this.selectedLanguage = $event.target['value'];
    this.translocoService.setActiveLang($event.target['value']);
  }
}
