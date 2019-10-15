import Request from '../plugins/request/js/index';
let res = Request();
export function allPoints() {
        return res.request({
            url: '/poi/shipPoint/sumByToken',
            method: 'GET'
        });
}