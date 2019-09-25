# Vault Unseal

This is a minimal container to unseal a Vault given a URL & unseal keys. It should be
deployed securely so as not to expose the unseal keys.

```
docker run -d -e VAULT_ADDR="" -e VAULT_KEYS="" nerc/vault-unseal
```
