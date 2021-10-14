interface IItemCreatePointRequestDTO {
  id: number;
  title: string,
  image: string;
}

interface ICreatePointResquestDTO {
  name: string;
  email: string;
  description: string;
  whatsapp: string;
  fone: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  address: string;
  district: string;
  number: number;
  image: string;
  cep: string;
  itens: IItemCreatePointRequestDTO[];
}

export { ICreatePointResquestDTO, IItemCreatePointRequestDTO }
