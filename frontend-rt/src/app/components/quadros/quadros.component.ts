import { Component, OnInit } from '@angular/core';
import { QuadrosService } from '../../services/quadros.service';
import { Quadro } from '../../interfaces/quadro';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quadros',
  templateUrl: './quadros.component.html',
  styleUrls: ['./quadros.component.css'],
})
export class QuadrosComponent implements OnInit {
  quadros: Quadro[] = [];
  selectedQuadro: Quadro | null = null;
  newQuadro: Quadro = { id: '', title: '', content: '', local: '', situacao: '', julgamento: '', color: 'light' };

  constructor(private quadrosService: QuadrosService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadQuadros();
  }

  loadQuadros(): void {
    this.quadrosService.getQuadros().subscribe((data) => (this.quadros = data));
  }

  copyText(content: string): void {
    navigator.clipboard.writeText(content);
    alert('Texto copiado!');
  }

  openModal(content: any, quadro?: Quadro): void {
    this.selectedQuadro = quadro ? { ...quadro } : null;
    this.newQuadro = this.selectedQuadro || { id: '', title: '', content: '', local: '', situacao: '', julgamento: '', color: 'light' };
    this.modalService.open(content);
  }

  saveQuadro(): void {
    if (this.selectedQuadro) {
      this.quadrosService.updateQuadro(this.newQuadro.id, this.newQuadro).subscribe(() => {
        this.loadQuadros();
        this.modalService.dismissAll();
      });
    } else {
      this.quadrosService.createQuadro(this.newQuadro).subscribe(() => {
        this.loadQuadros();
        this.modalService.dismissAll();
      });
    }
  }

  deleteQuadro(id: string): void {
    if (confirm('Tem certeza que deseja remover este quadro?')) {
      this.quadrosService.deleteQuadro(id).subscribe(() => this.loadQuadros());
    }
  }
}
