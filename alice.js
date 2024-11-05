const crypto = require("crypto");

const alicePrivateKeyString = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBGHtadUEFzB23
q8HGXVouI6urZagnxHppsNZxjQ4hCfcUqSCRxkTr34kqJhfQ7SU6OQ99qunK1p58
QY0+EZX/IzOAGqlu9tXfmzyDdlFjsrdVTFei8i6kSl2T+VaWLS92KJmhR1hpQxKg
I3o//SzBFyJiqLD6CQzFRVd2AxOjfo1APfv7OACy2zkt35c7JTNh9YEOl4Tweot+
M2M0Dxl66S4HsBQGtRQ3bV/sunHtXEUJAUdw/LfvwwrknrANbf7xXptsCvSovV4u
xomvoUzArJPMvZabmFcE4ZXA6s2/xVN1CcOrt5QmNDt7vV/ySKSQ68bolPehspK3
AF7Fwl4XAgMBAAECggEAJIoO8ZellcTBzNtWIETTB08dsaHbd6cA6RYbBkLEbTEX
DdRRQvSLXz0eFhk+QX1WoZVhnoykkAsb03SOFzQ5t52AJdolvMc9woH8Kf5OOXj8
o0n+fWmptNITsigpH+LuC8R0CeZXzxdvo1kDTa+JdAJ+McAtOStUPNI50i2T3kiE
kqtsqcOXwqBIIOhgLvpUPXLOxsv3Nq3NzJHdqEqHEELukfuJ0EOb59kPtsIN3KB+
SNq16GiFpc++1U7C9eUqTjXmKZwqkW3q7BTvlcs7lBqvU9VS66jHJTAesazMrf5y
Lf0xAOaiGRuW+ykdAAaXeznXIb2ZXPLNVSFZyTFjgQKBgQDo6HLfk8GELMiRMI80
90PHVTY94ZQDiOKp1XlWNFrtMxylqZpx2ibFqcjCDtKdVTZxr61SMnlziSyYk6MJ
5xh8XnioPCp1WncFp1lV+L0d4QHqCMHU46rojfNi+DTfLprrbqnS5ApsdAMk53gq
wY5DtnaMsRbYD4VSc3bhABctlwKBgQDUPYk2c4iUR2agFFc+4vvPKOm9iHdM4Fzi
nHt1IKVK6ICPktWn4CDF+3kXICRx9b6dNNTy1jzf4ny2ZQ5YgmsZH5Li8Oj3qSzQ
XBR0rBFp74u1/FMPQ1LCkuVTECUN6s3HdRA6ozVTDQ6PvxdzMrKQn84zQi5JIk+N
p5FRDIVjgQKBgQC5/X5WeljL4zNbdkq2Aks28B47tlsLo5FWDGoz4+VEjE9xH4p9
JrdVm6r9BPc9uuGaUa739+Sy1bUuNp+49bnA/3Qc7Mb/JfnsIuKdW+Ax7xAnQ0z+
Y7yEr27P9uPJ4h7GqX2mMoL8bnxgSRPWGPExs5Dh8z0J1wMhf6FMNlVMCwKBgEXA
G3H7si0Y8g814B5Ytmy0g2y4hoyLR7tpteEeY3QkyOtmVDUhoWOva3JAK/oPyx8b
F8jew47IfjfrKjXIVq4hBEL07XtG6+Vl/YsCaY6pHP8n95wSggZUBG2x5puWSR59
yGGc9Y9fwSNYp7pCNRD2k+ugmlmKnx5srYM3XDcBAoGBAOIhvQJq2tVhXGhOyj0H
oQvW2BhCeKTwx/Ies4KP275GBhJPPne4TycKB9wKOG3hKavRfycCcen2RseEFUJR
+7r/wAyd9HGlyXKc2PVYSwTLSuNKOu4dZisFWAET4oVpw4wmQPHnUUGs6HDBvAV4
ULqLlxsAYf3767eyVT0SEfBt
-----END PRIVATE KEY-----`;
const alicePublicKeyString = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwRh7WnVBBcwdt6vBxl1a
LiOrq2WoJ8R6abDWcY0OIQn3FKkgkcZE69+JKiYX0O0lOjkPfarpytaefEGNPhGV
/yMzgBqpbvbV35s8g3ZRY7K3VUxXovIupEpdk/lWli0vdiiZoUdYaUMSoCN6P/0s
wRciYqiw+gkMxUVXdgMTo36NQD37+zgAsts5Ld+XOyUzYfWBDpeE8HqLfjNjNA8Z
eukuB7AUBrUUN21f7Lpx7VxFCQFHcPy378MK5J6wDW3+8V6bbAr0qL1eLsaJr6FM
wKyTzL2Wm5hXBOGVwOrNv8VTdQnDq7eUJjQ7e71f8kikkOvG6JT3obKStwBexcJe
FwIDAQAB
-----END PUBLIC KEY-----`;
const bobPublicKeyString = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5RAmoM9BqGFA3MrL0JFc
ThnquG/kWZhnMpnpRs+kM9aY5pjwC0Lyc74bh4LJrVEwgvxG6HSoWgtZGxZ+Q5UV
gzyNb5Ewdhe9yVsGvUZXDu/23QrfsbKNgmK2diMfBCeK6ylDknyYTHRsOSvFcUal
n5PgrxJw6fb5tKBD0rD5Uag7ZrW+Xv6cEXGIaMzP1g9G822kAABoeNBPG3tvqog2
+rXSo8I6EIbw05cdz08OyH2l83f8nASuCOpEA/xSYkn6MTGIihsRgb95silHXuGw
jyOL5Pon1nQ1w3MkozcbMpIdJPdYNOJxCx4yq4t+y1X4WO+KKl7y4Ar8j3dCui45
fQIDAQAB
-----END PUBLIC KEY-----`;

const alicePrivateKey = crypto.createPrivateKey(alicePrivateKeyString);
const bobPublicKey = crypto.createPublicKey(bobPublicKeyString);
const alicePublicKey = crypto.createPublicKey(alicePublicKeyString);

const message = "I want some apples";
console.log("Message:", message);

const data = Buffer.from(message);
const signature = crypto.sign("sha256", data, alicePrivateKey);
console.log("Signature:", signature.toString("hex"));

const ciphertext = crypto.publicEncrypt(bobPublicKey, data);
console.log("Ciphertext:", ciphertext.toString("hex"));






