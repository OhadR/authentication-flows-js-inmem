import { LinksRepository } from "authentication-flows-js";

export class LinksInmemRepository implements LinksRepository
{
    private links = new Set<string>();

    addLink(link: string) {
        this.links.add(link);
    }

    /**
     * remove link. return true if link was found and removed. false otherwise.
     * @param link
     */
    removeLink(link: string): boolean {
        if(!this.links.has(link))
            return false;

        this.links.delete(link);
        return true;
    }
}
