import http from './request/index'

export const getTradeStrategyList = (data: object) => http.post('/trade-strategy/list?', data)

export const getAccountList = () => http.get('/trade-acct/list', {})

export const getOrderList = () => http.post(`/trade-order/list?page=0&size=1000`, {})

export const getCurrencyList = (id: string) => http.get(`/trade-strategy/SWAP/product?acctId=${id}`)

export const getAccountBalance = (id: string) => http.get(`/trade-acct/balance?acctId=${id}`)

export const createStrategy = (data: object) => http.post(`/trade-strategy`, data)

export const createInterval = (data: object) => http.post(`/trade-strategy/tradeInterval`, data)

export const getLeverageList = (id: string) => http.get(`/leverage?acctId=${id}`)

export const createLeverage = (data: object) => http.post(`/leverage`, data)
