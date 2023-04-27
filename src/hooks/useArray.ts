import { useCallback, useState } from "react";

type ReturnType<T> = {
  items: T[];
  pushItem: (newItem: T) => void;
  pushItems: (newItems: T[]) => void;
  setItems: (newItems: T[]) => void;
  unshiftItem: (newItem: T) => void;
  deleteIndexItem: (index: number) => void;
  updateIndexItem: (newItem: T, index: number) => void;
  findAndReplace: (newItem: T, func: (item: T) => boolean) => void;
  findAndRemove: (func: (item: T) => boolean) => void;
};

export function useArray<T>(initialItems?: T[]): ReturnType<T> {
  const [items, setItems] = useState<T[]>(initialItems || []);

  const pushItems = useCallback((newItems: T[]) => {
    setItems((prevItems) => [...prevItems, ...newItems]);
  }, []);

  const pushItem = useCallback((newItem: T) => {
    setItems((prevItems) => [...prevItems, newItem]);
  }, []);

  const unshiftItem = useCallback((newItem: T) => {
    setItems((prevItems) => [newItem, ...prevItems]);
  }, []);

  const deleteIndexItem = useCallback((index: number) => {
    setItems((pveItems) => {
      pveItems.splice(index, 1);
      return [...pveItems];
    });
  }, []);

  const updateIndexItem = useCallback((newItem: T, index: number) => {
    setItems((pveItems) => {
      const copy = [...pveItems];
      copy[index] = newItem;
      return copy;
    });
  }, []);

  const findAndReplace = useCallback(
    (newItem: T, func: (item: T) => boolean) => {
      setItems((pveItems) => {
        const copy = [...pveItems];
        const index = copy.findIndex((item) => func(item));

        if (index <= -1) return copy;

        copy[index] = newItem;
        return copy;
      });
    },
    []
  );

  const findAndRemove = useCallback((func: (item: T) => boolean) => {
    setItems((prevItems) => {
      const copy = [...prevItems];
      const index = copy.findIndex((item) => func(item));
      if (index <= -1) return copy;

      copy.splice(index, 1);
      return copy;
    });
  }, []);

  return {
    items: items,
    setItems: setItems,
    pushItem: pushItem,
    pushItems: pushItems,
    unshiftItem: unshiftItem,
    deleteIndexItem: deleteIndexItem,
    updateIndexItem: updateIndexItem,
    findAndReplace: findAndReplace,
    findAndRemove: findAndRemove,
  };
}
