import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface File {
  originalname: string;
  filename: string;
  location: string;
}


@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private apiUrl = `${ environment.API_URL }/api/files`;

  constructor(
    private http: HttpClient
  ) { }

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        tap(data => {
          const blob = new Blob([data], { type });
          saveAs(blob, name);
        }),
        map(() => true)
      );
  }

  uploadFile(file: Blob){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<File>(`${this.apiUrl}/upload`, formData, {
      /*
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      */
    });
  }
}
