import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit {
  @Input() title: string = "Nearu";
  @Input() hasCard = true;

  isCartVisiable:boolean=true;


  constructor(
    private router:Router,
    private activateRouter:ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.router.url.includes("completed")? this.isCartVisiable = false:true;
    if (!this.hasCard) {
      this.isCartVisiable = false;
    }
  }
}
