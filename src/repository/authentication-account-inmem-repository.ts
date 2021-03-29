import { AuthenticationAccountRepository,
	AuthenticationUser,
	AccountState } from 'authentication-flows-js';
const debug = require('debug')('authentication-account-inmem-repository');

export class AuthenticationAccountInmemRepository implements AuthenticationAccountRepository
{
    loadUserByUsername(email: string): AuthenticationUser {
        throw new Error("Method not implemented.");
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

    createUser(authenticationUser: AuthenticationUser): AccountState {
        //TODO do someting
        debug('this is inmem implementation!');
        return null;
    }

    deleteUser(email: string): void {
        throw new Error("Method not implemented.");
    }


}
