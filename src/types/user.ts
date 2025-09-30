export interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface UpdateUserData extends Partial<CreateUserData> {
  id?: never; // Prevent id from being passed in update data
}
