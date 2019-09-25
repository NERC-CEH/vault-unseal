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

async function sealStatus() {
  const response = await axios.get(`${vaultAddress}/v1/sys/seal-status`);
  return response.data;
}

function unsealVault(key) {
  return axios.post(`${vaultAddress}/v1/sys/unseal`, { key });
}

async function unsealChecker() {
  try {
    const { sealed } = await sealStatus();
    if (sealed) {
      console.log('Vault is currently sealed');
      const unsealPromises = KEYS_ARR.map(unsealVault);
      await Promise.all(unsealPromises);
    } else {
      console.log('Vault is currently unsealed');
    }
  } catch(err) {
    console.log(`Error: ${err}.`);
  }
}

unsealChecker();
