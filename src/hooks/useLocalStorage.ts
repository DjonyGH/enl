import { useState, useEffect, SetStateAction } from 'react';

function useLocalStorage<T>(
  paramName: string,
  paramProposedInitialValue: T,
): [T, React.Dispatch<SetStateAction<T>>] { // React.Dispatch<string | bigint | boolean>
  const getValue = () => {
    const storage: string | null = localStorage.getItem(paramName);
    if (storage) {
      try {
        return JSON.parse(storage);
      } catch (error) {
        return paramProposedInitialValue;
      }
    }
    return paramProposedInitialValue;
  };

  const [value, setValue] = useState<T>(getValue);

  useEffect(() => {
    if (value !== undefined) {
      localStorage.setItem(paramName, JSON.stringify(value));
    }
  }, [value, paramName]);
  return [value, setValue];
}

export default useLocalStorage;
