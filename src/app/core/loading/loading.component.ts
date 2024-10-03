import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  switcher$: Subject<boolean> = this.loadingService.switcher$;

  constructor(
    private elementRef: ElementRef,
    private loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.display = 'none';
    this.loadingService.switcher$.subscribe(status => {      
      this.elementRef.nativeElement.style.display = status ? 'block' : 'none';
      this.changeDetectorRef.detectChanges();
    });
  }

  start(): void {
    this.switcher$.next( true );
  }

  end(): void {
    this.switcher$.next( false );
  }

}
