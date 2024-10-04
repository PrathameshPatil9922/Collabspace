import { Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { GlobalContentComponent } from './global-content/global-content.component';
import { ContentComponent } from './content/content.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { IndividualWorkspaceComponent } from './individual-workspace/individual-workspace.component';
import { WhiteboardComponent } from './Helper/whiteboard/whiteboard.component';
import { CodeEditorDashComponent } from './Helper/code-editor-dash/code-editor-dash.component';
import { NotepadComponent } from './Helper/notepad/notepad/notepad.component';
import { RoomComponent } from './components/editor/room/room.component';

export const routes: Routes = [
    { 'path': 'about', component: AboutUsComponent },
    { 'path': 'home', component: HomeComponent },
    { 'path': 'contact', component: ContactComponent },
    { 'path': 'login', component: LoginComponent },
    { 'path': 'register', component: RegisterComponent },
    { 'path': 'global_content', component: GlobalContentComponent },
    { 'path': 'content_1', component: ContentComponent },
    { 'path': 'forget_password_recovery', component: ForgetPasswordComponent },
    { 'path': 'main_dash', component: MainDashboardComponent },
    { 'path': 'individual', component: IndividualWorkspaceComponent },
    { 'path': 'whiteboard', component: WhiteboardComponent },
    { 'path': 'code_editor_dash', component: CodeEditorDashComponent },
    { 'path': 'notes', component: NotepadComponent },
    { 'path': 'room', component: RoomComponent },
    { 'path': '', redirectTo: '/home', pathMatch: 'full' },
    { 'path': '**', component: PageNotFoundComponent }
];
