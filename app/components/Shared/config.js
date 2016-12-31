"use strict";

module.exports = function ($http) {
    var service = {};
    service.apiBase = 'http://localhost:8080/'; // API base URL path
    service.userData = {};
    service.encData = {
		"keySize": 128,
		"iterationCount": 100,
		"passPhrase": "fgfdgdsg$"
	};

	// var aesUtil = new AesUtil(service.encData.keySize, service.encData.iterationCount);

	// service.encryptText = function (plainText) {
	//     var iv = "00000";
	//     var salt = "00000";
	//     var encrypt = aesUtil.encrypt(salt, iv, service.encData.passPhrase, plainText);
	//     return encrypt;
	// }

	// service.decryptText = function (encryptedText) {
	//     var iv = "00000";
	//     var salt = "00000";
	//     var decryptedText = aesUtil.decrypt(salt, iv, service.encData.passPhrase, encryptedText);
	//     return decryptedText;
	// }
    return service;
};