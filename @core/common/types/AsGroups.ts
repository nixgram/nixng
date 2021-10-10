import { FormGroup } from '@angular/forms';
import { AsControls } from "@core/common/types/AsControls";

export type AsGroups<T> = FormGroup & { value: T & AsControls<T> };
