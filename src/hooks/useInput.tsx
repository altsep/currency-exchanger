import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setProperty } from '../store/currencies';
import type { RootState } from '../store';
import { getOtherName, getOtherValue } from '../functions';

function useInput(isBaseInstance: boolean, name: string) {
  const { [name]: value, baseRatio } = useAppSelector(
    (state: RootState) => state.currencies
  );

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (/^\d+\.?\d*$|^$/.test(value)) {
      dispatch(setProperty({ name, value }));

      const otherInputName = getOtherName(isBaseInstance, name);
      const otherInputValue = getOtherValue(isBaseInstance, value, baseRatio);
      dispatch(setProperty({ name: otherInputName, value: otherInputValue }));
    }
  };

  return {
    name,
    id: name,
    value,
    onChange: handleChange,
  };
}

export default useInput;
