import { type StateCreator, create } from 'zustand';
import { type PersistOptions, persist } from 'zustand/middleware';

export function createPersist<T>(
  stateCreator: StateCreator<T>,
  persistOptions: PersistOptions<T>,
) {
  return create(persist(stateCreator, persistOptions));
}
