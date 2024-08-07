export interface Booking {
    TransactionNumber: string;
    Quantity: number;
    Paid: number;
    Date: string;
    userId: number;
    eventsId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    user: {
      id: number;
      email: string;
      name: string;
      phone: string;
      birthday: string;
      allergies: string | null;
      address: string;
      city: string;
      country: string;
    };
  }