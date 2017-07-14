import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Person} from "./entity/Person";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      createConnection({
          type: "sqlite",
          database: "db/MyAppDB.db",   
          driver:{
            type : "sqlite",
            database : "db/MyAppDB.db"
          },
          entities: [
              Person
          ],
          autoSchemaSync: true,
      }).then(async connection => {
          let person = new Person();
          person.name = "Mike";
          person.age = "12";         

          let personRepository = connection.getRepository(Person);

          await personRepository.persist(person);
          console.log("Person record has been saved");

          let savedPersons = await personRepository.find();
          console.log("All persons from the db: ", savedPersons);
      }).catch(error => console.log(error));
        

    });
  }
}

