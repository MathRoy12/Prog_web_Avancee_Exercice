using Microsoft.AspNetCore.SignalR;
using SignalR.Services;

namespace SignalR.Hubs
{
    public static class UserHandler
    {
        public static HashSet<string> ConnectedIds = new HashSet<string>();
    }
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }

        public override async Task OnConnectedAsync()
        {
            UserHandler.ConnectedIds.Add(Context.ConnectionId);
            await Clients.All.SendAsync("UpdateNbUsers", UserHandler.ConnectedIds.Count);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            UserHandler.ConnectedIds.Remove(Context.ConnectionId);
            await Clients.All.SendAsync("UpdateNbUsers", UserHandler.ConnectedIds.Count);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SelectChoice(PizzaChoice choice)
        {
            string groupName = _pizzaManager.GetGroupName(choice);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            int nbPizzas = _pizzaManager.NbPizzas[(int)choice];
            int money = _pizzaManager.Money[(int)choice];
            int pizzaPrice = _pizzaManager.PIZZA_PRICES[(int)choice];
            
            await Clients.Caller.SendAsync("UpdatePizzaPrice",pizzaPrice);
            await Clients.Caller.SendAsync("UpdateNbPizzasAndMoney",nbPizzas,money);
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
            string groupName = _pizzaManager.GetGroupName(choice);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task AddMoney(PizzaChoice choice)
        {
            _pizzaManager.IncreaseMoney(choice);
            int money = _pizzaManager.Money[(int)choice];
            
            string groupName = _pizzaManager.GetGroupName(choice);
            await Clients.Groups(groupName).SendAsync("UpdateMoney",money);
        }

        public async Task BuyPizza(PizzaChoice choice)
        {
            _pizzaManager.BuyPizza(choice);
            int nbPizzas = _pizzaManager.NbPizzas[(int)choice];
            int money = _pizzaManager.Money[(int)choice];
            string groupName = _pizzaManager.GetGroupName(choice);
            await Clients.Groups(groupName).SendAsync("UpdateNbPizzasAndMoney",nbPizzas,money);
        }
    }
}
