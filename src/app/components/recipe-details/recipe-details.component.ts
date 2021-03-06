import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  currentRecipe = null;
  message = '';


  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getRecipe (this.route.snapshot.paramMap.get('id'));

  }
  getRecipe(id): void {
    this.recipeService.get(id)
      .subscribe(
        data => {
          this.currentRecipe = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  updateRecipe(): void {
    this.recipeService.update(this.currentRecipe.id, this.currentRecipe)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'This recipe was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }
  deleteRecipe(): void {
    this.recipeService.delete(this.currentRecipe.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/recipes']);
        },
        error => {
          console.log(error);
        });
  }

}
