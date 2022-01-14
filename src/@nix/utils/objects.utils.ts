/**
 * Converts any type of enums to array
 *
 * @param enumType
 * @param keyProp - by default, it's 'id'
 * @param valueProp - by default, it's 'name'
 *
 * @returns {Array} - array of objects with keyProp and valueProp
 *
 * @example
 * ```ts
 * enum MyEnum {
 *  A = 1,
 *  B = 2,
 *  C = 3
 *  }
 *
 *  const enumArray = convertEnumToArray(MyEnum);
 *  console.log(enumArray);
 *  // [{id: 1, name: 'A'}, {id: 2, name: 'B'}, {id: 3, name: 'C'}]
 *  ```
 * */
export function convertEnumToArray<T>(enumType: any, keyProp: string = 'id', valueProp: string = 'name'): T[] {
  const values: string[] = Object.keys(enumType).filter(
    (key) => isNaN(Number(key))
  );

  const keys: string[] = values.map((value) => enumType[value]);

  const result: any[] = keys.map((key, index) => {
    return {
      [keyProp]: key,
      [valueProp]: values[index],
    }
  });

  return result;
}
