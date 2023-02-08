import { Injectable } from '@angular/core';
import { Storage, uploadBytes, ref, getDownloadURL, list, deleteObject } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  loaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  url: string = '';
  imgName$:BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private storage: Storage) { }
  
  uploadImg($event: any, name: string) {
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `imagen/` + name);
    uploadBytes(imgRef, file)
      .then(() => { this.getImg(name) })
      .catch(err => console.log(err)
      )
  }

  getImg(name: string) {
    const imagesRef = ref(this.storage, `imagen/` + name);
    list(imagesRef)
      .then(async () => { this.url = await getDownloadURL(imagesRef); this.loaded$.next(false); this.imgName$.next(name) })
      .catch(err => {
        alert('Ocurrió un error al subir la imagen');
        console.log(err);
      })
  }

  deleteImg(name: string){
    const ref1 = ref(this.storage, `imagen/` + name );
    return deleteObject(ref1)
  }
  get loaded():Observable<boolean>{
    return this.loaded$.asObservable();
  }

  get imgName():Observable<string>{
    return this.imgName$.asObservable();
  }
}
