public class Artista {
    
    private String nome;
    private Genero genero;

    public Artista(String nome, Genero genero) {

        this.nome   = nome;
        this.genero = genero;

    }

    public String getNome() {

        return this.nome;

    }

    public Genero getGenero() {

        return this.genero;

    }

    public void setNome(String nome) {

        this.nome = nome;

    }

    public void setGenero(Genero genero) {

        this.genero = genero;

    }

}
