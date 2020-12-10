import { Component } from '@angular/core';
import { CrudService } from './service/crud.service';
import * as moment from 'moment';

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
  friendGift2: string;

  constructor(public crudService: CrudService) { }

  ngOnInit() {
    var numberOfDays;
    this.crudService.getAllFriends().subscribe(data => {
      this.friend = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          bday: e.payload.doc.data()['bday'],
          gift: e.payload.doc.data()['gift'],
          gift2: e.payload.doc.data()['gift2'],
          numberOfDays: numberOfDays
        };
      })

      this.friend.forEach(friend => {
        var friendBirthday = moment(friend.bday);
        var today = moment().startOf('day');
        // calculate age of the person
        var age = moment(today).diff(friendBirthday, 'years');
        moment(age).format("YYYY-MM-DD");
        // console.log('Friend Age', friend.name, age);

        var nextBirthday = moment(friendBirthday).add(age, 'years');
        moment(nextBirthday).format("YYYY-MM-DD");

        /* added one more year in case the birthday has already passed
        to calculate date till next one. */
        if (nextBirthday.isSame(today)) {
          friend.numberOfDays = 0;
          // console.log('Cake!!');
        } else {
          nextBirthday = moment(friendBirthday).add(age + 1, 'years');
          friend.numberOfDays = nextBirthday.diff(today, 'days');
          // console.log('Days until next birthday' + ' ' + nextBirthday.diff(today, 'days'));
        };
      });

      this.friend.sort((a, b) => (a.numberOfDays > b.numberOfDays) ? 1 : ((b.numberOfDays > a.numberOfDays) ? -1 : 0));

  });
}

createRecord() {
  let record = {};
  record['name'] = this.friendName;
  record['bday'] = this.friendBday;
  record['gift'] = this.friendGift;
  if (this.friendGift2 == undefined) {
    this.friendGift2 = "";
  };
  record['gift2'] = this.friendGift2;

  this.crudService.createNewFriend(record).then(res => {
    this.friendName = "";
    this.friendBday = undefined;
    this.friendGift = "";
    this.friendGift2 = "";
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
}

editRecord(record) {
  record.isEdit = true;
  record.editName = record.name;
  record.editBday = record.bday;
  record.editGift = record.gift;
  record.editGift2 = record.gift2;
}

updateRecord(recordData) {
  let record = {};
  record['name'] = recordData.editName;
  record['bday'] = recordData.editBday;
  record['gift'] = recordData.editGift;
  if (recordData.editGift2 == undefined) {
    recordData.editGift2 = "";
  };
  record['gift2'] = recordData.editGift2;
  this.crudService.updateFriend(recordData.id, record);
  recordData.isEdit = false;
}

deleteRecord(recordId) {
  this.crudService.deleteFriend(recordId);
};

}
