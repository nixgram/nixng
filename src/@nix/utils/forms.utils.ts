import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export function markFormAsTouched( form: FormGroup, controls: string[] = [], touchNested: boolean ) {
  if ( controls.length === 0 ) {
    form.markAllAsTouched();
    return;
  }

  controls.forEach( control => {
    markControlAsTouched( form.get( control ), touchNested );
  } );
}

export function markControlAsTouched( control: AbstractControl | FormControl, touchNested: boolean ) {
  if ( touchNested ) {
    control.markAllAsTouched();
  } else {
    control.markAsTouched();
  }
}
