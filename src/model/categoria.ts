export class Categoria{
    categoriaId!: number;
    nome!: string;
    imageUrl!: string;

    constructor(categoriaId: number,  nome: string, imageUrl: string){
        this.categoriaId = categoriaId;
        this.nome = nome;
        this.imageUrl = imageUrl;
    }
}