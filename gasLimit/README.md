# gasLimit

CELO's gas limit was stored in state and not part of the block header untill
the gingerbread fork. Since it was stored in state only archive nodes could
check historical gasLimit values.

This scripts purpose was to help determine what were the historical gas limit values for CELO.

This script queries all gas limit change events and then queries a range of
blocks surrounding each event block to find the point at which gas limits
changed. Notably gasLimit changes in general take effect in the block after an
event was emitted (because the EVM needs to know the gas limit before starting
block execution so it cannot be changed mid block). However CELO initially
launched without a deployment of the blockchian parameters contract (where the
gas limit is stored) meaning that up untill it's deployment there was no state
for gas limit, during this time all networks used a hardcoded value of 20M.
Also the first event to be emitted during blockchain parameters initialisation
happened before the blockchain parameters contract had been added to the
registry, meaing that although the state existed for the gas limit it was not
accessible by the node yet, so the initially set gas limits take effect only
after the blockchain parameters proxy has been added to the registry which is 2
blocks after the event.

# Setup

`npm install`

# Running

In order to run this script you will need a connnection to an archive node, it
is assumed the node is available on localhost:8545, you will also need to
manually comment/uncomment the correct `blockchainParametersProxy` for the
network you are targetting. Also querying mainnet for all events in one go does
not seem to work, I needed to query in chunks that got smaller as the block
numbers increased (probably due to fuller blocks).

To run the script use: `node index.js`
