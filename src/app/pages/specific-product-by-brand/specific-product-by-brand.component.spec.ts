import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificProductByBrandComponent } from './specific-product-by-brand.component';

describe('SpecificProductByBrandComponent', () => {
  let component: SpecificProductByBrandComponent;
  let fixture: ComponentFixture<SpecificProductByBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificProductByBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificProductByBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
