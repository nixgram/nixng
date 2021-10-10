import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from "rxjs";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  isShown: boolean = false;
  isMobileMenuClose: boolean = true;
  @Input() title$!: Observable<string>;
  @Input() loading$!: Observable<boolean>;
  @Input() isLoggedIn !: Observable<boolean>
  @Output() logout_onClick: EventEmitter<void> = new EventEmitter<void>();


  onLogOut_click() {
    this.logout_onClick.emit();
  }
}
