package com.example.bots;

import com.example.Main;
import org.bukkit.Location;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class BotManager {
    private List<Bot> bots;
    private Main plugin;

    public BotManager(Main plugin) {
        this.bots = new ArrayList<>();
        this.plugin = plugin;
    }

    public void spawnBot(Location location, Role role) {
         Bot bot = new Bot(location, role);
         DecisionMaker decisionMaker = new DecisionMaker(bot);
         bots.add(bot);
    }

    public void removeBot(Bot bot) {
        bots.remove(bot);

    }

    public List<Bot> getBots() {
        return bots;
    }

    public Bot getBot(UUID uuid) {
        for (Bot bot : bots) {
            if (bot.getUuid().equals(uuid)) {
                return bot;
            }
        }
        return null;
    }

    public void tick() {
        for (Bot bot : bots) {
            DecisionMaker decisionMaker = new DecisionMaker(bot);
            decisionMaker.decide();
        }
    }
}