
export function omitEmptyProps<Type extends object>(
  object: Type

): Type {

  return <Type> Object.fromEntries(
    Object.entries(object)
      .filter(([_, value]) => !(
        value === undefined ||
        value === null
      ))
  );

}
