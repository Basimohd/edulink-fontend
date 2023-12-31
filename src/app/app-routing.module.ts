import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./modules/user/user.module').then((m)=>m.UserModule)
  },
  {
    path:'student',
    loadChildren:()=>import('./modules/student/student.module').then((m)=>m.StudentModule)
  },
  {
    path:'faculty',
    loadChildren:()=>import('./modules/faculty/faculty.module').then((m)=>m.FacultyModule)
  },
  {
    path:'admin',
    loadChildren:()=>import('./modules/admin/admin.module').then((m)=>m.AdminModule)
  },
  { path: '**', component: NotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
