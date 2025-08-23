use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
use crate::context::deposit::*;
use crate::errors::VaultError;
use crate::constants::*;

pub fn handler(ctx: Context<VaultDeposit>, amount: u64) -> Result<()> {
    require_gt!(
        amount,
        Rent::get()?.minimum_balance(0),
        VaultError::InvalidAmount
    );

    transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.signer.to_account_info(),
                to: ctx.accounts.vault.to_account_info(),
            },
        ),
        amount,
    )?;

    Ok(())
}
