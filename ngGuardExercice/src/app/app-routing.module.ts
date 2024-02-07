import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {ParentComponent} from "./parent/parent.component";
import {VerreDEauComponent} from "./verre-deau/verre-deau.component";
import {BonbonComponent} from "./bonbon/bonbon.component";
import {SelComponent} from "./sel/sel.component";
import {CaramelAuSelComponent} from "./caramel-au-sel/caramel-au-sel.component";

const routes: Routes = [
  {path:'', component: ParentComponent, children:[
    {path:'verreDEau', component: VerreDEauComponent},
    {path:'bonbon', component: BonbonComponent},
    {path:'sel', component: SelComponent},
    {path:'caramelAuSel', component: CaramelAuSelComponent}
  ]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
