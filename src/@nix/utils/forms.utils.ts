import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { hasValueInArray } from '@nix/utils/collection.utils';
import { isValidDate } from '@nix/utils/date-time.utils';
import { isObject } from '@nix/utils/objects.utils';

export function markFormAsTouched( params: { form: FormGroup, controls?: string[], touchNested?: boolean } ) {
  const { form, controls, touchNested } = params;

  if ( controls.length === 0 ) {
    form.markAllAsTouched();
    return;
  }

  hasValueInArray( controls ) && controls.forEach( control => {
    markControlAsTouched( {
      control: form.get( control ),
      touchNested
    } );
  } );
}

export function markControlAsTouched( params: { control: AbstractControl | FormControl, touchNested?: boolean } ) {
  const { control, touchNested } = params;
  touchNested ? control.markAllAsTouched() : control.markAsTouched();
}

export function convertToFormData<T>( formValue: T, form: FormData = null, namespace = '' ): FormData {
  const formData = form || new FormData();

  if ( !isObject( formValue ) ) {
    return formData;
  }

  for ( const key of Object.keys( formValue ) ) {
    const value = formValue[key];
    const formKey = namespace ? `${ namespace }[${ key }]` : key;

    if ( value ) {

      if ( (formValue[key] instanceof Date) && isValidDate( value ) ) {
        const date = (new Date( value )).toUTCString();
        formData.append( formKey, date );
      } else if ( typeof formValue[key] === 'object' && isValidDate( value._d ) ) {
        const date = (new Date( value._d )).toLocaleDateString();
        formData.append( formKey, date );
      } else {
        if ( (formValue[key] instanceof Array) && hasValueInArray( value ) ) {

          formValue[key].forEach( ( element, index ) => {
            const tempFormKey = `${ formKey }[${ index }]`;

            if ( element instanceof File ) {
              formData.append( formKey, element );
            } else {
              if ( !this.IsObject( element ) ) {
                formData.append( tempFormKey, element.toString() );
              } else if ( typeof element === 'object' ) {
                convertToFormData( element, formData, tempFormKey );
              }
            }
          } );

        } else if ( typeof formValue[key] == 'object' && !(formValue[key] instanceof Date) && !(formValue[key] instanceof File) && !formValue[key]._d ) {
          convertToFormData( formValue[key], formData, formKey );
        } else {
          formData.append( formKey, value );
        }
      }
    } else {
      formData.append( formKey, '' );
    }

  }

  return formData;
}
