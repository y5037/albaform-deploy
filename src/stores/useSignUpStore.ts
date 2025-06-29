import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import {
  SignUpStep1InputStore,
  SignUpStep2Input,
} from '@/schemas/signupSchema';

type SignUpStore = {
  step1?: SignUpStep1InputStore;
  step2?: SignUpStep2Input;
  data: Partial<SignUpStep1InputStore & SignUpStep2Input>;
  setStep1: (data: SignUpStep1InputStore) => void;
  setStep2: (data: SignUpStep2Input) => void;
  reset: () => void;
  getSignUpData: () => Partial<
    Omit<SignUpStep1InputStore & SignUpStep2Input, 'confirmPassword'>
  >;
};

type MyPersist = PersistOptions<SignUpStore>;

export const useSignUpStore = create<SignUpStore>()(
  persist(
    (set, get) => ({
      step1: undefined,
      step2: undefined,
      data: {},

      setStep1: (step1) =>
        set((state) => ({
          step1,
          data: { ...step1, ...(state.step2 ?? {}) },
        })),

      setStep2: (step2) =>
        set((state) => ({
          step2,
          data: { ...(state.step1 ?? {}), ...step2 },
        })),
      reset: () => set({ step1: undefined, step2: undefined, data: {} }),

      getSignUpData: () => {
        const merged = { ...(get().step1 ?? {}), ...(get().step2 ?? {}) };
        return merged;
      },
    }),
    {
      name: 'signup-storage',
    } as MyPersist,
  ),
);
