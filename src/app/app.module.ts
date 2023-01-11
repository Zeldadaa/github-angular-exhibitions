import { ErrorLogHandler } from './error-log-handler';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExhibitionSearchComponent } from './exhibition-search/exhibition-search.component';
import { ExhibitionIndexComponent } from './exhibition-index/exhibition-index.component';
import { ExhibitionDetailComponent } from './exhibition-detail/exhibition-detail.component';
import { ExhibitionHeaderComponent } from './exhibition-header/exhibition-header.component';
import { ExhibitionFooterComponent } from './exhibition-footer/exhibition-footer.component';
import { ExhibitionCommonService } from './exhibition-common.service';

@NgModule({
  declarations: [
    AppComponent,
    ExhibitionSearchComponent,
    ExhibitionIndexComponent,
    ExhibitionDetailComponent,
    ExhibitionHeaderComponent,
    ExhibitionFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorLogHandler },
    ExhibitionCommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
