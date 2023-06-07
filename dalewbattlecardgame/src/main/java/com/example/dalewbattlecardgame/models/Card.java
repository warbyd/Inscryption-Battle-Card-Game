package com.example.dalewbattlecardgame.models;

import javax.persistence.*;

@Entity
@Table(name="card")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "card_type")
public class Card {

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

    private Boolean isDestroyed; // Add this line

    // No args constructor
    public Card() {}

    // Constructor with parameters
    public Card(String name, int attack, int defense, int sacrificecardsneeded, String ability, String imageUrl, String imageUrl1Defense, Boolean isDestroyed) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.sacrificecardsneeded = sacrificecardsneeded;
        this.ability = ability;
        this.imageUrl = imageUrl;
        this.imageUrl1Defense = imageUrl1Defense;
        this.isDestroyed = isDestroyed;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAttack() {
        return attack;
    }

    public int getDefense() {
        return defense;
    }

    public int getSacrificecardsneeded() {
        return sacrificecardsneeded;
    }

    public String getAbility() {
        return ability;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getImageUrl1Defense() {
        return imageUrl1Defense;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAttack(int attack) {
        this.attack = attack;
    }

    public void setDefense(int defense) {
        this.defense = defense;
    }

    public void setSacrificecardsneeded(int sacrificecardsneeded) {
        this.sacrificecardsneeded = sacrificecardsneeded;
    }

    public void setAbility(String ability) {
        this.ability = ability;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setImageUrl1Defense(String imageUrl1Defense) {
        this.imageUrl1Defense = imageUrl1Defense;
    }

    // Getters and setters...
}