import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EmployeesComponent } from './employees/employees.component';
import { ToDoTaskComponent } from './to-do-task/to-do-task.component';
import { Component } from '@angular/core';
import { SlidePanelComponent } from './slide-panel/slide-panel.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login', 
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: '', 
        component: LayoutPageComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardPageComponent,
                title: 'Dashboard'
            },
            {
                path: 'employees',
                component: EmployeesComponent,
                title: 'Employees'
            },
            {
                path:'todo',
                component: ToDoTaskComponent,
                title:'ToDo-Task',
            }
        ]
    }
];
