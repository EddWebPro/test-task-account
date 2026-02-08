export interface Tag {
  text: string;
}

export type AccountType = "LDAP" | "Локальная";

export interface Account {
  id: string;
  label: string;
  tags: Tag[];
  type: AccountType;
  login: string;
  password: string | null;
}

export interface AccountFormData {
  id: string;
  label: string;
  type: AccountType;
  login: string;
  password: string | null;
}
