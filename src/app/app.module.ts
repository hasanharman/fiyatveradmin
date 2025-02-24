import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService as AuthGuard} from './guards/auth-guard.service';
import { AuthorityGuardService as AuthorityGuard } from './guards/authority-guard.service';
import { ShopAddsComponent } from './home/accounting-controller/shop-adds/shop-adds.component';
import { ReferencesComponent } from './home/shop-controller/references/references.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { FileUploadModule } from '../../node_modules/ng2-file-upload';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;


const appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'homepage', component: HomePageComponent, 
    },
      {
        path: 'contentcontroller', component: ContentControllerComponent, children: [
          { path: 'pages', component: PagesComponent, canActivate: [AuthorityGuard] },
          { path: 'announcements', component: AnnouncementsComponent, canActivate: [AuthorityGuard] },
          { path: 'slider', component: SliderComponent, canActivate: [AuthorityGuard] },
          { path: 'banner', component: BannerComponent, canActivate: [AuthorityGuard] },
          { path: 'adds', component: AddsComponent, canActivate: [AuthorityGuard] },
          { path: 'promotions', component: PromotionsComponent, canActivate: [AuthorityGuard] },
          { path: 'mails', component: MailsComponent, canActivate: [AuthorityGuard] },
          { path: 'agreement', component: AgreementComponent, canActivate: [AuthorityGuard] }
        ]
      },
      {
        path: 'categorycontroller', component: CategoryControllerComponent, children: [
          { path: 'categories', component: CategoriesComponent, canActivate: [AuthorityGuard] },
          { path: 'products', component: ProductsComponent, canActivate: [AuthorityGuard] },
          { path: 'products/:id', component: ProductsComponent, canActivate: [AuthorityGuard] }
        ]
      },
      {
        path: 'shopcontroller', component: ShopControllerComponent, children: [
          { path: 'shops', component: ShopsComponent, canActivate: [AuthorityGuard] },
          { path: 'payment', component: PaymentmethodsComponent, canActivate: [AuthorityGuard] },
          { path: 'shipment', component: ShipmentmethodsComponent, canActivate: [AuthorityGuard] },
          { path: 'support', component: ShopsupportComponent, canActivate: [AuthorityGuard] },
          { path: 'reference', component: ReferencesComponent }
        ]
      },
      {
        path: 'usercontroller', component: UserControllerComponent, children: [
          { path: 'users', component: UsersComponent, canActivate: [AuthorityGuard] },
          { path: 'pointsystem', component: PointSystemComponent, canActivate: [AuthorityGuard] },
          { path: 'chequesystem', component: ChequeSystemComponent, canActivate: [AuthorityGuard] },
          { path: 'frontrunner', component: FrontRunnerComponent, canActivate: [AuthorityGuard] }
        ]
      },
      { path: 'home/blogcontroller', component: BlogControllerComponent },
      {
        path: 'updatecontroller', component: UpdateControllerComponent, children: [
          { path: 'cronjob', component: CronjobComponent, canActivate: [AuthorityGuard] },
          { path: 'xml/:link/:id', component: XmlComponent, canActivate: [AuthorityGuard] }
        ]
      },
      {
        path: 'reportcontroller', component: ReportControllerComponent, children: [
          { path: 'click', component: ClickComponent, canActivate: [AuthorityGuard] },
          { path: 'search', component: SearchComponent, canActivate: [AuthorityGuard] }
        ]
      },
      { path: 'staffcontroller', component: StaffControllerComponent},
      {
        path: 'accountingcontroller', component: AccountingControllerComponent, children: [
          { path: 'credits', component: CreditsComponent, canActivate: [AuthorityGuard] },
          { path: 'livesupport', component: LivesupportComponent, canActivate: [AuthorityGuard] },
          { path: 'adds', component: ShopAddsComponent, canActivate: [AuthorityGuard] }
        ]
      },
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  // {
  //   path: 'signup', component: SignupComponent 
  // },
  {
    path: '',
    redirectTo: 'login',
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
    ShopAddsComponent,
    ReferencesComponent,
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
    FormsModule,
    HttpClientModule,
    NgxJsonViewerModule,
    FileUploadModule,
    NgSelectModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
