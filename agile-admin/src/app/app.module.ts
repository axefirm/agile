import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { MarketingsComponent } from './pages/marketings/marketings.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { JwtModule } from '@auth0/angular-jwt';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProductMiniComponent } from './components/product-mini/product-mini.component';
import { HttpClientModule } from '@angular/common/http';
import { EnrollMerchComponent } from './pages/enroll-merch/enroll-merch.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditShopComponent } from './pages/edit-shop/edit-shop.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SwiperModule } from 'swiper/angular';
import { WebSiteEditComponent } from './pages/web-site-edit/web-site-edit.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OrdersComponent,
    ProductsComponent,
    MarketingsComponent,
    CategoriesComponent,
    LoginComponent,
    RegisterComponent,
    SideMenuComponent,
    ProductMiniComponent,
    EnrollMerchComponent,
    AddProductComponent,
    AddCategoryComponent,
    SubCategoryComponent,
    DialogComponent,
    AddOrderComponent,
    SettingsComponent,
    ProfileComponent,
    EditShopComponent,
    WebSiteEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgApexchartsModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatListModule,
    MatDialogModule,
    ImageCropperModule,
    SwiperModule,
    // TODO: Domain Add
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['example.com'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
