import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import {CategoryPage } from '../category/category'
import { ProfilePage } from '../profile/profile';
import { FavoritePage } from '../favorite/favorite';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CategoryPage;
  tab3Root = FavoritePage;
  tab4Root = ProfilePage;

  constructor() {


  }
}
