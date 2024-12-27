import type { ChainList } from '@/types/chain'
import { $ } from 'bun'

async function main() {
  await $`echo "Cloning chains repo"`
  const output =
    await $`git clone --no-checkout --depth=1 https://github.com/ethereum-lists/chains.git`.text()
  console.log(output)
  await $`echo "Cloned chains repo"`
  await $`echo "Downloading chains repo _data folder contents"`
  await $`cd chains && git checkout master -- _data && rm -rf .git`
  await $`echo "Downloaded chains repo _data folder contents"`
  await $`echo "Deleted .git folder"`

  const text = await $`cd ./chains && ls`.text()
  console.log('Chains repo listing', text)

  const chains = await fetch('https://chainid.network/chains.json').then(
    (res) => res.json() as Promise<ChainList>
  )

  const updatedChainList: ChainList = []

  for (const chain of chains) {
    if (chain.icon) {
      const file = Bun.file(`./chains/_data/icons/${chain.icon}.json`)
      if (await file.exists()) {
        const icon = (await file.json()) as [{ url: string }]
        const iconCID = icon[0].url.replace('ipfs://', '')
        const iconFile = Bun.file(`./chains/_data/iconsDownload/${iconCID}`)
        if (!(await iconFile.exists())) {
          chain.icon = `https://gateway.pinata.cloud/ipfs/${iconCID}`
        } else {
          chain.icon = `https://cdn.jsdelivr.net/gh/ethereum-lists/chains@master/_data/iconsDownload/${iconCID}`
        }
      }
    }

    if (!chain.explorers?.length) continue

    for (const explorer of chain.explorers) {
      if (explorer.icon) {
        const file = Bun.file(`./chains/_data/icons/${explorer.icon}.json`)
        if (await file.exists()) {
          const icon = (await file.json()) as [{ url: string }]
          const iconCID = icon[0].url.replace('ipfs://', '')
          const iconFile = Bun.file(`./chains/_data/iconsDownload/${iconCID}`)
          if (!(await iconFile.exists())) {
            explorer.icon = `https://gateway.pinata.cloud/ipfs/${iconCID}`
          } else {
            explorer.icon = `https://cdn.jsdelivr.net/gh/ethereum-lists/chains@master/_data/iconsDownload/${iconCID}`
          }
        }
      }
    }

    updatedChainList.push(chain)
  }

  await Bun.write(
    './src/data/chains.json',
    JSON.stringify(updatedChainList, null, 2)
  )

  await $`echo "Deleting cloned chains repo"`
  await $`rm -rf chains`
  await $`echo "Deleted cloned chains repo"`
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
