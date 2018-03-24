import { Component, OnInit, OnDestroy } from '@angular/core';

import { environment as env } from '@env/environment';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { selectorHeroes, ActionHeroesAdd, ActionHeroesToggle, ActionHeroesRemoveDone, HeroesFilter, ActionHeroesFilter, Hero, ActionHeroesPersist } from '@app/overwatch-select/overwatch.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { get } from 'http';


@Component({
  selector: 'ogu-overwatch',
  templateUrl: './overwatch.component.html',
  styleUrls: ['./overwatch.component.scss']
})
export class OverwatchComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  versions = env.versions;



  heroes: any;
  newHero = '';

  constructor(public store: Store<any>, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.store
      .select(selectorHeroes)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(heroes => {
        this.heroes = heroes;
        this.store.dispatch(new ActionHeroesPersist({ heroes }));
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get filteredHeroes() {
    const filter = this.heroes.filter;
    if (filter === 'ALL') {
      return this.heroes.items;
    } else {
      const predicate = filter === 'DONE' ? t => t.done : t => !t.done;
      return this.heroes.items.filter(predicate);
    }
  }

  get getTankHeroes() {
    const filter = 'TANKS';
    const predicate = filter === 'TANKS' ? t => t.tank : t => !t.tank;
    return this.heroes.items.filter(predicate);
  }

  get getSupportHeroes() {
    const filter = 'SUPPORT';
    const predicate = filter === 'SUPPORT' ? t => t.support : t => !t.support;
    return this.heroes.items.filter(predicate);
  }

  get getAttackHeroes() {
    const filter = 'ATTACK';
    const predicate = filter === 'ATTACK' ? t => t.attack : t => !t.attack;
    return this.heroes.items.filter(predicate);
  }


  get getDefendsHeroes() {
    const filter = 'DEFENDS';
    const predicate = filter === 'DEFENDS' ? t => t.defends : t => !t.defends;
    return this.heroes.items.filter(predicate);
  }

  get isAddHeroDisabled() {
    return this.newHero.length < 4;
  }

  get isRemoveDoneHeroesDisabled() {
    return this.heroes.items.filter(item => item.done).length === 0;
  }

  onNewHeroChange(newHero: string) {
    this.newHero = newHero;
  }

  onNewHeroClear() {
    this.newHero = '';
  }

  onAddHero() {
    this.store.dispatch(new ActionHeroesAdd({ name: this.newHero }));
    this.showNotification(`"${this.newHero}" added`);
    this.newHero = '';
  }

  onToggleHero(hero: Hero) {
    const newStatus = hero.done ? 'active' : 'done';
    this.store.dispatch(new ActionHeroesToggle({ id: hero.id }));
    this.showNotification(`Toggled "${hero.name}" to ${newStatus}`, 'Undo')
      .onAction()
      .subscribe(() => this.onToggleHero({ ...hero, done: !hero.done }));
  }

  onRemoveDoneHeroes() {
    this.store.dispatch(new ActionHeroesRemoveDone());
    this.showNotification('Removed done heroes');
  }

  onFilterHeroes(filter: HeroesFilter) {
    this.store.dispatch(new ActionHeroesFilter({ filter }));
    this.showNotification(`Filtered to ${filter.toLowerCase()}`);
  }

  private showNotification(message: string, action?: string) {
    return this.snackBar.open(message, action, {
      duration: 2500,
      panelClass: 'heroes-notification-overlay'
    });
  }
}
