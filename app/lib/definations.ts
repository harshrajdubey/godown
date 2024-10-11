'use server';

export type Admin = {
  username: string;
  email: string;
  password: string;
};

export type Godown = {
  id: string;
  name: string;
  parent_godown: string;
};

export type Items = {
  item_id: string;
  name: string;
  quantity: string;
  category: string;
  price: string;
  status: string;
  godown_id: string;
  brand: string;
  attribute: string;
  image_url: string;
};
