import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContentControllerComponent } from './home/content-controller/content-controller.component';
import { CategoryControllerComponent } from './home/category-controller/category-controller.component';
import { ShopControllerComponent } from './home/shop-controller/shop-controller.component';
import { UserControllerComponent } from './home/user-controller/user-controller.component';
import { BlogControllerComponent } from './home/blog-controller/blog-controller.component';
import { UpdateControllerComponent } from './home/update-controller/update-controller.component';
import { ReportControllerComponent } from './home/report-controller/report-controller.component';
import { StaffControllerComponent } from './home/staff-controller/staff-controller.component';
import { AccountingControllerComponent } from './home/accounting-controller/accounting-controller.component';
import { PagesComponent } from './home/content-controller/pages/pages.component';
import { AnnouncementsComponent } from './home/content-controller/announcements/announcements.component';
import { SliderComponent } from './home/content-controller/slider/slider.component';
import { AddsComponent } from './home/content-controller/adds/adds.component';
import { PromotionsComponent } from './home/content-controller/promotions/promotions.component';
import { MailsComponent } from './home/content-controller/mails/mails.component';
import { BannerComponent } from './home/content-controller/banner/banner.component';
import { CategoriesComponent } from './home/category-controller/categories/categories.component';
import { ProductsComponent } from './home/category-controller/products/products.component';
import { ShopsComponent } from './home/shop-controller/shops/shops.component';
import { PaymentmethodsComponent } from './home/shop-controller/paymentmethods/paymentmethods.component';
import { ShipmentmethodsComponent } from './home/shop-controller/shipmentmethods/shipmentmethods.component';
import { ShopsupportComponent } from './home/shop-controller/shopsupport/shopsupport.component';
import { UsersComponent } from './home/user-controller/users/users.component';
import { PointSystemComponent } from './home/user-controller/point-system/point-system.component';
import { ChequeSystemComponent } from './home/user-controller/cheque-system/cheque-system.component';
import { FrontRunnerComponent } from './home/user-controller/front-runner/front-runner.component';
import { CronjobComponent } from './home/update-controller/cronjob/cronjob.component';
import { XmlComponent } from './home/update-controller/xml/xml.component';
import { ClickComponent } from './home/report-controller/click/click.component';
import { SearchComponent } from './home/report-controller/search/search.component';
import { CreditsComponent } from './home/accounting-controller/credits/credits.component';
import { LivesupportComponent } from './home/accounting-controller/livesupport/livesupport.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AgreementComponent } from './home/content-controller/agreement/agreement.component';
declare var $: any;


const appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'homepage',      component: HomePageComponent },
      { path: 'contentcontroller',      component: ContentControllerComponent, children:[
        { path: 'pages',      component: PagesComponent },
        { path: 'announcements',      component: AnnouncementsComponent },
        { path: 'slider',      component: SliderComponent },
        { path: 'banner',      component: BannerComponent },
        { path: 'adds',      component: AddsComponent },
        { path: 'promotions',      component: PromotionsComponent },
        { path: 'mails',      component: MailsComponent },
        { path: 'agreement',      component: AgreementComponent }
      ] },
      { path: 'categorycontroller',      component: CategoryControllerComponent, children:[
        { path: 'categories',      component: CategoriesComponent },
        { path: 'products',      component: ProductsComponent }
      ] },
      { path: 'shopcontroller',      component: ShopControllerComponent, children:[
        { path: 'shops',      component: ShopsComponent },
        { path: 'payment',      component: PaymentmethodsComponent },
        { path: 'shipment',      component: ShipmentmethodsComponent },
        { path: 'support',      component: ShopsupportComponent }
      ] },
      { path: 'usercontroller',      component: UserControllerComponent, children:[
        { path: 'users',      component: UsersComponent },
        { path: 'pointsystem',      component: PointSystemComponent },
        { path: 'chequesystem',      component: ChequeSystemComponent },
        { path: 'frontrunner',      component: FrontRunnerComponent }
      ] },
      { path: 'home/blogcontroller',      component: BlogControllerComponent },
      { path: 'updatecontroller',      component: UpdateControllerComponent, children:[
        { path: 'cronjob',      component: CronjobComponent },
        { path: 'xml',      component: XmlComponent }
      ] },
      { path: 'reportcontroller',      component: ReportControllerComponent, children:[
        { path: 'click',      component: ClickComponent },
        { path: 'search',      component: SearchComponent }
      ] },
      { path: 'staffcontroller',      component: StaffControllerComponent },
      { path: 'accountingcontroller',      component: AccountingControllerComponent, children:[
        { path: 'credits',      component: CreditsComponent },
        { path: 'livesupport',      component: LivesupportComponent },
        { path: 'adds',      component: AddsComponent }
      ] },
    ]
  },
  { path: '',
    redirectTo: 'home/homepage',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ContentControllerComponent,
    AuthComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CategoryControllerComponent,
    ShopControllerComponent,
    UserControllerComponent,
    BlogControllerComponent,
    UpdateControllerComponent,
    ReportControllerComponent,
    StaffControllerComponent,
    AccountingControllerComponent,
    PagesComponent,
    AnnouncementsComponent,
    SliderComponent,
    AddsComponent,
    PromotionsComponent,
    MailsComponent,
    BannerComponent,
    CategoriesComponent,
    ProductsComponent,
    ShopsComponent,
    PaymentmethodsComponent,
    ShipmentmethodsComponent,
    ShopsupportComponent,
    UsersComponent,
    PointSystemComponent,
    ChequeSystemComponent,
    FrontRunnerComponent,
    CronjobComponent,
    XmlComponent,
    ClickComponent,
    SearchComponent,
    CreditsComponent,
    LivesupportComponent,
    HomePageComponent,
    AgreementComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
