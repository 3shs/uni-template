import http from './request/index'

export const getTradeStrategyList = (data: object) => http.post('/api/trade-strategy/list?', data)

export const getAccountList = () => http.get('/api/trade-acct/list', {})

export const getOrderList = (page: number, size: number) => http.post(`/api/trade-order/list?page=${page}&size=${size}`, {})

export const getCurrencyList = (id: string) => http.get(`/api/trade-strategy/SWAP/product?acctId=${id}`)

export const getAccountBalance = (id: string, instId: string = 'USDT') => http.get(`/api/trade-acct/balance?acctId=${id}&instId=${instId}`)

export const createStrategy = (data: object) => http.post(`/api/trade-strategy`, data)

export const createInterval = (data: object) => http.post(`/api/trade-strategy/tradeInterval`, data)

export const getLeverageList = (id: string) => http.get(`/api/leverage?acctId=${id}`)

export const createLeverage = (data: object) => http.post(`/api/leverage`, data)

export const updateLeverage = (data: object) => http.post(`/api/leverage/update`, data)

export const scLogin = (code: string) => http.post(`/login?code=${code}`)

export const deleteStrategy = (id: string) => http.delete(`/api/trade-strategy/${id}`)

export const getCapital = () => http.get(`/api/trade-acct/all/balance`)

export const closePosition = (id: number | null) => http.post(`/api/trade-order/closePosition${id ? `?acctId=${id}` : ''}`)

export const pullTheBrake = () => http.post(`/api/trade-order/pullSwitch`)

export const getOrderDetail = (id: string) => http.get(`/api/trade-order/${id}/detail`)

export const getProduct = (acctId: string, instId: string) => http.get(`/api/trade-strategy/opt/product?acctId=${acctId}&instId=${instId}`)

