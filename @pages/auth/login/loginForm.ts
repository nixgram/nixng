import { ILoginRequest } from "@core/interfaces";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AsControls, AsGroups } from "@core/common/types";


export function LoginForm(args: {
  model: ILoginRequest,
  formBuilder: FormBuilder
}): FormGroup {
  const {model, formBuilder} = args;

  return formBuilder.group({
    username: new FormControl(model?.username, Validators.required),
    password: new FormControl(model?.password, Validators.required)
  } as AsControls<ILoginRequest>) as AsGroups<ILoginRequest>;
}
