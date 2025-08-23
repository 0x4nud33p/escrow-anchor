use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
use crate::context::withdraw::*;
use crate::constants::*;
use crate::errors::VaultError;

pub fn handler(ctx: Context<VaultWithdraw>) -> Result<()> {
    let vault_lamports = ctx.accounts.vault.lamports();
    require_neq!(vault_lamports, 0, VaultError::InvalidAmount);

    let signer_key = ctx.accounts.signer.key();
    let signer_seeds = &[VAULT, signer_key.as_ref(), &[ctx.bumps.vault]];

    transfer(
        CpiContext::new_with_signer(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.vault.to_account_info(),
                to: ctx.accounts.signer.to_account_info(),
            },
            &[signer_seeds],
        ),
        vault_lamports,
    )?;

    Ok(())
}
