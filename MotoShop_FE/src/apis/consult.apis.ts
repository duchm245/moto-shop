import httpRequest from '~/constants/httpRequest';

export interface ConsultRequestPayload {
  fullName: string;
  phone: string;
  email?: string;
  note?: string;
  productId?: number;
  productName?: string;
}

const consultApi = {
  create: (data: ConsultRequestPayload) =>
    httpRequest.post('/api/consult', data),
};

export default consultApi;
