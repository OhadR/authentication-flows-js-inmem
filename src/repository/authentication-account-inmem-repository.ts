import { AuthenticationAccountRepository,
	AuthenticationUser,
	AccountState,
    AuthenticationUserImpl } from 'authentication-flows-js';
const debug = require('debug')('authentication-account-inmem-repository');

export class AuthenticationAccountInmemRepository implements AuthenticationAccountRepository
{
    private users = new Map<string, AuthenticationUser>();

    loadUserByUsername(username: string): AuthenticationUser {
        return this.users.get(username);
    }

    setEnabled(username: string) {
        this.setEnabledFlag(username, true);
    }

    setDisabled(username: string) {
        this.setEnabledFlag(username, false);
    }

    protected setEnabledFlag(username: string, flag: boolean)
    {
        const storedUser: AuthenticationUser =  this.loadUserByUsername(username);
        const newUser: AuthenticationUser = new AuthenticationUserImpl(
            username,
            storedUser.getPassword(),
            flag,
            storedUser.getLoginAttemptsLeft(),
            storedUser.getPasswordLastChangeDate(),
            storedUser.getFirstName(),
            storedUser.getLastName(),
            storedUser.getAuthorities()
        );

        //delete old user and set a new one, since iface does not support "setPassword()":
        this.deleteUser(username);
        this.users.set(username, newUser);
    }

    isActivated(email: string): boolean {
        throw new Error("Method not implemented.");
    }

    isAccountLocked(email: string): AccountState {
        throw new Error("Method not implemented.");
    }

    //TODO: should be in abstract class
    async decrementAttemptsLeft(username: string) {
        const storedUser: AuthenticationUser =  await this.loadUserByUsername(username);
        let attempts = storedUser.getLoginAttemptsLeft();
        debug(`current num attempts: ${attempts}`);
        await this.setAttemptsLeft(username, --attempts);
    }

    setAttemptsLeft(username: string, numAttemptsAllowed: number) {
        const storedUser: AuthenticationUser =  this.loadUserByUsername(username);

        const newUser: AuthenticationUser = new AuthenticationUserImpl(
            username,
            storedUser.getPassword(),
            storedUser.isEnabled(),
            numAttemptsAllowed,
            storedUser.getPasswordLastChangeDate(),
            storedUser.getFirstName(),
            storedUser.getLastName(),
            storedUser.getAuthorities()
        );

        //delete old user and set a new one, since iface does not support "setPassword()":
        this.deleteUser(username);
        this.users.set(username, newUser);

    }

    setPassword(email: string, newPassword: string) {
        throw new Error("Method not implemented.");
    }

    //TODO: should be in abstract class, async/await
    getEncodedPassword(username: string): string {
        const storedUser: AuthenticationUser =  this.loadUserByUsername(username);
        if (!storedUser)
            return null;
        return storedUser.getPassword();
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

    deleteUser(username: string): void {
        debug('deleteUser');
        this.users.delete(username);
    }

    userExists(username: string): boolean {
        debug('userExists?');
        return this.users.has(username);
    }
}
