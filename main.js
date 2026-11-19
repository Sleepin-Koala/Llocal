function encodeSecret(secret) {
    return bin2hex(strrev(base64_encode(secret)));
}

console.log(encodeSecret("test"))