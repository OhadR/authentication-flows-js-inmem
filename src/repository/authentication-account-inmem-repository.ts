import { AuthenticationAccountRepository,
	AuthenticationUser,
	AccountState,
    AuthenticationUserImpl } from 'authentication-flows-js';
const debug = require('debug')('authentication-account-inmem-repository');

export class AuthenticationAccountInmemRepository implements AuthenticationAccountRepository
{
    private users = new Map<String, AuthenticationUser>();

    loadUserByUsername(username: string): AuthenticationUser {
        return this.users.get(username);
    }

    setEnabled(email: string) {
        throw new Error("Method not implemented.");
    }

    setDisabled(email: string) {
        throw new Error("Method not implemented.");
    }

    isActivated(email: string): boolean {
        throw new Error("Method not implemented.");
    }

    isAccountLocked(email: string): AccountState {
        throw new Error("Method not implemented.");
    }

    decrementAttemptsLeft(email: string) {
        throw new Error("Method not implemented.");
    }

    setAttemptsLeft(email: string, numAttemptsAllowed: number) {
        throw new Error("Method not implemented.");
    }

    setPassword(email: string, newPassword: string) {
        throw new Error("Method not implemented.");
    }

    getEncodedPassword(username: string): string {
        throw new Error("Method not implemented.");
    }

    getPasswordLastChangeDate(email: string): Date {
        throw new Error("Method not implemented.");
    }

    setAuthority(username: string, authority: string) {
        throw new Error("Method not implemented.");
    }

    createUser(authenticationUser: AuthenticationUser): void {
        debug('createUser / inmem implementation!');

        const newUser: AuthenticationUser = new AuthenticationUserImpl(authenticationUser.getUsername(),
            authenticationUser.getPassword(),
            false,
            authenticationUser.getLoginAttemptsLeft(),
            new Date(),
            authenticationUser.getFirstName(),
            authenticationUser.getLastName(),
            authenticationUser.getAuthorities());

        if( this.userExists( newUser.getUsername() ) )
        {
            //ALREADY_EXIST:
            throw new Error(`user ${newUser.getUsername()} already exists`);
        }

        this.users.set(newUser.getUsername(), newUser);
    }

    deleteUser(email: string): void {
        throw new Error("Method not implemented.");
    }

    userExists(username: string): boolean {
        return this.users.has(username);
    }
}
