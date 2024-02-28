import {Component, OnInit} from '@angular/core';
import * as signalR from "@microsoft/signalr"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pizza Hub';

  private hubConnection?: signalR.HubConnection;
  isConnected: boolean = false;

  selectedChoice: number = -1;
  nbUsers: number = 0;

  pizzaPrice: number = 0;
  money: number = 0;
  nbPizzas: number = 0;

  ngOnInit() {
    this.connect();
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5282/hubs/pizza')
      .build();

    // TODO: Mettre isConnected à true seulement une fois que la connection au Hub est faite
    this.hubConnection.start().then(() => {
      this.hubConnection?.on('UpdateNbPizzasAndMoney', (nbPizzas: number, money: number) => {
        this.money = money;
        this.nbPizzas = nbPizzas;
      })
      this.hubConnection?.on('UpdateNbUsers',(nbUsers: number)=>{
        this.nbUsers = nbUsers;
      })
      this.hubConnection?.on('UpdateMoney', (money:number)=>{
        this.money = money;
      })
      this.hubConnection?.on('UpdatePizzaPrice', (pizzaPrice: number) =>{
        this.pizzaPrice = pizzaPrice;
      })
    })
    this.isConnected = true;
  }

  selectChoice(selectedChoice: number) {
    this.selectedChoice = selectedChoice;
    this.hubConnection?.invoke("SelectChoice", selectedChoice)
  }

  unselectChoice() {
    this.hubConnection?.invoke("UnselectChoice", this.selectedChoice)
    this.selectedChoice = -1;
  }

  addMoney() {
    this.hubConnection?.invoke("AddMoney", this.selectedChoice)
  }

  buyPizza() {
    this.hubConnection?.invoke("BuyPizza", this.selectedChoice)
  }
}
