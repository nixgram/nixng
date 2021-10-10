export function createFormData(object: Object, form?: FormData, namespace?: string): FormData {
  const formData = form || new FormData();
  for (let property in object) {
    // @ts-ignore
    if (!object.hasOwnProperty(property) || !object[property]) {
      continue;
    }
    const formKey = namespace ? `${namespace}[${property}]` : property;
    // @ts-ignore
    if (object[property] instanceof Date) {
      // @ts-ignore
      formData.append(formKey, object[property].toISOString());
      // @ts-ignore
    } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {

      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      createFormData(object[property], formData, formKey);
    } else {
      // @ts-ignore
      formData.append(formKey, object[property]);
    }
  }
  return formData;
}
