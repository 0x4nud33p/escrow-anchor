pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("Fo8SYMPxsWQSTLu74N7cQj1VhscVWNjXHtAB48JutCx8");

#[program]
pub mod escrow_anchor {
    use super::*;

    pub fn make(
        ctx: Context<Make>,
        seed: u64,
        deposit_amount: u64,
        receive_amount: u64,
    ) -> Result<()> {
        Ok(())
    }
}
