package picstory.backend.domain;

public enum PostCategory {

    CHAMPION("챔피언"),
    CONTENDER("컨텐더"),
    RANKER("랭커"),
    UNRANKER("언랭커"),
    PROSPECT("유망주"),
    LEGEND("레전드"),
    ETC("기타");
    private final String label;

    PostCategory(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
