import http from './request/index'

export const getTradeStrategyList = () => http.post('/trade-strategy/list', {})

export const getOrderList = () => http.post(`/trade-order/list?page=0&size=1000`, {})
