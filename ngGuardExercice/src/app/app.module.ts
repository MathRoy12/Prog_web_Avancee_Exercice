import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerreDEauComponentComponent } from './verre-deau-component/verre-deau-component.component';
import { VerreDEauComponent } from './verre-deau/verre-deau.component';
import { BonbonComponent } from './bonbon/bonbon.component';
import { SelComponent } from './sel/sel.component';
import { CaramelAuSelComponent } from './caramel-au-sel/caramel-au-sel.component';
import { ParentComponent } from './parent/parent.component';

@NgModule({
  declarations: [
    AppComponent,
    VerreDEauComponentComponent,
    VerreDEauComponent,
    BonbonComponent,
    SelComponent,
    CaramelAuSelComponent,
    ParentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
