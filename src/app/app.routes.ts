import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EmployeesComponent } from './employees/employees.component';
import { ToDoTaskComponent } from './to-do-task/to-do-task.component';
import { Component } from '@angular/core';
import { SlidePanelComponent } from './slide-panel/slide-panel.component';
import { UserAddComponent } from './user-add/user-add.component';
import { Title } from 'chart.js';
import { StudentsComponent } from './Students/students.component';
import { StaffComponent } from './staff/staff.component';
import { LecturesComponent } from './lectures/lectures.component';
import { SalaryComponent } from './salary/salary.component';
import { AttendanceReportComponent } from './Students/attendance-report/attendance-report.component';
import { EmployeeCvComponent } from './employees/employee-cv/employee-cv.component';
import { EmployeeModelComponent } from './employees/employee-model/employee-model.component';
import { StudentCvComponent } from './Students/student-cv/student-cv.component';
import { LeaveComponent } from './LeavePage/leave/leave.component';

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
                title: 'Employees',
            },
            {
                path:'employee-cv/:userId',
                component:EmployeeCvComponent,
                title:'EmployeeCv'

            },
            {
                path:'employeedata',
                component:EmployeeModelComponent,
                title:'EmployeeDetails'

            },
            {
                path:'students',
                component:StudentsComponent,
                title:'Students'
            },
            {
                    path: 'student-cv/:id',
                    component: StudentCvComponent, 
                    title:'student Cv'
            },
            {
                path:'staff',
                component:StaffComponent,
                title:'Staff'

            },
            {
                path:'lectures',
                component:LecturesComponent,
                title:"Lectures"
            },

            {
                path:'todo',
                component: ToDoTaskComponent,
                title:'ToDo-Task',
            },
            {
              path:'studentReport',
              component: AttendanceReportComponent,
              title:'AttendanceReport'

            },
            {
              path:'salary',
              component:SalaryComponent,
              title:'Salary-Managemet'

            },
            {
                path:'leavePage',
                component:LeaveComponent,
                title:'LeavePage'
            }
          
        ]
    }
];
