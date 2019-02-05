import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { DataComunicationsService } from '../../../services/data-comunications.service';


     


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  categoryList: any =[]
  fullList:any=[];
  constructor(private request:StoreService , private data:DataComunicationsService) { }

  ngOnInit() {
    


      
    this.request.getCategoryList().subscribe(data=>{
      this.fullList=data['categorylist'];
      this.categoryList=this.fullList

  
    
    })
  }


  getCategoryById(e){
    this.request.getCategoryListById(e.id).subscribe((data)=>{
      let filtered=true
      let obj = Object.assign({},data, {filtered:filtered})
      
      this.data.updateList(obj);

    })

  }
  
  getAll(){
    this.data.updateList("");
  }


}
