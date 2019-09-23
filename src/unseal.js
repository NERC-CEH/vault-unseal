const axios = require('axios');

const { VAULT_KEYS, VAULT_ADDR } = process.env;
const KEYS_ARR = VAULT_KEYS.split(',');

function sealStatus() {
  return axios.get(`${VAULT_ADDR}/v1/sys/seal-status`)
    .then((res) => res.data.sealed);
}

function unsealVault(key) {
  return axios.post(`${VAULT_ADDR}/v1/sys/unseal`, { key });
}

sealStatus()
  .then((sealed) => {
    if (sealed) {
      console.log('Vault is sealed, unsealing...');
      KEYS_ARR.forEach(unsealVault);
    } else {
      console.log('Vault is currently unsealed');
    }
  })
  .catch((err) => console.log(`Error: ${err}. Cannot determine if Vault is sealed.`));
