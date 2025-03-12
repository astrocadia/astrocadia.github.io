export interface SuccessResponse {
  response: 'success';
}

export interface OkResponse {
  response: 'OK';
}

export type ErrorResultDataResponse = { response?: string };
