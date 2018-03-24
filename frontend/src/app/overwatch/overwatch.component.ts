import { Component, OnInit } from '@angular/core';

import { environment as env } from '@env/environment';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

@Component({
  selector: 'ogu-overwatch',
  templateUrl: './overwatch.component.html',
  styleUrls: ['./overwatch.component.scss']
})
export class OverwatchComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  versions = env.versions;
  doomfist = require('@app/../assets/overwatch/hero-icon/doomfist.png');
  genji = require('@app/../assets/overwatch/hero-icon/genji.png');
  mccree = require('@app/../assets/overwatch/hero-icon/mccree.png');
  pharah = require('@app/../assets/overwatch/hero-icon/pharah.png');
  reaper = require('@app/../assets/overwatch/hero-icon/reaper.png');
  soldier = require('@app/../assets/overwatch/hero-icon/soldier-76.png');
  sombra = require('@app/../assets/overwatch/hero-icon/sombra.png');
  tracer = require('@app/../assets/overwatch/hero-icon/tracer.png');
  bastion = require('@app/../assets/overwatch/hero-icon/bastion.png');
  hanzo = require('@app/../assets/overwatch/hero-icon/hanzo.png');
  junkrat = require('@app/../assets/overwatch/hero-icon/junkrat.png');
  mei = require('@app/../assets/overwatch/hero-icon/mei.png');
  torbjorn = require('@app/../assets/overwatch/hero-icon/torbjorn.png');
  widowmaker = require('@app/../assets/overwatch/hero-icon/widowmaker.png');
  dva = require('@app/../assets/overwatch/hero-icon/dva.png');
  orisa = require('@app/../assets/overwatch/hero-icon/orisa.png');
  reinhardt = require('@app/../assets/overwatch/hero-icon/reinhardt.png');
  roadhog = require('@app/../assets/overwatch/hero-icon/roadhog.png');
  winston = require('@app/../assets/overwatch/hero-icon/winston.png');
  zarya = require('@app/../assets/overwatch/hero-icon/zarya.png');
  ana = require('@app/../assets/overwatch/hero-icon/ana.png');
  lucio = require('@app/../assets/overwatch/hero-icon/lucio.png');
  mercy = require('@app/../assets/overwatch/hero-icon/mercy.png');
  symmetra = require('@app/../assets/overwatch/hero-icon/symmetra.png');
  zenyatta = require('@app/../assets/overwatch/hero-icon/zenyatta.png');
  ngOnInit() { }

  openLink(link: string) {
    window.open(link, '_blank');
  }
}
