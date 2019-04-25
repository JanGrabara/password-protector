import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCredentialsFormComponent } from './modal-credentials-form.component';

describe('ModalCredentialsFormComponent', () => {
  let component: ModalCredentialsFormComponent;
  let fixture: ComponentFixture<ModalCredentialsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCredentialsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCredentialsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
