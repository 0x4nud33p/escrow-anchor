use anchor_lang::prelude::*;
use crate::constants::VAULT;

#[derive(Accounts)]
pub struct VaultDeposit<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init_if_needed,
        seeds = [VAULT, signer.key().as_ref()],
        bump,
        payer = signer,
        space = 8,
    )]
    pub vault: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}
