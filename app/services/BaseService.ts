export interface FiliereDoc {
  id: string;
  filiere: string;
  description: string;
  bacc: string[];
  location: string;
  updated_at: Date;
  inscription_open: string;
  inscription_closed: string;
  fees: string;
  bank_account: string;
  bank_account_owner: string;
  admission: string;
  document: string;
  domaine: string;
}

export abstract class BaseService {
  name!: string;
  baseUrl!: string;
  searchUrl!: string;
  constructor() {}
  abstract async getAll(): Promise<FiliereDoc[]>;
}
