import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBarComponent {

  searchTerm: string = '';

  search() {
    console.log('Buscando:', this.searchTerm);
    // Aquí se implementará la lógica de búsqueda real
  }
}
