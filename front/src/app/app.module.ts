import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/elements/header/header.component';
import { AComponent } from './components/elements/a/a.component';
import { BComponent } from './components/elements/b/b.component';
import { CComponent } from './components/elements/c/c.component';
import { ContainerComponent } from './components/container/container.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ContainerRegisterComponent } from './components/container-register/container-register.component';
import { RegisterComponent } from './components/elements/register/register.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ContainerstoreComponent } from './components/containerstore/containerstore.component';
import { AuthGuard } from './auth.guard';
import { ProductsComponent } from './components/elements/products/products.component';
import { CartComponent } from './components/elements/cart/cart.component';
import { FilterComponent } from './components/elements/filter/filter.component';
import {MatListModule} from '@angular/material/list';
import { AmountModalComponent } from './components/elements/amount-modal/amount-modal.component';
import { PurchaseComponent } from './components/elements/purchase/purchase.component';
import { MarkerPipe } from './pipes/marker.pipe';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { DownloadorderComponent } from './components/elements/downloadorder/downloadorder.component';
import { AdminComponent } from './components/elements/admin/admin.component';

import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AComponent,
    BComponent,
    CComponent,
    ContainerComponent,
    ContainerRegisterComponent,
    RegisterComponent,
    ContainerstoreComponent,
    ProductsComponent,
    CartComponent,
    FilterComponent,
    AmountModalComponent,
    PurchaseComponent,
    MarkerPipe,
    DownloadorderComponent,
    AdminComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
    
  ],
  entryComponents: [AComponent, RegisterComponent,AmountModalComponent],
  bootstrap: [AppComponent],
  providers: [AuthGuard],

})
export class AppModule { }
