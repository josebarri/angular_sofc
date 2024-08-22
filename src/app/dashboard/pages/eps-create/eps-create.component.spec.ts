import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpsCreateComponent } from './eps-create.component';

describe('EpsCreateComponent', () => {
  let component: EpsCreateComponent;
  let fixture: ComponentFixture<EpsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpsCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
