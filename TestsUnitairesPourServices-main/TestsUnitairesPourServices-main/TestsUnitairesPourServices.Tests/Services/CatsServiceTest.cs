using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TestsUnitairesPourServices.Data;
using TestsUnitairesPourServices.Exceptions;
using TestsUnitairesPourServices.Models;
using TestsUnitairesPourServices.Services;

namespace TestsUnitairesPourServices.Tests.Services;

[TestClass]
public class CatsServiceTest
{
    DbContextOptions<ApplicationDBContext> options;

    private const int GOOD_CAT_ID = 1;
    private const int WILD_CAT_ID = 2;
    private const int WRONG_CAT_ID = 3;
    private const int House_A_ID = 1;
    private const int House_B_ID = 2;

    public CatsServiceTest()
    {
        options = new DbContextOptionsBuilder<ApplicationDBContext>()
            .UseInMemoryDatabase(databaseName: "TestsUnitairesPourServicesContext")
            .Options;
    }
    
    [TestInitialize]
    public void Init()
    {
        using ApplicationDBContext db = new ApplicationDBContext(options);

        object[] houses = 
        {
            new House
            {
                Address = "123 rue de la maison",
                Id = House_A_ID,
                OwnerName = "Roger Racine"
            },
            new House
            {
                Address = "124 rue de la maison",
                Id = House_B_ID,
                OwnerName = "Bernadette Racine"
            }
        };
        db.AddRange(houses);

        object[] cats =
        {
            new Cat
            {
                Id = GOOD_CAT_ID,
                Name = "Pitou",
                Age = 12
            },
            new Cat
            {
                Id = WILD_CAT_ID,
                Name = "Doggo",
                Age = 9
            }
        };
        db.AddRange(cats);

        House house = db.House.Find(House_A_ID);
        db.Cat.Find(GOOD_CAT_ID).House = house;
        
        db.SaveChanges();
    }

    [TestCleanup]
    public void Dispose()
    {
        using ApplicationDBContext db = new ApplicationDBContext(options);
        db.Cat.RemoveRange(db.Cat);
        db.House.RemoveRange(db.House);
        db.SaveChanges();
    }
    
    [TestMethod]
    public async Task TestMoveSuccess()
    {
        using ApplicationDBContext db = new ApplicationDBContext(options);
        CatsService service = new CatsService(db);
        
        House houseA = await db.House.FindAsync(House_A_ID);
        House houseB = await db.House.FindAsync(House_B_ID);
        Cat result = service.Move(GOOD_CAT_ID,houseA,houseB);
        
        Assert.IsNotNull(result);
    }

    [TestMethod]
    public async Task TestMoveFailMauvaisId()
    {
        using ApplicationDBContext db = new ApplicationDBContext(options);
        CatsService service = new CatsService(db);
        
        House houseA = await db.House.FindAsync(House_A_ID);
        House houseB = await db.House.FindAsync(House_B_ID);
        Cat result = service.Move(WRONG_CAT_ID,houseA,houseB);
        
        Assert.IsNull(result);
    }

    [TestMethod]
    public async Task TestMoveFailWildCat()
    {
        using ApplicationDBContext db = new ApplicationDBContext(options);
        CatsService service = new CatsService(db);
        
        House houseA = await db.House.FindAsync(House_A_ID);
        House houseB = await db.House.FindAsync(House_B_ID);

        Assert.ThrowsException<WildCatException>(() => service.Move(WILD_CAT_ID, houseA, houseB), "On n'apprivoise pas les chats sauvages");
    }

    [TestMethod]
    public async Task TestMoveFailWrongHouse()
    {
        using ApplicationDBContext db = new ApplicationDBContext(options);
        CatsService service = new CatsService(db);
        
        House houseA = await db.House.FindAsync(House_A_ID);
        House houseB = await db.House.FindAsync(House_B_ID);

        Assert.ThrowsException<DontStealMyCatException>(() => service.Move(GOOD_CAT_ID, houseB, houseA), "Touche pas à mon chat!");
    }
}