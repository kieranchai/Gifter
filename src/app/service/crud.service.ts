import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireServices:AngularFirestore) { }

  createNewFriend(record){
    return this.fireServices.collection('Friend').add(record);
  }

  getAllFriends(){
    return this.fireServices.collection('Friend').snapshotChanges();
  }

  updateFriend(recordId, record){
    this.fireServices.doc('Friend/' + recordId).update(record);
  }

  deleteFriend(recordId){
    this.fireServices.doc('Friend/' + recordId).delete();
  }

}
