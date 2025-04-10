import { Component, OnInit } from '@angular/core';
import { QuadrosService } from '../../services/quadros.service';
import { Quadro } from '../../interfaces/quadro';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quadros',
  templateUrl: './quadros.component.html',
  styleUrls: ['./quadros.component.scss'],
  imports: [FormsModule],
})
export class QuadrosComponent implements OnInit {
  quadros: Quadro[] = [];
  selectedQuadro: Quadro | null = null;
  newQuadro: Quadro = { _id: '', title: '', content: '', local: '', situacao: '', julgamento: '', color: 'light' };

  constructor(private quadrosService: QuadrosService, private modalService: NgbModal) { }

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
    this.newQuadro = this.selectedQuadro || { _id: '', title: '', content: '', local: '', situacao: '', julgamento: '', color: 'light' };
    this.modalService.open(content);
  }

  saveQuadro(): void {
    console.log(this.selectedQuadro, this.newQuadro);
    if (this.selectedQuadro) {
      this.quadrosService.updateQuadro(this.newQuadro._id!, this.newQuadro).subscribe(() => {
        console.log(this.newQuadro._id);
        this.loadQuadros();
        this.modalService.dismissAll();
      });
    } else {
      this.quadrosService.createQuadro(this.newQuadro).subscribe(() => {
        console.log(this.newQuadro._id);
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
