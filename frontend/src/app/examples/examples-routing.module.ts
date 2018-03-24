import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core';

import { ExamplesComponent } from './examples/examples.component';
import { TodosComponent } from './todos/todos.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
      },
      {
        path: 'todos',
        component: TodosComponent,
        data: {
          title: 'Todos'
        }
      }
      ,
      {
        path: 'authenticated',
        component: AuthenticatedComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Authenticated'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule { }
