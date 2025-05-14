import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SignUpInput } from '@/schemas/signupSchema';

type PartialSignUpInput = Partial<SignUpInput>;

interface SignUpStore {
  // 전체 정보 저장
  signUpData: PartialSignUpInput;
  // 1차 정보 저장
  setSignUp1: (step1Data: { email: string; password: string }) => void;
  // 1자 제외 2차 정보 저장
  setSignUp2: (step2Data: Omit<SignUpInput, 'email' | 'password'>) => void;
  // localStorage에 저장된 정보 초기화
  reset: () => void;
}

export const useSignUpStore = create<SignUpStore>()(
  persist(
    (set) => ({
      signUpData: {}, // 초기화
      // 1차 정보 저장
      setSignUp1: (signUp1) =>
        set((state) => ({
          signUpData: { ...state.signUpData, signUp1 },
        })),
      // 2차 정보 저장(1차와 병합)
      setSignUp2: (signUp2) =>
        set((state) => ({
          signUpData: { ...state.signUpData, ...signUp2 },
        })),
      // localStorage에 저장된 정보 초기화
      reset: () => set({ signUpData: {} }),
    }),
    {
      name: 'sign-up-storage', // localStorage에 저장될 key
    },
  ),
);
