import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit {
  @Input() title: string = "Nearu";


  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event:any) {
    localStorage.setItem("ev 1", event);
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler(event:any) {
    localStorage.setItem("ev 2", event);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
