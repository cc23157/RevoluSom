class Usuario {

    private String   nome;
    private Musica[] historico;
    private int      musicasOuvidas = 0;

    public Usuario(String nome) {

        this.nome = nome;
        this.historico = new Musica[500];

    }

    public void ouvirMusica(Musica musica) {

        historico[musicasOuvidas] = musica;

    }

    public Musica[] getHistorico() {
        
        return this.historico;

    }

    public String getNome() {

        return this.nome;

    }

    public void setNome(String nome) {

        this.nome = nome;

    }

    public Genero[] recomendarMusicas() {

        Genero[] generosOuvidos = new Genero[100];
        for (int j = 0; j < 100; j++) {

            for (int i = 0; i < historico.length; i++) {

                generosOuvidos[j] = this.historico[i].getGenero();
                continue;

            }
        
        }

        return generosOuvidos;

    }

}
