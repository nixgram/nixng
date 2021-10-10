import { AbstractControl, FormGroup } from '@angular/forms';

let displayProperties: string[] = ['required', 'actualLength', 'requiredLength', 'name', 'value', 'status'];
let INVALID_STATUS = 'INVALID';

interface IInvalid {
  errors: any;
  value: string | number;
  status: string;
  name: string;
}

interface IDisplayableProps {
  name: string;
  actualLength: any;
  requiredLength: any;
  status: string;
  value: string | number;
  required: boolean | undefined | string;
}

const FilterInvalidFormControlProps = (data: [string, AbstractControl][]): IInvalid[] => {
  data = data.filter(d => d[1].status === INVALID_STATUS);
  return data.map((control) => {
    return {
      errors: control[1]?.errors,
      value: control[1]?.value,
      status: control[1]?.status,
      name: control[0]
    };
  });
};

// Add Extra validation field props if necessary & extend the interface
const ConvertToDisplayableProps = (data: IInvalid[]): IDisplayableProps[] => {
  return data.map((el: IInvalid) => {
    return {
      required: el?.errors?.required,
      actualLength: el?.errors?.minlength?.actualLength ?? 0,
      requiredLength: el?.errors?.minlength?.requiredLength ?? 0,
      name: el?.name,
      status: el?.status,
      value: el?.value
    };
  });
};


const DisplayInConsoleAsTable = (data: IDisplayableProps[]): void => {
  console.clear();
  console.table(data, displayProperties);
};

export const InvalidFormProps = (formGroup: FormGroup): void => {
  DisplayInConsoleAsTable(ConvertToDisplayableProps(FilterInvalidFormControlProps(Object.entries(formGroup.controls))));
};
