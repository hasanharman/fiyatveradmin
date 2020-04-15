import { AnnouncementService } from './../../../services/announcement.service';
import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../../models/announcement';
@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  selectedAnnouncement: Announcement = new Announcement();
  announcements = [];
  constructor(private announcementService: AnnouncementService) { }

  ngOnInit() {
    this.announcementService.announcements().subscribe(e => {
      for (let i in e) {
        this.announcements.push(e[i]);
      }
    })
  }

  update(announcement: Announcement) {
    delete announcement.__v;
    delete announcement.history;
    console.log(announcement);
    this.announcementService.update(announcement).subscribe(e => {
      console.log(e);
    })
  }

  add(announcement: Announcement) {
    this.announcementService.add(announcement).subscribe(e => {
      this.announcements.push(e);
      this.selectedAnnouncement = new Announcement();
    })
  }

  remove(id: String, i: number) {
    this.announcementService.remove(id).subscribe(e => {
      this.announcements.splice(i, 1);
    })
  }

}
