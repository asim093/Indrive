// types.ts
export type RootStackParamList = {
    Showdriver: undefined;
    Editdriver: { driver: Driver };
  };
  
  export interface Driver {
    id: string;
    driverName: string;
    email?: string;
    phoneNumber?: string;
    vehicle?: string;
  }
  