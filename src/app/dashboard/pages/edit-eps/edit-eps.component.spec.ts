import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEpsComponent } from './edit-eps.component';

describe('EditEpsComponent', () => {
  let component: EditEpsComponent;
  let fixture: ComponentFixture<EditEpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEpsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
