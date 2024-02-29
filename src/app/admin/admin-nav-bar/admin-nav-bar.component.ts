import { Component, Directive, ElementRef, HostListener } from '@angular/core';

// @Directive({
//   selector: '[app-admin-nav-bar]'
// })

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent {

  selectedNavItem: string | null = null;
  

  // selectedNavItem: string;
  showSubLinks: boolean = false;


  // selectedNavItem: string;

  selectNavItem(item: string): void {
    this.selectedNavItem = item;
  }

  // constructor(private el: ElementRef) { }

  // @HostListener('click') onClick() {
  //   const parent = this.el.nativeElement.parentElement;
  //   const subMenu = parent.querySelector('.sub-menu');
    
  //   if (subMenu) {
  //     subMenu.classList.toggle('show');
  //   }
  // }

  // selectNavItem(item: string) {
  //   this.selectedNavItem = item;
  //   this.showSubLinks = true;
  // }



}
