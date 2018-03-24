import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';

import { HeroesReducer } from './overwatch.reducer';
import { HeroesEffects } from './overwatch.effects';
import { OverwatchComponent } from './overwatch/overwatch.component';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('heroes', HeroesReducer),
    EffectsModule.forFeature([HeroesEffects])
  ],
  declarations: [OverwatchComponent]
})
export class OverwatchModule { }
