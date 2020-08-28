import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ToyRobotComponent } from './toy-robot/toy-robot.component';
import { FooterComponent } from './footer/footer.component';
import { TabletopComponent } from './tabletop/tabletop.component';
import { TabletopSquareComponent } from './tabletop-square/tabletop-square.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToyRobotComponent,
    FooterComponent,
    TabletopComponent,
    TabletopSquareComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
