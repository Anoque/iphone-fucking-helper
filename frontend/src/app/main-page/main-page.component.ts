import { Component, OnInit } from '@angular/core';
import {NetService} from '../shared/net/net.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private netService: NetService, private router: Router) { }

  ngOnInit(): void { }
}
