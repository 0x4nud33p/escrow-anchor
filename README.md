# Escrow

A Solana smart contract built using [Anchor](https://book.anchor-lang.com) that enables **trustless token escrow** between two parties a *maker* and a *taker*. 

## install dependencies

```bash
yarn install
```

## build the program

```bash
anchor build
``` 
## deploy the program

```bash
anchor deploy
``` 
## run tests

```bash
anchor test
```

expected test output! 

```bash
  escrow-anchor
✅ Escrow initialized: 25jsQmHNt1BgWXFs4vkWhaaaF8bkQTgCfsdRAYMqHvoc
    ✔ Initializes escrow (412ms)
✅ Escrow completed successfully
    ✔ Taker takes the trade (822ms)


  2 passing (4s)

Done in 27.50s.
```
