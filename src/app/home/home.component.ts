import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images = [ "../../assets/cutting.jpg", "../../assets/hair.jpg", "../../assets/makeup.jpg", "../../assets/nails.jpg" ];

  constructor() { }

  ngOnInit(): void {
  }

  scroll(id) {
    const el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});
  }

}
