function http(method, reqParams, url, params) {
	urlParams = '';
	for(key in params) {
		urlParams += key + '=' + encodeURIComponent(params[key]) + '&';
	}
	
	urlParams = urlParams.split('');
	urlParams.pop();
	urlParams = urlParams.join('');

	if(reqParams) {
		if(urlParams != '')
			url = url + '?' + urlParams;
		
		urlParams = null;
	}

	return new Promise(function(resolve, rehject) {
		$.when($.ajax({
			url: url,
			dataType: 'json',
			type: method,
			data: urlParams
		})).then(resolve);
		resolve('[]');
	});
}