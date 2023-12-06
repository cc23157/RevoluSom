public enum Genero {
    Rock,
    POP,
    HipHop,
    Eletronica,
    Jazz,
    MusicaClassica,
    Reggae,
    Funk,
    Blues,
    Country;

    public String toString() {

        return String.format("%s", "Gênero: ", this.name());
    
    }
}