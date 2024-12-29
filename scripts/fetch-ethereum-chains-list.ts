async function fetchEthereumChainsList() {
  const response = await fetch('https://chainid.network/chains.json').then(
    (res) => res.json()
  )
  const chains = response
  console.log(chains.length)
  Bun.write('./src/data/chainlist.json', JSON.stringify(response, null, 2))
}

async function fetchEthereumChainsMiniList() {
  const response = await fetch('https://chainid.network/chains_mini.json').then(
    (res) => res.json()
  )
  const chains = response
  console.log(chains.length)
  Bun.write('./src/data/chainlist_mini.json', JSON.stringify(response, null, 2))
}

fetchEthereumChainsList()
  .then(() => {})
  .catch(console.error)

fetchEthereumChainsMiniList()
  .then(() => {})
  .catch(console.error)
