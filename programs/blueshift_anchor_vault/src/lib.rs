use anchor_lang::prelude::*;

declare_id!("9Ba9JNgP5KHHTk24jdsqDo8pcLsrSdskZRirfWP9SjWe");

#[program]
pub mod blueshift_anchor_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
