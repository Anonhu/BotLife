package com.example;

import com.example.bots.Bot;
import com.example.bots.BotManager;
import com.example.bots.Role;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.scheduler.BukkitRunnable;
import org.bukkit.scheduler.BukkitTask;

import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;

public final class Main extends JavaPlugin {
    private BotManager botManager;
    private Logger logger;

    @Override
    public void onEnable() {
        logger = getLogger();
        logger.info("Plugin enabled");
        botManager = new BotManager(this);
        BukkitTask task = new BukkitRunnable() {
            @Override
            public void run() {
                botManager.tick();
            }
        }.runTaskTimer(this, 0, 1);
        getCommand("bot").setExecutor(this);
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (command.getName().equalsIgnoreCase("bot")) {
            if (args.length > 0 && args[0].equalsIgnoreCase("spawn")) {
                if (sender instanceof Player) {
                    Player player = (Player) sender;
                    if(args.length > 1){
                        try {
                            Role role = Role.valueOf(args[1].toUpperCase());
                            Location location = player.getLocation();
                            botManager.spawnBot(location, role);
                            logger.info("Spawned bot with role " + role.name() + " at " + location.toString());
                        } catch (IllegalArgumentException e){
                            logger.warning("Invalid role: " + args[1]);
                        }
                    } else {
                        logger.warning("Please provide bot role");
                    }

                } else {
                    logger.info("You should be a player to execute this command");
                }
                return true;
            }
        }
        return false;
    }

    @Override
    public List<String> onTabComplete(CommandSender sender, Command command, String alias, String[] args) {
        return Arrays.asList("spawn");
    }

    @Override
    public void onDisable() {
        logger.info("Plugin disabled");
    }
    public BotManager getBotManager(){
        return botManager;
    }
}