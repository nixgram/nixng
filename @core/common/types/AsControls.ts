import { AbstractControl } from '@angular/forms';

export type AsControls<T> = { [key in keyof T]: AbstractControl };
