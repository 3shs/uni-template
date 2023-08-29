import http from './request/index'

export const getOrderList = () => http.post(`/trade-order/list?page=0&size=1000`, {})
