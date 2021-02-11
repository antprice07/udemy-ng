import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule} from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { AppRoutingModule } from "./app-routing.module";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { AuthModule } from "./auth/auth.module";
import { LoggingService } from "./logging.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    //You cannot make a declarartion of a single component in multiple modules. Imports can happen as many times as needed.
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    LoggingService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
