const axios = require('axios');
const convict = require('convict');

var config = convict({
  vaultAddr: {
    doc: 'Vault Address Location',
    format: 'String',
    default: 'http://vault-service',
    env: 'VAULT_ADDR'
  },
  vaultKeys: {
    doc: 'CSV of Vault Keys',
    format: 'String',
    env: 'VAULT_KEYS',
    default: null,
  }
})

const KEYS_ARR = config.get('vaultKeys').split(',');
const vaultAddress = config.get('vaultAddr');

function sealStatus() {
  return axios.get(`${vaultAddress}/v1/sys/seal-status`);
}

function unsealVault(key) {
  return axios.post(`${vaultAddress}/v1/sys/unseal`, { key });
}

async function unsealChecker() {
  try {
    const res = await sealStatus();
    const { sealed } = res.data;
    if (sealed) {
      console.log('Vault is currently sealed');
      KEYS_ARR.forEach(unsealVault);
    } else {
      console.log('Vault is currently unsealed');
    }
  } catch(err) {
    console.log(`Error: ${err}.`);
  }
}

unsealChecker();
