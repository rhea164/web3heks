use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

// Define the type of state stored in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct UserAccount {
    pub balance: u64,
}

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Web3Hecks program entrypoint");

    // Iterating accounts is safer than indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to modify balance
    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
        msg!("Account does not have the correct program id");
        return Err(solana_program::program_error::ProgramError::IncorrectProgramId.into());
    }

    // Deserialize the account data
    let mut user_account = UserAccount::try_from_slice(&account.data.borrow())?;

    // Determine the operation based on the instruction data
    match instruction_data[0] {
        0 => {
            // Add balance
            let amount = u64::from_le_bytes(instruction_data[1..9].try_into().unwrap());
            user_account.balance = user_account.balance.checked_add(amount).unwrap();
            msg!("Added {} to balance", amount);
        }
        1 => {
            // Subtract balance
            let amount = u64::from_le_bytes(instruction_data[1..9].try_into().unwrap());
            user_account.balance = user_account.balance.checked_sub(amount).unwrap();
            msg!("Subtracted {} from balance", amount);
        }
        _ => {
            msg!("Invalid instruction");
            return Err(solana_program::program_error::ProgramError::InvalidInstructionData.into());
        }
    }

    // Serialize the account data back into the account
    user_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

    Ok(())
}