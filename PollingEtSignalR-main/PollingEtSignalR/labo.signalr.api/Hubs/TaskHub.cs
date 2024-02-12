using labo.signalr.api.Data;
using labo.signalr.api.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace labo.signalr.api.Hubs;


public static class UserHandler
{
    public static HashSet<string> ConnectedIds = new HashSet<string>();
}

public class TaskHub: Hub
{
    public ApplicationDbContext _context;
    public TaskHub(ApplicationDbContext context)
    {
        _context = context;
    }

    public override async Task OnConnectedAsync()
    {
        await base.OnConnectedAsync();
        UserHandler.ConnectedIds.Add(Context.ConnectionId);
        await Clients.All.SendAsync("UserCount", UserHandler.ConnectedIds.Count);
        await Clients.Caller.SendAsync("TaskList", await _context.UselessTasks.ToListAsync());
    }

    public async Task AddTask(string taskText)
    {
        UselessTask uselessTask = new UselessTask() {
            Completed = false,
            Text = taskText
        };
        _context.UselessTasks.Add(uselessTask);
        await _context.SaveChangesAsync();
        
        await Clients.All.SendAsync("TaskList", await _context.UselessTasks.ToListAsync());
    }

    public async Task CompleteTask(int id)
    {
        UselessTask? task = await _context.FindAsync<UselessTask>(id);
        if (task != null)
        {
            task.Completed = true;
            await _context.SaveChangesAsync();
        }
        
        await Clients.All.SendAsync("TaskList", await _context.UselessTasks.ToListAsync());
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        UserHandler.ConnectedIds.Remove(Context.ConnectionId);
        await Clients.All.SendAsync("UserCount", UserHandler.ConnectedIds.Count);
        await base.OnDisconnectedAsync(exception);
    }
}