import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {
  getOrCreateAssociatedTokenAccount,
  createInitializeMintInstruction,
  mintTo,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { SystemProgram, PublicKey, Keypair } from "@solana/web3.js";
import { EscrowAnchor } from "../target/types/escrow_anchor";

describe("escrow-anchor", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const program = anchor.workspace.EscrowAnchor as Program<EscrowAnchor>;

  const maker = provider.wallet as anchor.Wallet;
  let taker: Keypair;
  let mintA: PublicKey;
  let mintB: PublicKey;
  let makerAtaA: PublicKey;
  let takerAtaB: PublicKey;
  let escrowPda: PublicKey;
  let vaultAta: PublicKey;
  const seed = new anchor.BN(12345);

  before(async () => {
    taker = Keypair.generate();
    const sig = await provider.connection.requestAirdrop(
      taker.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(sig);

    mintA = await createMint(provider);
    mintB = await createMint(provider);

    makerAtaA = await getOrCreateATA(provider, mintA, maker.publicKey, 100);
    takerAtaB = await getOrCreateATA(provider, mintB, taker.publicKey, 100);
  });

  it("Initializes escrow", async () => {
    const [escrowPdaDerived, _bump] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("escrow"),
          maker.publicKey.toBuffer(),
          seed.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );
    escrowPda = escrowPdaDerived;

    vaultAta = getAssociatedTokenAddressSync(
      mintA,
      escrowPda,
      true,
      TOKEN_PROGRAM_ID
    );

    await program.methods
      .make(seed, new anchor.BN(1), new anchor.BN(1))
      .accounts({
        maker: maker.publicKey,
        mintA: mintA,
        mintB: mintB,
        makerAtaA: makerAtaA,
        escrow: escrowPda,
        vault: vaultAta,
        systemProgram: SystemProgram.programId,
        associatedTokenProgram: new PublicKey(
          "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        ),
        tokenProgram: TOKEN_PROGRAM_ID,
      } as any )
      .signers([maker.payer])
      .rpc();

    console.log("✅ Escrow initialized:", escrowPda.toBase58());
  });

  it("Taker takes the trade", async () => {
    const takerAtaA = (
      await getOrCreateAssociatedTokenAccount(
        provider.connection,
        taker,
        mintA,
        taker.publicKey
      )
    ).address;

    await program.methods
      .take()
      .accounts({
        taker: taker.publicKey,
        maker: maker.publicKey,
        mintA: mintA,
        mintB: mintB,
        takerAtaA: takerAtaA,
        takerAtaB: takerAtaB,
        escrow: escrowPda,
        vault: vaultAta,
        systemProgram: SystemProgram.programId,
        associatedTokenProgram: new PublicKey(
          "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        ),
        tokenProgram: TOKEN_PROGRAM_ID,
      } as any )
      .signers([taker])
      .rpc();

    console.log("✅ Escrow completed successfully");
  });
});

async function createMint(provider: anchor.AnchorProvider): Promise<PublicKey> {
  const mint = anchor.web3.Keypair.generate();
  const lamports = await provider.connection.getMinimumBalanceForRentExemption(
    MINT_SIZE
  );

  const tx = new anchor.web3.Transaction().add(
    anchor.web3.SystemProgram.createAccount({
      fromPubkey: provider.wallet.publicKey,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mint.publicKey,
      6,
      provider.wallet.publicKey, 
      null 
    )
  );

  await provider.sendAndConfirm(tx, [mint]);
  return mint.publicKey;
}

async function getOrCreateATA(
  provider: anchor.AnchorProvider,
  mint: PublicKey,
  owner: PublicKey,
  mintAmount: number
): Promise<PublicKey> {
  const ata = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    provider.wallet.payer,
    mint,
    owner,
    true
  );

  if (mintAmount > 0) {
    await mintTo(
      provider.connection,
      provider.wallet.payer,
      mint,
      ata.address,
      provider.wallet.publicKey,
      mintAmount
    );
  }

  return ata.address;
}
