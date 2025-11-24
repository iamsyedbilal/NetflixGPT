import { appwriteAccount } from "./appwrite";
import { ID } from "appwrite";

// Create User Account
export async function createUserAccount({ name, email, password }) {
  try {
    await appwriteAccount.create(ID.unique(), email, password, name);
    await appwriteAccount.createEmailPasswordSession(email, password);
    return await appwriteAccount.get();
  } catch (error) {
    if (error?.message?.includes("exists")) {
      throw new Error("An account with this email already exists.");
    }
    throw new Error("Failed to create account. Please try again.");
  }
}
