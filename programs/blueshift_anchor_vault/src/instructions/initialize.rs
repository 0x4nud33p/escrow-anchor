use anchor_lang::prelude::*;
use crate::context::initialize::*;
use crate::state::vault::Vault;

pub fn handler(ctx: Context<InitializeVault>) -> Result<()> {
    let vault = &mut ctx.accounts.vault;

    vault.owner = ctx.accounts.authority.key();
    vault.bump = *ctx.bumps.get("vault").unwrap();
    vault.amount = 0;

    Ok(())
}
