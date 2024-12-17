import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';

const routes: Routes = [
    {
        path: '',
        component: ApplicationComponent
    },
    {
        path: '**',
        loadChildren: () => import('./page-not-found/page-not-found.module')
            .then(m => m.PageNotFoundModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        initialNavigation: 'enabledBlocking'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }