export class Announcement {
    _id: string;
    announcement: string;
    history: [{
      date: Date;
      _id: String;
      adminId: String;
    }];
    __v: number;
  }