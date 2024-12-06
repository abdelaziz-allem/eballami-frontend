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
  status: RoomStatus;
  createdAt: string;
  updatedAt: string;
  type: {
    id: number;
    name: string;
    pricePerNight: string;
  };
}

export interface CreateRoom {
  number: string;
  typeId: number;
}

export interface UpdateRoom {
  number?: string;
  typeId?: number;
  status?: RoomStatus;
}

export enum RoomStatus {
  OCCUPIED = "Occupied",
  AVAILABLE = "Available",
  MAINTENANCE = "Maintenance",
}

//ROOM END//

//RATES START//

export interface Rate {
  id: number;
  bookingId: number;
  startDate: string;
  endDate?: string;
  amount: string;
}

export interface CreateRate {
  bookingId: number;
  startDate: Date;
  endDate?: Date;
  amount: string;
}

export interface UpdateRate {
  bookingId?: number;
  startDate?: Date;
  endDate?: Date;
  amount?: string;
}
//RATES END//

//USER START//

export enum ROLE {
  ADMIN = "Admin",
  RECEPTION = "Reception",
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

//PAYMENTS START//

export interface MonthlyPayments {
  month: string;
  total: string;
}

export enum PaymentMethod {
  CASH = "Cash",
  BANK = "Bank",
  ZAAD = "Zaad",
  EDAHAB = "Edahab",
}

export interface Payment {
  id: number;
  bookingId: number;
  amount: string;
  method: PaymentMethod;
  createdAt: string;
  updatedAt: string;
  booking: Booking;
  user: User;
}

export interface CreatePayment {
  bookingId: number;
  userId: number;
  amount: string;
  method: string;
}

export interface UpdatePayment {
  bookingId?: number;
  userId: number;
  amount?: string;
  method?: string;
}
//PAYMENTS END//

//BOOKINGS START//

export enum BookingStatus {
  CHECKED_IN = "CheckedIn",
  CHECKED_OUT = "CheckedOut",
  BOOKED = "Booked",
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
    status: RoomStatus;
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
  status?: BookingStatus;
}
//BOOKINGS END//

// HousekeepingTask Start //

export enum TaskStatus {
  PENDING = "Pending",
  DONE = "Done",
  CANCELLED = "Cancelled",
}

export interface HousekeepingTask {
  id: number;
  roomId: number;
  description: string;
  assignedById: number;
  assignedToId: number;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  assignedBy: {
    id: number;
    name: string;
    mobileNumber: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  assignedTo: {
    id: number;
    name: string;
    mobileNumber: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  room: {
    id: number;
    number: string;
    typeId: number;
    status: RoomStatus;
    createdAt: string;
    updatedAt: string;
    type: {
      id: number;
      name: string;
      pricePerNight: string;
    };
  };
}

export interface CreateHousekeepingTask {
  roomId: number;
  description: string;
  assignedById: number;
  assignedToId: number;
}

export interface UpdateHousekeepingTask {
  roomId?: number;
  description?: string;
  assignedById?: number;
  assignedToId?: number;
  status?: TaskStatus;
}

//HousekeepingTask End//

//Expenses Start //

export interface MonthlyExpenses {
  month: string;
  total: string;
}

export enum ExpenseCategory {
  INVENTORY = "Inventory",
  MAINTENANCE = "Maintenance",
  UTILITIES = "Utilities",
  SALARY = "Salary",
  MARKETING = "Marketing",
  MISCELLANEOUS = "Miscellaneous",
  FURNITURE = "Furniture",
  HOUSEKEEPING = "Housekeeping",
  LEGAL = "Legal",
  TRAINING = "Training",
  SUBSCRIPTIONS = "Subscriptions",
  SECURITY = "Security",
  TAXES = "Taxes",
  INSURANCE = "Insurance",
  TECHNOLOGY = "Technology",
  RENOVATION = "Renovation",
  TRAVEL = "Travel",
}

export interface Expense {
  id: number;
  userId: number;
  description: string;
  amount: string;
  category: ExpenseCategory;
  method: PaymentMethod;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface CreateExpense {
  userId: number;
  description: string;
  category: string;
  amount: string;
  method: string;
}

export interface UpdateExpense {
  userId: number;
  description?: string;
  category?: string;
  amount?: string;
  method?: string;
}

//Expenses End//
