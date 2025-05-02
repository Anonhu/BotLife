package com.example.bots;

import org.bukkit.Location;
import org.bukkit.entity.Entity;
import org.bukkit.entity.LivingEntity;
import org.bukkit.inventory.ItemStack;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DecisionMaker {
    private Bot bot;
    private Map<String, Object> memory;
    private Map<TaskType, Integer> taskWeights;

    public DecisionMaker(Bot bot) {
        this.bot = bot;
        this.memory = new HashMap<>();
        this.taskWeights = new HashMap<>();
        taskWeights.put(TaskType.SURVIVE, 100);
        taskWeights.put(TaskType.DEFEND, 80);
        taskWeights.put(TaskType.GATHER_RESOURCES, 60);
        taskWeights.put(TaskType.BUILD, 50);
        taskWeights.put(TaskType.SOCIALIZE, 40);
        taskWeights.put(TaskType.EXPLORE, 30);
    }

    public void decide() {
        TaskType selectedTask = selectTask();
        bot.setTask(selectedTask);

        switch (selectedTask) {
            case SURVIVE:
                handleSurvival();
                break;
            case DEFEND:
                handleDefense();
                break;
            case GATHER_RESOURCES:
                handleGatherResources();
                break;
            case BUILD:
                handleBuild();
                break;
            case SOCIALIZE:
                handleSocialize();
                break;
            case EXPLORE:
                handleExplore();
                break;
        }
    }

    private void handleExplore() {
        Location currentLocation = bot.getLocation();
        Location target = new Location(currentLocation.getWorld(), currentLocation.getX() + 10, currentLocation.getY(), currentLocation.getZ() + 10);
        bot.move(target);
    }

    private void handleSocialize() {
        // Логика социальных взаимодействий
        List<Entity> nearbyEntities = bot.getNearbyEntities(5.0);
        if (!nearbyEntities.isEmpty()) {
            bot.interact((LivingEntity) nearbyEntities.get(0));
        }
    }

    private void handleBuild() {
        // Логика строительства
    }

    private void handleGatherResources() {
        // Логика добычи ресурсов
        List<Entity> nearbyEntities = bot.getNearbyEntities(5.0);
        if (!nearbyEntities.isEmpty()) {
            for (Entity entity : nearbyEntities) {
                bot.interact(entity.getLocation().getBlock());
            }
        }
    }

    private void handleDefense() {
        // Логика защиты
        List<Entity> nearbyEntities = bot.getNearbyEntities(10.0);
        if (!nearbyEntities.isEmpty()) {
            for (Entity entity : nearbyEntities) {
                bot.attack((LivingEntity) entity);
            }
        }
    }

    private void handleSurvival() {
        // Логика выживания
        if(bot.getHealth() < 10){
            //Лечение
        }
        if(bot.getHunger() < 10){
            //Поиск еды
            ItemStack food = new ItemStack(org.bukkit.Material.APPLE); // Пример: яблоко
            bot.eat(food);
        }
    }

    private TaskType selectTask() {
        int maxPriority = 0;
        TaskType selectedTask = null;
        for (Map.Entry<TaskType, Integer> entry : taskWeights.entrySet()) {
            int priority = entry.getValue();
            if (priority > maxPriority) {
                maxPriority = priority;
                selectedTask = entry.getKey();
            }
        }
        return selectedTask;
    }

    public void learn(TaskType task, boolean success) {
        int weight = taskWeights.get(task);
        if (success) {
            taskWeights.put(task, weight + 10);
        } else {
            taskWeights.put(task, weight - 10);
        }
    }

    public void remember(String key, Object value) {
        memory.put(key, value);
    }

    public Object recall(String key) {
        return memory.get(key);
    }