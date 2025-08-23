use anchor_lang::prelude::*;

#[account]
pub struct Vault {
    pub owner: Pubkey,
    pub bump: u8,
    pub amount: u64,
}

impl Vault {
    pub const LEN: usize = 8 + 32 + 1 + 8;
}
