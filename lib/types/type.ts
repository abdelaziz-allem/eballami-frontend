//AuthType START//
export interface AuthType {
  mobileNumber: string;
  password: string;
}
//AuthType END//

//ROOM TYPES START//
export interface RoomType {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomType {
  name: string;
}

export interface UpdateRoomType {
  name?: string;
}

//ROOM TYPES END//

//ROOMS START//
export interface Room {
  id: number;
  number: string;
  typeId: number;
  createdAt: string;
  updatedAt: string;
  type: {
    id: number;
    name: string;
    pricePerNight: number;
  };
}

export interface CreateRoom {
  number: string;
  typeId: number;
}

export interface UpdateRoom {
  number?: string;
  typeId?: number;
}

//ROOM END//

//USER TYPES START//

export enum ROLE {
  ADMIN = "Admin",
  RECEPTION = "Reception",
  CASHIER = "Cashier",
  WAITER = "Waiter",
  HOUSEKEEPING = "HouseKeeping",
  HOUSEKEEPING_ADMIN = "HouseKeepingAdmin",
}

export interface User {
  id: number;
  name: string;
  mobileNumber: string;
  password: string;
  role: ROLE;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUser {
  name: string;
  mobileNumber: string;
  password: string;
  role: ROLE;
}

export interface UpdateUser {
  name?: string;
  mobileNumber?: string;
  role?: ROLE;
  password?: string;
}

export interface userInSessionType {
  name: string;
  id: number;
  mobileNumber: string;
  role: string;
}
//USER TYPES END//
