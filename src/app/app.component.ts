import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'FrontTodoAPI';
  public data_TodoApi: any;
  public data_FuncApi: any;
  public data: any;
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.fetchTodo();
  }

  public fetchTodo() {
    this.http.get('http://localhost:5117/v1/todo/todos').subscribe(
      (resp: any) => {
        console.log(resp);
        this.data_TodoApi = resp;
      }
    )

    this.http.get('http://localhost:5155/api/Funcionario').subscribe(
      (resp: any) => {
        console.log(resp);
        resp.dados.map((item: any) => {
          // item.dataDeCriacao = new Date(item.dataDeCriacao!).toLocaleDateString('pt-br');
          item.dataDeCriacao = new Date(item.dataDeCriacao!).toLocaleString('pt-br');
          item.dataDeAlteracao = new Date(item.dataDeAlteracao!).toLocaleString('pt-br');
        });
        this.data_FuncApi = resp.dados;
      }
    )

    this.http.get('https://jsonplaceholder.typicode.com/todos/').subscribe(
      (resp: any) => {
        console.log(`Pegando só o título do 0:  ${resp[0].title}`);
        console.log(resp);
        this.data = resp;
      }
    )
    
  }

}
