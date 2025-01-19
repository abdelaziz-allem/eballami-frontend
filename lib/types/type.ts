//AuthType START//
export interface AuthType {
  email: string;
  password: string;
}
//AuthType END//

//USER START//

export enum ROLE {
  ADMIN = "Admin",
  OWNER = "Owner",
  USER = "User",
}

export interface User {
  id: number;
  name: string;
  email?: string;
  password: string;
  profilePicture?: string;
  role: ROLE;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUser {
  name: string;
  email?: string;
  profilePicture?: string;
  role: string;
  password?: string;
  authProvider?: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  role?: string;
  profilePicture?: string;
  password?: string;
  authProvider?: string;
}

//USER END//

//BOOKINGS START//

export enum BookingStatus {
  BOOKED = "Booked",
  RESCHEDULED = "Rescheduled",
  CANCELLED = "Cancelled",
}

export interface Booking {
  id: number;
  userId: number;
  facilityId: number;
  bookedAt: string;
  createdAt: string;
  status: BookingStatus;
  user: User;
}

export interface CreateBooking {
  facilityId: number;
  bookedAt: Date;
}

export interface UpdateBooking {
  userId?: number;
  facilityId: number;
  bookedAt?: Date;
  status?: BookingStatus;
}
//BOOKINGS END//

//Facility Start//

export enum FacilityType {
  STADIUM = "Stadium",
  HOSPITAL = "Hospital",
  UNIVERSITY = "University",
  HOTEL = "Hotel",
  TRANSIT = "Transit",
}

export interface Facility {
  id: number;
  name: string;
  mobileNumber: string;
  email?: string;
  description: string;
  averageRating?: number;
  logo?: string;
  address: string;
  map?: string;
  type: FacilityType;
  openHour: string;
  closeHour: string;
  price: number;
  gallery: Gallery[];
  perks: FacilityPerk[];
  users: UserFacility[];
  rates: any[];
  createdAt: Date;
}

export interface CreateFacility {
  name: string;
  description: string;
  mobileNumber: string;
  email?: string;
  logo?: string;
  address: string;
  map?: string;
  type: FacilityType;
  openHour?: string;
  closeHour?: string;
  price?: number;
}

export interface UpdateFacility {
  name?: string;
  mobileNumber?: string;
  email?: string;
  description?: string;
  logo?: string;
  address?: string;
  map?: string;
  type?: FacilityType;
  openHour?: string;
  closeHour?: string;
  price?: number;
}
//Facilitys End//

//UserFacility Start//
export interface UserFacility {
  id: number;
  userId: number;
  facilityId: number;
  user: User;
  facility: Facility;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserFacility {
  userId: number;
  facilityId: number;
}

export interface UpdateUserFacility {
  userId?: number;
  facilityId?: number;
}
//UserFacility End//

//Gallerys Start//
export interface Gallery {
  id: number;
  facilityId: number;
  imageUrl: string;
  createdAt: Date;
}

export interface CreateGallery {
  facilityId: number;
  imageUrl: string;
}

export interface UpdateGallery {
  facilityId: number;
  imageUrl?: string;
}
//Gallerys End//

//Perks Start//
export interface Perk {
  id: number;
  name: string;
  type: FacilityType;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePerk {
  name: string;
  type: FacilityType;
}

export interface UpdatePerk {
  name?: string;
  type?: FacilityType;
}
//Perks End//

//FacilityPerks Start//
export interface FacilityPerk {
  id: number;
  facilityId: number;
  perkId: number;
  perk: Perk;
  facility: Facility;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFacilityPerk {
  facilityId: number;
  perkId: number;
}

export interface UpdateFacilityPerk {
  facilityId?: number;
  perkId?: number;
}
//FacilityPerks End//
