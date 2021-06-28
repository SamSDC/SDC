import http from 'k6/http'
import {sleep, check} from 'k6'

export default (() => {
  let res = http.get('/api/qa/questions?product_id=100')
    check(res, {
        'status is 200' : (r) => r.status >= 200 && r.status <= 204,
        'less than 2000ms' : (r) => r.timings.duration < 2000,
        'less than 1000ms' : (r) => r.timings.duration < 1000,
    })
    sleep(1)
})