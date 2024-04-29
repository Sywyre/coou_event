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

const useNinStore = create<NinStore>((set) => ({
  ninDetails: {} as NinDetails,
  updateNin: (nin) =>
    set((store) => ({ ninDetails: (store.ninDetails = nin) })),
}));

export default useNinStore;

interface CamStore {
  url: string | null;
  bool: string;
  updateBool: (b: string) => void;
  updateUrl: (img: string | null) => void;
}

export const useCam = create<CamStore>((set) => ({
  url: "",
  bool: 'false',
  updateBool: (b) => set((store) => ({ bool: (store.bool = b) })),
  updateUrl: (img) => set((store) => ({ url: (store.url = img) })),
}));


interface SearchStore {
  query: string | null;
  setQuery: (parameter: string) => void;
}

export const useSearch = create<SearchStore>((set) => ({
  query: "",
 setQuery: (parameter) => set((store) => ({query: (store.query = parameter)}))
}));