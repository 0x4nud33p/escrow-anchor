import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BlueshiftAnchorVault } from "../target/types/blueshift_anchor_vault";
import { SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

describe("blueshift_anchor_vault", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace
    .blueshiftAnchorVault as Program<BlueshiftAnchorVault>;

  const signer = provider.wallet;
  let vaultPda: anchor.web3.PublicKey;
  let vaultBump: number;

  const VAULT_SEED = Buffer.from("vault");

  before(async () => {
    // Derive PDA
    [vaultPda, vaultBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [VAULT_SEED, signer.publicKey.toBuffer()],
      program.programId
    );

    // Airdrop some SOL for gas + deposit
    const tx = await provider.connection.requestAirdrop(
      signer.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(tx);
  });

  it("Initializes the vault account", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        authority: signer.publicKey,
        vault: vaultPda,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("Initialize tx:", tx);
  });

  it("Deposits 0.1 SOL into the vault", async () => {
    const depositAmount = 0.1 * LAMPORTS_PER_SOL;

    const tx = await program.methods
      .deposit(new anchor.BN(depositAmount))
      .accounts({
        signer: signer.publicKey,
        vault: vaultPda,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("Deposit tx:", tx);

    const vaultBalance = await provider.connection.getBalance(vaultPda);
    console.log("Vault balance:", vaultBalance / LAMPORTS_PER_SOL, "SOL");
  });

  it("Withdraws from the vault", async () => {
    const beforeBalance = await provider.connection.getBalance(
      signer.publicKey
    );

    const tx = await program.methods
      .withdraw()
      .accounts({
        signer: signer.publicKey,
        vault: vaultPda,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("Withdraw tx:", tx);

    const afterBalance = await provider.connection.getBalance(signer.publicKey);
    const vaultBalance = await provider.connection.getBalance(vaultPda);

    console.log(
      "Vault balance after withdraw:",
      vaultBalance / LAMPORTS_PER_SOL,
      "SOL"
    );
    console.log(
      "Signer balance diff:",
      (afterBalance - beforeBalance) / LAMPORTS_PER_SOL,
      "SOL"
    );
  });
});
