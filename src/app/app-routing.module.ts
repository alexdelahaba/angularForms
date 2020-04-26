import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';

export const routes: Routes = [
    { path: 'template', component: TemplateComponent },
    { path: 'reactive', component: ReactiveComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'reactive' }
];

@NgModule({

    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }