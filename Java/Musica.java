class Musica {

    private final String nome;
    private       Genero genero;

    public Musica(String nome, Genero genero) {

        this.nome    = nome;
        this.genero  = genero;
    
    }

    public String getNome() {

        return this.nome;

    }

    public Genero getGenero() {

        return this.genero;

    }

    public void setGenero(Genero genero) {

        this.genero = genero;

    }

    public boolean equals(Musica that) {

        if (this.nome.equals(that.nome) && this.genero.equals(that.genero)) 

            return true;

        return false;

    }

    public String toString() {

        return String.format("%s - %s", this.nome, this.genero);

    }

}
