import { Component, OnInit } from '@angular/core';
import { LoggingService } from './logging/logging.service';
import { StuffService } from './stuff/stuff.service';
import { MazeService } from './services/maze.service';
import { MazeFormats } from './models/MAzeFormats';

@Component({
  selector: 'valant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  public title = 'Valant demo';
  public data: string[];
  public mazeFormat = '';
  public mazeFormats: MazeFormats[] = [];
  public selectedMaze:any;
  constructor(private logger: LoggingService, private mazeService: MazeService) {}

  ngOnInit() {
    this.logger.log('Welcome to the AppComponent');
    this.saveMaze({key: 0, name: "First", value: 'SOXXXXXXXX|OOOXXXXXXX|OXOOOXOOOO|XXXXOXOXXO|OOOOOOOXXO|OXXOXXXXXO|OOOOXXXXXE'});
  }

  private getMazeFormats(): void {
    this.mazeService.getFormats().subscribe({
      next: (response: MazeFormats[]) => {
        this.updateMazeFormats(response);
      },
      error: (error) => {
        this.logger.error('Error getting stuff: ', error);
      },
    });
  }
  public saveMaze(data: any){
    this.mazeService.addFormat(data).subscribe({
      next: (response: MazeFormats[]) => {
        this.updateMazeFormats(response);
      },
      error: (error) => {
        this.logger.error('Error getting stuff: ', error);
      },
    });
  }

  private updateMazeFormats(data: MazeFormats[]){
    this.mazeFormats = data;
    this.selectedMaze = this.mazeFormats.find(x=> x.name === 'First');
    this.mazeFormat = this.selectedMaze.value;
  }

}
