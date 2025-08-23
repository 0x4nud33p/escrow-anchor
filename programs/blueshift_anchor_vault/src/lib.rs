use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod context;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("9Ba9JNgP5KHHTk24jdsqDo8pcLsrSdskZRirfWP9SjWe");

#[program]
pub mod blueshift_anchor_vault {
    use super::*;

    pub fn initialize(ctx: Context<context::initialize::InitializeVault>) -> Result<()> {
        initialize::handler(ctx)
    }

    pub fn deposit(ctx: Context<context::deposit::VaultDeposit>, amount: u64) -> Result<()> {
        deposit::handler(ctx, amount)
    }

    pub fn withdraw(ctx: Context<context::withdraw::VaultWithdraw>) -> Result<()> {
        withdraw::handler(ctx)
    }
}
