import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples/examples.component';
import { TodosComponent } from './todos/todos.component';
import { todosReducer } from './todos/todos.reducer';
import { TodosEffects } from './todos/todos.effects';





import { AuthenticatedComponent } from './authenticated/authenticated.component';

@NgModule({
  imports: [
    SharedModule,
    ExamplesRoutingModule,
    StoreModule.forFeature('examples', {
      todos: todosReducer,

    }),
    EffectsModule.forFeature([TodosEffects])
  ],
  declarations: [
    ExamplesComponent,
    TodosComponent,
    AuthenticatedComponent
  ]
})
export class ExamplesModule {
  constructor() { }
}
