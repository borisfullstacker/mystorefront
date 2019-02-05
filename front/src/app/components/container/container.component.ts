import { Component, OnInit, OnDestroy} from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  constructor(private request:StoreService) { }

  ngOnInit() {

  }
  OnDestroy(){

  }

}
