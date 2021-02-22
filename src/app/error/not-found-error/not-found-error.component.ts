import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-not-found-error',
  templateUrl: './not-found-error.component.html',
  styleUrls: ['./not-found-error.component.css']
})
export class NotFoundErrorComponent implements OnInit {

  constructor(
    private router: Router) { }

  ngOnInit(): void {
  }

  goHome(){
    this.router.navigate(['/']);
  }
}
