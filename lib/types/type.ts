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
