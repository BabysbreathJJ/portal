import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

const now = (new Date()).getTime();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  static items = [
    {
      link: 'dashboard',
      title: 'Dashboard',
      icon: 'dashboard',
    },
    {
      link: 'resource',
      title: 'Resource',
      icon: 'cloud',
    },
    {
      link: 'diagnostics',
      title: 'Diagnostics',
      icon: 'local_hospital',
    },
    {
      link: 'command',
      title: 'Cluster Run',
      icon: 'call_to_action',
    },
  ];

  private get items(): any[] {
    return AppComponent.items;
  }

  private notifications = [
    {
      id: 1,
      ts: now - 27 * 60 * 1000,
      type: 'info',
      message: 'Cluster Run: Command "dir" is in progress...',
      link: '/#/command/results/1',
    },
    {
      id: 2,
      ts: now - 10 * 60 * 1000,
      type: 'error',
      message: 'Diagnostics: Ping test failed.',
      link: '/#/diagnostics/results/2',
    },
    {
      id: 3,
      ts: now - 2 * 60 * 1000,
      type: 'warning',
      message: 'It\'s going to rain in 30 minutes.',
      link: 'https://weather.com',
    },
  ];

  @ViewChild('side')
  private sidePane;

  subscription: Subscription;

  constructor(
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public api: ApiService
  ) { }

  ngOnInit() {
    // this.subscription = this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // )
    //   .subscribe(() => window.scrollTo(0, 0));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    //Open the side nav with one second delay, otherwise there may be a
    //big virtical gap between the side nav and main content. It seems to be
    //an issue from Angular Material and/or Bootstrap Grid system. The delay
    //is not the ultimate way to fix the problem. It just reduces the chance
    //of the gap, and it seems good enough now. The ultimate way may be to
    //replace the Bootstrap Grid system with something else, which involves
    //a lot more work.
    setTimeout(() => {
      this.sidePane.toggle();
    }, 1000);
  }

  private get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  private get userName(): string {
    return this.authService.user.name;
  }

  private logout(): void {
    this.authService.logout();
    this.router.navigate(['./login'], { relativeTo: this.route });
  }
}
