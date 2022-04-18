import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { ImageServiceService } from 'src/app/services/image/image-service.service';
import { ImagePredictionResponse } from 'src/app/interfaces/image-prediction-response';
import { HostListener} from '@angular/core';

@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.css']
})
export class VideoCaptureComponent implements OnInit, OnDestroy {
    // toggle webcam on/off
    public showWebcam = true;
    public acceptPolicy = false;
    public multipleWebcamsAvailable = false;
    public autoTrigger = null;
    public imagePrediction = null;

    public videoOptions: MediaTrackConstraints = {
      // width: {ideal: 1024},
      // height: {ideal: 576}
    };

    public errors: WebcamInitError[] = [];
    // latest snapshot
    public webcamImage: WebcamImage = null;
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();

    public constructor(private imageService: ImageServiceService) {

    }

    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event:any){
      return false;
    }
    public ngOnInit(): void {
      WebcamUtil.getAvailableVideoInputs()
        .then((mediaDevices: MediaDeviceInfo[]) => {
          this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
        });

    }
    public ngOnDestroy(): void {
      clearInterval(this.autoTrigger);
      this.toggleWebcam();
    }
    public processImage(): void {
      // First, trigger to capture a photo
      this.triggerSnapshot();
      this.sendPicture();
    }
    public triggerSnapshot(): void {
      this.trigger.next();
    }
    public validatePolicy(event): void {
      this.acceptPolicy = event.target.checked;
      if (this.acceptPolicy) {
        this.autoTrigger = setInterval(() => this.processImage(), 5000);
      } else {
        clearInterval(this.autoTrigger);
      }
    }
    public toggleWebcam(): void {
      this.showWebcam = !this.showWebcam;
    }
    public handleInitError(error: WebcamInitError): void {
      this.errors.push(error);
    }
    public handleImage(webcamImage: WebcamImage): void {
      this.webcamImage = webcamImage;
    }

    public sendPicture() {
      if (this.webcamImage) {
        this.imageService.postImagePrediction(this.webcamImage.imageAsBase64)
        .subscribe((res) => {
              console.log(res);
              const imagePrediction: ImagePredictionResponse = res.data;
              this.imagePrediction = imagePrediction.prediction;
          },
        error => {
          alert('Ocurrió un error enviando tus datos. Porfavor, inténtalo de nuevo más tarde.');
          console.log(error);
        });
      } else {
        alert('Lo siento, no hemos podido capturar la foto. Porfavor inténtalo de nuevo');
      }
    }
    public get triggerObservable(): Observable<void> {
      return this.trigger.asObservable();
    }

}
