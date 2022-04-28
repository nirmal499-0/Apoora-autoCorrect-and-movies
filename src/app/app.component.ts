import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  inputTxt = '';
  corrections = {
    realy: 'really',
    wierd: 'weird',
  };

  title = '';
  pgNo!: number;
  titles!: any[];

  autoCrt(event: any) {
    let txt: keyof typeof this.corrections = event.target.value
      .split(' ')
      .pop();
    if (this.corrections.hasOwnProperty(txt)) {
      let lastIndex = event.target.value.lastIndexOf(' ');
      event.target.value =
        event.target.value.substring(0, lastIndex) +
        ' ' +
        this.corrections[txt];
    }
  }

  async getMovies() {
    if (this.title.length > 0) {
      await fetch(
        `https://jsonmock.hackerrank.com/api/moviesdata/search/?Title=${this.title}&page=${this.pgNo}`
      )
        .then((res) => res.json())
        .then((json) => {
          this.titles = [];
          json.data.forEach((e: any) => {
            // console.log(e.Title);
            this.titles.push(e.Title);
          });
          this.titles.sort();
        });
    }
  }
}
