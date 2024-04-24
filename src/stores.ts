import { create } from "zustand";

export interface NinDetails {
  first_name: string;
  last_name: string;
  middle_name: string;
  phone_number: string;
  date_of_birth: string;
  photo: string;
  gender: string;
  nin: string;
}
export interface Nin {
  entity: NinDetails;
}

interface NinStore {
  ninDetails: NinDetails;
  updateNin: (nin: NinDetails) => void;
}

const useNinStore = create<NinStore>(set => ({
    ninDetails: {} as NinDetails,
    updateNin: (nin) => set(store => ({ ninDetails: store.ninDetails = nin}))
}));

export default useNinStore;
