import http from './request/index'

export const getList = () => http.get('/dtp-park/back/project/recommend/queryPage')