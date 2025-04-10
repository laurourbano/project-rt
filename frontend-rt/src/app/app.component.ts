import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuadrosComponent } from './components/quadros/quadros.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuadrosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-rt';
}
