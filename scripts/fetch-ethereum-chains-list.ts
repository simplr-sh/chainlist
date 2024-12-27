async function fetchEthereumChainsList() {
  const response = await fetch('https://chainid.network/chains.json').then(
    (res) => res.json()
  )
  const chains = response.length
  console.log(chains)
}

async function fetchEthereumChainsMiniList() {
  const response = await fetch('https://chainid.network/chains_mini.json').then(
    (res) => res.json()
  )
  const chains = response.length
  console.log(chains)
}

fetchEthereumChainsList()
  .then(() => {})
  .catch(console.error)

fetchEthereumChainsMiniList()
  .then(() => {})
  .catch(console.error)
