import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Context, createContext, ReactNode, useContext } from 'react';

type AuthContextType = {
  signup: UseMutationResult<AxiosResponse, unknown, User>;
};
type User = {
  id: string;
  name: string;
  imageUrl?: string;
};

const Context = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(Context);
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const signup = useMutation({
    mutationFn: (user: User) => {
      return axios.post(`${import.meta.env.VITE_SERVELURL}/signup`, user);
    },
  });
  return <Context.Provider value={{ signup }}>{children}</Context.Provider>;
}
