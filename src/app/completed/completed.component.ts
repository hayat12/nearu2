import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {
  message = "";
  constructor(
    private activateRoute:ActivatedRoute
  ) {}
  ngOnInit(): void {}

}
