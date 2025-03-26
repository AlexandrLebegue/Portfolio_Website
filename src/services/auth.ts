import { AdminCredentials, AdminUser } from '../types/blog.types';

/**
 * Service for handling admin authentication
 */
class AuthService {
  private readonly STORAGE_KEY = 'blog_admin_auth';
  private user: AdminUser | null = null;
  
  // In a real application, these would be stored securely on the server
  // This is just a simple example for demonstration purposes
  private readonly ADMIN_USERNAME = 'admin';
  private readonly ADMIN_PASSWORD = 'password123';
  
  constructor() {
    // Try to load user from localStorage on initialization
    this.loadUserFromStorage();
  }
  
  /**
   * Load user from localStorage if available
   */
  private loadUserFromStorage(): void {
    try {
      console.log('Loading user from storage');
      const storedAuth = localStorage.getItem(this.STORAGE_KEY);
      console.log('Stored auth:', storedAuth);
      if (storedAuth) {
        this.user = JSON.parse(storedAuth);
        console.log('User loaded from storage:', this.user);
      } else {
        console.log('No user found in storage');
      }
    } catch (error) {
      console.error('Failed to load auth from storage:', error);
      this.user = null;
    }
  }
  
  /**
   * Save user to localStorage
   */
  private saveUserToStorage(): void {
    try {
      if (this.user) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.user));
      } else {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    } catch (error) {
      console.error('Failed to save auth to storage:', error);
      // Continue even if localStorage is not available
    }
  }
  
  /**
   * Login with admin credentials
   */
  login(credentials: AdminCredentials): Promise<AdminUser> {
    console.log('Auth service login called with:', credentials.username);
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // Check credentials
        console.log('Checking credentials:');
        console.log('Provided username:', credentials.username);
        console.log('Expected username:', this.ADMIN_USERNAME);
        console.log('Provided password:', credentials.password);
        console.log('Expected password:', this.ADMIN_PASSWORD);
        console.log('Username match:', credentials.username === this.ADMIN_USERNAME);
        console.log('Password match:', credentials.password === this.ADMIN_PASSWORD);
        
        if (
          credentials.username === this.ADMIN_USERNAME &&
          credentials.password === this.ADMIN_PASSWORD
        ) {
          console.log('Credentials match, creating user object');
          // Create user object
          this.user = {
            username: credentials.username,
            displayName: 'Administrator',
          };
          
          console.log('Saving user to storage:', this.user);
          // Save to storage
          this.saveUserToStorage();
          
          console.log('Resolving promise with user:', this.user);
          resolve(this.user);
        } else {
          console.log('Credentials do not match, rejecting');
          reject(new Error('Invalid username or password'));
        }
      }, 500);
    });
  }
  
  /**
   * Logout the current user
   */
  logout(): void {
    console.log('Logging out user');
    this.user = null;
    this.saveUserToStorage();
    console.log('User logged out, user is now:', this.user);
  }
  
  /**
   * Get the current user
   */
  getCurrentUser(): AdminUser | null {
    console.log('getCurrentUser called, returning:', this.user);
    return this.user;
  }
  
  /**
   * Check if a user is logged in
   */
  isLoggedIn(): boolean {
    console.log('isLoggedIn called, user:', this.user);
    return this.user !== null;
  }
}

// Create a singleton instance
const authService = new AuthService();

export default authService;