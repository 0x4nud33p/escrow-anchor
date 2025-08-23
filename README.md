#  Blueshift Anchor Vault

> A secure, decentralized Solana vault program using Anchor — enabling users to deposit and withdraw SOL using deterministic PDAs.

[![Solana](https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white)](https://solana.com/)
[![Anchor](https://img.shields.io/badge/Anchor-663399?style=for-the-badge&logo=anchor&logoColor=white)](https://www.anchor-lang.com/)
[![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<div align="center">
  <img src="./docs/architecture.png" alt="architecture" width="full">
</div>

## 🎯 Instructions

- ✅ **Initialize Vault:** Creates a PDA-based vault account bound to the user
- ✅ **Deposit SOL:** Sends lamports from the user to the vault with minimum validation
- ✅ **Withdraw SOL:** Recovers all lamports back to the user's wallet
- ✅ **Account Validation:** Uses Anchor's PDA and bump mechanics for security
- ✅ **Error Handling:** Custom error codes for better debugging

### 1️⃣ Clone & Install

```bash
# Clone the repository

git clone https://github.com/0x4nud33p/blueshift_anchor_vault.git

cd blueshift_anchor_vault

```
