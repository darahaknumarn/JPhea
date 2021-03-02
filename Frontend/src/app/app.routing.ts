import {Routes} from '@angular/router';
import {AdminLayoutComponent} from '@ecoinsoft/core-frontend/src/lib/shared/components/layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from '@ecoinsoft/core-frontend/src/lib/shared/components/layouts/auth-layout/auth-layout.component';
import {AuthenticationGuard} from '@ecoinsoft/core-frontend/src/lib/authentication/authentication.guard';
import {CanLoadModule} from '@ecoinsoft/core-frontend/src/public-api';

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
        loadChildren: () => import('@ecoinsoft/core-frontend/src/public-api').then(m => m.OrganizationModule),
        data: {title: 'Organization', breadcrumb: 'Organization'},
        canLoad: [CanLoadModule]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./module/new-dashbaord/new-dashbaoard.module').then(m => m.NewDashbaoardModule),
        data: {title: 'Dashboard', breadcrumb: 'Dashboard'},
        canLoad: [CanLoadModule]
      },
      // report

      {
        path: 'financial-transaction-report',
        loadChildren: () => import('./module/financail-transaction-report/financail-transaction-report.module').then(m => m.FinancailTransactionReportModule),
        data: {title: 'Financial Transaction Report', breadcrumb: 'Financial Transaction Report'},
        canLoad: [CanLoadModule]
      },

      {
        path: 'expanse-report',
        loadChildren: () => import('./module/expanse-report/expanse-report.module').then(m => m.ExpanseReportModule),
        data: {title: 'Expanse Report', breadcrumb: 'Expanse Report'},
        canLoad: [CanLoadModule]
      },
      {
        path: 'receive-fund-detail-report',
        loadChildren: () => import('./module/recieve-fund-detail-report/recieve-fund-detail-report.module').then(m => m.RecieveFundDetailReportModule),
        data: {title: 'Receive Fund Detail Report', breadcrumb: 'Receive Fund Detail Report'},
        canLoad: [CanLoadModule]
      },{
        path: 'transfer-fund-detail-report',
        loadChildren: () => import('./module/transfer-fund-detail-report/transfer-fund-detail-report.module').then(m => m.TransferFundDetailReportModule),
        data: {title: 'Transfer Fund Detail Report', breadcrumb: 'Transfer Fund Detail Report'},
        canLoad: [CanLoadModule]
      },

      // Page
      {
        path: 'page',
        loadChildren: () => import('@ecoinsoft/core-frontend/src/public-api').then(m => m.PageModule),
        data: {title: 'Page', breadcrumb: 'Page'},
        canLoad: [CanLoadModule]
      },
      // Page Feature
      {
        path: 'page-feature',
        loadChildren: () => import('@ecoinsoft/core-frontend/src/public-api').then(m => m.PageFeatureModule),
        data: {title: 'Page Feature', breadcrumb: 'Page Feature'},
        // canLoad: [canloadChildren]
      },
      // User management
      {
        path: 'user-management',
        loadChildren: () => import('@ecoinsoft/core-frontend/src/lib/module/user-management/user-management.module').then(m => m.UserManagementModule),
        data: {title: 'User Management', breadcrumb: 'User Management'},
        canLoad: [CanLoadModule]
      },{
        path: 'configure',
        loadChildren: () => import('@ecoinsoft/core-frontend/src/lib/module/configuration/configuration.module').then(m => m.ConfigurationModule),
        data: {title: 'Configuration', breadcrumb: 'Configuration'},
        canLoad: [CanLoadModule]
      },
      {
        path: 'role',
        loadChildren: () => import('@ecoinsoft/core-frontend/src/public-api').then(m => m.RoleModule),
        data: {title: 'Role', breadcrumb: 'Role'},
        canLoad: [CanLoadModule]
      },

      //  ---- project module 
      {
        path: 'project',
        loadChildren: () => import('./module/project/project.module').then(m => m.ProjectModule),
        data: {title: 'Project', breadcrumb: 'Project'},
        canLoad: [CanLoadModule]
      }, {
        path: 'project-type',
        loadChildren: () => import('./module/project-type/project-type.module').then(m => m.ProjectTypeModule),
        data: {title: 'Project Type', breadcrumb: 'Project Type'},
        canLoad: [CanLoadModule]
      },
      {
        path: 'project-status',
        loadChildren: () => import('./module/project-status/project-status.module').then(m => m.ProjectStatusModule),
        data: {title: 'Project Status', breadcrumb: 'Project Status'},
        canLoad: [CanLoadModule]
      },
      {
        path: 'expanse-item-type',
        loadChildren: () => import('./module/expanse-item-type/expanse-item-type.module').then(m => m.ExpanseItemTypeModule),
        data: {title: 'Expanse Item Type', breadcrumb: 'Expanse Item Type'},
        canLoad: [CanLoadModule]
      },
      {
        path: 'expanse-item',
        loadChildren: () => import('./module/expanse-item/expanse-item.module').then(m => m.ExpanseItemModule),
        data: {title: 'Expanse Item', breadcrumb: 'Expanse Item'},
        canLoad: [CanLoadModule]
      },{
        path: 'employee',
        loadChildren: () => import('./module/employee/employee.module').then(m => m.EmployeeModule),
        data: {title: 'Employee', breadcrumb: 'Employee'},
        canLoad: [CanLoadModule]
      },

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
