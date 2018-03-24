import { v4 as uuid } from 'uuid';
import { Action } from '@ngrx/store';

export const HEROES_KEY = 'OVERWATCH';

export enum HeroesActionTypes {
  ADD = '[Heroes] Add',
  TOGGLE = '[Heroes] Toggle',
  REMOVE_DONE = '[Heroes] Remove Done',
  FILTER = '[Heroes] Filter',
  PERSIST = '[Heroes] Persist'
}


export const assets = '@app/../assets/overwatch/hero-icon/';


export const initialState: HeroesState = {
  items: [
    { id: uuid(), name: 'doomfist', done: false, attack: true, defends: false, tank: false, support: false, image: assets + 'doomfist.png' },
    { id: uuid(), name: 'genji', done: false, attack: true, defends: false, tank: false, support: false, image: assets + 'genji.png' },
    { id: uuid(), name: 'mccree', done: false, attack: true, defends: false, tank: false, support: false, image: assets + 'mccree.png' },
    { id: uuid(), name: 'pharah', done: false, attack: true, defends: false, tank: false, support: false, image: assets + 'pharah.png' },
    { id: uuid(), name: 'reaper', done: false, attack: true, defends: false, tank: false, support: false, image: assets + 'reaper.png' },
    { id: uuid(), name: 'soldier', done: false, attack: true, defends: false, tank: false, support: false, image: assets + 'soldier-76.png' },
    { id: uuid(), name: 'sombra', done: false, attack: true, defends: false, tank: false, support: false, image: assets + 'sombra.png' },
    { id: uuid(), name: 'tracer', done: false, attack: true, defends: false, tank: false, support: false, image: assets + 'tracer.png' },
    { id: uuid(), name: 'bastion', done: false, attack: false, defends: true, tank: false, support: false, image: assets + 'bastion.png' },
    { id: uuid(), name: 'hanzo', done: false, attack: false, defends: true, tank: false, support: false, image: assets + 'hanzo.png' },
    { id: uuid(), name: 'junkrat', done: false, attack: false, defends: true, tank: false, support: false, image: assets + 'junkrat.png' },
    { id: uuid(), name: 'mei', done: false, attack: false, defends: true, tank: false, support: false, image: assets + 'mei.png' },
    { id: uuid(), name: 'torbjorn', done: false, attack: false, defends: true, tank: false, support: false, image: assets + 'torbjorn.png' },
    { id: uuid(), name: 'widowmaker', done: false, attack: false, defends: true, tank: false, support: false, image: assets + 'widowmaker.png' },
    { id: uuid(), name: 'dva', done: false, attack: false, defends: false, tank: true, support: false, image: assets + 'dva.png' },
    { id: uuid(), name: 'orisa', done: false, attack: false, defends: false, tank: true, support: false, image: assets + 'orisa.png' },
    { id: uuid(), name: 'reinhardt', done: false, attack: false, defends: false, tank: true, support: false, image: assets + 'reinhardt.png' },
    { id: uuid(), name: 'roadhog', done: false, attack: false, defends: false, tank: true, support: false, image: assets + 'roadhog.png' },
    { id: uuid(), name: 'winston', done: false, attack: false, defends: false, tank: true, support: false, image: assets + 'winston.png' },
    { id: uuid(), name: 'zarya', done: false, attack: false, defends: false, tank: true, support: false, image: assets + 'zarya.png' },
    { id: uuid(), name: 'ana', done: false, attack: false, defends: false, tank: false, support: true, image: assets + 'ana.png' },
    { id: uuid(), name: 'lucio', done: false, attack: false, defends: false, tank: false, support: true, image: assets + 'lucio.png' },
    { id: uuid(), name: 'mercy', done: false, attack: false, defends: false, tank: false, support: true, image: assets + 'mercy.png' },
    { id: uuid(), name: 'symmetra', done: false, attack: false, defends: false, tank: false, support: true, image: assets + 'symmetra.png' },
    { id: uuid(), name: 'zenyatta', done: false, attack: false, defends: false, tank: false, support: true, image: assets + 'zenyatta.png' }
  ],
  filter: 'ALL'
};

export class ActionHeroesAdd implements Action {
  readonly type = HeroesActionTypes.ADD;
  constructor(public payload: { name: string }) { }
}

export class ActionHeroesToggle implements Action {
  readonly type = HeroesActionTypes.TOGGLE;
  constructor(public payload: { id: string }) { }
}

export class ActionHeroesRemoveDone implements Action {
  readonly type = HeroesActionTypes.REMOVE_DONE;
}

export class ActionHeroesFilter implements Action {
  readonly type = HeroesActionTypes.FILTER;
  constructor(public payload: { filter: HeroesFilter }) { }
}

export class ActionHeroesPersist implements Action {
  readonly type = HeroesActionTypes.PERSIST;
  constructor(public payload: { heroes: Hero[] }) { }
}

export type HeroesActions =
  | ActionHeroesAdd
  | ActionHeroesToggle
  | ActionHeroesRemoveDone
  | ActionHeroesFilter
  | ActionHeroesPersist;



export const selectorHeroes = state => state.heroes;

export function HeroesReducer(
  state: HeroesState = initialState,
  action: HeroesActions
): HeroesState {
  switch (action.type) {
    case HeroesActionTypes.ADD:
      return {
        ...state,
        items: state.items.concat({
          id: uuid(),
          name: action.payload.name,
          done: false,
          attack: false, defends: false, tank: false, support: false,
          image: "null"

        })
      };

    case HeroesActionTypes.TOGGLE:
      return {
        ...state,
        items: state.items.map(
          (item: Hero) =>
            item.id === action.payload.id ? { ...item, done: !item.done } : item
        )
      };

    case HeroesActionTypes.REMOVE_DONE:
      return {
        ...state,
        items: state.items.filter((item: Hero) => !item.done)
      };

    case HeroesActionTypes.FILTER:
      return { ...state, filter: action.payload.filter };

    default:
      return state;
  }
}

export interface Hero {
  id: string;
  name: string;
  done: boolean;
  attack: boolean;
  defends: boolean;
  tank: boolean;
  support: boolean;
  image: string;

}

export type HeroesFilter = 'ALL' | 'DONE' | 'ACTIVE';

export interface HeroesState {
  items: Hero[];
  filter: HeroesFilter;
}
