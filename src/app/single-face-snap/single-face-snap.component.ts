import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { DatePipe, NgClass, NgStyle, TitleCasePipe } from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    TitleCasePipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss'
})
export class SingleFaceSnapComponent implements OnInit {

faceSnap!: FaceSnap;

  constructor(private faceSnapsService: FaceSnapsService,
    private route:ActivatedRoute) {}

  snapped!: boolean;
  snapButtonText!: string;


  ngOnInit(): void {
    this.snapped = false;
    this.snapButtonText = "Oh Snap !!"

    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  onClickSnap(): void {

    if (this.snapped == true) {
      this.unsnap();
    } else {
      this.snap();
    }
  }

  unsnap() {
    this.faceSnapsService.snapOrUnsnapById(this.faceSnap.id, 'unsnap');
    this.snapped = false;
    this.snapButtonText = "Oh Snap !!"
  }

  snap() {
    this.faceSnapsService.snapOrUnsnapById(this.faceSnap.id, 'snap');
    this.snapped = true;
    this.snapButtonText = "Ooops Unsnap !!"
  }

}
