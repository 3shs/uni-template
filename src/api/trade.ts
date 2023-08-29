import http from './request/index'

export const getTradeStrategyList = () => http.post('/trade-strategy/list', {})
