import { appwriteAccount } from "./appwrite";
import { ID } from "appwrite";

// Create User Account
export async function createUserAccount({ name, email, password }) {
  try {
    return await appwriteAccount.create(ID.unique(), email, password, name);
  } catch (error) {
    if (error?.message?.includes("exists")) {
      throw new Error("An account with this email already exists.");
    }
    throw new Error("Failed to create account. Please try again.");
  }
}

// Login user
export async function userLogin({ email, password }) {
  try {
    await appwriteAccount.createEmailPasswordSession(email, password);
    return await appwriteAccount.get();
  } catch (error) {
    if (error?.message?.toLowerCase().includes("invalid credentials")) {
      throw new Error("Invalid email or password.");
    }
    throw new Error("Login failed. Please try again.");
  }
}

// Logout User
export async function userLogout() {
  try {
    await appwriteAccount.deleteSession("current");
  } catch (error) {
    throw new Error(`Logging out failed ${error?.message}`);
  }
}

// Get User
export async function getUser() {
  try {
    return await appwriteAccount.get();
  } catch (error) {
    return null;
  }
}

// Forgot Password
export async function userForgotPassword(email) {
  try {
    await appwriteAccount.createRecovery(
      email,
      import.meta.env.VITE_FRONTEND_URL + "/reset-password"
    );
  } catch (error) {
    console.error("Error initiating password recovery:", error);
    throw new Error(
      "Failed to send recovery email. Please check the email address."
    );
  }
}

// Reset Password
export async function userResetPassword(userId, secret, newPassword) {
  try {
    await appwriteAccount.updateRecovery(userId, secret, newPassword);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw new Error("Failed to reset password. Please try again.");
  }
}
