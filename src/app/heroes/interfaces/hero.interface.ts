export interface Hero {
    id:                string;
    superheroe:        string;
    editorial:         Editorial;
    alter_ego:         string;
    primera_aparicion: string;
    personajes:        string;
    alt_image?:        string;
}

export enum Editorial {
    MarvelComics = "Marvel Comics",
}
