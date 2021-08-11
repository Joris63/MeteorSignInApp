import { Meteor } from 'meteor/meteor';
import { AccountsCollection } from '/imports/api/AccountsCollection';

const insertAccount = account => AccountsCollection.insert({id: account.id, username: account.username, email: account.email, password: account.password });

Meteor.startup(() => {
  if (AccountsCollection.find().count() === 0) {
    [
      {id: 'ac473af2-e248-4079-ae24-5caa4eb5c884', username: 'JeffBezos123', email: 'jeff.b@gmail.com', password: 'ImSuperRich'},
      {id: '16225421-3145-4a08-ae93-77114466bec8', username: 'Spngeb0b', email: 'joriskamminga@yahoo.fr', password: 'something123'},
      {id: 'c3037e4e-170b-4872-9378-52290e02e185', username: 'MrH4cker', email: 'hacker@yandere.com', password: 'Hacking4Life'},
      {id: 'e802de3d-d7e3-4100-91e9-8dc516a56867', username: 'CooLBeans', email: 'Beansl4yer@gmail.com', password: 'BeaaaanzzzWTF'},
      {id:'1ad8206b-13c0-4f1a-bc28-38537145f639', username: 'JessyChn53', email: 'jessy@hotmail.com', password: 'CyberSec1234'}
    ].forEach(insertAccount)
  }
});
