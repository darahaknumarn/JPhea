import {Routes} from '@angular/router';
import {AdminLayoutComponent} from '@hanumantech/core-frontend/src/lib/shared/components/layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from '@hanumantech/core-frontend/src/lib/shared/components/layouts/auth-layout/auth-layout.component';
import {AuthenticationGuard} from '@hanumantech/core-frontend/src/lib/authentication/authentication.guard';
import {CanLoadModule} from '@hanumantech/core-frontend/src/public-api';

export const rootRouterConfig: Routes = [

  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'welcome',
        loadChildren: () => import('./module/welcome/welcome.module').then(m => m.WelcomeModule),
        data: {title: 'J Phea', breadcrumb: 'Page'},
      },
      {
        path: 'others',
        loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule),
        data: {title: 'Others', breadcrumb: 'OTHERS'},
      },
      {
        path: 'no-permission',
        loadChildren: () => import('./module/page-404/page-404.module').then(m => m.Page404Module),
      },

      {
        path: 'organization',
        loadChildren: () => import('@hanumantech/core-frontend/src/public-api').then(m => m.OrganizationModule),
        data: {title: 'Organization', breadcrumb: 'Organization'},
        canLoad: [CanLoadModule]
      },

      // report

      // Page
      {
        path: 'page',
        loadChildren: () => import('@hanumantech/core-frontend/src/public-api').then(m => m.PageModule),
        data: {title: 'Page', breadcrumb: 'Page'},
        canLoad: [CanLoadModule]
      },
      // Page Feature
      {
        path: 'page-feature',
        loadChildren: () => import('@hanumantech/core-frontend/src/public-api').then(m => m.PageFeatureModule),
        data: {title: 'Page Feature', breadcrumb: 'Page Feature'},
        // canLoad: [canloadChildren]
      },
      // User management
      {
        path: 'user-management',
        loadChildren: () => import('@hanumantech/core-frontend/src/lib/module/user-management/user-management.module').then(m => m.UserManagementModule),
        data: {title: 'User Management', breadcrumb: 'User Management'},
        canLoad: [CanLoadModule]
      },{
        path: 'configure',
        loadChildren: () => import('@hanumantech/core-frontend/src/lib/module/configuration/configuration.module').then(m => m.ConfigurationModule),
        data: {title: 'Configuration', breadcrumb: 'Configuration'},
        canLoad: [CanLoadModule]
      },
      {
        path: 'role',
        loadChildren: () => import('@hanumantech/core-frontend/src/public-api').then(m => m.RoleModule),
        data: {title: 'Role', breadcrumb: 'Role'},
        canLoad: [CanLoadModule]
      },

      //  ---- project module 
    
      // Import
      {
        path: 'import',
        loadChildren: () => import('./module/import/import.module').then(m => m.ImportModule),
        data: {title: 'Import', breadcrumb: 'Import'},
        canLoad: [CanLoadModule]
      },
      // Site
      {
        path: 'site',
        loadChildren: () => import('./module/site/site.module').then(m => m.SiteModule),
        data: {title: 'Site', breadcrumb: 'Site'},
        canLoad: [CanLoadModule]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];
