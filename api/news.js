import Request from '../plugins/request/js/index';
let res = Request();
export function newsList(form) {
        return res.request({
            url: '/news/news',
            method: 'GET',	
			params:form
        });
}