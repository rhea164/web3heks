import { Connection, PublicKey, Transaction, SystemProgram, Keypair, TransactionInstruction } from '@solana/web3.js';
import { Buffer } from 'buffer';
const PROGRAM_ID = new PublicKey('2uFKTiQq5ZBvpq4GFB13YyBgyLxReVsTqCK8uErHJvmC');
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// In a real app, you'd use a wallet provider. For this example, we'll generate a new keypair.
const userKeypair = Keypair.generate();

export const requestAirdrop = async () => {
  const airdropSignature = await connection.requestAirdrop(
    userKeypair.publicKey,
    1000000000 // 1 SOL in lamports
  );
  await connection.confirmTransaction(airdropSignature);
};

export const getBalance = async () => {
  return await connection.getBalance(userKeypair.publicKey);
};

export const createUserAccount = async () => {
  const transaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: userKeypair.publicKey,
      newAccountPubkey: userKeypair.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(8),
      space: 8,
      programId: PROGRAM_ID,
    })
  );

  await sendAndConfirmTransaction(transaction);
};

export const rewardGoodDeed = async (amount) => {
  const instruction = new TransactionInstruction({
    keys: [{ pubkey: userKeypair.publicKey, isSigner: true, isWritable: true }],
    programId: PROGRAM_ID,
    data: Buffer.from([0, ...new Uint8Array(new Float64Array([amount]).buffer)])
  });

  const transaction = new Transaction().add(instruction);
  await sendAndConfirmTransaction(transaction);
};

export const purchaseCourse = async (price) => {
  const instruction = new TransactionInstruction({
    keys: [{ pubkey: userKeypair.publicKey, isSigner: true, isWritable: true }],
    programId: PROGRAM_ID,
    data: Buffer.from([1, ...new Uint8Array(new Float64Array([price]).buffer)])
  });

  const transaction = new Transaction().add(instruction);
  await sendAndConfirmTransaction(transaction);
};

async function sendAndConfirmTransaction(transaction) {
  transaction.feePayer = userKeypair.publicKey;
  transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  await transaction.sign(userKeypair);
  const signature = await connection.sendRawTransaction(transaction.serialize());
  await connection.confirmTransaction(signature);
}