import { get } from '../helpers';

export const defaultDateFilter = {
  from: moment().subtract(1,'months').format('YYYY-MM-DD'),
  to: moment().format('YYYY-MM-DD')
}

export const stateMixins = {
  paginatedData: [],
  allData: [],
  total: 0,
  name: null,
  perPage: 25,
  accessToken: get('access_token') || null,
  permissions: [],
  role: null,
  user: {},
}
