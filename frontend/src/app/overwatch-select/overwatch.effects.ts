import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

import { LocalStorageService } from '@app/core';

import {
  HEROES_KEY,
  HeroesActionTypes,
  ActionHeroesPersist
} from './overwatch.reducer';

@Injectable()
export class HeroesEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService
  ) { }

  @Effect({ dispatch: false })
  persistHeroes(): Observable<Action> {
    return this.actions$
      .ofType(HeroesActionTypes.PERSIST)
      .pipe(
        tap((action: ActionHeroesPersist) =>
          this.localStorageService.setItem(
            HEROES_KEY,
            action.payload.heroes
          )
        )
      );
  }
}
