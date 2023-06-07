package com.example.dalewbattlecardgame.models;

import javax.persistence.*;

@Entity
public class SquirrelCard {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private int attack;
    private int defense;

    private int sacrificecardsneeded;
    private String ability;

    private String imageUrl;
    private String imageUrl1Defense;

    // no args constructor
    public SquirrelCard() {}

    // constructor with parameters
    public SquirrelCard(String name, int attack, int defense, int sacrificecardsneeded, String ability, String imageUrl, String imageUrl1Defense) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.sacrificecardsneeded = sacrificecardsneeded;
        this.ability = ability;
        this.imageUrl = imageUrl;
        this.imageUrl1Defense = imageUrl1Defense;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAttack() {
        return attack;
    }

    public void setAttack(int attack) {
        this.attack = attack;
    }

    public int getDefense() {
        return defense;
    }

    public void setDefense(int defense) {
        this.defense = defense;
    }

    public int getSacrificecardsneeded() {
        return sacrificecardsneeded;
    }

    public void setSacrificecardsneeded(int sacrificecardsneeded) {
        this.sacrificecardsneeded = sacrificecardsneeded;
    }

    public String getAbility() {
        return ability;
    }

    public void setAbility(String ability) {
        this.ability = ability;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageUrl1Defense() {
        return imageUrl1Defense;
    }

    public void setImageUrl1Defense(String imageUrl1Defense) {
        this.imageUrl1Defense = imageUrl1Defense;
    }
}
