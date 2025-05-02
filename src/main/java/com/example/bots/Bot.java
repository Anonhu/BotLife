package com.example.bots;

import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.block.Block;
import org.bukkit.entity.Entity;
import org.bukkit.inventory.ItemStack;
import org.bukkit.entity.LivingEntity;
import org.bukkit.inventory.Inventory;

import java.util.List;
import java.util.UUID;

public class Bot {
    private UUID uuid;
    private int health;
    private int hunger;
    private Role role;
    private Inventory inventory;
    private Location location;
    private Location target;
    private TaskType task;

    public Bot(Location location, Role role) {
        this.uuid = UUID.randomUUID();//
        this.health = 20;//
        this.hunger = 20;//
        this.role = role;
        this.inventory = Bukkit.createInventory(null, 36, "Bot Inventory");//
        this.location = location;//
        this.target = null;//
        this.task = null;
    }

    public UUID getUuid() {
        return uuid;
    }

    public java.util.Collection<Entity> getNearbyEntities(double radius) {
        return toList(this.location.getWorld().getNearbyEntities(this.location, radius, radius, radius));
    }

    public int getHealth() {
        return this.health;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Location getTarget() {
        return target;
    }

    public void setTarget(Location target) {
        this.target = target;
    }
    public TaskType getTask() { return this.task; }
    public void setTask(TaskType task) { this.task = task; }
    public int getHunger() { return this.hunger;}
    public Role getRole(){ return this.role;}
    public void move(Location target) {
        this.target = target;
        this.location = target;
    }
    public void interact(Block block) {
        // Взаимодействие с блоком
    }
    public void attack(LivingEntity entity) {
        // Атака сущности
    }
    public void eat(ItemStack food) {
        // Принятие пищи
    }
    private List<Entity> toList(java.util.Collection<Entity> collection){
        java.util.List<Entity> list = new java.util.ArrayList<>();
        for(Entity entity : collection){
            list.add(entity);
        }
        return list;
    }
}

