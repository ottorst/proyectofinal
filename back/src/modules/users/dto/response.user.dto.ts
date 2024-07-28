export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  country?: string;
  city?: string;
  createdAt: string;
  admin: boolean;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
