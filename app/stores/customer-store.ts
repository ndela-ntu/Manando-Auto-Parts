import { ICustomer } from '../models/customer';
import { createStore } from 'zustand/vanilla';

export type CustomerState = {
  customer: ICustomer;
};

export type CustomerActions = {
  addCustomer: (customer: ICustomer) => void;
};

export type CustomerStore = CustomerState & CustomerActions;

export const initCustomerState = (): CustomerState => {
  return {
    customer: {
      fullNames: '',
      email: '',
      phoneNumber: 0,
      address: {},
    },
  };
};

export const defaultInitState: CustomerState = {
  customer: {
    fullNames: '',
    email: '',
    phoneNumber: 0,
    address: {},
  },
};

export const createCustomerStore = (
  initState: CustomerState = defaultInitState,
) => {
  return createStore<CustomerStore>()((set) => ({
    ...initState,
    addCustomer: (customer) =>
      set((state) => ({ customer: customer })),
  }));
};
