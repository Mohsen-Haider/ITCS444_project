import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HallDetailsPage } from './hall-details.page';

describe('HallDetailsPage', () => {
  let component: HallDetailsPage;
  let fixture: ComponentFixture<HallDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HallDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
