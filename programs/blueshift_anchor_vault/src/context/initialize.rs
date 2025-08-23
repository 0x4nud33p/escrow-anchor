use anchor_lang::prelude::*;
use crate::state::vault::Vault;
use crate::constants::VAULT;

#[derive(Accounts)]
pub struct InitializeVault<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds = [VAULT, authority.key().as_ref()],
        bump,
        payer = authority,
        space = Vault::LEN,
    )]
    pub vault: Account<'info, Vault>,

    pub system_program: Program<'info, System>,
}
