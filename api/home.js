import Request from '../plugins/request/js/index';
let res = Request();

// 水位信息
export function hydrology(province, city, pageNum, pageSize) {
	return res.request({
		url: '/environment/hydrology',
		method: 'GET',
		params: {
			province: province,
			city: city,
			pageNum: pageNum,
			pageSize: pageSize
		}
	});
}

// 水位信息
export function findByCity(province, city) {
	return res.request({
		url: '/environment/hydrology/findByCity',
		method: 'GET',
		params: {
			province: province,
			city: city
		}
	});
}

// 船舶列表
export function selectByToken(tags) {
	return res.request({
		url: '/member/memShip/selectByToken',
		method: 'GET',
		params: {
			tags: tags
		}
	});
}

// 船舶信息
export function shipInfo(cbsbh) {
	return res.request({
		url: '/collaboration/shipExtend/findByCbsbh',
		method: 'GET',
		params: {
			cbsbh
		}
	});
}
// 船舶信息
export function certificate(cbdjh) {
	return res.request({
		url: '/collaboration/certificateAllExtend/list',
		method: 'GET',
		params: {
			cbdjh
		}
	});
}

// 感知
export function latestPosByShipName(dataType, shipName) {
  return res.request({
    url: '/gps/position/latestPosByShipName',
    method: 'GET',
    params: {
      dataType,
      shipName
    }
  })
}

// 违章
export function violation(pageNum, pageSize, shipName) {
  return res.request({
    url: '/collaboration/violation',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      shipName
    }
  })
}

// 绑定船舶
export function submitAuthen(shipName,cbdjh,certificateImg,insuranceImg) {
  return res.request({
    url: '/member/memShip/submitAuthen',
    method: 'POST',
    params: {
      shipName,
      cbdjh,
      certificateImg,
      insuranceImg
    }
  })
}

// 解绑船舶
export function removeShip(id) {
  return res.request({
    url: '/member/memShip/remove',
    method: 'PUT',
    params: {
      id
    }
  })
}

