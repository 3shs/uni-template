import http from './request/index'

export const getTradeStrategyList = (data: object) => http.post('/api/trade-strategy/list?', data)

export const getAccountList = () => http.get('/api/trade-acct/list', {})

export const getOrderList = () => http.post(`/api/trade-order/list?page=0&size=1000`, {})

export const getCurrencyList = (id: string) => http.get(`/api/trade-strategy/SWAP/product?acctId=${id}`)

export const getAccountBalance = (id: string) => http.get(`/api/trade-acct/balance?acctId=${id}`)

export const createStrategy = (data: object) => http.post(`/api/trade-strategy`, data)

export const createInterval = (data: object) => http.post(`/api/trade-strategy/tradeInterval`, data)

export const getLeverageList = (id: string) => http.get(`/api/leverage?acctId=${id}`)

export const createLeverage = (data: object) => http.post(`/api/leverage`, data)

export const scLogin = (code: string) => http.post(`/login?code=${code}`)

export const deleteStrategy = (id: string) => http.delete(`/api/trade-strategy/${id}`)

export const getCapital = () => http.get(`/api/trade-acct/all/balance`)
