import { LinksRepository } from "authentication-flows-js";

export class LinksInmemRepository implements LinksRepository
{
    private links = new Map<string, string>();

    addLink(username: string, link: string) {
        this.links.set(username, link);
    }

    /**
     * remove link. return true if link was found and removed. false otherwise.
     * @param link
     */
    removeLink(username: string): boolean {
        if(!this.links.has(username))
            return false;

        this.links.delete(username);
        return true;
    }

    //this is for the automation only:
    getLink(username: string): string {
        return this.links.get(username);
    }
}
