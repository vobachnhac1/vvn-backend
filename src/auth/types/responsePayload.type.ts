export type ResponsePayLoad = {
  access_token: string;
  refresh_token: string;
  user: ProfileAccount
  
};

export type ProfileAccount ={
  user_name: string,
  user_id: string
}

export type ProfileAccountWithPermisstion = ProfileAccount & {roles: Array<Permisstion>};
 
export type Permisstion ={
  parent: string,
  child: Array<string>
}

