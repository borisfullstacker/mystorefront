import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { ContainerstoreComponent } from './components/containerstore/containerstore.component';
import {AuthGuard} from './auth.guard'


const routes: Routes =[
{path:"", component:ContainerComponent},
{path:"store",
 component:ContainerstoreComponent,
 canActivate:[AuthGuard]
},
{ path: '**', redirectTo: "" }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})





export class AppRoutingModule { }
