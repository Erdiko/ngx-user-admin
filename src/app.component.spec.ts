import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';


describe('component: AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    });
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should display Hello World message', () => {
    const debugEl = fixture.debugElement;
    const h1 = debugEl.nativeElement.querySelector('h1');
    expect(h1.textContent).toEqual('Hello World!');
  });
});
