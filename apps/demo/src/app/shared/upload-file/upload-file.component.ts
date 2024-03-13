import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'valant-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.less']
})
export class UploadFileComponent implements OnInit {
  @Output() onSelectMazeFormat: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  private fileContent:String = '';
  public onChange (event:any): void {
    const file = event.target.files[0];
    const name = file.name.split('.')[0];
    this.getFileData(file).subscribe((res)=> {
      console.log('res ', res);
      this.onSelectMazeFormat.emit({key: 0, name: name, value: res});
    })
  }

  getFileData(file: any): Observable<any> {
    return new Observable<any>((observer: any) => {
        if (file) {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(file);
        }
    });
}

}
