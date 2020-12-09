import { Component } from '@angular/core';
import { CrudService } from './service/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gifter-app';

  friend: any;
  friendName: string;
  friendBday: Date;
  friendGift: string;
  message: string;

  constructor(public crudService: CrudService) { }

  ngOnInit() {
    this.crudService.getAllFriends().subscribe(data => {
      this.friend = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          bday: e.payload.doc.data()['bday'],
          gift: e.payload.doc.data()['gift'],
        };
      })
      console.log(this.friend);
    })
  }

  createRecord() {
    let record = {};
    record['name'] = this.friendName;
    record['bday'] = this.friendBday;
    record['gift'] = this.friendGift;

    this.crudService.createNewFriend(record).then(res => {
      this.friendName = "";
      this.friendBday = undefined;
      this.friendGift = "";
      console.log(res);
      this.message = "Friend saved";
    }).catch(err => {
      console.log(err);
    });
  }

  editRecord(record) {
    record.isEdit = true;
    record.editName = record.name;
    record.editBday = record.bday;
    record.editGift = record.gift;
  }

  updateRecord(recordData) {
    let record = {};
    record['name'] = recordData.editName;
    record['bday'] = recordData.editBday;
    record['gift'] = recordData.editGift;
    this.crudService.updateFriend(recordData.id, record);
    recordData.isEdit = false;
  }

  deleteRecord(recordId) {
    this.crudService.deleteFriend(recordId);
  };

}
