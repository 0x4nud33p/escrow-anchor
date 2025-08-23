use anchor_lang::prelude::*;
use crate::constants::VAULT;

#[derive(Accounts)]
pub struct VaultWithdraw<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        mut,
        seeds = [VAULT, signer.key().as_ref()],
        bump,
    )]
    pub vault: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}
