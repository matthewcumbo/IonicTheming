import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private storage:Storage) {}

  public themes:any[] = [
    {id:"l",name:"Light"},
    {id:"d",name:"Dark"}
  ];
  public username = "";
  public theme = "";

  public fg = new FormGroup({
    username: new FormControl(),
    theme: new FormControl()
  });

  async ngOnInit(){
    await this.storage.create();
    await this.load();
  }

  async save(){
    this.username = this.fg.controls.username.value;
    this.theme = this.fg.controls.theme.value;

    console.log(this.fg.getRawValue());
    
    await this.storage.set("username",this.username);
    await this.storage.set("theme", this.theme);

    this.toggleDarkTheme();
  }

  async load(){
    this.username = await this.storage.get("username");
    this.theme = await this.storage.get("theme");

    this.fg.controls.username.setValue(this.username);
    this.fg.controls.theme.setValue(this.theme);

    console.log(this.theme);

    this.toggleDarkTheme();
  }


  toggleDarkTheme(){
    document.documentElement.classList.toggle("ion-palette-dark", this.theme=="d"?true:false);
  }

}
