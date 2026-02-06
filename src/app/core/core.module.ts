import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './components/shell/shell.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [
        ShellComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule
    ],
    exports: [
        ShellComponent
    ],
    providers: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
