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
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AttendancePageComponent } from './attendence/attendance-page/attendance-page.component';
import { EventShowComponent } from './Event/event-show/event-show.component';
import { HollyDayPageComponent } from './LeavePage/holly-day-page/holly-day-page.component';
import { StaffCvComponent } from './staff/staff-cv/staff-cv.component';
import { AdminCvComponent } from './admin-page/admin-cv/admin-cv.component';
import { LecturerCvComponent } from './lectures/lecturer-cv/lecturer-cv.component';

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
                path:'admin',
                component:AdminPageComponent,
                title:'AdminPage'

            },
            {
                path:'admin-cv/:id',
                component:AdminCvComponent,
                title:'Admin-Cv Page'

            },
            {
                path: 'employees',
                component: EmployeesComponent,
                title: 'Employees',
            },
            {
                path:'employee-cv/:id',
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
                path:'staff-cv/:id',
                component: StaffCvComponent,
                title:'Staff-cv Page'

            },
            {
                path:'lectures',
                component:LecturesComponent,
                title:"Lectures"
            },

            {
                path:'lecture-cv/:id',
                component:LecturerCvComponent,
                title:"Lectures-Cv Page"

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
            },
            {
                path:'attendancePage',
                component:AttendancePageComponent,
                title: 'AttendancePage'
            },
            {
                path:'eventPage',
                component:EventShowComponent,
                title: 'EventPage'
            },
            {
                path:'hollydaypage',
                component:HollyDayPageComponent,
                title:'HollyDayPage'
            }

          
        ]
    }
];
