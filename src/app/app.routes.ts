import { Routes } from '@angular/router';
import { BattleComponent } from './features/battle/battle.component';
import { DynamicViewComponent } from './features/dynamic-view/dynamic-view.component';

export const routes: Routes = [
  { path: '', component: BattleComponent },
  { path: ':viewId', component: DynamicViewComponent }
];
