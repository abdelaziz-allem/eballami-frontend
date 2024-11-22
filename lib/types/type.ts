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
  pricePerNight: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomType {
  name: string;
  pricePerNight: string;
}

export interface UpdateRoomType {
  name?: string;
  pricePerNight?: string;
}

//ROOM TYPES END//

//ROOMS START//
export interface Room {
  id: number;
  number: string;
  typeId: number;
  status: Status;
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
  status?: Status;
}

export enum Status {
  OCCUPIED = "Occupied",
  AVAILABLE = "Available",
}

//ROOM END//

//USER START//

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
//USER END//

//GUESTS START//

export enum IdentificationType {
  PASSPORT = "Passport",
  DRIVER_LICENSE = "DriverLicense",
  NATIONAL_ID = "NationalId",
}

export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  nikahDocumentImage: string;
  identificationType: IdentificationType;
  identificationNumber: string;
  email: string;
  mobileNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGuest {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  nikahDocumentImage?: string;
  identificationType: string;
  identificationNumber: string;
}

export interface UpdateGuest {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
  nikahDocumentImage?: string;
  identificationType?: string;
  identificationNumber?: string;
}
//GUESTS END//

//BOOKINGS START//

export enum BookingStatus {
  CHECKED_IN = "CheckedIn",
  CHECKED_out = "CheckedOut",
}

export interface Booking {
  id: number;
  roomId: number;
  guestId: number;
  checkInDate: string;
  checkOutDate: string;
  status: BookingStatus;
  room: {
    number: string;
    status: Status;
    type: {
      name: string;
      pricePerNight: number;
    };
  };
  guest: {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
  };
}

export interface CreateBooking {
  roomId: number;
  guestId: number;
  checkInDate: Date;
  checkOutDate: Date;
}

export interface UpdateBooking {
  roomId?: number;
  guestId?: number;
  checkInDate?: Date;
  checkOutDate?: Date;
}
//BOOKINGS END//
