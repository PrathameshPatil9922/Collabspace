import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { PageNotFoundComponent } from './helper/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/common/home/home.component';
import { AboutUsComponent } from './pages/common/about-us/about-us.component';
import { GlobalContentComponent } from './pages/common/global-content/global-content.component';
import { ContentComponent } from './pages/common/content/content.component';
import { MainDashboardComponent } from './pages/user/userDashboard/main-dashboard.component';
import { IndividualWorkspaceComponent } from './pages/user/individual-workspace/individual-workspace.component';
import { WhiteboardComponent } from './common/whiteboard/whiteboard.component';
import { CodeEditorComponent } from './common/code-editor/code-editor.component';
import { NotepadComponent } from './common/notepad/notepad.component';
import { ContactComponent } from './pages/common/contact/contact.component';
import { NoteEditorComponent } from './common/notepad/notes-editor/notes-editor.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home', pathMatch: 'full',
        title: 'Home: CollabSpace'

    },
    {
        path: 'about',
        component: AboutUsComponent,
        title: 'About Us',
    },
    {
        path: 'contact',
        component: ContactComponent,
        title: 'Contact Us : To embark on a new journey',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login to Continue',
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register Now',

    },
    {
        'path': 'forget_password_recovery',
        component: ForgetPasswordComponent,
        title: 'Password Recovery'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home: CollabSpace',
        children: [
            {
                path: 'global_content',
                component: GlobalContentComponent,
                title: 'Global Content',
                children: [
                    {
                        path: 'content/:contentId', component: ContentComponent
                    },
                ]
            },
        ],

    },
    {
        path: 'user',
        component: MainDashboardComponent,
        title: 'User Dashboard: CollabSpace',
    },
    {
        path: 'user',
        children: [
            {
                path: 'individual', loadComponent: () => import('./pages/user/individual-workspace/individual-workspace.component').then(m => m.IndividualWorkspaceComponent),
                title: 'Individual Workspace: Create Your Own Content',
            },
            {
                path: 'individual',
                children: [
                    {
                        path: 'whiteboard',
                        component: WhiteboardComponent,
                        title: 'WhiteBoard:Collaborate your creativity'
                    },
                    {
                        path: 'code_editor',
                        component: CodeEditorComponent,
                        title: 'Code:Unleash the Coder Inside You',
                    },
                    {
                        path: 'notes',
                        component: NotepadComponent,
                        title: 'Notes: Take a note of what you do'
                    },
                    {
                        path: 'notes',
                        children: [
                            {
                                path: 'note-editor',
                                component: NoteEditorComponent,
                            },
                            {
                                path: 'notes/edit/:id',
                                component: NoteEditorComponent,
                            }
                        ]
                    }
                ]
            },
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        title: 'Error: Page Not Found'
    },
];
