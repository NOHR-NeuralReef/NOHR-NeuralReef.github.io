import { Routes } from '@angular/router';
import { DataService } from './services/data.service';
import { inject } from '@angular/core';
import { map, filter, take } from 'rxjs/operators';

export const routes: Routes = [
    {
        path: '',
        resolve: {
            data: () => inject(DataService).dataReady$.pipe(
                filter(ready => ready),
                take(1),
                map(() => true)
            )
        },
        children: [
            {
                path: '',
                loadComponent: () => import('./application/application.component')
                    .then(m => m.ApplicationComponent)
            },
            {
                path: '**',
                loadComponent: () => import('./page-not-found/page-not-found.component')
                    .then(m => m.PageNotFoundComponent)
            }
        ]
    }
]; 